
import { getCustomerPurchaseOrder, updatePurchaseOrderStatus } from "@/services/purchaseOrder/purchaseOrder.api";
import { IUser } from "@/pages/chat";
import { IGetOrder, IPurchaseOrderDetail } from "@/models/purchaseOrder";
import ReceiptPreviewModal from "../Customer/Receipt/ReceiptPreviewModal";
import { useState } from "react";
interface Props {
    purchaseOrder: IPurchaseOrderDetail
}
const PurchaseOrderDetail = (props: Props) => {
    const { purchaseOrder } = props
    const [isOpenReceiptModal, setIsOpenReceiptModal] = useState<boolean>(false)
    const openReceiptModal = () => {
        setIsOpenReceiptModal(!isOpenReceiptModal)
      }
    
    return (
        <>
            <button onClick={() => setIsOpenReceiptModal(true)}>ดูใบเสร็จ</button>
            {isOpenReceiptModal && (
                <ReceiptPreviewModal setIsopenModal={setIsOpenReceiptModal} data={purchaseOrder} />
            )}
        </>
    );
};

export default PurchaseOrderDetail;