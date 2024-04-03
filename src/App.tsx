import { Route, Routes } from 'react-router-dom'
import Diary from './page/Diary'
import SignIn from './page/SignIn'
import History from './page/History'
import Navigation from './components/Nav'
import HistoryDetail from './page/HistoryDetail'
import LoginPending from './page/LoginPending'

function App(): JSX.Element {
  // 로그인 검증해서 로그인 페이지로 리다이렉션

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" Component={SignIn} />
        <Route path="/pending" Component={LoginPending} />
        <Route path="/diary" Component={Diary} />
        <Route path="/history" Component={History} />
        <Route
          path="/history/:id"
          Component={HistoryDetail}
        />
      </Routes>
    </>
  )
}

export default App
