import { formattedPrice } from "@/core/tranform";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";


interface Props {
    title: string
    setSlug: Dispatch<SetStateAction<string>>;
}

const FreelanceWithdraw = (props: Props) => {
    const { title, setSlug } = props
    return (
        <>
            <div className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.bankTransfer}>
                    <div className={style.radio}>
                        <FontAwesomeIcon icon={faCircleDot} size="lg" style={{ color: '#E16428' }} />
                    </div>
                    <div className={style.bankAccount}>
                        <img src="https://picsum.photos/200" />
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="font-bold">เลขบัญชี</div>
                            <div>XXXXXXXX</div>
                            <div className="font-bold">ธนาคาร</div>
                            <div>ไทยพาณิชย์</div>
                            <div className="font-bold">ชื่อเจ้าของบัญชี</div>
                            <div>ชนัญญา สินพิชิต</div>
                        </div>
                    </div>
                    <div className={style.transferSection}>
                        <p className="font-bold">เงินคงเหลือ {formattedPrice(150000)} บาท</p>
                        <p className="font-bold mt-2">จำนวนเงินที่ต้องการถอน</p>
                        <input type="number"></input>
                        <div className={style.buttonGroup}>
                            <button className={style.confirm}>ยืนยัน</button>
                            <button className={style.cancel} onClick={() => setSlug('dashboard')}>ย้อนกลับ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreelanceWithdraw;