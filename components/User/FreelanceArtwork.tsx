
import { useEffect, useState } from "react";
import ArtworkList from "../Artwork/ArtworkList";
import NavBar from "../Layout/NavBar";
import UserSideBar from "./UserSideBar";
import style from "@/styles/user/freelanceArtwork.module.scss"
import { FreelanceUsers } from "@/models/users";
import { getUserByUsername } from "@/services/user/user.api";
import FreelanceReviewList from "../Profile/Freelance/Review/FreelanceReviewList";

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    const [type, setType] = useState<string>('hired');
    const [freelance, setFreelance] = useState<FreelanceUsers>();

    useEffect(() => {
        getUserByUsername(props.username).subscribe(res => {
            setFreelance(res.data);
        })
    }, [])

    console.log(freelance);

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
                            <button className={style.description}>รายละเอียดเพิ่มเติม</button>
                        </div>
                    </div>
                    {(type == 'hired' || type == 'readyMade' || type == '') && <ArtworkList from="freelance" type={type} username={props.username} />}
                    {/* {(type == 'Package&Price') && <div>Package&Price</div>} */}
                    {(type == 'Review') && (
                        <div style={{ width: "96%" }}>
                            <FreelanceReviewList title='Review' />
                        </div>
                    )
                    }
                </div>

            </div>
        </>
    );
};

export default FreelanceArtwork;