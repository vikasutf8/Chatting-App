import React, { Fragment, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/styledComponents'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grayColor, orange } from '../constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../constants/sampleData'
import MessagaComponent from '../components/shared/MessagaComponent'
import { getSocket } from '../lib/socket'
import { NEW_MESSAGE } from '../constants/events'
import { useChatDetailsQuery } from '../redux/api/api'

const user = {
  _id: "sdfsdfsdf",
  name: "User",

}


const Chat = ({ chatId }) => {
  const containerRef = useRef(null)
  const socket = getSocket()

  const [message, setMessage] = useState("")
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
console.log("chatDetails",chatDetails)
  const members = chatDetails?.data?.chat?.members
  console.log(members)
  console.log(chatDetails.data.chat)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return;

    // emmiting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")

  }

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} /> */}
        {
          sampleMessage.map((message) => (
            <MessagaComponent key={message._id} message={message} user={user} />
          )
          )}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          // onClick={handleFileOpen}

          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </Fragment>
  )
}

export default AppLayout()(Chat)