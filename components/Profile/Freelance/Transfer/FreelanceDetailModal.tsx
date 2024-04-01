import { Modal } from 'flowbite-react';
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { ITransaction, UserDashboard } from '@/models/users';
import { Dispatch, SetStateAction } from 'react';
import { bankOption } from '@/components/Authentication/FormRegister/option';
import { formatDateTime, formattedPrice } from '@/core/tranform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';

interface Props {
    setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
    data: ITransaction
    dashboard: UserDashboard
}
const FreelanceDetailModal = (props: Props) => {
    const { setOpenDetailModal, data, dashboard } = props;

    const findBankTitle = (value: string) => {
        const bank = bankOption.find(option => option.value === value);
        return bank ? bank.title : '';
    };

    return (
        <Modal size={'md'} show={true} className={style.detailTransactionModal} onClose={() => setOpenDetailModal(false)}>
            <Modal.Header className={style.header}><p>รายละเอียดการบันทึก</p></Modal.Header>
            <Modal.Body>
                {data.type === 'transfer' && <>
                    <div className={style.group1}>
                        <div className={style.rectangle}>
                            <FontAwesomeIcon icon={faCircleDollarToSlot} size="2xl" style={{ color: '#E16428' }} />
                        </div>
                        <div className={style.title}>รายการถอนเงิน</div>
                    </div>

                    <div className="grid grid-cols-10 gap-2 ml-12 mr-12 mt-7 mb-5">
                        <div className="col-span-4 font-bold">เข้าบัญชี</div>
                        <div className="col-span-6 text-right">{dashboard.bankAccount.bankAccountNumber}</div>
                        <div className="col-span-4 font-bold">ธนาคาร</div>
                        <div className="col-span-6 text-right">{findBankTitle(dashboard.bankAccount.bankName)}</div>
                        <div className="col-span-4 font-bold">วันที่-เวลา</div>
                        <div className="col-span-6 text-right">{formatDateTime(data.createdAt)}</div>
                        <div className="col-span-4 font-bold">จำนวนเงิน</div>
                        <div className="col-span-6 text-right">{formattedPrice(data.amount)} บาท</div>
                    </div>
                </>}

                {data.type === 'paid' && <>
                    <div className={style.group1}>
                        <div className={style.rectangle}>
                            <FontAwesomeIcon icon={faCircleArrowDown} size="2xl" style={{ color: '#E16428' }} />
                        </div>
                        <div className={style.title}>รายการเงินเข้า</div>
                    </div>
                    <div className="grid grid-cols-10 gap-2 ml-12 mr-12 mt-7 mb-5">
                        <div className="col-span-4 font-bold">จาก</div>
                        <div className="col-span-6 text-right">{data.from}</div>
                        <div className="col-span-4 font-bold">วันที่-เวลา</div>
                        <div className="col-span-6 text-right">{formatDateTime(data.createdAt)}</div>
                        <div className="col-span-4 font-bold">จำนวนเงิน</div>
                        <div className="col-span-6 text-right">{formattedPrice(data.amount)} บาท</div>
                    </div>
                </>}
            </Modal.Body>
        </Modal>
    );
};

export default FreelanceDetailModal;