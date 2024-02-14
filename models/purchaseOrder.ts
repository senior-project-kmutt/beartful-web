export interface IPurchaseOrder {
    _id?: string
    freelanceId?: string
    customerId: string
    quotationId?: string
    status: string
    amount: number
    vat?: number
    netAmount?: number
    confirmedDate?: Date
    paymentMethod: string
    estimateTimeFinished?: Date
    note: string
    type: string
    createdAt?: Date
    updatedAt?: Date
}

export const CustomerStatus = () => {

}