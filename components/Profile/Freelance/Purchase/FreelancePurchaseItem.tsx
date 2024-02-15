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

    const getDateFormat = (dateTime: Date | undefined) => {
        if (dateTime) {
            const dateObject = new Date(dateTime);
            const date = dateObject.getDate().toString().padStart(2, '0');
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObject.getFullYear();
            return `${date}/${month}/${year}`;
        }
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
                        {item.purchaseOrder.type === 'hired' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.quotation?.name}</p>
                            <p className={style.description}>เลขที่ : {item.quotation?.quotationNumber}</p>
                            <p className={style.description}>สิ่งที่ได้รับ : {item.quotation?.benefits}</p>
                            <p className={style.description}>การแก้ไข : {item.quotation?.numberOfEdit}</p>
                            <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat(item.quotation?.startDate)} - {getDateFormat(item.quotation?.endDate)}</p>
                            <p className={style.price}>{item.purchaseOrder.netAmount} บาท</p>
                        </div>}
                        {item.purchaseOrder.type === 'readyMade' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.purchaseOrderItem?.name}</p>
                            <p className={style.description}>{item.purchaseOrderItem?.description}</p>
                            <p className={style.price}>{item.purchaseOrder.netAmount} บาท</p>
                        </div>}
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