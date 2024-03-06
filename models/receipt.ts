export interface Receipt {
    _id: string
    receiptNumber: string;
    customerId: string;
    freelanceId: string;
    customerName: string;
    customerAddress: string;
    freelanceName: string;
    freelanceAddress: string;
    workName: string;
    benefits: string;
    startDate: Date;
    endDate: Date;
    day: number;
    quatity: number;
    numberOfEdit: number;
    amount: number;
    confirmReceipt: string
    note: string;
}