import { Segmented, Input } from 'antd'
import { useState } from 'react'

const { Search } = Input

const options = [
  {
    label: (
      //   <div className="w-[4rem] h-[2rem] text-[1.2rem] lg:w-[1rem] lg:h-[1rem] lg:text-[1rem] ">
      <div>최신 순</div>
      //   </div>
    ),
    value: 'newest'
  },
  {
    label: (
      <div>오래된 순</div>
      //   <div className="w-[4rem] h-[2rem] text-[1.2rem] lg:w-[1rem] lg:h-[1rem] lg:text-[1rem] ">

      //   </div>
    ),
    value: 'lately'
  }
]

export default function SearchBar() {
  const [value, setValue] = useState<string | number>(
    'newest'
  )
  const [input, setInput] = useState('')

  return (
    <div className="flex justify-between gap-2 mb-2 w-full h-[4rem]">
      <Segmented
        options={options}
        value={value}
        onChange={setValue}
      />
      <Search
        size="large"
        variant="filled"
        placeholder="날짜 또는 키워드를 입력하세요."
        allowClear
        enterButton
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
    </div>
  )
}
