import { useLocation, useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../util/localStorage'
import { User } from '../schema/User'
import { Button } from 'antd'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = getLocalStorage('user') as User

  // if (!user) return <></>

  // if (pathname === '/login' || pathname === '/pending')
  //   return <></>
  return (
    <div className=" sticky top-0 inset-x-0 w-full h-[8rem] flex justify-between items-center bg-[#84a68a] rounded-b-2xl">
      <Button
        type="link"
        onClick={() => navigate('/')}
        className=" text-5xl p-9 font-extrabold text-gray-100 flex justify-center items-center"
      >
        DIARY
      </Button>
      {/* <Button type="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[3rem] h-[3rem] lg:w-[2rem] lg:h-[2rem] text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </Button> */}
    </div>
  )
}
