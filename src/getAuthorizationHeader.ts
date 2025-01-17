import { AccessToken, ClientKey } from './common/types'
import { isClientKey, isAccessToken } from './common/methods'
import { BikeTagClient } from './client'
import { BIKETAG_API_PREFIX, AUTHORIZE_ENDPOINT } from './common/endpoints'

export async function getAuthorizationHeader(
  client: BikeTagClient
): Promise<string> {
  if (isAccessToken(client.config)) {
    return `Bearer ${client.config.accessToken}`
  }

  if (isClientKey(client.config) && !isAccessToken(client.config)) {
    return `Client-ID ${(client.config as ClientKey).clientKey}`
  }

  const { clientId, username, password } = client.config.biketag

  const options: Record<string, unknown> = {
    url: AUTHORIZE_ENDPOINT,
    baseURL: BIKETAG_API_PREFIX,
    params: {
      client_id: clientId,
      response_type: 'token',
    },
  }

  let response = await client.plainRequest(options)

  const cookies = Array.isArray(response.headers['set-cookie'])
    ? response.headers['set-cookie'][0]
    : response.headers['set-cookie']

  if (!cookies) {
    throw new Error('No cookies were set during authorization')
  }

  const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)')

  if (!matches || matches.length < 3) {
    throw new Error('Unable to find authorize_token cookie')
  }

  const authorizeToken = matches[2]

  options.method = 'POST'
  options.data = {
    username,
    password,
    allow: authorizeToken,
  }

  options.followRedirect = false
  options.headers = {
    cookie: `authorize_token=${authorizeToken}`,
  }

  response = await client.plainRequest(options)
  const location = response.headers.location
  if (!location) {
    throw new Error('Unable to parse location')
  }

  const token = JSON.parse(
    '{"' +
      decodeURI(location.slice(location.indexOf('#') + 1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )

  const accessToken = token.access_token
  ;((client.config as unknown) as AccessToken).accessToken = accessToken

  return `Bearer ${accessToken}`
}
