import React, { memo } from 'react'
import { Avatar, Button, Dialog, DialogTitle, InputAdornment, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData'

const Notifications = () => {

  const friendRequestHandler = ({ _id, accept }) => {
    console.log(_id)
  }

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

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      // {...styling}
      >
        <Avatar src={"avatar"} />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}>
          {`${name} sent you friend request. `}</Typography>
        <Stack direction={{
          xs: "column",

        }}
        >
          <Button color="success" onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})

export default Notifications