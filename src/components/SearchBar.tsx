import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

interface Props {
  input: string
  onChange: (v: string) => void
}

export default function SearchBar({
  input,
  onChange
}: Props) {
  return (
    <div className="flex justify-between gap-2 my-8 w-full h-[4rem]">
      <Input
        size="large"
        className="h-[6rem] text-[2.5rem] lg:h-[3rem] lg:text-[1.5rem]"
        variant="filled"
        prefix={
          <SearchOutlined
            style={{
              color: 'gray',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem'
            }}
          />
        }
        placeholder="날짜 또는 키워드를 입력하세요."
        allowClear={{
          clearIcon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[4rem] h-[4rem] lg:w-[2rem] lg:h-[2rem] text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          )
        }}
        value={input}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  )
}
