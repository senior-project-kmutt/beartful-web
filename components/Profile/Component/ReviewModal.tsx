import style from "@/styles/profile/reviewModal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'flowbite-react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Artwork } from '@/models/artwork';
import { ChangeEvent, useState } from "react";
import { IGetOrder } from "@/models/purchaseOrder";
import { Review } from "@/models/review";
import Swal from "sweetalert2";
import { createNewReview } from "@/services/review/review.api";

interface Props {
    openReviewModal: () => void;
    data: IGetOrder
}
const ReviewModal = (props: Props) => {
    const { openReviewModal, data } = props
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
        <Modal size={'4xl'} dismissible className={style.reviewModal} show={true}>
            <Modal.Header className={style.header}>
                <p className="text-center">ให้คะแนน Artwork</p>
            </Modal.Header>
            <Modal.Body>
                <div className={style.order}>
                    <img className={style.userImage} src="../../xxxx"></img>
                    <div className={style.detail}>
                        <p className={style.artworkName}>Artwork Name</p>
                        <span className={style.packageName}>[  Package Name  ]</span>
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