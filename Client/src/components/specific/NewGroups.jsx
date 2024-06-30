import React from 'react'
import { Avatar, Button, Dialog, DialogTitle, InputAdornment, List, ListItem, Stack, TextField, Typography } from '@mui/material'
const NewGroups = () => {
  return (
    <Dialog open>
    <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"20rem"}>
      <DialogTitle>Notifications</DialogTitle>
    </Stack>
    {
      sampleNotifications.length > 0 ? (
        sampleNotifications.map((i) => <NotificationItem
          sender={i.sender}
          _id={i._id}
          handler={friendRequestHandler}
          key={i._id}
        />)
      ) : (
        <Typography textAlign={"center"}> 0 notifications</Typography>
      )
    }
  </Dialog>
  )
}

export default NewGroups