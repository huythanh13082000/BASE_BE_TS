export const resJson = (status: number, data?: any, message?: string) => {
  return {
    status,
    data,
    message,
  }
}
