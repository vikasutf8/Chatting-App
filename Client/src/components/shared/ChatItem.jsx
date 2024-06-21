import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Link } from '../styles/styledComponents'

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat =false,
    sameSender,
    isOnline,
    newMassageAlert,
    index =0,
    handleDeleteChat,
}) => {
  return (
    <Link 
    sx={{
        padding:"0"
    }}
    to={`/chat/${_id}`}
    onContextMenu={(e)=> handleDeleteChat(e,_id,groupChat)}>
        <div
        style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            backgroundColor: sameSender ? "black" : "unset",
            color: sameSender ? "white" : "unset",
            position: "relative",
            padding: "1rem",
          }}>
            {/* avatar */}
            <Stack>
                <Typography>{name}</Typography>
                {
                    newMassageAlert && (
                        <Typography>{newMassageAlert.count} New Message</Typography>
                    )
                    
                }
            </Stack>
            {
                isOnline && <Box 
                sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                }}
                /> 
            }
        </div>
    </Link>
  )
}

export default memo(ChatItem)
