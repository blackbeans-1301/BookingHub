export function getLSItem(key) {
  return window.localStorage.getItem(key)
}
export function setLSItem(key, value) {
  window.localStorage.setItem(key, value)
}