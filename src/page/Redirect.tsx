import { Navigate } from 'react-router-dom'

export default function Redirect(): React.ReactElement {
  return <Navigate to={'/signin'} />
}
