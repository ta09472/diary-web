const config = {
  client_id:
    '237546441940-bpg8k8a5lmkuid5pv3vgcd5nutvp5obo.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:8787/login/google',
  // redirect_uri:
  //   'https://diary-server.ta09472.workers.dev/login/google',
  scope: 'email',
  response_type: 'code',
  state: 'RANDOM_STATE',
  prompt: 'login'
}

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code
&client_id=${encodeURIComponent(config.client_id)}
&redirect_uri=${encodeURIComponent(config.redirect_uri)}
&scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')}
&state=RANDOM_STATE`

export const googleConfig = {
  config,
  authUrl
}
