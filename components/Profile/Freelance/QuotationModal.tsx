import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/quotationModal.module.scss";
import { useForm } from 'react-hook-form';
import { Artwork } from '@/models/artwork';

interface Props {
    openQuotationModal: () => void;
}
const QuotationModal = (props: Props) => {
    const { openQuotationModal } = props
    const { register, handleSubmit, formState: { errors } } = useForm<Artwork>();

    const onSubmit = handleSubmit(async (data) => {
        // const token = localStorage.getItem("auth");
        // if (token) {
        //   if (inputFiles) {
        //     imageUrl = await uploadFileToFirebase();
        //   }

        //   if (user) {
        //     const artwork = { ...data, images: imageUrl };
        //     const headers = {
        //       Authorization: `Bearer ${token}`,
        //     };

        //     try {
        //       await createArtwork(artwork, headers);
        //     } catch (error) {
        //       console.error("Error creating artwork:", error);
        //     }
        //   }
        // }
        console.log(data);
    });
    return (
        <Modal size={'3xl'} className={style.quotationModal} show={true}>
            <Modal.Header className={style.header}>
                <p>สร้างใบเสนอราคา</p>
            </Modal.Header>
            <Modal.Body>

                <div id="information" className={style.main}>
                    <form onSubmit={onSubmit}>
                        <div className={style.formGrid}>
                            <div>
                                <label>ชื่อลูกค้า</label>
                                <input type='text' className={style.inputField} {...register("name")} />
                            </div>

                            <div>
                                <label>ชื่อผู้ออก</label>
                                <input type='text' className={style.inputField} {...register("type")} />
                            </div>
                        </div>

                        <div>
                            <label>ชื่องาน</label>
                            <input type='text' className={style.inputField} {...register("type")} />
                        </div>

                        <label>สิ่งที่ต้องได้รับ</label>
                        <input type='text' className={style.inputField} {...register("description")} />

                        <label>จำนวนการแก้ไข (ครั้ง)</label>
                        <input type='number' className={style.inputField} {...register("price")} />

                        <div className={`${style.formGrid} ${style.custom_grid}`}>
                            <div>
                                <label>วันเริ่มงาน</label>
                                <input type='date' className={style.inputField} {...register("name")} />
                            </div>

                            <div>
                                <label>วันมอบงาน</label>
                                <input type='date' className={style.inputField} {...register("type")} />
                            </div>

                            <div>
                                <label>จำนวน(วัน)</label>
                                <input type='number' className={style.inputField} {...register("type")} />
                            </div>
                        </div>

                        <div className={style.formGrid}>
                            <div>
                                <label>จำนวน(ชิ้น)</label>
                                <input type='number' className={style.inputField} {...register("name")} />
                            </div>

                            <div>
                                <label>ราคา(บาท)</label>
                                <input type='number' className={style.inputField} {...register("type")} />
                            </div>
                        </div>

                        <label>ยืนยันการออกใบเสนอราคา</label>
                        <input type='text' className={style.inputField} {...register("price")} placeholder='พิมพ์ชื่อเพื่อยืนยัน' />

                        <label>หมายเหตุเพิ่มเติม</label>
                        <textarea rows={4} {...register("price")} placeholder='พิมพ์ชื่อเพื่อยืนยัน' />

                        <div className={style.button_box}>
                            <button className={style.createButton} onClick={() => onSubmit}>สร้าง</button>
                            <button className={style.cancelButton} onClick={() => openQuotationModal()}>
                                ยกเลิก
                            </button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default QuotationModal;