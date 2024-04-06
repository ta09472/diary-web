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
          className="p-0 pb-12 flex justify-start items-center"
          onClick={() => navigate('/')}
          type="link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-0 w-[4rem] h-[4rem] lg:w-[2rem] lg:h-[2rem] text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <div className="border-4 border-[#c3cfc7] w-full h-[60rem] rounded-xl ">
          <div className="grid grid-cols-2">
            <div className="border-r-[0.2rem] border-[#c3cfc7]">
              <div className="p-2 min-h-24 flex justify-around text-[#93a597] font-semibold  items-center text-[2.4rem]">
                <div>{data.day.slice(0, 5)}</div>
                <div>{data.day.slice(6, 9)}</div>
                <div>{data.day.slice(10, 13)}</div>
                <div>{data.day.slice(14)}</div>
              </div>
              {/* <div className="border-t border-gray-500 min-h-16 text-lg p-1">
                일어난 시간
              </div> */}
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
              {/* <div className="border-t border-gray-500 min-h-16 text-lg p-1">
                잠든 시간
              </div> */}
            </div>
          </div>

          <div className="flex flex-col border-t-4 border-[#c3cfc7] max-h-[50rem]">
            <div className="overflow-y-scroll min-h-[20rem]">
              <p className=" p-4 text-4xl w-full  text-gray-700 tracking-wide leading-relaxed">
                {data.value}
              </p>
            </div>
            <div
              className="flex place-self-end z-50 p-2 font-[Chilgok_Kaj] text-blue-700"
              style={{
                fontFamily: 'Chilgok_Kaj'
              }}
            >
              <div className="max-w-[40rem]">
                <p
                  className={
                    'text-4xl -rotate-3 tracking-wide leading-relaxed'
                  }
                >
                  {data.response}
                </p>
                <img
                  className="pt-4"
                  src={stamp}
                  width={240}
                  height={240}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
