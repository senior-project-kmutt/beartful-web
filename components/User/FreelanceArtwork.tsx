
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

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
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
                            <button className={style.description} onClick={() => setIsOpenDetailsModal(true)}>รายละเอียดเพิ่มเติม</button>
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