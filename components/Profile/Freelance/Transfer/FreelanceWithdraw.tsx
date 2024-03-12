import { formattedPrice } from "@/core/tranform";
import { UserDashboard } from "@/models/users";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { bankOption } from "@/components/Authentication/FormRegister/option";
import { IUser } from "@/pages/chat";
import { freelanceTransfer } from "@/services/user/user.api";
import Swal from "sweetalert2";
import FreelanceWithdrawReviewModal from "./FreelanceWithdrawReviewModal";

interface Props {
    title: string
    setSlug: Dispatch<SetStateAction<string>>;
    data: UserDashboard
    user: IUser | undefined;
}

const FreelanceWithdraw = (props: Props) => {
    const { title, setSlug, data, user } = props
    const [amount, setAmount] = useState<number>(0)
    const [openReviewModal, setOpenReviewModal] = useState<boolean>(false)
    const [isConfirmDisabled, setIsConfirmDisabled] = useState<boolean>(false);

    const findBankTitle = (value: string) => {
        const bank = bankOption.find(option => option.value === value);
        return bank ? bank.title : '';
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = parseFloat(event.target.value);
        setIsConfirmDisabled(inputValue < 500 || inputValue > 500000 || inputValue > data.amount);
        if (!isNaN(inputValue)) {
            setAmount(inputValue);
        }
    };

    const onSubmit = async () => {
        if (user) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                await freelanceTransfer(amount, headers).subscribe((res: any) => {
                    Swal.fire({
                        icon: "success",
                        title: "ถอนเงินสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            setOpenReviewModal(false)
                            window.location.reload()
                        }
                    });
                }, error => {
                    if (error.response.status === 401) {
                        Swal.fire({
                            title: "ไม่มีสิทธ์เข้าถึงการดำเนินการนี้",
                            icon: "warning"
                        })
                    } else if (error.response.status == 400) {
                        Swal.fire({
                            title: "เกิดข้อผิดพลาด",
                            text: error.response.data.error,
                            icon: "warning"
                        })
                    } else {
                        Swal.fire({
                            title: "เกิดข้อผิดพลาด",
                            text: "โปรดลองใหม่อีกครั้ง",
                            icon: "error"
                        });
                    }
                });
            } catch (error) {
                console.error("Error withdraw:", error);
            }
        }
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
                        <p className="font-bold">เงินคงเหลือ {formattedPrice(data.amount)} บาท</p>
                        <p className="font-bold mt-2">จำนวนเงินที่ต้องการถอน</p>
                        <input type="number" min={500} max={500000} onBlur={handleBlur}></input>
                        {isConfirmDisabled && <p className="mt-2 mr-28 text-xs text-red-600">จำนวนเงินที่ต้องการถอนต้องอยู่ระหว่าง 500-500,000 บาท และไม่เกินยอดเงินที่มีอยู่</p>}
                        <p className="mt-2 mr-28 text-xs text-gray-500">*การโอนเงินจะมีค่าธรรมเนียมครั้งละ 30 บาท โดยจะโอนเงินไปยังบัญชีที่ระบุไว้ โดยมีการกำหนดขั้นต่ำในการโอนเงินอยู่ที่ 500-500,000 บาท</p>
                        <div className={style.buttonGroup}>
                            <button className={style.confirm} onClick={() => setOpenReviewModal(true)} disabled={isConfirmDisabled}>ยืนยัน</button>
                            <button className={style.cancel} onClick={() => setSlug('dashboard')}>ย้อนกลับ</button>
                        </div>
                    </div>
                </div>
                {openReviewModal && <FreelanceWithdrawReviewModal setOpenReviewModal={setOpenReviewModal} data={data} onSubmit={onSubmit} amount={amount} />}
            </div>
        </>
    );
};

export default FreelanceWithdraw;