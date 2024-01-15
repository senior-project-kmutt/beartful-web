export interface Artwork {
    _id: string
    freelanceId: number
    images: Array<string>
    name: string
    description: string
    price: string
    type: string
    categoryId: string[]
    likeCount: number
    createdAt: Date
    updatedAt: Date
}