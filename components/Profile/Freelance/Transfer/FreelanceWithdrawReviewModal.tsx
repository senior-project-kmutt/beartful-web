import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { UserDashboard } from '@/models/users';
import { Dispatch, SetStateAction } from 'react';
import { bankOption } from '@/components/Authentication/FormRegister/option';
import { formattedPrice } from '@/core/tranform';

interface Props {
    setOpenReviewModal: Dispatch<SetStateAction<boolean>>;
    data: UserDashboard
    onSubmit: () => void;
    amount: number
}
const FreelanceWithdrawReviewModal = (props: Props) => {
    const { setOpenReviewModal, data, onSubmit, amount } = props;

    const findBankTitle = (value: string) => {
        const bank = bankOption.find(option => option.value === value);
        return bank ? bank.title : '';
    };

    return (
        <Modal size={'xl'} show={true}>
            <Modal.Body>
                <div className='font-bold text-2xl mb-6 mt-2'>ยืนยันการถอนเงิน</div>
                <div className="grid grid-cols-10 gap-2 mt-4 ml-16 mr-16">
                    <div className="col-span-4 font-bold">เลขบัญชี</div>
                    <div className="col-span-6 text-right">{data.bankAccount.bankAccountNumber}</div>
                    <div className="col-span-4 font-bold">ธนาคาร</div>
                    <div className="col-span-6 text-right">{findBankTitle(data.bankAccount.bankName)}</div>
                    <div className="col-span-4 font-bold">ชื่อเจ้าของบัญชี</div>
                    <div className="col-span-6 text-right">{data.bankAccount.bankAccountName}</div>
                    <div className="col-span-4 font-bold">จำนวนเงิน</div>
                    <div className="col-span-6 text-right">{formattedPrice(amount)} บาท</div>
                    <div className="col-span-4 font-bold">ค่าธรรมเนียมการโอน</div>
                    <div className="col-span-6 text-right">30 บาท</div>
                    <div className="col-span-4 font-bold">จำนวนเงินที่จะได้รับ</div>
                    <div className="col-span-6 text-right font-bold text-orange-700">{formattedPrice(amount - 30)} บาท</div>
                </div>

                <div className={style.buttonConfirmGroup}>
                    <button className={style.confirm} onClick={() => onSubmit()}>ยืนยัน</button>
                    <button className={style.cancel} onClick={() => setOpenReviewModal(false)}>ย้อนกลับ</button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default FreelanceWithdrawReviewModal;