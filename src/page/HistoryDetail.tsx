import { weatherOptions } from '../components/Weather'
import WeatherButton from '../components/WeatherButton'
import stamp from '../resources/images/stamp.svg'
import { useLocation } from 'react-router-dom'

export default function HistoryDetail(): React.ReactElement {
  const location = useLocation()

  const mockData = {
    weather: location.state.weather,
    day: location.state.createdAt,
    value: location.state.content,
    response: location.state.response
  }

  return (
    <div className="flex-col">
      <div className="border-2 border-gray-500 w-[52rem] h-[38rem] ">
        <div className="grid grid-cols-2">
          <div className="border-r border-gray-500">
            <div className="p-2 min-h-20 flex justify-around text-gray-800  items-center text-4xl">
              <div>{mockData.day.slice(0, 5)}</div>
              <div>{mockData.day.slice(6, 9)}</div>
              <div>{mockData.day.slice(10, 13)}</div>
              <div>{mockData.day.slice(14)}</div>
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
                  currentWeather={mockData.weather}
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
            <p className=" p-2 text-3xl w-full text-gray-700 ">
              {mockData.value}
            </p>
          </div>
          <div
            className="flex place-self-end z-50 p-2 font-[Chilgok_Kaj] text-blue-700"
            style={{
              fontFamily: 'Chilgok_Kaj'
            }}
          >
            <div className="max-w-72">
              <p className={'text-2xl -rotate-3'}>
                {mockData.response}
              </p>
              <img src={stamp} width={140} height={140} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
