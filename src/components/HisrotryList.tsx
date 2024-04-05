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

interface Props {
  input: string
}

export default function HistoryList({ input }: Props) {
  const navigate = useNavigate()
  const [value, setValue] = useState<string | number>(
    'newest'
  )

  const user = (getLocalStorage('user') ?? {
    familyName: '',
    givenName: '',
    email: ''
  }) as User

  // const { data, isLoading } = useQuery({
  //   queryKey: [user?.email],
  //   queryFn: () =>
  //     instance.get('/myHistory', {
  //       params: {
  //         email: user.email
  //       }
  //     })
  // })

  const isLoading = false
  const data = {
    data: {
      res: '{"history":[{"response":"qjatn아, 네 일기가 평온하고 행복한 당신의 하루를 보여주는 것 같아. clear한 날씨처럼 너의 생활도 맑고 분명한 모습을 보여줬을 테고, 그게 정말 좋아. 열심히 살고 계신 qjatn아, 앞으로도 굳건하게 한 발 한 발 전진하세요! 잘하고 있어요.","content":"asd","author":"qjatn","createdAt":"2024년 04월 05일 금요일","weather":"clear"}]}'
    },
    status: 200,
    statusText: '',
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: ['xhr', 'http'],
      transformRequest: [null],
      transformResponse: [null],
      timeout: 100000,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {},
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      baseURL: 'https://diary-server.ta09472.workers.dev',
      params: {
        email: 'konem09472@gmail.com'
      },
      method: 'get',
      url: '/myHistory'
    },
    request: {}
  }

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
                <div className="text-3xl">
                  {v[0].replace('_', ' ')}
                </div>
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
