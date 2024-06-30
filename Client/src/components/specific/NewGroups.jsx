import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, InputAdornment, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData'
import { useInputValidation } from '6pp'

const NewGroups = () => {
  const groupName = useInputValidation("");
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
  // console.log(selectedMembers)
  const submitHandler = () => { }
  const closeHandler = () => { }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} Width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>
        <TextField label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler} />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack >
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={"1rem"} >
          <Button variant={"outlined"} color="error">Cancel</Button>
          <Button variant={"contained"} onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroups