import {
  ArrowLeftOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { removeLocalStorage } from '../util/localStorage'
import { Button, Drawer } from 'antd'

import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

export default function Navigation(): React.ReactElement {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  const getCurrentPathname = (target: string): string => {
    if (pathname === target) return 'font-semibold'
    return ''
  }

  if (pathname === '/' || pathname === '/pending')
    return <></>

  return (
    <>
      <div className="w-full flex justify-between">
        <Button
          icon={<MenuOutlined />}
          onClick={showDrawer}
          type="text"
        />
        {pathname.includes('/history/') ? (
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            onClick={() => navigate('/history')}
          />
        ) : null}
      </div>
      <Drawer
        onClose={onClose}
        open={open}
        placement="left"
        width={'15rem'}
      >
        <nav className="text-xl">
          <ul>
            <li className={getCurrentPathname('/diary')}>
              <Link to="/diary" onClick={onClose}>
                일기
              </Link>
            </li>
            <li className={getCurrentPathname('/history')}>
              <Link to="/history" onClick={onClose}>
                기록
              </Link>
            </li>
            {/* <li>
              <Link to="/settings" onClick={onClose}>
                설정
              </Link>
            </li> */}
            <li>
              <Link
                to="/"
                onClickCapture={() => {
                  removeLocalStorage('user')
                }}
                onClick={onClose}
              >
                로그아웃
              </Link>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  )
}
