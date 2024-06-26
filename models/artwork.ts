import { IUser } from "@/pages/chat"

export interface Artwork {
    _id: string
    freelanceId: string
    images: Array<string>
    name: string
    description: string
    price: string
    type: string
    categoryId: string[]
    likeCount: number
    createdAt: Date
    updatedAt: Date
    freelance?: IUser
}