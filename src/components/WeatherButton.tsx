import { ReactElement, useRef } from 'react'
import Circle from './Circle'
import audio from '../resources/sounds/Check_Pencil.mp3'

interface Props {
  weather: string | null
  label: ReactElement
  isSelected: boolean
  currentWeather: string | null
  handleClick?: (value: string, isSelected: boolean) => void
}

export default function WeatherButton({
  weather,
  label,
  isSelected,
  currentWeather,
  handleClick
}: Props): React.ReactElement {
  // 오디오 요소에 대한 ref를 생성합니다.
  const audioRef = useRef<HTMLAudioElement>(null)

  // 버튼 클릭 이벤트 핸들러
  const playAudio = (): void => {
    audioRef.current!.play()
  }

  const style = `relative z-50 ${handleClick ? 'cursor-pointer' : 'cursor-default'}`

  return (
    <div
      className={style}
      onClick={(e) => {
        if (!handleClick) return
        handleClick(
          e.currentTarget.dataset.value!,
          isSelected
        )
        playAudio()
      }}
      data-value={weather}
      key={weather}
    >
      <audio ref={audioRef} src={audio} />
      {label}
      {currentWeather === weather ? (
        <Circle isAnimating={isSelected} />
      ) : null}
    </div>
  )
}
