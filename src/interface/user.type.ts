export interface UserType extends Document {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  account_type: 0 | 1 | 2
  phone: string
  refreshToken: string
}
