import { Suspense, lazy } from 'react'

import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { LayoutLoader } from './components/layout/Loaders'
// import AdminiLogin from './pages/Admin/AdminiLogin'



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

const user =true;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader/>} >
      <Routes>
        <Route element={<ProtectRoute user ={user}/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/chat/:chatId" element={<Chat/>} />
            <Route path="/groups" element={<Groups/>} />
        </Route>
        
        <Route path="/login" element={
          <ProtectRoute user={!user} redirect="/">
            <Login/> 
          </ProtectRoute>
        } />

        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/users" element={<UserManagement/>} />
        <Route path="/admin/chats" element={<ChatManagement/>} />
        <Route path="/admin/messages" element={<MessageManagement/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App