
import { Modal } from 'flowbite-react';
import { BarLoader } from "react-spinners";

const LoadingModal = () => {
    return (
        <Modal size={'lg'} dismissible show={true}>
            <Modal.Body>
                <div className='flex flex-col justify-center items-center py-12'>
                    <BarLoader color="#E16428" width={340} height={9} speedMultiplier={0.8} className="mt-4"></BarLoader>
                    <p style={{color: '#B45020'}} className="mt-6">กำลังบันทึกข้อมูล</p>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default LoadingModal;