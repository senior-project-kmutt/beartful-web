import { useState } from "react";
import ProfileSelectBar from "../ProfileSelectBar";
import NavBar from "@/components/Layout/NavBar";
import style from '@/styles/profile/freelance/artwork/viewArtwork.module.scss'
import { Artwork } from "@/models/artwork";

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    // const [type, setType] = useState<string>('hired');
    const [artworks, setArtwork] = useState<Artwork[]>()

    return (
        <>
            <NavBar />
            <div className="flex">

                <div className={style.sideBar}>
                    <ProfileSelectBar />
                </div>

                <div className={style.main}>
                    <div className={style.artworkContainer}>
                        {/* {data.images.map((item: any, index: number) => {
                  return (
                    <div
                      className={style.imageContainer}
                      key={index}
                    >
                      <img
                        src={item}
                        alt="Selected Image"
                        className={style.image}
                      />
                    </div>
                  )
                })} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreelanceArtwork;