
import { IPurchaseOrderDetail } from "@/models/purchaseOrder";
import ReceiptPreviewModal from "../Customer/Receipt/ReceiptPreviewModal";
import { useState } from "react";
interface Props {
    purchaseOrder: IPurchaseOrderDetail
}
const PurchaseOrderDetail = (props: Props) => {
    const { purchaseOrder } = props
    const [isOpenReceiptModal, setIsOpenReceiptModal] = useState<boolean>(false)
    
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