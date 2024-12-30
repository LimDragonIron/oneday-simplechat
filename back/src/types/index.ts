import { account } from '@prisma/client'

export type AccountInfo = Omit<account, 'password'>
