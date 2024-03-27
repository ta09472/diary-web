import { Input, Modal, message } from 'antd'
import audio from '../resources/sounds/WrtingPencil.mp3'
import { useRef, useState } from 'react'
import fadeAudioOut from '../util/fadeoutAudio'
import { EditOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import instance from '../lib/axios'
import { getLocalStorage } from '../util/localStorage'

import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

interface Props {
  textareaRef: React.RefObject<HTMLTextAreaElement>
  weather: string
  date: string
}

export default function TextInput({
  textareaRef,
  weather,
  date
}: Props): React.ReactElement {
  const user = getLocalStorage('user')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [timeoutId, setTimeoutId] = useState<
    string | number | null | NodeJS.Timeout
  >(null)
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] =
    message.useMessage()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (input: string) =>
      await instance.post('/chatgpt', {
        message: input,
        name: user?.name,
        email: user?.email,
        weather,
        date
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === 'Escape') {
      textareaRef.current!.blur()
      confirm()
    }
    // 오디오를 재생합니다.
    if (audioRef.current) {
      audioRef.current.play()
    }

    // 이전 타이머를 취소합니다.
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (e.key === ('Backspace' || 'Enter')) {
      if (audioRef.current) {
        fadeAudioOut(audioRef.current) // 여기서 audioRef.current를 파라미터로 전달합니다.
      }
    }

    const newTimeoutId = setTimeout(() => {
      // 오디오를 일시정지하기 전에 추가적인 딜레이를 설정합니다.
      setTimeout(() => {
        if (audioRef.current) {
          fadeAudioOut(audioRef.current) // 여기서 audioRef.current를 파라미터로 전달합니다.
        }
      }, 0) // 300밀리초 후에 오디오를 일시정지합니다.
    }, 500) // 500밀리초 동안 입력이 없으면 오디오 일시정지 타이머를 시작합니다.

    setTimeoutId(newTimeoutId)
  }

  return (
    <>
      <TextArea
        autoSize
        className="p-2 text-3xl text-gray-700 font-[HakgyoansimKkokkomaR]"
        // className="p-2 text-3xl text-gray-700"
        variant="borderless"
        placeholder={`${user?.name ?? ''}야! 오늘 너의 하루는 어땠니?`}
        onKeyDown={(e) => handleKeyDown(e)}
        ref={textareaRef}
        onInput={(e) => setInput(e.currentTarget.value)}
        value={input}
      />
      <audio ref={audioRef} src={audio} />
      {contextHolder}
      {messageContextHolder}
    </>
  )
}
