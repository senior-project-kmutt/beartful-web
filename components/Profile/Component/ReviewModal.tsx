import style from "@/styles/profile/reviewModal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'flowbite-react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Artwork } from '@/models/artwork';

interface Props {
    openReviewModal: () => void;
}
const ReviewModal = (props: Props) => {
    const { openReviewModal } = props
    const { register, handleSubmit, formState: { errors } } = useForm<Artwork>();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    });

    return (
        <Modal size={'4xl'} dismissible className={style.reviewModal} show={true} onClick={() => openReviewModal()}>
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
                        <label className={style.label}>คุณภาพสินค้า</label>
                        <div className={style.starWrapper}>
                            <a><FontAwesomeIcon icon={faStar} className={`$style.s1`}></FontAwesomeIcon></a>
                            <a><FontAwesomeIcon icon={faStar} className={`$style.s2`}></FontAwesomeIcon></a>
                            <a><FontAwesomeIcon icon={faStar} className={`$style.s3`}></FontAwesomeIcon></a>
                            <a><FontAwesomeIcon icon={faStar} className={`$style.s4`}></FontAwesomeIcon></a>
                            <a><FontAwesomeIcon icon={faStar} className={`$style.s5`}></FontAwesomeIcon></a>
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