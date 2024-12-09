/* eslint-disable @typescript-eslint/no-explicit-any */
const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export default useDebounce
