import style from "@/styles/profile/purchase.module.scss"
import { faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFreelancePurchaseOrder } from "@/models/purchaseOrder";
import { OrderStatusFreelanceEnum } from "@/enums/orders";
import { HIRED_IMAGE, READYMADE_IMAGE } from "@/config/constants";
import { formattedPrice } from "@/core/tranform";

interface Props {
    item: IFreelancePurchaseOrder
    updateStatus: (purchaseOrderId: string, status: string) => void
}
const FreelancePurchaseItem = (props: Props) => {
    const { item, updateStatus } = props

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
                    <div className={`${style.order}`} key={index}>
                        {index != 0 && <div className={style.lineBreak}></div>}
                        <img className={style.userImage} src={item.purchaseOrder.type === 'hired' ? HIRED_IMAGE : READYMADE_IMAGE}></img>
                        {item.purchaseOrder.type === 'hired' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.quotation?.name}</p>
                            <p className={style.description}>เลขที่ : {item.quotation?.quotationNumber}</p>
                            <p className={style.description}>สิ่งที่ได้รับ : {item.quotation?.benefits}</p>
                            <p className={style.description}>การแก้ไข : {item.quotation?.numberOfEdit}</p>
                            <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat(item.quotation?.startDate)} - {getDateFormat(item.quotation?.endDate)}</p>
                            <p className={style.price}>{formattedPrice(item.purchaseOrder.netAmount!)} บาท</p>
                        </div>}
                        {item.purchaseOrder.type === 'readyMade' && <div className={style.detail}>
                            <p className={style.artworkName}>{item.purchaseOrderItem?.name}</p>
                            <p className={style.description}>{item.purchaseOrderItem?.description}</p>
                            <p className={style.price}>{formattedPrice(item.purchaseOrder.netAmount!)} บาท</p>
                        </div>}
                        <div className={style.confirm} style={{ marginTop: item.purchaseOrder.type === 'hired' ? '110px' : '60px' }} >
                            <div className={style.status} style={{ marginTop: item.purchaseOrder.type === 'hired' ? '-95px' : '-50px' }}>{OrderStatusFreelanceEnum[item.purchaseOrder.status as keyof typeof OrderStatusFreelanceEnum]}</div>
                            <FontAwesomeIcon icon={faClipboardList} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                            {item.purchaseOrder.status === 'pending' && (
                                <div>
                                    <button className={style.confirmButton} onClick={() => updateStatus(item.purchaseOrder._id!, "delivered")}>ฉันได้ส่งมอบงานแล้ว</button>
                                </div>
                            )}
                            {item.purchaseOrder.status === 'delivered' && (
                                <div>
                                    <button className={style.disableConfirmButton}>ฉันได้ส่งมอบงานแล้ว</button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default FreelancePurchaseItem;