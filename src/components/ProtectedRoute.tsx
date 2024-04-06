import { useNavigate } from 'react-router-dom'
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

  useEffect(() => {
    if (!user) {
      message.info('로그인 후 이용이 가능합니다.')
      navigate('/login')
    }
  }, [user])

  if (!user) {
    return null
  }

  return children
}
