import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function getGoogleProfile(
  accessToken: string
) {
  const url =
    'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses'
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const user = {
      name: response.data.names[0].givenName,
      email: response.data.emailAddresses[0].value
    }

    return user
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}
