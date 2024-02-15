import style from "@/styles/profile/freelance/profileSelectBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faStar, faUser, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { freelanceSelectBarMenu } from "./selectBarMenu";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";

interface Props {
    activeMenu: string
}

const ProfileSelectBarFreelance = (props: Props) => {
    const router = useRouter();
    const { activeMenu } = props
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [])
    return (
        <>
            <div className={style.selectBar}>
                <div>
                    <div className={style.profile}>
                        <img src={user?.profileImage} />
                        <div className={style.name_box}>
                            <p className={style.username}>{user?.username}</p>
                            <p className={style.edit}>
                                <FontAwesomeIcon icon={faPenToSquare} size="xs" style={{ color: '#8F8C8C' }}></FontAwesomeIcon> แก้ไขข้อมูลส่วนตัว</p>
                        </div>
                    </div>
                    <div className={style.selectOption}>
                        <div className="account">
                            <p className={style.heading}><FontAwesomeIcon icon={faUser} size="sm" style={{ color: 'black' }}></FontAwesomeIcon> บัญชีของฉัน</p>
                            {freelanceSelectBarMenu?.map((menu) => {
                                return (
                                    <>
                                        <p
                                            className={`${style.subHeading} ${activeMenu === menu.value && `${style.activeMenu}`}`}
                                            onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/${menu.value}`)}>
                                            {menu.title}
                                        </p>
                                    </>
                                )
                            })}
                        </div>
                        <div className="seller">
                            <p className={`${style.heading} ${activeMenu === 'purchase' && `${style.activeMenu}`} cursor-pointer`}
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase`)}>
                                <FontAwesomeIcon icon={faWindowRestore} size="sm" style={{ color: 'black' }}></FontAwesomeIcon> ประวัติการขาย/รับงาน
                            </p>
                        </div>
                        <div className="score">
                            <p className={`${style.heading} ${activeMenu === 'review' && `${style.activeMenu}`} cursor-pointer cursor-pointer`}
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/review`)}>
                                <FontAwesomeIcon icon={faStar} size="sm" style={{ color: 'black' }}></FontAwesomeIcon> คะแนนของฉัน
                            </p>
                        </div>
                    </div>
                </div>

                <div className={style.verticleLine}></div>
            </div>
        </>
    );
};

export default ProfileSelectBarFreelance;