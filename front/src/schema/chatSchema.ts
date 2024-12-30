import { z } from "zod"

export const chatRoomSchema = z.object({
    id: z.number(),
    ord: z.number(),
    title: z.string(),
    creator: z.string(),
    participant: z.number(),
    label: z.string(),
    status: z.string()
})

export type ChatRoom = z.infer<typeof chatRoomSchema>

export const createRoomSchema = z.object({
    title: z.string(),
    label: z.string(),
})

export type CreateRoomSchema = z.infer<typeof createRoomSchema>