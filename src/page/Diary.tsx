import dayjs from 'dayjs'
import 'dayjs/locale/ko' // 한국어 로케일

import Weather, {
  weatherOptions
} from '../components/Weather'

import { useRef, useState } from 'react'

import TextInput from '../components/TextInput'
import { Button, Modal, message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import instance from '../lib/axios'
import { getLocalStorage } from '../util/localStorage'
import { User } from '../schema/User'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

const today = dayjs()
  .locale('ko')
  .format('YYYY년 MM월 DD일 dddd')

export default function Diary(): React.ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const user = getLocalStorage('user') as User
  const [weather, setWeather] = useState(
    weatherOptions[0].value
  )
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] =
    message.useMessage()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (input: string) =>
      await instance.post('/chatgpt', {
        message: input,
        name: user?.givenName,
        email: user?.email,
        weather,
        today
      }),
    onSuccess: () => {
      messageApi.success('일기가 성공적으로 제출되었어요!')
      setTimeout(() => {
        navigate('/history')
      }, 1000)
    }
  })

  const confirm = (): void => {
    modal.confirm({
      width: 'full',

      content: (
        <div className="flex flex-col">
          <div className="text-lg font-400 text-gray-800">
            오늘의 일기를 제출 할까요?
          </div>
          <div className="font-600 text-sm font-semibold">
            제출 후에는 일기를 수정할 수 없어요.
          </div>
        </div>
      ),
      icon: <EditOutlined />,
      okText: (
        <>
          {isPending ? null : (
            <div className=" text-xs gap-1 flex justify-evenly items-center">
              <div className="text-sm">네!</div>
              <div className="text-[0.6rem] px-[0.2rem] py-[0.1rem] border rounded-md shadow-md  border-b-4 border-gray-700">
                Enter
              </div>
            </div>
          )}
        </>
      ),
      cancelText: (
        <>
          {isPending ? null : (
            <div className=" text-xs gap-1 flex justify-evenly items-center">
              <div className="text-sm">아직이요!</div>
              <div className="text-[0.6rem] px-[0.2rem] py-[0.1rem] border rounded-md shadow-md  border-b-4 border-gray-700">
                Esc
              </div>
            </div>
          )}
        </>
      ),
      okType: 'default',
      onCancel: () => textareaRef.current?.focus(),
      onOk: async () => {
        await mutateAsync(input)
      }
    })
  }

  const handleInput = (value: string): void => {
    setInput(value)
  }
  return (
    <div
      className="m-10 mt-16 flex flex-col justify-around"
      style={{ height: `calc(100vh - 8rem)` }}
    >
      {messageContextHolder}
      {contextHolder}
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
            handleInput={handleInput}
            input={input}
          />
        </div>
      </div>
      <Button
        className="text-[2.4rem] h-[6rem] lg:h-[2rem] lg:text-[0.8rem] bg-black text-gray-100 font-semibold"
        block
        onClick={confirm}
      >
        일기 제출
      </Button>
    </div>
  )
}
