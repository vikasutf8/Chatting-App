import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
} from '@mui/icons-material'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
       <Avatar
       sx={{
        width:200,
        height:200,
        objectFit:"contain",
        marginBottom:"1rem",
        border:"5px solid #fff",


       }}/>
        
        <ProfileCard
            heading={"Bio"}
            text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quidem."}
        />
        <ProfileCard
            heading={"Username"}
            text={"VikasArya"}
            Icon={<UserNameIcon/>}
        />
        <ProfileCard
            heading={"Name"}
            text={"Vikas Arya"}
            Icon={<FaceIcon/>}
        />
        <ProfileCard
            heading={"Joined"}
            text={moment('2024-06-26T00:00:00.000Z').fromNow()}
            Icon={<CalendarIcon/>}
        />
    </Stack>
  )
}

const ProfileCard = ({text,Icon,heading }) => (
    <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"white"}
        >
        {Icon && Icon}

        <Stack>
            <Typography variant={"body1"}>{text}</Typography>
            <Typography color={"gray"} variant={"caption"}>{heading}</Typography>
        </Stack>
    </Stack>
)

export default Profile