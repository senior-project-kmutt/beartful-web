export const formattedPrice = (price: number) => {
    const parts = price.toFixed(2).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedIntegerPart}.${decimalPart}`;
}

export const formatDateTime = (dateString: Date) => {
    const thaiWeekdays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const date = new Date(dateString);

    // Extract date components
    const thaiWeekday = thaiWeekdays[date.getDay()];
    const day = date.getDate();
    const thaiMonth = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${thaiWeekday}, ${day} ${thaiMonth} พ.ศ. ${year}, ${hour}:${minute}`;
};

export const formatBirthDate = (dateString: Date) => {
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const date = new Date(dateString);

    const day = date.getDate();
    const thaiMonth = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${thaiMonth} พ.ศ. ${year}`;
};

export const formatDateDetailUser = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const thaiMonth = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${thaiMonth}/${year} ${hour}:${minute}`;
};

export const formatOnlyDate = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${date}/${month}/${year}`;
}

export function calculatePercentage(fullScore: number, receivedScore: number): number {
    // ตรวจสอบว่าคะแนนเต็มต้องมากกว่า 0 และคะแนนที่ได้รับต้องไม่น้อยกว่า 0
    if (fullScore <= 0 || receivedScore < 0) {
        throw new Error('Invalid input. Full score must be greater than 0 and received score must be non-negative.');
    }

    // คำนวณเปอร์เซ็นต์โดยหารคะแนนที่ได้รับด้วยคะแนนเต็มแล้วคูณด้วย 100
    const percentage: number = (receivedScore / fullScore) * 100;

    return percentage;
}

export function numberToThaiWords(num: number): string {
    const THAI_DIGITS = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
    const THAI_UNITS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

    // เตรียมตัวเลขเป็นอาร์เรย์ของหลัก
    const digits = num.toString().split('').map(Number);

    // คำนวณจำนวนหลักของตัวเลข
    const numDigits = digits.length;

    // เช็คว่าตัวเลขเป็นศูนย์หรือไม่
    if (num === 0) {
        return THAI_DIGITS[0];
    }

    let thaiWords = '';

    // วนลูปเพื่อเปลี่ยนตัวเลขเป็นคำศัพท์
    for (let i = 0; i < numDigits; i++) {
        const digit = digits[i];
        const unit = THAI_UNITS[numDigits - i - 1];

        if (digit !== 0) {
            if (digit === 1 && i === numDigits - 1 && num >= 10) {
                thaiWords += 'เอ็ด';
            } else if (digit === 2 && unit === 'สิบ') {
                thaiWords += 'ยี่';
            } else if (digit === 2 && i === numDigits - 2 && num >= 20) {
                thaiWords += 'ยี่';
            } else {
                thaiWords += THAI_DIGITS[digit];
            }

            thaiWords += unit;
        }
    }

    return thaiWords;
}