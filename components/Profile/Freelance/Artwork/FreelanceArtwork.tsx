import { useEffect, useState } from "react";
import ProfileSelectBar from "../ProfileSelectBar";
import NavBar from "@/components/Layout/NavBar";
import style from '@/styles/profile/freelance/artwork/viewArtwork.module.scss'
import { Artwork } from "@/models/artwork";
import { getFreelanceArtwork } from "@/services/artwork/artwork.api";
import ArtworkDetail from "@/components/Artwork/ArtworkDetail";
import ArtworkList from "@/components/Artwork/ArtworkList";
import ArtworkItem from "@/components/Profile/Freelance/Artwork/ArtworkItem";
import router from "next/router";

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    const { username } = props
    const [artworks, setArtwork] = useState<Artwork[]>()
    const [artworkDetail, setArtworkDetail] = useState<ArtworkList>();
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    useEffect(() => {
        getArtworkData()
    }, [])

    const getArtworkData = async () => {
        try {
            if (username) {
                const response = await getFreelanceArtwork(username, 1, 50).toPromise(); // Convert the observable to a promise
                setArtwork(response.data as Artwork[]);
                console.log("Artwork data received", response.data);
            }
        } catch (error) {
            console.error("Error fetching artwork data", error);
        }
    };

    const onShowDetail = (item: ArtworkList) => {
        setIsShowDetail(true);
        setArtworkDetail(item);
    };

    const onCloseDetail = () => {
        setIsShowDetail(false);
    };

    return (
        <>
            <NavBar />
            <div className="flex">

                <div>
                    <ProfileSelectBar activeMenu="artwork" />
                </div>

                <div className={style.main}>
                    <div className="mb-11">
                        <button className={style.addButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/artwork/add`)}>เพิ่มผลงาน</button>
                        <p>ผลงานของฉัน</p>
                    </div>


                    {isShowDetail && artworkDetail && (
                        <div className="-ml-12">
                            <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
                        </div>
                    )}
                    <div className={style.artworkContainer}>
                        {artworks?.map((item: Artwork, index: number) => {
                            return (
                                <div
                                    className={style.imageContainer}
                                    key={index}
                                >
                                    <ArtworkItem
                                        item={item}
                                        key={index}
                                        onShowDetail={onShowDetail}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreelanceArtwork;