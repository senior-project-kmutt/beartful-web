import { Quotation } from "./quotation"

export interface IPurchaseOrder {
    _id?: string
    freelanceId?: string
    customerId: string
    quotationId?: string
    status: string
    amount: number
    vat?: number
    fee?: number
    netAmount?: number
    confirmedDate?: Date
    paymentMethod: string
    estimateTimeFinished?: Date
    note: string
    type: string
    chargeId?: string
    isReview: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface IPurchaseOrderItem {
    _id?: string
    purchaseOrderId: string
    artworkId: string
    name: string
    description: string
    price: number
    quantity: number
    createdAt?: Date
    updatedAt?: Date
}

export interface ICreatePurchaseOrder {
    purchaseOrder: IPurchaseOrder
    artworkItem?: string
}
export interface ICustomerPurchaseOrder {
    freelanceId: string
    freelanceUsername: string
    order: IGetOrder[]
}

export interface IGetOrder {
    purchaseOrder: IPurchaseOrder
    quotation?: Quotation
    purchaseOrderItem?: IPurchaseOrderItem
}

export interface IFreelancePurchaseOrder {
    customerId: string
    customerUsername: string
    order: IGetOrder[]
}

export interface IPurchaseOrderDetail {
    freelance: IFreelance
    customer: ICustomer
    order: IGetOrder
}

export interface IFreelance {
    firstname: string
    lastname: string
    address: string
}

export interface ICustomer {
    firstname: string
    lastname: string
}

export interface PayAmount {
    net: number,
    fee: number,
    vat: number
}

export const CustomerStatus = () => {}