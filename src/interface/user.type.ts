export interface UserType extends Document {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
