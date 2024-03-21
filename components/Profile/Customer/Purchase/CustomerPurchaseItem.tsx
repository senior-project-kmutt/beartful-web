import style from "@/styles/profile/purchase.module.scss"
import { faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReviewModal from "../../Component/ReviewModal";
import { ICustomerPurchaseOrder, IPurchaseOrderDetail } from "@/models/purchaseOrder";
import { OrderStatusCustomerEnum } from "@/enums/orders";
import { useRouter } from "next/router";
import { IUser } from "@/pages/chat";
import { HIRED_IMAGE, READYMADE_IMAGE } from "@/config/constants";
import { formattedPrice } from "@/core/tranform";
import { createChatRoom } from "@/services/chat/chat.api";
import ReceiptPreviewModal from "../Receipt/ReceiptPreviewModal";
import { getPurchaseOrderDetail } from "@/services/purchaseOrder/purchaseOrder.api";

interface Props {
    item: ICustomerPurchaseOrder
    user: IUser
    updateStatus: (purchaseOrderId: string, status: string) => void
}
const CustomerPurchaseItem = (props: Props) => {
    const { item, user, updateStatus } = props
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    const [isOpenReceiptModal, setIsOpenReceiptModal] = useState<boolean>(false);
    const [receiptData, setReceiptData] = useState<IPurchaseOrderDetail>();
    const openReviewModal = () => {
        setIsReviewModalOpen(!isReviewModalOpen)
    }
    const router = useRouter();

    const getDateFormat = (dateTime: Date | undefined) => {
        if (dateTime) {
            const dateObject = new Date(dateTime);
            const date = dateObject.getDate().toString().padStart(2, '0');
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObject.getFullYear();
            return `${date}/${month}/${year}`;
        }
    }

    const handleGoToChat = () => {
        const token = localStorage.getItem("auth");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const body = {
            paticipants: [
                user.username,
                item.freelanceUsername
            ]
        }
        createChatRoom(body, headers).then(res => {
            router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat?chatRoom=${res._id}`);
        })
    }

    const handleGoToDetail = (orderId: string) => {
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase/detail/?order=${orderId}`)
    }

    const handleOpenReceipt = (orderId: string) => {
        const token = localStorage.getItem("auth");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        getPurchaseOrderDetail(orderId, headers).subscribe(res => {
            setReceiptData(res.data);
            setIsOpenReceiptModal(true)
        })
    }

    return (
        <div className={style.purchaseItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.saveButton} onClick={handleGoToChat}>Chat</button>
                    <button className={style.cancelButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${item.freelanceUsername}`)}>View profile</button>
                </div>
            </div>
            {item.order.map((item, index) => {
                return (
                    <div className={style.order} key={index}>
                        {index != 0 && <div className={style.lineBreak}></div>}
                        <img className={style.userImage} src={item.purchaseOrder.type === 'hired' ? HIRED_IMAGE : READYMADE_IMAGE}></img>
                        {item.purchaseOrder.type === 'hired' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.quotation?.name}</p>
                            <p className={style.description}>เลขที่ : {item.quotation?.quotationNumber}</p>
                            <p className={style.description}>สิ่งที่ได้รับ : {item.quotation?.benefits}</p>
                            <p className={style.description}>การแก้ไข : {item.quotation?.numberOfEdit}</p>
                            <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat(item.quotation?.startDate)} - {getDateFormat(item.quotation?.endDate)}</p>
                            <p className={style.price}>{formattedPrice(item.purchaseOrder.amount!)} บาท</p>
                        </div>}
                        {item.purchaseOrder.type === 'readyMade' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.purchaseOrderItem?.name}</p>
                            <p className={style.description}>{item.purchaseOrderItem?.description}</p>
                            <p className={style.price}>{formattedPrice(item.purchaseOrder.amount!)} บาท</p>
                        </div>}
                        <div className={style.confirm} style={{ marginTop: item.purchaseOrder.type === 'hired' ? '110px' : '60px' }} >
                            <div className={style.status} style={{ marginTop: item.purchaseOrder.type === 'hired' ? '-95px' : '-50px' }}>{OrderStatusCustomerEnum[item.purchaseOrder.status as keyof typeof OrderStatusCustomerEnum]}</div>
                            {/* <FontAwesomeIcon icon={faClipboardList} style={{ color: '#5A2810' }} size="2xl" onClick={() => handleGoToDetail(item.purchaseOrder._id || '')}></FontAwesomeIcon> */}
                            {item.purchaseOrder.status === 'success' && (
                                <div>
                                    {isReviewModalOpen && <ReviewModal openReviewModal={openReviewModal} data={item} />}
                                    <button className={style.toReviewButton} onClick={openReviewModal}>ให้คะแนน</button>
                                </div>
                            )}
                            {item.purchaseOrder.status === 'pending' && (
                                <div>
                                    <button className={style.disableConfirmButton}>ฉันได้ตรวจสอบและยอมรับงาน</button>
                                    <button className={style.disabletoReviewButton}>ให้คะแนน</button>
                                </div>
                            )}
                            {item.purchaseOrder.status === 'delivered' && (
                                <div>
                                    <button className={style.confirmButton} onClick={() => updateStatus(item.purchaseOrder._id!, "success")}>ฉันได้ตรวจสอบและยอมรับงาน</button>
                                    <button className={style.disabletoReviewButton}>ให้คะแนน</button>
                                </div>
                            )}
                            <div>
                                <button className={style.toReviewButton} onClick={() => handleOpenReceipt(item.purchaseOrder._id!)}>ดูใบเสร็จ</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            {(isOpenReceiptModal && receiptData) && (
                <ReceiptPreviewModal setIsopenModal={setIsOpenReceiptModal} data={receiptData} />
            )}
        </div>
    );
};

export default CustomerPurchaseItem;