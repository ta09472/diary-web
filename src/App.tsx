import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import SignIn from './page/SignIn'
import Navigation from './components/Nav'
import HistoryDetail from './page/HistoryDetail'
import LoginPending from './page/LoginPending'
import Profile from './page/Profile'
import Diary from './page/Diary'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

function App(): JSX.Element {
  // 로그인 검증해서 로그인 페이지로 리다이렉션

  return (
    <div className=" lg:h-min-[100vh] lg:w-min-[100vw] flex flex-col lg:justify-center lg:items-center">
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/pending" element={<LoginPending />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <ProtectedRoute>
              <Diary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <HistoryDetail />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Navigation />
    </div>
  )
}

export default App
