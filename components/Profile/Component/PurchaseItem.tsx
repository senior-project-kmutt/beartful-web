
import style from "@/styles/profile/purchase.module.scss"
import { faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PurchaseItem = () => {

    return (
        <div className={style.purchaseItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}> shop name</p>
                <div className="ml-8">
                    <button className={style.saveButton}>Chat</button>
                    <button className={style.cancelButton}>View profile</button>
                </div>
                <div className={style.status}>#####status</div>
            </div>
            <div className={style.order}>
                <img className={style.userImage} src="../../xxxx"></img>
                <div className={style.detail}>
                    <p className={style.artworkName}>Artwork Name</p>
                    <span className={style.packageName}>[  Package Name  ]</span><span className={style.amount}>x2</span>
                    <p className={style.price}>XXX บาท</p>
                </div>
                <div className={style.confirm}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                    <button className={style.confirmButton}>ฉันได้ส่งมอบงานแล้ว</button>
                </div>
            </div>
        </div>

    );
};

export default PurchaseItem;