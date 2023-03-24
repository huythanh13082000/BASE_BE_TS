import mongoose from 'mongoose'
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || '')
    console.log('connect mongodb success!')
  } catch (error:any) {
    throw new Error(error)
  }
}
