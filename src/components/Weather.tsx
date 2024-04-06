import { useState } from 'react'
import WeatherButton from './WeatherButton'
import ClearDay from '../resources/icons/Clear_day.svg'
import CloudyDay from '../resources/icons/Cloudy_day.svg'
import PartlyDay from '../resources/icons/Partly_day.svg'
import RainyDay from '../resources/icons/Rainy_day.svg'
import SnowyDay from '../resources/icons/Snowy_day.svg'

export const weatherOptions = [
  {
    label: (
      <img
        src={ClearDay}
        className="w-[6rem] h-[6rem] flex justify-center items-center align-middle"
      />
    ),
    value: 'clear',
    valueAsKorean: '맑음'
  },
  {
    label: (
      <img
        src={PartlyDay}
        className="w-[6rem] h-[6rem] flex justify-center items-center align-middle"
      />
    ),
    value: 'partly',
    valueAsKorean: '조금 흐림'
  },
  {
    label: (
      <img
        src={CloudyDay}
        className="w-[6rem] h-[6rem] flex justify-center items-center align-middle"
      />
    ),
    value: 'cloudy',
    valueAsKorean: '흐림'
  },
  {
    label: (
      <img
        src={RainyDay}
        className="w-[6rem] h-[6rem] flex justify-center items-center align-middle"
      />
    ),
    value: 'rainy',
    valueAsKorean: '비'
  },
  {
    label: (
      <img
        src={SnowyDay}
        className="w-[6rem] h-[6rem] flex justify-center items-center align-middle"
      />
    ),
    value: 'snowy',
    valueAsKorean: '눈'
  }
]

interface Props {
  textareaRef: React.RefObject<HTMLTextAreaElement>
  weather: string | null
  setWeather: (v: string) => void
}

export default function Weather({
  textareaRef,
  weather,
  setWeather
}: Props): React.ReactElement {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (target: string): void => {
    setWeather(target)
    setIsAnimating(true)
    textareaRef.current?.focus()
  }

  return (
    <div className="gap-4 px-2 py-2 min-h-[6rem] flex justify-between items-center">
      {weatherOptions.map(({ value, label }) => (
        <WeatherButton
          key={value}
          weather={value}
          label={label}
          currentWeather={weather}
          isSelected={isAnimating}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}
