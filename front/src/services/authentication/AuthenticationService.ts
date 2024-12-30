import { AuthenticationPayload, AuthResponse } from '@/models'
import globalProperties from '@/resources/GlobalProperties'
import { ClientGetCookies, ClientSetCookies } from '@/utils/CookiesUtils'
import { BaseResponseHandler, Fetch } from '@/utils/FetchUtils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ServiceActions } from '../types'
import { AxiosResponse } from 'axios'

export const refreshAuthentication = async () => {
  const response = await Fetch.post(process.env.refreshToken_endpoint!, {
    token: ClientGetCookies(globalProperties.REFRESH_TOKEN)
  })
  console.log(response)
  return response
}

export const useAuthentication = (baseResponse: BaseResponseHandler) => {
  return useMutation({
    mutationKey: [ServiceActions.LOGIN.SIGN_IN],
    mutationFn: async (payload: AuthenticationPayload) => {
      const { email, password } = payload
      return await Fetch.post(process.env.login_endpoint!, {
        email,
        password
      })
    },
    onSuccess: (response: AxiosResponse<AuthResponse>) => {
      console.log(response.data)
      ClientSetCookies(
        globalProperties.ACCESS_TOKEN,
        response.data.access_token
      )
      ClientSetCookies(
        globalProperties.REFRESH_TOKEN,
        response.data.refresh_token
      )
      baseResponse.onResolved(response)
    },
    onError: baseResponse.onReject
  })
}
