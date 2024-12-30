import {
  setCookie,
  deleteCookie,
  getCookie,
  OptionsType,
  CookieValueTypes
} from 'cookies-next'

export const ClientSetCookies = (
  name: string,
  value: string,
  options?: OptionsType
): void => {
  setCookie(name, value, options)
}

export const ClientGetCookies = (
  name: string
): CookieValueTypes | Promise<CookieValueTypes> => {
  return getCookie(name) || ''
}

export const ClientDestroyCookies = (name: string): void | Promise<void> => {
  return deleteCookie(name)
}
