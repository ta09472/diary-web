import dayjs from 'dayjs'
import 'dayjs/locale/ko' // 한국어 로케일

import Weather, {
  weatherOptions
} from '../components/Weather'

import { useRef, useState } from 'react'
import TextInput from '../components/TextInput'
import { Button, Drawer, Space, message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import instance from '../lib/axios'
import { getLocalStorage } from '../util/localStorage'
import { User } from '../schema/User'
import { useNavigate } from 'react-router-dom'

const today = dayjs()
  .locale('ko')
  .format('YYYY년 MM월 DD일 dddd')

export default function Diary(): React.ReactElement {
  const textareaRef = useRef<any>(null)
  const [messageApi, messageContextHolder] =
    message.useMessage()
  const navigate = useNavigate()
  const user = getLocalStorage('user') as User

  const [weather, setWeather] = useState(
    weatherOptions[0].value
  )
  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      await instance.post('/chatgpt', {
        message:
          textareaRef?.current?.resizableTextArea?.textArea
            .value,
        name: user?.givenName,
        email: user?.email,
        weather,
        date: today
      }),
    onSuccess: () => {
      messageApi.success(
        <div className="text-3xl">
          일기가 성공적으로 제출되었어요!
        </div>
      )
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  })

  return (
    <div
      className="m-10 flex flex-col  gap-8"
      style={{ height: `calc(100vh - 30rem)` }}
    >
      {messageContextHolder}
      <div className="border-2 border-gray-500 w-full h-[60rem] ">
        <div className="grid grid-cols-2">
          <div className="border-r border-gray-500">
            <div className="p-2 min-h-24 flex justify-around text-gray-800  items-center text-[2.4rem]">
              <div>{today.slice(0, 5)}</div>
              <div>{today.slice(6, 9)}</div>
              <div>{today.slice(10, 13)}</div>
              <div>{today.slice(14)}</div>
            </div>
            <div className="border-t border-gray-500 min-h-16 text-3xl p-1">
              일어난 시간
            </div>
          </div>
          <div>
            <Weather
              textareaRef={textareaRef}
              weather={weather}
              setWeather={setWeather}
            />

            <div
              className="border-t border-gray-500 min-h-16 text-3xl p-1"
              // style={{ fontFamily: 'HakgyoansimEunhasuR' }}
            >
              잠든 시간
            </div>
          </div>
        </div>

        <div className="flex flex-col border-t border-gray-500 max-h-[50rem]">
          <TextInput
            textareaRef={textareaRef}
            weather={weather}
            date={today}
          />
        </div>
      </div>
      <Button
        className="text-[2.4rem] h-[7rem] lg:text-[1.8rem] lg:h-[4rem] bg-black text-gray-100 font-semibold"
        block
        onClick={() => setOpen(true)}
      >
        일기 제출
      </Button>
      <Drawer
        className=" rounded-t-xl"
        title={
          <div className="text-4xl font-semibold">
            일기를 제출할까요?
          </div>
        }
        placement="bottom"
        closeIcon={null}
        // size="large"
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button
              onClick={() => {
                setOpen(false)
                textareaRef.current?.focus()
              }}
              className="text-3xl flex justify-center items-center px-[2.8rem] py-[2.2rem]"
            >
              아니요
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              onClick={async () => await mutateAsync()}
              className="bg-black text-gray-100 text-3xl font-semibold flex justify-center items-center  px-[4rem] py-[2.2rem]"
            >
              네
            </Button>
          </Space>
        }
      >
        <div className="text-3xl lg:text-lg m-5 bg-slate-100 rounded-xl flex flex-col justify-center items-center p-4">
          일기를 제출 한 이후에는 수정이 불가능해요.
        </div>
      </Drawer>
    </div>
  )
}
