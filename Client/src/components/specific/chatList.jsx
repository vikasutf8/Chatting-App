import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const chatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        },
    ],
    handleDeleteChat,
}) => {
    return (
        <Stack width={w} direction={"column"}>
            {
                chats?.map((data, index) => {
                    const [avatar, _id, name, groupChat, members] = [data.avatar, data._id, data.name, data.groupChat, data.members]
                    const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id)
                    const isOnline = members?.some((member) => onlineUsers.includes(_id))
                    return <ChatItem
                        key={_id}
                        index={index}
                        newMassageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        _id={_id}
                        name={name}
                        groupChat={groupChat}
                        handleDeleteChat={handleDeleteChat}
                        sameSender={_id === chatId}
                    />
                })
            }
        </Stack>
    )
}

export default chatList