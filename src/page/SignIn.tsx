import { Button, Divider, Input, notification } from 'antd'
import google from '../resources/icons/google.svg'
// import instagram from '../resources/icons/Instagram.svg'
import kakao from '../resources/icons/kakao.svg'
import naver from '../resources/icons/naver.svg'

import school from '../resources/images/school.svg'
import dinosaur from '../resources/images/dinosaur.svg'
import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'

import { googleConfig } from '../hooks/sigininWithOauthGoogle'
import { useNavigate } from 'react-router-dom'

export default function SignIn(): React.ReactElement {
  const [api, contextHolder] =
    notification.useNotification()

  const openNotificationWithIcon = (): void => {
    api.error({
      message: '로그인에 실패하였습니다.',
      description: '잠시 후에 다시 시도해 주세요.'
    })
  }
  const navigate = useNavigate()

  return (
    <div className="w-full h-[100vh] lg:w-[34rem] p-12 flex flex-col justify-center items-center place-self-center">
      {contextHolder}
      <div className="flex flex-col gap-4 w-full">
        <div className=" text-[4rem] lg:text-3xl font-sans text-black font-semibold">
          반가워요!
          <br />
          <div className="text-[2.4rem] lg:text-2xl">
            오늘의 일기를 쓸 준비가 되었나요?
          </div>
        </div>

        <Input
          variant="filled"
          className="h-[6rem] text-[2.2rem] lg:h-[2rem] lg:text-[1rem]"
          prefix={<UserOutlined className="lg:p-0 p-1" />}
          placeholder="이메일"
        />
        <Input
          variant="filled"
          className="h-[6rem] text-[2.2rem] lg:h-[2rem] lg:text-[1rem]"
          placeholder="비밀번호"
          prefix={<LockOutlined className="lg:p-0 p-1" />}
        />
        <Button className="text-[2.4rem] h-[6rem] lg:h-[2rem] lg:text-[0.8rem] bg-black ">
          <div className=" text-gray-100 font-semibold ">
            로그인
          </div>
        </Button>

        <Button
          type="link"
          className=" place-self-end p-0 text-[1.8rem] lg:text-[1rem]"
        >
          아직 계정이 없으신가요?
        </Button>
      </div>

      <Divider>
        <div className=" text-gray-500 text-[1.8rem] lg:text-[0.75rem]">
          간편 로그인
        </div>
      </Divider>
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="text"
          block
          icon={
            <img
              src={kakao}
              className="w-[2rem] lg:h-[1rem] lg:w-[1rem]"
            />
          }
          className="flex justify-center items-center bg-[#fee500] p-4 text-[#181600] text-[2.2rem] h-[6rem] lg:h-[1rem] lg:text-[1rem]"
        >
          카카오 로그인
        </Button>
        <Button
          type="text"
          block
          icon={
            <img
              src={naver}
              className="w-[2rem] lg:h-[1rem] lg:w-[1rem]"
            />
          }
          className="flex justify-center items-center bg-[#01c75b] p-4 text-white text-[2.2rem] h-[6rem] lg:h-[1rem] lg:text-[1rem]"
        >
          네이버 로그인
        </Button>
        <Button
          block
          icon={
            <img
              src={google}
              className="w-[2.4rem] lg:h-[1rem] lg:w-[1rem]"
            />
          }
          className="flex justify-center items-center p-4 text-black text-[2.2rem] h-[6rem] lg:h-[1rem] lg:text-[1rem]"
          onClick={() => {
            navigate('/')
            // window.location.href = googleConfig.authUrl
          }}
        >
          &nbsp; 구글 로그인
        </Button>
      </div>
      <div className="flex justify-between gap-10 mt-8">
        <img
          src={dinosaur}
          className="w-[20rem] lg:w-[12rem]"
        />
        <img
          src={school}
          className="w-[20rem] lg:w-[12rem]"
        />
      </div>
    </div>
  )
}
