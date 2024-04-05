import { Navigate, useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../util/localStorage'
import { useEffect } from 'react'
import { User } from '../schema/User'
import { message } from 'antd'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({
  children
}: Props) {
  const user = getLocalStorage('user') as User | null
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user) {
  //     message.info('로그인 후 이용이 가능합니다.')
  //     navigate('/login')
  //   }
  // }, [user])

  // // 유저 정보가 없으면 로딩 상태나 빈 컴포넌트를 반환할 수 있습니다.
  // if (!user) {
  //   return null
  // }

  return children // 유저 정보가 있다면 요청된 경로의 컴포넌트를 렌더링
}
