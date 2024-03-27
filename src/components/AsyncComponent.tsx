import { Spin } from 'antd'
import { Suspense } from 'react'

interface Props {
  component: React.ReactElement
}

export default function AsyncComponent({
  component
}: Props): React.ReactElement {
  return (
    <Suspense fallback={<Spin />}>{component}</Suspense>
  )
}
