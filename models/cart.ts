export interface Cart {
    email: string;
    name: string;
    items: Array<string>;
    amount:number;
    totalQty: number;
}