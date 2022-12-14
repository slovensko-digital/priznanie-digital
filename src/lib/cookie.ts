export const checkCookie = (key, value, cookieString) => {
  const browserCookie = typeof document !== 'undefined' && document.cookie
  const cookies = cookieString || browserCookie
  return new RegExp(`${key}=${value}(;|$)`).test(cookies)
}
