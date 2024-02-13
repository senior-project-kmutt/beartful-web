export interface Quotation {
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
    confirmQuotation?: string
}