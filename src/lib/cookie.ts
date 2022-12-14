export const checkCookie = (
  key: string,
  value: string,
  cookieString: string = null,
) => {
  const browserCookie = typeof document !== 'undefined' && document.cookie
  const cookies = cookieString || browserCookie
  return new RegExp(`${key}=${value}(;|$)`).test(cookies)
}
