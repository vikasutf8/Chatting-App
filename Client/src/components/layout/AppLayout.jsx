// high ordered component
import { Drawer, Grid, Skeleton, } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useMyChatQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../shared/Title'
import ChatList from '../specific/chatList'
import Profile from '../specific/Profile'
import Header from './Header'
import { setIsMobile } from '../../redux/reducer/misc'
import { useErrors } from '../../hooks/hook'
import { getSocket } from '../../lib/socket'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams()
        const chatId = params.chatId
        const dispatch = useDispatch()
        const socket =getSocket();
        // console.log("socket",socket)
        // console.log(socket.id)

        const { isMobile } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)

        const { isLoading, data, isError,error, refetch } = useMyChatQuery("")
        useErrors([{isError,error}])
       

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault()
            console.log(_id, groupChat)
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false))
        }
        return (
            <>
            <Title />
            <Header />
            {
                isLoading ? <Skeleton /> : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            // newMessagesAlert={[
                            //     {
                            //         chatId,
                            //         count: 2,
                            //     },
                            // ]}
                            // onlineUsers={["1"]}
                            handleDeleteChat={handleDeleteChat}
                            
                        />
                    </Drawer>
                )
            }

            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid item sm={4} md={3} sx={{
                    display: { xs: 'none', sm: 'block' },
                }} height={"100%"} >
                    {
                        isLoading ? (<Skeleton />) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                // newMessagesAlert={[
                                //     {
                                //         chatId,
                                //         count: 2,
                                //     },
                                // ]}
                                // onlineUsers={["1"]}
                                handleDeleteChat={handleDeleteChat}
                            />
                        )
                    }
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} >
                    <WrappedComponent {...props} chatId={chatId} 
                    user={user}/>
                </Grid>
                <Grid item md={4} lg={3} sx={{
                    display: { xs: 'none', sm: 'block' },
                    padding: "2rem",
                    bgcolor: "rgba(0,0,0,0.85)"
                }} height={"100%"} >
                    <Profile user={user}/>
                </Grid>
            </Grid>
            </>
        )
    }
}

export default AppLayout