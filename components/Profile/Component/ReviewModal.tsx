import style from "@/styles/profile/reviewModal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'flowbite-react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Artwork } from '@/models/artwork';
import { useState } from "react";

interface Props {
    openReviewModal: () => void;
}
const ReviewModal = (props: Props) => {
    const { openReviewModal } = props
    const [score, setScore] = useState<number>(0)
    const { register, handleSubmit, formState: { errors } } = useForm<Artwork>();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    });

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
                                <a className={`${score >= 1 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => setScore(1)}></FontAwesomeIcon></a>
                                <a className={`${score >= 2 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => setScore(2)}></FontAwesomeIcon></a>
                                <a className={`${score >= 3 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => setScore(3)}></FontAwesomeIcon></a>
                                <a className={`${score >= 4 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => setScore(4)}></FontAwesomeIcon></a>
                                <a className={`${score >= 5 ? `${style.star_selected}` : `${style.star}`}`}><FontAwesomeIcon icon={faStar} onClick={() => setScore(5)}></FontAwesomeIcon></a>
                            </div>
                        </div>
                        <div className="flex">
                            <label className={style.label}>เพิ่มเติม</label>
                            <textarea rows={5} {...register("price")} placeholder='ใส่รายละเอียดเพิ่มเติม' />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer className="grid justify-items-end">
                <div className={style.button_box}>
                    <button className={style.cancelButton} onClick={() => openReviewModal()}>
                        ยกเลิก
                    </button>
                    <button className={style.confirmButton} onClick={() => onSubmit}>ยืนยัน</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
};

export default ReviewModal;