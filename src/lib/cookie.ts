export const checkCookie = (key, value) => {
  return (
    typeof document !== 'undefined' &&
    new RegExp(`${key}=${value}(;|$)`).test(document.cookie)
  )
}
