import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationModal.module.scss";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import QuotationPreviewModal from './QuotationPreviewModal';
import { CreateQuotation } from '@/models/quotation';
import { Receipt } from '@/models/receipt';

interface Props {
    openReceiptModal: () => void;
    sendMessage: (message: string) => void
    customerUsername: string;
    freelanceId: string;
}
const ReceiptModal = (props: Props) => {
    const { openReceiptModal, sendMessage, customerUsername, freelanceId } = props;
    const [isOpenPreviewModal, setIsOpenPreviewModal] = useState<boolean>(false);
    const [quotationData, setQuotationData] = useState<CreateQuotation>();
    const { register, handleSubmit, formState: { errors } } = useForm<Receipt>();

    const onSubmit = handleSubmit(async (data) => {
        const quotationDataTransform = {
            ...data,
            quotationNumber: getQuotationNo(),
            customerUsername: customerUsername,
            freelanceId: freelanceId,
            status: 'inCart'
        }
        // setQuotationData(quotationDataTransform);
        setIsOpenPreviewModal(true);
    });

    const getQuotationNo = () => {
        const dateTime = new Date();
        const date = dateTime.getDate();
        const month = dateTime.getMonth();
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const milliSecond = dateTime.getMilliseconds();
        return `BF-${year}${month}${date}${hours}${minutes}${milliSecond}`
    }

    return (
        <Modal size={'3xl'} className={style.quotationModal} show={true}>
            <Modal.Header className={style.header}>
                <p>สร้างใบเสร็จรับเงิน</p>
            </Modal.Header>
            <Modal.Body>
                <div id="information" className={style.main}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>ชื่อลูกค้า</label>
                            <input type='text' className={`${style.inputField} ${errors.customerName && `${style.error}`}`} {...register("customerName", { required: true })} />
                        </div>
                        <div>
                            <label>ที่อยู่ลูกค้า</label>
                            <textarea rows={3} className={`${style.inputField} ${errors.customerName && `${style.error}`}`} {...register("customerAddress", { required: true })} />
                        </div>
                        <div>
                            <label>ชื่อผู้ออกใบเสร็จ</label>
                            <input type='text' className={`${style.inputField} ${errors.freelanceName && `${style.error}`}`} {...register("freelanceName", { required: true })} />
                        </div>
                        <div>
                            <label>ที่อยู่ผู้ออกใบเสร็จ</label>
                            <textarea rows={3} className={`${style.inputField} ${errors.customerName && `${style.error}`}`} {...register("customerAddress", { required: true })} />
                        </div>
                        <div>
                            <label>ชื่องาน</label>
                            <select className={`${style.inputField} ${errors.workName && `${style.error}`}`} {...register("workName", { required: true })}>
                                <option value="no">ยังไม่รู้</option>
                            </select>
                            {/* <input type='text' className={`${style.inputField} ${errors.workName && `${style.error}`}`} {...register("workName", { required: true })} /> */}
                        </div>

                        <label>สิ่งที่ต้องได้รับ</label>
                        <textarea rows={3} className={`${style.inputField} ${errors.benefits && `${style.error}`}`} {...register("benefits", { required: true })}></textarea>

                        <div className={`${style.formGrid} ${style.custom_grid} mb-2`}>
                            <div>
                                <label>วันเริ่มงาน</label>
                                <input type='date' className={`${style.inputField} ${errors.startDate && `${style.error}`}`} {...register("startDate", { required: true })} />
                            </div>
                            <div>
                                <label>วันมอบงาน</label>
                                <input type='date' className={`${style.inputField} ${errors.endDate && `${style.error}`}`} {...register("endDate", { required: true })} />
                            </div>
                            <div>
                                <label>ระยะเวลา (วัน)</label>
                                <input type='number' className={`${style.inputField} ${errors.day && `${style.error}`}`} {...register("day", { required: true })} />
                            </div>
                        </div>

                        <div className={`${style.formGrid} ${style.custom_grid} mb-2`}>
                            <div>
                                <label>จำนวน(ชิ้น)</label>
                                <input type='number' className={`${style.inputField} ${errors.quatity && `${style.error}`}`} {...register("quatity", { required: true })} />
                            </div>
                            <div>
                                <label>จำนวนการแก้ไข (ครั้ง)</label>
                                <input type='number' className={`${style.inputField} ${errors.numberOfEdit && `${style.error}`}`} {...register("numberOfEdit", { required: true })} />
                            </div>
                            <div>
                                <label>ราคา(บาท)</label>
                                <input type='number' className={`${style.inputField} ${errors.amount && `${style.error}`}`} {...register("amount", { required: true })} />
                            </div>
                        </div>

                        <label>ยืนยันการออกใบเสร็จรับเงิน</label>
                        <input type='text' className={`${style.inputField} ${errors.confirmReceipt && `${style.error}`}`} {...register("confirmReceipt", { required: true })} placeholder='พิมพ์ชื่อเพื่อยืนยัน' />

                        <label>หมายเหตุเพิ่มเติม</label>
                        <textarea className={style.inputField} rows={4} {...register("note")} />

                        <div className={style.button_box}>
                            <button className={style.createButton} onClick={() => onSubmit}>ถัดไป</button>
                            <button className={style.cancelButton} onClick={() => openReceiptModal()}>
                                ยกเลิก
                            </button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
            {(isOpenPreviewModal && quotationData) && (
                <div>
                    <QuotationPreviewModal setIsopenModal={setIsOpenPreviewModal} data={quotationData} sendMessage={sendMessage} openQuotationModal={openReceiptModal} />
                </div>
            )}
        </Modal>
    );
};

export default ReceiptModal;