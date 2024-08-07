import React, { Suspense, lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constants/config';
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material/'
import { orange } from '../../constants/color'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducer/auth'
import { setIsMobile, setIsNotification, setIsSearch } from '../../redux/reducer/misc';
import { resetNotificationCount } from '../../redux/reducer/chat';

const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroupsDialog = lazy(() => import('../specific/NewGroups'))
const NotificationsDialog = lazy(() => import('../specific/Notifications'))

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isSearch,isNotification } = useSelector((state) => state.misc)
  const {notificationsCount} = useSelector((state) => state.chat)
  const [isNewGroup, setIsNewGroup] = useState(false)

  const handleMobile = () => { dispatch(setIsMobile(true)) }
  const openSearch = () => { dispatch(setIsSearch(true)) }
  const openNewGroup = () => { setIsNewGroup(prev => !prev) }
  const openNotification = () => { 
    dispatch(setIsNotification(true)) 
    dispatch(resetNotificationCount())
  }
  const navigateToGroup = () => navigate("/groups")

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true
      })
      dispatch(userNotExists())
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred logout fetch")
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{
          bgcolor: orange,
        }}>
          <Toolbar>
            <Typography variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' }, }}>
              Chatt App
            </Typography>
            <Box sx={{ display: { xs: 'block', sm: 'none' }, }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box >
              <IconBtn title="Search Icon" icon={<SearchIcon />} onClick={openSearch} />
              <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
              <IconBtn title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroup} />
              <IconBtn title="Notification" icon={<NotificationsIcon />} onClick={openNotification} 
              value = {notificationsCount}
              />
              <IconBtn title="Logout" icon={< LogoutIcon />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog />
          </Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotificationsDialog />
          </Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroupsDialog />
          </Suspense>
        )
      }
    </>
  )
}


// create component that for icons
const IconBtn = ({ title, icon, onClick,value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {
          value ? <Badge badgeContent={value} color="error">{icon}</Badge> : icon
        }
      </IconButton>
    </Tooltip>
  )
}

export default Header