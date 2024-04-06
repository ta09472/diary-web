import SearchBar from '../components/SearchBar'
import HistoryList from '../components/HisrotryList'
import { useState } from 'react'

export default function Diary(): React.ReactElement {
  const [input, setInput] = useState('')

  const onChange = (value: string) => {
    setInput(value)
  }
  return (
    <div className=" flex flex-col p-8 gap-4 overflow-hidden">
      <SearchBar input={input} onChange={onChange} />
      <div className=" overflow-scroll max-h-[74rem] py-4">
        <HistoryList input={input} />
      </div>
    </div>
  )
}

//   return (
//     <>
//       <div className="border-2 border-gray-500 w-[52rem] h-[38rem] ">
//         <div className="grid grid-cols-2">
//           <div className="border-r border-gray-500">
//             <div className="p-2 min-h-20 flex justify-around text-gray-800  items-center text-4xl">
//               <div>{today.slice(0, 5)}</div>
//               <div>{today.slice(6, 9)}</div>
//               <div>{today.slice(10, 13)}</div>
//               <div>{today.slice(14)}</div>
//             </div>
//             <div className="border-t border-gray-500 min-h-16 text-lg p-1">
//               일어난 시간
//             </div>
//           </div>
//           <div>
//             <Weather
//               textareaRef={textareaRef}
//               weather={weather}
//               setWeather={setWeather}
//             />

//             <div
//               className="border-t border-gray-500 min-h-16 text-lg p-1"
//               // style={{ fontFamily: 'HakgyoansimEunhasuR' }}
//             >
//               잠든 시간
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col border-t border-gray-500 max-h-[33rem]"></div>
//         <TextInput
//           textareaRef={textareaRef}
//           weather={weather}
//           date={today}
//         />
//       </div>
//     </>
//   )
// }
