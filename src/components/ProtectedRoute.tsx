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
      message.info({
        icon: (
          <div className="flex gap-2 p-2 items-center text-3xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[3rem] h-[3rem] lg:w-[2rem] lg:h-[2rem] text-[#4685e3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            로그인 후 이용 가능합니다.
          </div>
        ),
        content: ''
      })
      navigate('/login')
    }
  }, [user])

  if (!user) {
    return null
  }

  return children
}
