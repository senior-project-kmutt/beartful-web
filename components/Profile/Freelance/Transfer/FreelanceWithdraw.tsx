import { formattedPrice } from "@/core/tranform";
import { UserDashboard } from "@/models/users";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { bankOption } from "@/components/Authentication/FormRegister/option";

interface Props {
    title: string
    setSlug: Dispatch<SetStateAction<string>>;
    data: UserDashboard
}

const FreelanceWithdraw = (props: Props) => {
    const { title, setSlug, data } = props

    const findBankTitle = (value: string) => {
        const bank = bankOption.find(option => option.value === value);
        return bank ? bank.title : '';
    };

    return (
        <>
            <div className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.bankTransfer}>
                    <div className={style.radio}>
                        <FontAwesomeIcon icon={faCircleDot} size="lg" style={{ color: '#E16428' }} />
                    </div>
                    <div className={style.bankAccount}>
                        <img src={data.bankAccount.bankAccountImage} />
                        <div className="grid grid-cols-10 gap-2 mt-4">
                            <div className="col-span-4 font-bold">เลขบัญชี</div>
                            <div className="col-span-6">{data.bankAccount.bankAccountNumber}</div>
                            <div className="col-span-4 font-bold">ธนาคาร</div>
                            <div className="col-span-6">{findBankTitle(data.bankAccount.bankName)}</div>
                            <div className="col-span-4 font-bold">ชื่อเจ้าของบัญชี</div>
                            <div className="col-span-6">{data.bankAccount.bankAccountName}</div>
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