import { SetMetadata } from '@nestjs/common'
export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export function exclude<Account, Key extends keyof Account>(
  user: Account,
  keys: Key[]
): Omit<Account, Key> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.entries(user).filter(([key]) => !keys.includes(key))
  )
}
