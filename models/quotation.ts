export interface Quotation {
    _id: string
    quotationNumber: string;
    customerId: string;
    freelanceId: string;
    customerName: string;
    freelanceName: string;
    name: string;
    benefits: string;
    numberOfEdit: number;
    startDate: Date;
    endDate: Date;
    day: number;
    quatity: number;
    amount: number;
    note: string;
    confirmQuotation: string
}

export interface CreateQuotation {
    _id: string
    quotationNumber: string;
    customerUsername: string;
    freelanceId: string;
    customerName: string;
    freelanceName: string;
    name: string;
    benefits: string;
    numberOfEdit: number;
    startDate: Date;
    endDate: Date;
    day: number;
    quatity: number;
    amount: number;
    note: string;
    confirmQuotation: string
}