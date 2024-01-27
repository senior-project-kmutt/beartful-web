import style from "@/styles/profile/customer/profileSelectBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser, faWindowRestore } from "@fortawesome/free-solid-svg-icons";

const ProfileSelectBar = () => {
    return (
        <>
            <div className={style.selectBar}>
                <div>
                    <div className={style.profile}>
                        <img src="../../../../ssi1/picture/user1.gif" />
                        <div className={style.name_box}>
                            <p className={style.username}>mottdy</p>
                            <p className={style.edit}>
                                <FontAwesomeIcon icon={faPenToSquare} size="xs" style={{ color: '#8F8C8C' }}></FontAwesomeIcon> แก้ไขข้อมูลส่วนตัว</p>
                        </div>
                    </div>
                    <div className={style.selectOption}>
                        <div className="account">
                            <p className={style.heading}><FontAwesomeIcon icon={faUser} size="sm" style={{ color: 'black' }}></FontAwesomeIcon> บัญชีของฉัน</p>
                            <p className={style.subHeading}>ข้อมูลของฉัน</p>
                            <p className={style.subHeading}>เปลี่ยนรหัสผ่าน</p>
                        </div>
                        <div className="seller">
                            <p className={style.heading}><FontAwesomeIcon icon={faWindowRestore} size="sm" style={{ color: 'black' }}></FontAwesomeIcon> การซื้อและการจ้างของฉัน</p>
                        </div>
                    </div>
                </div>

                <div className={style.verticleLine}></div>
            </div>
        </>
    );
};

export default ProfileSelectBar;