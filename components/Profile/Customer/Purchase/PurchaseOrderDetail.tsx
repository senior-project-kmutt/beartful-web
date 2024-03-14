
import { IPurchaseOrderDetail } from "@/models/purchaseOrder";
import ReceiptPreviewModal from "../Receipt/ReceiptPreviewModal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
interface Props {
    purchaseOrder: IPurchaseOrderDetail
}
const PurchaseOrderDetail = (props: Props) => {
    const { purchaseOrder } = props
    const [isOpenReceiptModal, setIsOpenReceiptModal] = useState<boolean>(false)

    const getDateFormat = (dateTime: Date) => {
        const dateObject = new Date(dateTime);
        const date = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${date}/${month}/${year}`;
    }

    return (
        <div>
            <p>การซื้อขายและการจ้างของฉัน</p>
            <div className="flex justify-between">
                <div>
                    <p><FontAwesomeIcon icon={faAngleLeft} size="sm" className="mr-2"></FontAwesomeIcon>ย้อนกลับ</p>
                </div>
                <div className="flex">
                    <p>หมายเลขคำสั่งซื้อ xxxxxxxxx</p>
                    <p className="mx-4">|</p>
                    <p>ส่งมอบสำเร็จ</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                {purchaseOrder.order.purchaseOrder.type === 'hired' && (
                    <div>
                        <p>{purchaseOrder.order.quotation?.name}</p>
                        <div className="ml-4">
                            <p>สิ่งที่ต้องได้รับ : {purchaseOrder.order.quotation?.benefits}</p>
                            <p>จำนวนการแก้ไข : {purchaseOrder.order.quotation?.numberOfEdit}</p>
                            {(purchaseOrder.order.quotation?.startDate && purchaseOrder.order.quotation?.endDate) && (
                                <p>ระยะเวลาการทำงาน : {getDateFormat(purchaseOrder.order.quotation?.startDate)} - {getDateFormat(purchaseOrder.order.quotation?.endDate)}</p>
                            )}
                            {purchaseOrder.order.quotation?.note && (
                                <p>หมายเหตุเพิ่มเติม : {purchaseOrder.order.quotation?.note}</p>
                            )}
                        </div>
                    </div>
                )}
                <div>
                    ราคา {purchaseOrder.order.purchaseOrder.netAmount} บาท
                </div>
            </div>
            <button onClick={() => setIsOpenReceiptModal(true)}>ดูใบเสร็จ</button>
            {isOpenReceiptModal && (
                <ReceiptPreviewModal setIsopenModal={setIsOpenReceiptModal} data={purchaseOrder} />
            )}
        </div>
    );
};

export default PurchaseOrderDetail;