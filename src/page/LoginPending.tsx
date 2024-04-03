import { Spin } from 'antd'
import { setLocalStorage } from '../util/localStorage'

export default function LoginPending() {
  // url에서 정보 빼오기

  const queryString = window.location.search

  const searchParams = new URLSearchParams(queryString)

  const paramsObject: { [key: string]: string } = {}
  searchParams.forEach((value, key) => {
    paramsObject[key] = value
  })

  // 로컬스토리지에 정보 저장하기
  setLocalStorage('user', paramsObject)

  window.location.href = '/diary'

  return <Spin />
}
