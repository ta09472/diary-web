import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Result
      icon={<div>페이지를 찾을 수 없습니다.</div>}
      title={<div className="text-5xl">404</div>}
      className=" w-full text-5xl mt-72"
      subTitle={
        <div className="text-2xl">
          죄송합니다. 요청하신 페이지가 만료되었거나
          존재하지 않습니다.
        </div>
      }
      extra={
        <Button
          className="text-[2.4rem] h-[6rem] px-20 lg:h-[2rem] lg:text-[0.8rem] bg-[#84a68a] rounded-2xl lg:rounded-md "
          onClick={() => navigate('/')}
        >
          <div className=" text-gray-100 font-semibold rounded-2xl ">
            홈으로 돌아가기
          </div>
        </Button>
      }
    />
  )
}
