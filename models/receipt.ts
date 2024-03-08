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
    description: string;
    benefits: string;
    startDate: Date | string;
    endDate: Date | string;
    day: number;
    quatity: number;
    numberOfEdit: number;
    amount: number;
    confirmReceipt: string
    note: string;
}