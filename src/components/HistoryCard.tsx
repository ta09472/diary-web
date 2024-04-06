import { Card } from 'antd'
import { weatherOptions } from './Weather'
import { useNavigate } from 'react-router-dom'
import { Diary } from '../schema/Diary'

interface Props {
  data: Diary
  id: number
  loading: boolean
}

export default function HistoryCard({
  data,
  id,
  loading
}: Props): React.ReactElement {
  const navigate = useNavigate()

  const handleClick = (id: string): void => {
    navigate(`/history/${id}`, {
      state: data
    })
  }

  return (
    <Card
      loading={loading}
      className="py-4 rounded-lg"
      classNames={{
        cover: 'flex px-6 pt-4 text-gray-400 text-2xl'
      }}
      cover={
        <p>
          {`${data.createdAt.toString()} ${
            weatherOptions.find(
              ({ value }) => value === data.weather
            )?.valueAsKorean ?? ''
          }`}
        </p>
      }
      key={id}
      hoverable
      data-id={id}
      onClick={({ currentTarget }) =>
        handleClick(currentTarget.dataset.id as string)
      }
    >
      <Card.Meta
        title={
          <div className="text-3xl">
            {data.content.length >= 40
              ? `${data.content.slice(0, 40)}...`
              : data.content}
          </div>
        }
        className="text-4xl font-semibold"
        description={
          data.response.length >= 60
            ? `${data.response.slice(0, 60)}...`
            : data.response
        }
      />
    </Card>
  )
}
