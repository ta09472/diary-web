import axios from 'axios'

const BASE_URL = 'https://diary-server.ta09472.workers.dev'

// const BASE_URL = 'http://localhost:3000'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// axios.defaults.adapter = function () {
//   return require('axios/adapters/http') // always use Node.js adapter
// }
// axios.defaults.withCredentials = true // withCredentials 전역 설정

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000
})

export default instance
