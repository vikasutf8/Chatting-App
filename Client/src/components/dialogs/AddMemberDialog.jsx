import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {sampleUsers} from '../../constants/sampleData.js'
import  UserItem  from '../shared/UserItem'

const AddMemberDialog = ({addMember,isLoadingAddMembers,ChatId}) => {

  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])
  const selectMemberHandler = (_id) => {

    // setMembers(prev=> prev.map((i)=> i._id === _id ? {...i, isAdded: !i.isAdded} : i)
    setSelectedMembers((prev) =>
      prev.includes(_id) ?
        prev.filter(
        (currElement) => currElement !== _id)
        :
        [...prev, _id]
    )
  }



  const addMemberSubmitHandler = () => {
    console.log("Add Member")
    closeHandler()
  }
  const closeHandler = () => {
    console.log("Close Handler")
    setSelectedMembers([])
    setMembers([])
  }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"1rem"} width={"20rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      
      <Stack spacing={"1rem"}>
        { members.length >0 ?(
          members.map(i=>(
            <UserItem 
            key={i._id} 
            user={i} 
            handler ={selectMemberHandler}
            isAdded={selectedMembers.includes(i._id)}
            />
          ))) : (
            <Typography textAlign={"center"}>No User Found</Typography>
          )
        }
      </Stack>
      <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog