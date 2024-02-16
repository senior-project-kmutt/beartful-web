import style from "@/styles/user/detailsModal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'flowbite-react';
import { faStar, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FreelanceUsers } from "@/models/users";

interface Props {
    openReviewModal: () => void;
    data: FreelanceUsers
}
const DetailsModal = (props: Props) => {
    const { openReviewModal, data } = props
    const desc = `Lorem Ipsum is simply dummy text of the
    printing and typesetting industry. Lorem Ipsum
    has been the industry's standard dummy text
    ever since the 1500s, when an unknown printer
    took a galley of type and scrambled it to make
    a type specimen book.`
    const mapNameSkillLevel: any = {
        excellent: 'ดีมาก',
        good: 'ดี',
        medium: 'พอใช้'
    }

    const getDate = (dateTime?: Date) => {
        const months = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        if (dateTime) {
            const convertToDate = new Date(dateTime)
            const date = String(convertToDate.getDate()).padStart(2, '0');
            const monthIndex = convertToDate.getMonth();
            const year = String(convertToDate.getFullYear())
            return `${date} ${months[monthIndex]} ${year}`
        }
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon key={i} className='ml-1' icon={faStar} />
            );
        }
        return stars;
    };

    return (
        <Modal size={'4xl'} dismissible className={style.detailsModal} show={true} onClick={() => openReviewModal()}>
            {/* <Modal.Header className={style.header}>
                <p className="text-center">Freelance Infomation</p>
            </Modal.Header> */}
            <Modal.Body>
                <div className="flex">
                    <div className={style.left}>
                        <img src={data.profileImage} alt="" />
                        <p className='text-3xl font-bold mt-5'>{data.username}</p>
                        <p className='text-xl font-bold text-stone-500 py-2'>{data.firstname} {data.lastname}</p>
                        <div className={style.role}>
                            <FontAwesomeIcon className='mr-1' icon={faUserCheck} size='sm' />
                            verified {data.role}
                        </div>
                        <div className={style.info}>
                            <table>
                                <tr>
                                    <td>เป็นสมาชิกเมื่อ</td>
                                    <td className='text-right'>{getDate(data.createdAt)}</td>
                                </tr>
                                <tr>
                                    <td>ขายงานแล้ว</td>
                                    <td className='text-right'>0 ครั้ง</td>
                                </tr>
                                <tr>
                                    <td>อัตราการทำงานสำเร็จ</td>
                                    <td className='text-right'>0 %</td>
                                </tr>
                                <tr>
                                    <td>คะแนนรีวิว</td>
                                    <td className={`${style.star} text-right`}>{renderStars()}</td>
                                </tr>
                            </table>
                        </div>
                        <div className={style.desc}>
                            {desc}
                        </div>
                        <div className={style.education}>
                            <p className="font-bold">ประวัติการศึกษา</p>
                            {data.education.map((item) => {
                                return (
                                    <>
                                        <div className="mb-2">
                                            <p className={style.institution}>{item.institution}</p>
                                            <p className={style.major}>{item.major}</p>
                                            {/* <p className={style.degree}>{item.degree}</p> */}
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.experience}>
                            <p className="font-bold mb-2">ประสบการณ์การทำงาน</p>
                            {data.experience?.map(item => {
                                return (
                                    <>
                                        <div className={style.item}>
                                            {item.isCurrentJob && (
                                                <p className={style.currentJob}>ที่ทำงานปัจจุบัน</p>
                                            )}
                                            <table>
                                                <tr>
                                                    <td style={{ width: '25%' }}>ชื่อบริษัท</td>
                                                    <td style={{ width: '75%', wordBreak: 'break-word' }} className='text-right'>{item.companyName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '25%' }}>ตำแหน่ง</td>
                                                    <td style={{ width: '75%', wordBreak: 'break-word' }} className='text-right'>{item.position}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%' }}>เริ่มทำงานเมื่อ</td>
                                                    <td style={{ width: '70%', wordBreak: 'break-word' }} className='text-right'>{item.monthStartJob} {item.yearStartJob}</td>
                                                </tr>
                                                {!item.isCurrentJob && (
                                                    <tr>
                                                        <td style={{ width: '30%' }}>สิ้นสุดเมื่อ</td>
                                                        <td style={{ width: '70%', wordBreak: 'break-word' }} className='text-right'>{item.monthEndJob} {item.yearEndJob}</td>
                                                    </tr>
                                                )}
                                            </table>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={style.skill}>
                            <p className="font-bold mb-1">ทักษะความสามารถ</p>
                            {data.skill?.map((item) => {
                                return (
                                    <>
                                        <div className="flex mb-1">
                                            <div className={style.title}>ทักษะ {item.title}</div>
                                            <div className={style.level}>
                                                <p>{mapNameSkillLevel[item.level]}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={style.skill}>
                            <p className="font-bold mb-1">ภาษา</p>
                            {data.language?.map((item) => {
                                return (
                                    <>
                                        <div className="flex mb-1">
                                            <div className={style.title}>ภาษา {item.title}</div>
                                            <div className={style.level}>
                                                <p>{mapNameSkillLevel[item.level]}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={style.award}>
                            <p className="font-bold">ใบอนุญาต / รางวัล</p>
                            {data.award?.map((item) => {
                                return (
                                    <>
                                        <div className="mb-2">
                                            <p className={style.title}>{item.title}</p>
                                            <p className={style.desc}>{item.description}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer className="grid justify-items-end">
                <div className={style.button_box}>
                    <button className={style.cancelButton} onClick={() => openReviewModal()}>
                        ยกเลิก
                    </button>
                    <button className={style.confirmButton} onClick={() => onSubmit}>ยืนยัน</button>
                </div>
            </Modal.Footer> */}
        </Modal>
    )
};

export default DetailsModal;