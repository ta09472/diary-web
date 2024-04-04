import { Route, Routes } from 'react-router-dom'
import Diary from './page/Diary'
import SignIn from './page/SignIn'
import History from './page/History'
import Navigation from './components/Nav'
import HistoryDetail from './page/HistoryDetail'
import LoginPending from './page/LoginPending'
import Profile from './page/Profile'

function App(): JSX.Element {
  // 로그인 검증해서 로그인 페이지로 리다이렉션

  return (
    <div className=" lg:h-min-[100vh] lg:w-min-[100vw] flex flex-col lg:justify-center lg:items-center">
      <Navigation />
      <Routes>
        <Route path="/login" Component={SignIn} />
        <Route path="/pending" Component={LoginPending} />
        <Route path="/" Component={Diary} />
        <Route path="/profile" Component={Profile} />
        {/* <Route path="/history" Component={History} /> */}
        <Route
          path="/history/:id"
          Component={HistoryDetail}
        />
      </Routes>
    </div>
  )
}

export default App
