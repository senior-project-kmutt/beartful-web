import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationPreviewModal.module.scss";
import { Dispatch, SetStateAction, useState } from 'react';
import QuotationImage from '@/components/Quotation/QuotationImage';
import { Quotation } from '@/models/quotation';
import { uploadFileToFirebase } from '@/services/firebase/firebase-api';
import { createQuotation } from '@/services/quotation/quotation.api';
import Swal from 'sweetalert2';

interface Props {
    setIsopenModal: Dispatch<SetStateAction<boolean>>
    openQuotationModal: () => void;
    data: Quotation;
    sendMessage: (message: string) => void
}
const QuotationPreviewModal = (props: Props) => {
    const { setIsopenModal, data, sendMessage, openQuotationModal } = props
    const messageForQuotation = `เราได้เพิ่มการจัดจ้างนี้ลงในตะกร้าของคุณแล้ว \n คุณสามารถตรวจสองเเละตกลงการจัดจ้าง/ยกเลิกได้ที่ตะกร้าของคุณ \n https://capstone23.sit.kmutt.ac.th/ssi1/cart/`
    const [quotationImage, setQuotationImage] = useState<File>();

    const onSubmit = async () => {
        if (quotationImage) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            createQuotation(data, headers).then(async (res) => {
                Swal.fire({
                    icon: "success",
                    title: "สร้างบัญชีสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                })
                const imageUrls = await uploadFileToFirebase([quotationImage], `user/quotation`, quotationImage.name);
                sendMessage(imageUrls[0]);
                sendMessage(messageForQuotation)
                setIsopenModal(false);
                openQuotationModal();
            }, error => {
                Swal.fire({
                    title: "เกิดข้อผิดพลาด",
                    text: "โปรดลองใหม่อีกครั้ง",
                    icon: "error"
                });
            })
        }
    }

    return (
        <Modal size={'6xl'} className={style.quotationModal} show={true}>
            <Modal.Header className={style.header}>
                <p>สร้างใบเสนอราคา</p>
            </Modal.Header>
            <Modal.Body>
                <QuotationImage data={data} saveImageData={setQuotationImage} />
                <div className={style.button_box}>
                    <button className={style.createButton} onClick={() => onSubmit()}>สร้างใบเสนอราคา</button>
                    <button className={style.cancelButton} onClick={() => setIsopenModal(false)}>
                        แก้ไขข้อมูล
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default QuotationPreviewModal;