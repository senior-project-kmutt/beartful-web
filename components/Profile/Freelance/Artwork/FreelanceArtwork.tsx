import { useEffect, useState } from "react";
import ProfileSelectBarFreelance from "../ProfileSelectBar";
import style from '@/styles/profile/freelance/artwork/viewArtwork.module.scss'
import { Artwork } from "@/models/artwork";
import { getFreelanceArtwork } from "@/services/artwork/artwork.api";
import ArtworkDetail from "@/components/Artwork/ArtworkDetail";
import ArtworkList from "@/components/Artwork/ArtworkList";
import ArtworkItem from "@/components/Profile/Freelance/Artwork/ArtworkItem";
import router from "next/router";
import { NO_ARTWORK_FREELANCE } from "@/config/constants";

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
            <div className="flex mt-16">
                <div className="fixed inset-0 bg-white z-3 mt-20 sm:w-1/4 lg:w-1/5 xl:w-1/6">
                    <ProfileSelectBarFreelance activeMenu="artwork" />
                </div>

                <div className={`${style.main}`}>
                    <div className="mb-11 fixed mt-32 inset-0 overflow-y-auto" style={{ zIndex: 10 }}>
                        <button className={style.addButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/artwork/add`)}>เพิ่มผลงาน</button>
                        <p className="text-xl font-bold ml-96">ผลงานของฉัน</p>
                    </div>
                    {isShowDetail && artworkDetail && (
                        <div className="ml-12">
                            <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
                        </div>
                    )}
                    {artworks?.length === 0 && (
                        <div className="flex justify-center items-center flex-col h-full mt-16 ml-80">
                            <img src={NO_ARTWORK_FREELANCE} className="sm:h-64 ml-4 h-96" alt="No Artwork" />
                            <div className="mt-2 text-center text-gray-500">ยังไม่มีผลงาน</div>
                        </div>
                    )}
                    <div className={`${style.artworkContainer} fixed inset-0 overflow-y-auto`} style={{ maxHeight: 'calc(100vh - 96px)', zIndex: 20, marginLeft: "350px", marginTop: "190px" }}>
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