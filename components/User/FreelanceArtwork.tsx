
import { useEffect, useState } from "react";
import ArtworkList from "../Artwork/ArtworkList";
import NavBar from "../Layout/NavBar";
import UserSideBar from "./UserSideBar";
import style from "@/styles/user/freelanceArtwork.module.scss"
import { FreelanceUsers } from "@/models/users";
import { getUserByUsername } from "@/services/user/user.api";
import FreelanceReviewList from "../Profile/Freelance/Review/FreelanceReviewList";
import DetailsModal from "./DetailsModal";
import { IGetFreelanceReview } from "@/models/review";
import { getFreelanceAverageScore, getFreelanceReviews } from "@/services/review/review.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { createChatRoom } from "@/services/chat/chat.api";
import { IUser } from "@/pages/chat";
import { useRouter } from "next/router";

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    const router = useRouter();
    const [user, setUser] = useState<IUser>();
    const [type, setType] = useState<string>('hired');
    const [freelance, setFreelance] = useState<FreelanceUsers>();
    const [freelanceReviews, setFreelanceReviews] = useState<IGetFreelanceReview[]>();
    const [freelanceAverageScore, setFreelanceAverageScore] = useState<number>(0);
    const [isOpenDetailsModal, setIsOpenDetailsModal] = useState<boolean>(false);

    useEffect(() => {
        getUserByUsername(props.username).subscribe(res => {
            setFreelance(res.data);
        })

        getFreelanceAverageScore(props.username).subscribe((res: any) => {
            setFreelanceAverageScore(res.data)
        })

        const user = localStorage.getItem("user") || "";
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])

    useEffect(() => {
        if (freelance) {
            getFreelanceReviews(freelance?.username).subscribe((res: any) => {
                setFreelanceReviews(res.data);
            })
        }
    }, [freelance])

    const openReviewModal = () => {
        setIsOpenDetailsModal(!isOpenDetailsModal)
    }

    const handleGoToChat = () => {
        if (user) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const body = {
                paticipants: [
                    user.username,
                    props.username
                ]
            }
            createChatRoom(body, headers).then(res => {
                router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat?chatRoom=${res._id}`);
            })
        }
    }

    return (
        <>
            <NavBar />
            <div className="flex mt-8 mx-5">
                <div className="" style={{ width: "14%" }}>
                    <UserSideBar type={type} setType={setType} />
                </div>
                <div style={{ width: "86%" }}>
                    <div className={style.profileDescription}>
                        <div className={style.profile}>
                            <img src={freelance?.profileImage} />
                            <div className={style.name_box}>
                                <p className={style.username}>{freelance?.username}</p>
                                <p className={style.name}>{freelance?.firstname} {freelance?.lastname}</p>
                            </div>
                        </div>
                        <div className={style.button_container}>
                            <button className={style.description} onClick={() => setIsOpenDetailsModal(true)}>รายละเอียดเพิ่มเติม</button>
                            {user && (
                                <FontAwesomeIcon icon={faCommentDots} className='cursor-pointer' size="2xl" onClick={handleGoToChat} />
                            )}
                        </div>
                    </div>
                    {(type == 'hired' || type == 'readyMade' || type == '') && <ArtworkList from="freelance" type={type} username={props.username} />}
                    {/* {(type == 'Package&Price') && <div>Package&Price</div>} */}
                    {(type == 'Review') && (
                        <div style={{ width: "96%" }}>
                            {freelanceReviews && (
                                <FreelanceReviewList title='Review' reviewsData={freelanceReviews} averageScore={freelanceAverageScore} />
                            )}
                        </div>
                    )
                    }
                </div>
                {(isOpenDetailsModal && freelance) && (
                    <DetailsModal openReviewModal={openReviewModal} data={freelance} />
                )}
            </div>
        </>
    );
};

export default FreelanceArtwork;