import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_OAUTH2_CLIENT_ID, GOOGLE_OAUTH2_CLIENT_SECRET } from '../config'

export const googleAuthClient = new OAuth2Client({
  clientId: GOOGLE_OAUTH2_CLIENT_ID,
  clientSecret: GOOGLE_OAUTH2_CLIENT_SECRET
})
