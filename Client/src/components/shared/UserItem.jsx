import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";



const UserItem = ({user ,hadler ,handlerIsLoading }) => {
  const {name,_id,avata,isAdded=false,styling ={}} = user
    return (
    <ListItem>
        <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
            // {...styling}
        >
            <Avatar/>

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
                {name}</Typography>
            <IconButton
            size="small"
            sx={{
              bgcolor: isAdded ? "error.main" : "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: isAdded ? "error.dark" : "primary.dark",
              },
            }}
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
            >
                <AddIcon/>
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)
