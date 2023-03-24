export async function handleErrors<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const result = await promise
    return [result,null]
  } catch (error: any) {
    return [null, error]
  }
}
