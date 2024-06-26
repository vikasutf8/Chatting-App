import React, { Suspense, lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Backdrop, Box, Icon, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon,Logout as LogoutIcon, Notifications as NotificationsIcon } from '@mui/icons-material/'
import { orange } from '../../constants/color'

const SearchDialog =lazy(() => import('../specific/Search'))
const NewGroupsDialog = lazy(() => import('../specific/NewGroups'))
const NotificationsDialog = lazy(() => import('../specific/Notifications'))




const Header = () => {
  const [ismobile , setIsMobile] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const navigate = useNavigate();
  const handleMobile = () => { setIsMobile(prev => !prev) }
  const openSearch = () => { setIsSearch(prev => !prev)}
  const openNewGroup = () => { setIsNewGroup(prev => !prev)}
  const openNotification = () => { setIsNotification(prev => !prev)}
  const navigateToGroup = () => navigate("/groups")
  const logoutHandler = () => navigate("/login")
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{
          bgcolor: orange,
        }}>
          <Toolbar>
            <Typography variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' },}}>
              Chatt App
            </Typography>
            <Box sx={{ display: { xs: 'block', sm: 'none' },}}>  
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box >
              <IconBtn title="Search Icon" icon={<SearchIcon />} onClick={openSearch} />
              <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
              <IconBtn title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroup} />
              <IconBtn title="Notification" icon={<NotificationsIcon />} onClick={openNotification} />
              <IconBtn title="Logout" icon={< LogoutIcon />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog  />
          </Suspense>
        )
       } 
      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotificationsDialog  />
          </Suspense>
        )
       } 
       {
        isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroupsDialog  />
          </Suspense>
        )
       } 
    </>
  )
}


// create component that for icons
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header