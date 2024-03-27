import style from "@/styles/profile/reviewModal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'flowbite-react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useState } from "react";
import { IGetOrder } from "@/models/purchaseOrder";
import { Review } from "@/models/review";
import Swal from "sweetalert2";
import { createNewReview } from "@/services/review/review.api";
import { HIRED_IMAGE, READYMADE_IMAGE } from "@/config/constants";
import { formatOnlyDate, formattedPrice } from "@/core/tranform";

interface Props {
    openReviewModal: () => void;
    data: IGetOrder;
    updateReviewStatus?: (purchaseOrderId: string, status: boolean) => void
}
const ReviewModal = (props: Props) => {
    const { openReviewModal, data, updateReviewStatus } = props
    const [score, setScore] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [showErrorScoreEmpyt, setShowErrorScoreEmpyt] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setComment(value);
    }

    const handleSelectScore = (score: number) => {
        setShowErrorScoreEmpyt(false);
        setScore(score);

    }

    const onSubmit = () => {
        if (score <= 0) {
            setShowErrorScoreEmpyt(true)
            return
        }

        Swal.fire({
            title: "ยืนยันการให้คะแนน",
            text: "โปรดตรวจสอบข้อมูลให้ถูกต้อง",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ตรวจสอบข้อมูลอีกครั้ง"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("auth");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const body = {
                    purchaseOrderId: data.purchaseOrder._id,
                    score: score,
                    comment: comment,
                    reviewBy: data.purchaseOrder.customerId,
                    reviewTo: data.purchaseOrder.freelanceId
                } as Review

                createNewReview(body, headers).then(_ => {
                    if (updateReviewStatus && data.purchaseOrder._id) {
                        updateReviewStatus(data?.purchaseOrder?._id, true)
                    }
                    openReviewModal()
                    Swal.fire({
                        icon: "success",
                        title: "ให้คะแนนสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
            }
        });
    };

    return (
        <Modal size={'4xl'} dismissible className={style.reviewModal} show={true} onClose={openReviewModal}>
            <Modal.Header className={style.header}>
                <p className="text-center">ให้คะแนน ผลงานที่ได้รับ</p>
            </Modal.Header>
            <Modal.Body>
                <div className={style.order}>
                    <img className={style.userImage} src={data.purchaseOrder.type === 'hired' ? HIRED_IMAGE : READYMADE_IMAGE}></img>
                    <div className={style.detail}>
                        {data.purchaseOrder.type === 'hired' && (
                            <p className={style.artworkName}>{data.quotation?.name}</p>
                        )}
                        {data.purchaseOrder.type === 'readyMade' && (
                            <p className={style.artworkName}>{data.purchaseOrderItem?.name}</p>
                        )}
                        {data.purchaseOrder.type === 'hired' && (
                            <div>
                                <p className={style.packageName}>เลขที่ : {data.quotation?.quotationNumber}</p>
                                <p className={style.packageName}>สิ่งที่ได้รับ : {data.quotation?.benefits}</p>
                                <p className={style.packageName}>การแก้ไข : {data.quotation?.numberOfEdit}</p>
                                {(data.quotation?.startDate && data.quotation.endDate) && (
                                    <p className={style.packageName}>ระยะเวลาการทำงาน : {formatOnlyDate(data.quotation?.startDate)} - {formatOnlyDate(data.quotation?.endDate)}</p>
                                )}
                                <p className={style.price}>{formattedPrice(data.purchaseOrder.amount!)} บาท</p>
                            </div>
                        )}
                        {data.purchaseOrder.type === 'readyMade' && (
                            <div>
                                <p className={style.packageName}>{data.purchaseOrderItem?.description}</p>
                                <p className={style.price}>{formattedPrice(data.purchaseOrder.amount!)} บาท</p>
                            </div>
                        )}
                    </div>
                </div>
                <div id="information" className={style.main}>
                    <form onSubmit={onSubmit}>
                        <div className="flex items-center mb-4">
                            <label className={style.label}>คุณภาพสินค้า</label>
                            <div className={style.starWrapper}>
                                <a className={`${score >= 1 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => handleSelectScore(1)}></FontAwesomeIcon></a>
                                <a className={`${score >= 2 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => handleSelectScore(2)}></FontAwesomeIcon></a>
                                <a className={`${score >= 3 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => handleSelectScore(3)}></FontAwesomeIcon></a>
                                <a className={`${score >= 4 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => handleSelectScore(4)}></FontAwesomeIcon></a>
                                <a className={`${score >= 5 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => handleSelectScore(5)}></FontAwesomeIcon></a>
                                {showErrorScoreEmpyt && (
                                    <p className="text-sm text-red-500 ml-4">โปรดเลือกคะแนน</p>
                                )}
                            </div>
                        </div>

                        <div className="flex">
                            <label className={style.label}>เพิ่มเติม</label>
                            <textarea rows={5} placeholder='ใส่รายละเอียดเพิ่มเติม' onChange={(e) => handleInputChange(e)} />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer className="grid justify-items-end">
                <div className={style.button_box}>
                    <button className={style.cancelButton} onClick={() => openReviewModal()}>
                        ยกเลิก
                    </button>
                    <button className={style.confirmButton} onClick={() => onSubmit()}>ยืนยัน</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
};

export default ReviewModal;