
import { useState } from "react";
import ArtworkList from "../Artwork/ArtworkList";
import NavBar from "../Layout/NavBar";
import UserSideBar from "./UserSideBar";
import style from "@/styles/user/freelanceArtwork.module.scss"

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    const [type, setType] = useState<string>('hired');

    return (
        <>
            <NavBar />
            <div className="flex mt-8">
                <div className="w-4/6">
                    <UserSideBar type={type} setType={setType} />
                </div>
                <div>
                    <div className={style.profileDescription}>
                        <div className={style.profile}>
                            <img src="../../../../ssi1/picture/user1.gif" />
                            <div className={style.name_box}>
                                <p className={style.username}>mottdy</p>
                                <p className={style.name}>Chananya Sinphichit</p>
                            </div>
                            <button className={style.description}>รายละเอียดเพิ่มเติม</button>
                        </div>
                    </div>
                    {(type == 'hired' || type == 'readyMade' || type == '') && <ArtworkList from="freelance" type={type} username={props.username} />}
                    {(type == 'Package&Price') && <div>Package&Price</div>}
                    {(type == 'Review') && <div>Review</div>}
                </div>

            </div>
        </>
    );
};

export default FreelanceArtwork;