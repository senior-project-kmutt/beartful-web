import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationPreviewModal.module.scss";
import { Dispatch, SetStateAction, useState } from 'react';
import { IPurchaseOrderDetail } from '@/models/purchaseOrder';
import ReceiptImage from './ReceiptImage';

interface Props {
    setIsopenModal: Dispatch<SetStateAction<boolean>>
    data: IPurchaseOrderDetail;
}
const ReceiptPreviewModal = (props: Props) => {
    const { setIsopenModal, data } = props;
    const [receiptImage, setReceiptImage] = useState<File>();

    const handleDownload = () => {
        if (receiptImage) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(receiptImage);
            a.download = receiptImage.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <Modal size={'6xl'} className={style.quotationModal} show={true}>
            <Modal.Header className={style.header}>
                <p>ใบเสร็จการซื้อขาย</p>
            </Modal.Header>
            <Modal.Body>
                <ReceiptImage data={data} saveImageData={setReceiptImage} />
                <div className={style.button_box}>
                    <button className={style.createButton} onClick={() => handleDownload()}>ดาวน์โหลด</button>
                    <button className={style.cancelButton} onClick={() => setIsopenModal(false)}>
                        ปิด
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReceiptPreviewModal;