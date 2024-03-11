export const formattedPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatDateTime = (dateString: Date) => {
    const thaiWeekdays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    // Parse the date string into a JavaScript Date object
    const date = new Date(dateString);

    // Extract date components
    const thaiWeekday = thaiWeekdays[date.getDay()];
    const day = date.getDate();
    const thaiMonth = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist calendar year
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    // Construct formatted date string
    return `${thaiWeekday}, ${day} ${thaiMonth} พ.ศ. ${year}, ${hour}:${minute}`;
};
