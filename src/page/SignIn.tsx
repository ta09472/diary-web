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

import { useNavigate } from 'react-router-dom'

import getGoogleProfile from '../util/getGoogleProfile'
import { setLocalStorage } from '../util/localStorage'
import instance from '../lib/axios'

export default function SignIn(): React.ReactElement {
  const navigate = useNavigate()
  const [api, contextHolder] =
    notification.useNotification()

  const openNotificationWithIcon = (): void => {
    api.error({
      message: '로그인에 실패하였습니다.',
      description: '잠시 후에 다시 시도해 주세요.'
    })
  }

  return (
    <div className="w-[22rem] h-[22rem] flex flex-col justify-center items-center place-self-center">
      {contextHolder}
      <div className="flex flex-col gap-4 w-full">
        <div className=" text-3xl font-sans text-black font-semibold">
          반가워요!
          <br />
          <div className="text-2xl">
            오늘의 일기를 쓸 준비가 되었나요?
          </div>
        </div>

        <Input
          variant="filled"
          prefix={<UserOutlined />}
          placeholder="이메일 주소를 입력해 주세요."
        />
        <Input
          variant="filled"
          placeholder="비밀번호를 입력해 주세요."
          prefix={<LockOutlined />}
        />
        <Button>
          <div className=" text-gray-600 text-[0.75rem]">
            로그인
          </div>
        </Button>

        <Button type="link" className=" place-self-end p-0">
          아직 계정이 없으신가요?
        </Button>
      </div>

      <Divider>
        <div className=" text-gray-500 text-[0.75rem]">
          간편 로그인
        </div>
      </Divider>
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="text"
          block
          icon={<img src={kakao} />}
          className="flex justify-center items-center bg-[#fee500] p-4 text-[#181600]"
        >
          카카오 로그인
        </Button>
        <Button
          type="text"
          block
          icon={<img src={naver} />}
          className="flex justify-center items-center bg-[#01c75b] p-4 text-white"
        >
          네이버 로그인
        </Button>
        <Button
          block
          icon={<img src={google} />}
          className="flex justify-center items-center"
          onClick={async () => {
            await window['google-OAuth2.0'].send(
              'google-OAuth2.0'
            )

            await window[
              'Oauth-response'
            ].onGoogleOAuthResponse(async (message) => {
              if (message.success) {
                const profile = await getGoogleProfile(
                  message.accessToken.data.access_token
                )

                setLocalStorage('user', profile)

                await instance.post('/register', {
                  email: profile.email
                })

                navigate('/diary')
              } else {
                openNotificationWithIcon()
              }
            })
          }}
        >
          구글 &nbsp; 로그인
        </Button>
        {/* <Button
          block
          icon={<img src={instagram} />}
          className="flex justify-center items-center"
        >
          인스타그램 로그인
        </Button> */}
      </div>
      <div className="flex justify-between gap-10 mt-8">
        <img src={dinosaur} width={120} height={120} />
        <img src={school} width={120} height={120} />
      </div>
    </div>
  )
}
