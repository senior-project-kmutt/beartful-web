export enum OrderStatusCustomerEnum {
    all = 'ทั้งหมด',
    purchase = 'ที่ต้องชำระ',
    pending = 'ที่ต้องได้รับ',
    delivered = 'ที่ต้องได้รับ',
    success = 'สำเร็จแล้ว',
    cancelled = 'ยกเลิกและขอคืนเงิน'
}

export enum OrderStatusFreelanceEnum {
    all = 'ทั้งหมด',
    purchase = 'รอการชำระ',
    pending = 'กำลังดำเนินงาน',
    delivered = 'กำลังดำเนินงาน',
    success = 'สำเร็จแล้ว',
    cancelled = 'ยกเลิกและขอคืนเงิน'
}

export enum OrderStatus {
    hired = 'hired',
    readyMade = 'readyMade',
}