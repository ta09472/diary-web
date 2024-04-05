import { Button } from 'antd'
import { weatherOptions } from '../components/Weather'
import WeatherButton from '../components/WeatherButton'
import stamp from '../resources/images/stamp.svg'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HistoryDetail(): React.ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  const data = {
    weather: location.state.weather,
    day: location.state.createdAt,
    value: location.state.content,
    response: location.state.response
  }

  return (
    <div className="m-10 mt-16 flex flex-col ">
      <div>
        <Button
          className="p-0 pb-8 flex justify-center items-center"
          onClick={() => navigate('/')}
          type="link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[4rem] h-[4rem] lg:w-[2rem] lg:h-[2rem] text-gray-700"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <div className="border-2 border-gray-500 w-full h-[60rem] ">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-500">
              <div className="p-2 min-h-20 flex justify-around text-gray-800  items-center text-4xl">
                <div>{data.day.slice(0, 5)}</div>
                <div>{data.day.slice(6, 9)}</div>
                <div>{data.day.slice(10, 13)}</div>
                <div>{data.day.slice(14)}</div>
              </div>
              <div className="border-t border-gray-500 min-h-16 text-lg p-1">
                일어난 시간
              </div>
            </div>
            <div>
              <div className="gap-4 px-2 min-h-20 flex justify-evenly items-center">
                {weatherOptions.map(({ value, label }) => (
                  <WeatherButton
                    key={value}
                    weather={value}
                    label={label}
                    currentWeather={data.weather}
                    isSelected={true}
                  />
                ))}
              </div>
              <div className="border-t border-gray-500 min-h-16 text-lg p-1">
                잠든 시간
              </div>
            </div>
          </div>

          <div className="flex flex-col  border-t border-gray-500 h-full ">
            <div className="overflow-y-scroll">
              <p className=" p-2 text-5xl w-full text-gray-700 ">
                {data.value}
              </p>
            </div>
            <div
              className="flex place-self-end z-50 p-2 font-[Chilgok_Kaj] text-blue-700"
              style={{
                fontFamily: 'Chilgok_Kaj'
              }}
            >
              <div className="max-w-72">
                <p className={'text-4xl -rotate-3'}>
                  {data.response}
                </p>
                <img src={stamp} width={140} height={140} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
