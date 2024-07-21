import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
    CleanHands,
} from '@mui/icons-material'
import moment from 'moment'
import { transformImage } from '../../lib/features'

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
            <Avatar src={transformImage(user?.Myprofile?.avatar?.url)} alt={user?.Myprofile?.username}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid #fff",
                }} />
            <ProfileCard
                heading={"Bio"}
                text={user?.Myprofile?.bio}
            />
            <ProfileCard
                heading={"Username"}
                text={user?.Myprofile?.username}
                Icon={<UserNameIcon />}
            />
            <ProfileCard
                heading={"Name"}
                text={user?.Myprofile?.name}
                Icon={<FaceIcon />}
            />
            <ProfileCard
                heading={"Joined"}
                text={moment(user?.Myprofile?.createdAt).fromNow()}
                Icon={<CalendarIcon />}
            />
        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
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