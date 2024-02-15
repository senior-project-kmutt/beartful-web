import style from "@/styles/profile/purchase.module.scss"
import { faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReviewModal from "../../Component/ReviewModal";
import { IFreelancePurchaseOrder, IPurchaseOrder } from "@/models/purchaseOrder";
import { OrderStatusFreelanceEnum } from "@/enums/orders";

interface Props {
    item: IFreelancePurchaseOrder
}
const FreelancePurchaseItem = (props: Props) => {
    const { item } = props
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    const openReviewModal = () => {
        setIsReviewModalOpen(!isReviewModalOpen)
    }

    return (
        <div className={style.purchaseItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.customerUsername}</p>
                <div className="ml-8">
                    {/* <button className={style.saveButton}>Chat</button> */}
                    {/* <button className={style.cancelButton}>View profile</button> */}
                </div>
            </div>
            {item.order.map((item, index) => {
                return (
                    <div className={style.order} key={index}>
                        <img className={style.userImage} src="../../xxxx"></img>
                        <div className={style.detail}>
                            <p className={style.artworkName}>Artwork Name</p>
                            <span className={style.packageName}>[  Package Name  ]</span>
                            <p className={style.price}>{item.purchaseOrder.netAmount} บาท</p>
                        </div>
                        <div className={style.confirm}>
                            <div className={style.status}>{OrderStatusFreelanceEnum[item.purchaseOrder.status as keyof typeof OrderStatusFreelanceEnum]}</div>
                            <FontAwesomeIcon icon={faClipboardList} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                            {item.purchaseOrder.status === 'success' && (
                                <div>
                                    <button className={style.disableConfirmButton}>ฉันได้ตรวจสอบและยอมรับงาน</button>
                                    <button className={style.disabletoReviewButton}>ให้คะแนน</button>
                                </div>
                            )}
                            {item.purchaseOrder.status === 'pending' && (
                                <div>
                                    <button className={style.confirmButton}>ฉันได้ตรวจสอบและยอมรับงาน</button>
                                    {isReviewModalOpen && <ReviewModal openReviewModal={openReviewModal} />}
                                    <button className={style.toReviewButton} onClick={openReviewModal}>ให้คะแนน</button>
                                </div>
                            )}
                            {item.purchaseOrder.status === 'cancelled' && (
                                <div><button className={style.disabletoReviewButton}>ยกเลิกแล้ว</button></div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default FreelancePurchaseItem;