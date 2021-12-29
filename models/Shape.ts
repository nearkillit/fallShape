export interface Shape {
  id: number
  userId?: number
  user_id: number
  user_name: string
  createdAt: string
  updatedAt: string
}

export interface ShapeTable {
  user_id: number
  id: number
}
