import { Suspense, lazy, useEffect } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { LayoutLoader } from './components/layout/Loaders'
// import AdminiLogin from './pages/Admin/AdminiLogin'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { server } from './constants/config'
import { userNotExists } from './redux/reducer/auth'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'))
const ChatManagement = lazy(() => import('./pages/Admin/ChatManagement'))
const MessageManagement = lazy(() => import('./pages/Admin/MessageManagement'))



const App = () => {
  const {user,loader} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`${server}/api/v1/user/me `) //getmyprofile
      .then(res => console.log(res))
      .catch(err => dispatch(userNotExists()))
  }, [dispatch])

  return loader ? (<LayoutLoader/>) :(
    <Router>
      <Suspense fallback={<LayoutLoader />} >
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route path="/login" element={
            <ProtectRoute user={!user} redirect="/">
              <Login />
            </ProtectRoute>
          } />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App