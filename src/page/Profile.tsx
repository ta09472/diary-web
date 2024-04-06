import { Button } from 'antd'
import { removeLocalStorage } from '../util/localStorage'
import { User } from '../schema/User'
import { getLocalStorage } from '../util/localStorage'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()

  const user = (getLocalStorage('user') ?? {
    familyName: '',
    givenName: '',
    email: ''
  }) as User
  return (
    <div className="w-full h-[100vh] lg:w-[34rem] p-12 flex flex-col justify-center items-center place-self-center">
      <p className="text-[2.4rem] lg:text-2xl">
        {user.givenName}
      </p>

      <Button
        danger
        block
        className="flex justify-center items-center p-4 text-black text-[2.8rem] border-2 lg:border-1 h-[6rem] lg:h-[1rem] lg:text-[1rem] "
        onClick={() => {
          removeLocalStorage('user')
          navigate('/login')
        }}
      >
        로그 아웃
      </Button>
    </div>
  )
}
