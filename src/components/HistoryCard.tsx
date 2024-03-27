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
      classNames={{
        cover: 'flex px-6 pt-4 text-gray-400'
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
        title={data.content}
        description={data.response}
      />
    </Card>
  )
}
