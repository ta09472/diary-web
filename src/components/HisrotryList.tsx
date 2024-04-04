import HistoryCard from '../components/HistoryCard'
import bird from '../resources/images/bird.svg'
import instance from '../lib/axios'
import { Diary } from '../schema/Diary'
import { User } from '../schema/User'
import {
  filterData,
  groupByMonth,
  separateByObject
} from '../util/groupByMonth'
import { getLocalStorage } from '../util/localStorage'
import { useQuery } from '@tanstack/react-query'
import { Button, Divider, Empty } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HistoryList() {
  const navigate = useNavigate()
  const [value, setValue] = useState<string | number>(
    'newest'
  )
  const [input, setInput] = useState('')

  const user = (getLocalStorage('user') ?? {
    familyName: '',
    givenName: '',
    email: ''
  }) as User

  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: () =>
      instance.get('/myHistory', {
        params: {
          email: user.email
        }
      })
  })

  const history: Diary[] =
    JSON.parse(data?.data?.res ?? '{}').history ?? []

  const historyWithState =
    value === 'lately' ? history : [...history].reverse()
  const groupedData = groupByMonth(historyWithState)
  const separatedData = separateByObject(groupedData)
  const filteredData = filterData(separatedData, input)
  const isSearchResultEmpty =
    Object.keys(filteredData).length === 0
  const isEmpty = !(!input && isSearchResultEmpty)

  return (
    <div className="p-2 w-full flex flex-col">
      <div className=" overflow-scroll">
        {!isSearchResultEmpty ? (
          Object.entries(filteredData).map((v) => (
            <div key={v[0]}>
              <Divider orientation="left" key={v[0]}>
                {v[0].replace('_', ' ')}
              </Divider>
              <div className="grid grid-cols-1 gap-2 ">
                {v[1]?.map((v, index) => (
                  <HistoryCard
                    loading={isLoading}
                    key={index}
                    data={v}
                    id={index}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-40">
            <Empty
              image={null}
              description={
                isEmpty ? (
                  <div className="text-5xl font-semibold lg:text-[1rem] ">
                    검색 결과가 없어요.
                  </div>
                ) : (
                  <div className="text-4xl text-gray-700 lg:text-[1.5rem]">
                    아직 일기를 쓰지 않았어요!
                    <br />
                    일기를 써보러 갈까요?
                  </div>
                )
              }
            >
              {!isEmpty ? (
                <Button
                  type="primary"
                  block
                  className=" text-[2.6rem] h-[6rem] lg:h-[3rem] lg:text-[1.2rem] bg-black font-semibold mt-2"
                  onClick={() => navigate('/diary')}
                >
                  일기 쓰기
                </Button>
              ) : null}
            </Empty>
          </div>
        )}
      </div>
    </div>
  )
}
