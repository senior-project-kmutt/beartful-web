import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationModal.module.scss";
import { useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import QuotationPreviewModal from './QuotationPreviewModal';
import { CreateQuotation } from '@/models/quotation';
import { Receipt } from '@/models/receipt';
import { getFreelancePurchaseOrder } from '@/services/purchaseOrder/purchaseOrder.api';
import { IFreelancePurchaseOrder, IGetOrder } from '@/models/purchaseOrder';

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
    const [freelanceWork, setFreelanceWork] = useState<IGetOrder[]>([])
    const [selectedFreelanceWork, setSelectedFreelanceWork] = useState<IGetOrder>()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Receipt>();

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

    const getFreelanceWork = () => {
        const token = localStorage.getItem("auth");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        getFreelancePurchaseOrder(freelanceId, 'all', headers).subscribe((res => {
            const filterWork = (res.data as IFreelancePurchaseOrder[]).filter(item => item.customerUsername == customerUsername);
            setFreelanceWork(filterWork[0].order);
        }))
    }

    const getWorkName = (orderItem: IGetOrder) => {
        if (orderItem.purchaseOrder.quotationId) {
            return orderItem.quotation?.name
        } else {
            return orderItem.purchaseOrderItem?.name
        }
    }

    const handleSelectWork = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.selectedIndex;
        const selectWorkItem = freelanceWork[selectedIndex - 1]
        setSelectedFreelanceWork(selectWorkItem);
    }

    const getFormatInputDate = (date: Date) => {
        const newDate = new Date(date)
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getFreelanceWork();
    }, [])

    useEffect(() => {
        if (selectedFreelanceWork) {
            if (selectedFreelanceWork.purchaseOrder.quotationId) {
                const quotation = selectedFreelanceWork.quotation;
                if (quotation) {
                    const startDate = getFormatInputDate(quotation.startDate)
                    const endDate = getFormatInputDate(quotation.endDate)
                    setValue('startDate', startDate);
                    setValue('endDate', endDate)
                    setValue('benefits', quotation.benefits)
                    setValue('day', quotation.day)
                    setValue('quatity', quotation.quatity)
                    setValue('numberOfEdit', quotation.numberOfEdit)
                    setValue('amount', quotation.amount)
                }
            } else {
                const purchaseOrderItem = selectedFreelanceWork.purchaseOrderItem
                if (purchaseOrderItem) {
                    setValue('description', purchaseOrderItem.description)
                    setValue('quatity', purchaseOrderItem.quantity)
                    setValue('amount', purchaseOrderItem.price)
                }
            }
        }
    }, [selectedFreelanceWork])

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
                            <select
                                className={`${style.inputField} ${errors.workName && `${style.error}`}`}
                                {...register("workName", { required: true })}
                                onChange={handleSelectWork}
                            >
                                <option value="" disabled selected>โปรดเลือกงานที่ต้องการ</option>
                                {freelanceWork.map((work, index) => {
                                    const workName = getWorkName(work)
                                    return (
                                        <>
                                            <option key={index} value={workName}>{workName}</option>
                                        </>
                                    )
                                })}
                            </select>
                            {/* <input type='text' className={`${style.inputField} ${errors.workName && `${style.error}`}`} {...register("workName", { required: true })} /> */}
                        </div>

                        {selectedFreelanceWork && (
                            <>
                                {selectedFreelanceWork?.purchaseOrder.quotationId ? (
                                    <div>
                                        <div>
                                            <label>สิ่งที่ต้องได้รับ</label>
                                            <textarea rows={3} className={`bg-slate-200 ${style.inputField} ${errors.benefits && `${style.error}`}`} {...register("benefits", { required: false })} disabled></textarea>
                                        </div>

                                        <div className={`${style.formGrid} ${style.custom_grid} mb-2`}>
                                            <div>
                                                <label>วันเริ่มงาน</label>
                                                <input type='date' className={`bg-slate-200 ${style.inputField} ${errors.startDate && `${style.error}`}`} {...register("startDate", { required: false })} disabled />
                                            </div>
                                            <div>
                                                <label>วันมอบงาน</label>
                                                <input type='date' className={`bg-slate-200 ${style.inputField} ${errors.endDate && `${style.error}`}`} {...register("endDate", { required: false })} disabled />
                                            </div>
                                            <div>
                                                <label>ระยะเวลา (วัน)</label>
                                                <input type='number' className={`bg-slate-200 ${style.inputField} ${errors.day && `${style.error}`}`} {...register("day", { required: false })} disabled />
                                            </div>
                                        </div>

                                        <div className={`${style.formGrid} ${style.custom_grid} mb-2`}>
                                            <div>
                                                <label>จำนวน(ชิ้น)</label>
                                                <input type='number' className={`bg-slate-200 ${style.inputField} ${errors.quatity && `${style.error}`}`} {...register("quatity", { required: true })} disabled />
                                            </div>
                                            <div>
                                                <label>จำนวนการแก้ไข (ครั้ง)</label>
                                                <input type='number' className={`bg-slate-200 ${style.inputField} ${errors.numberOfEdit && `${style.error}`}`} {...register("numberOfEdit", { required: false })} disabled />
                                            </div>
                                            <div>
                                                <label>ราคา(บาท)</label>
                                                <input type='number' className={` bg-slate-200 ${style.inputField} ${errors.amount && `${style.error}`}`} {...register("amount", { required: true })} disabled />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <label>รายละเอียด</label>
                                            <textarea rows={3} className={`bg-slate-200 ${style.inputField} ${errors.benefits && `${style.error}`}`} {...register("description", { required: true })} disabled></textarea>
                                        </div>
                                        <div className={`${style.formGrid}  mb-2`}>
                                            <div>
                                                <label>จำนวน(ชิ้น)</label>
                                                <input type='number' className={`bg-slate-200 ${style.inputField} ${errors.quatity && `${style.error}`}`} {...register("quatity", { required: true })} disabled />
                                            </div>
                                            <div>
                                                <label>ราคา(บาท)</label>
                                                <input type='number' className={` bg-slate-200 ${style.inputField} ${errors.amount && `${style.error}`}`} {...register("amount", { required: true })} disabled />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className='mt-2'>
                            <label>ยืนยันการออกใบเสร็จรับเงิน</label>
                            <input type='text' className={`${style.inputField} ${errors.confirmReceipt && `${style.error}`}`} {...register("confirmReceipt", { required: true })} placeholder='พิมพ์ชื่อเพื่อยืนยัน' />
                        </div>

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