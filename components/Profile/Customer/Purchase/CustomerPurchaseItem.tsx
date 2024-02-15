import style from "@/styles/profile/purchase.module.scss"
import { faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReviewModal from "../../Component/ReviewModal";
import { ICustomerPurchaseOrder } from "@/models/purchaseOrder";

interface Props {
    item: ICustomerPurchaseOrder
}
const CustomerPurchaseItem = (props: Props) => {
    const { item } = props
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    const openReviewModal = () => {
        setIsReviewModalOpen(!isReviewModalOpen)
    }
    console.log(item);

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
            {item.order.map((item, index) => {
                return (
                    <div className={style.order} key={index}>
                        <img className={style.userImage} src="../../xxxx"></img>
                        <div className={style.detail}>
                            <p className={style.artworkName}>Artwork Name</p>
                            <span className={style.packageName}>[  Package Name  ]</span>
                            <p className={style.price}>{`xxx`} บาท</p>
                        </div>
                        <div className={style.confirm}>
                            <FontAwesomeIcon icon={faClipboardList} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                            <button className={style.confirmButton}>ฉันได้ส่งมอบงานแล้ว</button>
                            {isReviewModalOpen && <ReviewModal openReviewModal={openReviewModal} />}
                            <button className={style.toReviewButton} onClick={openReviewModal}>ให้คะแนน</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CustomerPurchaseItem;