import { Quotation } from "./quotation";

export interface Cart {
    email: string;
    name: string;
    items: Array<string>;
    amount: number;
    totalQty: number;
}

export interface CartItem {
    _id: string;
    type: string
    description: string
    amount: number
    quantity: number
    netAmount: number
    freelanceId: string
    customerId: string
    artworkName: string
    artworkId: string
    checked: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface Carts {
    freelanceId: string
    freelanceUsername: string
    cartItem: CartItem[]
}

export interface HiringCarts {
    freelanceId: string
    freelanceUsername: string
    cartItem: Quotation[]
}

export interface ICartEdit {
    quantity: number
}

export interface ICartAdd {
    type: string
    description: string
    amount: number
    quantity: number
    freelanceId: string
    artworkId: string
    artworkName: string
}