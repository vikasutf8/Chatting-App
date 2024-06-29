import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
// using tansform mathod later
const AvatarCard = ({avatar=[],max =4}) => {
  return (
    <Stack direction={"row"} spacing={"0.5"}>
        <AvatarGroup max={max}>
           <Box width={"5rem"} height={"3rem"}>
           {
                avatar.map((i,index)=>(
                    <Avatar
                    key={Math.random()*100}
                    src={i}
                    alt={`Avatar ${index}`}
                    style={{ 
                        width: "2rem",
                        height: "2rem",
                        position:"absolute",
                        left:{
                            xs:`${index+ 0.5}rem`,
                            sm:`${index}rem`,
                        },
                     }}
                    />
                ))
            }
           </Box>
        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard
