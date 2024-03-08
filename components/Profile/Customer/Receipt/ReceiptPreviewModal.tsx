import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationPreviewModal.module.scss";
import { Dispatch, SetStateAction, useState } from 'react';
import QuotationImage from '@/components/Quotation/QuotationImage';
import { CreateQuotation } from '@/models/quotation';
import { uploadFileToFirebase } from '@/services/firebase/firebase-api';
import { createQuotation } from '@/services/quotation/quotation.api';
import Swal from 'sweetalert2';
import { IGetOrder, IPurchaseOrderDetail } from '@/models/purchaseOrder';
import ReceiptImage from './ReceiptImage';

interface Props {
    setIsopenModal: Dispatch<SetStateAction<boolean>>
    data: IPurchaseOrderDetail;
}
const ReceiptPreviewModal = (props: Props) => {
    const { setIsopenModal, data } = props
    const messageForQuotation = `เราได้เพิ่มการจัดจ้างนี้ลงในตะกร้าของคุณแล้ว! \n คุณสามารถตรวจสอบเเละตกลงการจัดจ้าง/ยกเลิกได้ที่ตะกร้าของคุณ`
    const [quotationImage, setQuotationImage] = useState<File>();

    const onSubmit = async () => {
        if (quotationImage) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            // const newDataTransform = {
            //     ...data,
            // } as CreateQuotation
            // createQuotation(newDataTransform, headers).then(async (res) => {
            //     Swal.fire({
            //         icon: "success",
            //         title: "สร้างใบเสนอราคาสำเร็จ",
            //         showConfirmButton: false,
            //         timer: 3000
            //     })
            //     const imageUrls = await uploadFileToFirebase([quotationImage], `user/quotation`, quotationImage.name);
            //     setIsopenModal(false);
            //     openQuotationModal();
            // }, error => {
            //     Swal.fire({
            //         title: "เกิดข้อผิดพลาด",
            //         text: "โปรดลองใหม่อีกครั้ง",
            //         icon: "error"
            //     });
            // })
        }
    }

    return (
        <Modal size={'6xl'} className={style.quotationModal} show={true}>
            <Modal.Header className={style.header}>
                <p>ใบเสร็จการซื้อขาย</p>
            </Modal.Header>
            <Modal.Body>
                <ReceiptImage data={data} />
                <div className={style.button_box}>
                    <button className={style.createButton} onClick={() => onSubmit()}>Download</button>
                    <button className={style.cancelButton} onClick={() => setIsopenModal(false)}>
                        ปิด
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReceiptPreviewModal;