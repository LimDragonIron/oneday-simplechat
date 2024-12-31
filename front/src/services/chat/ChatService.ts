import { useQuery } from "@tanstack/react-query"
import { ServiceActions } from "../types"
import { Fetch } from "@/utils/FetchUtils"

export const useGetChatRooms = () => {
    return useQuery({
        queryKey: [ServiceActions.CHAT.GET_CHAT_ROOMS],
        queryFn: async () => {
            const response = await Fetch.get(process.env.chatlist_endpoint!)
            return response
        },
        enabled: true,
    })
}