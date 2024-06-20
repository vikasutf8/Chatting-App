import { AppBar, Box, Icon, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { orange } from '../../constants/color'
import {useNavigate} from 'react-router-dom'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon} from '@mui/icons-material/'
const Header = () => {
  const navigate =useNavigate();
  const handleMobile = () => {

  }
  const operSearchDialog = () => { }
  const openNewGroup = () => { }
  const navigateToGroup = () => navigate("/groups")
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{
          bgcolor: orange,
        }}>
          <Toolbar>


            <Typography variant="h6"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}>
              Chatt App
            </Typography>
            <Box sx={{
              display: { xs: 'block', sm: 'none' },

            }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box >
              <Tooltip title="Search Icon">
                <IconButton color="inherit" size="large" onClick={operSearchDialog}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Groups">
              <IconButton color="inherit" size="large" onClick={navigateToGroup}>
                 <GroupIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header