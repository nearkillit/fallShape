export interface Shape {
    id: number
    userId?: number
    user_id: number
    createdAt: string
    updatedAt: string
}

export interface ShapeTable {
    user_id: number
    id: number
}