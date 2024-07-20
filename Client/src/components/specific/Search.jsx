import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducer/misc.js';
import { useLazySearchUserQuery } from '../../redux/api/api.js';
import { useInputValidation } from '6pp';


const Search = () => {
  const dispatch = useDispatch()
  const search =useInputValidation("")
  const { isSearch } = useSelector((state) =>(state.misc))
  const [searchUser] = useLazySearchUserQuery()
  const [users, setUsers] = useState([])

  const addFriendHandler = (id) => { console.log(id) }
  let isLoadingSendFriendRequest = false;

  const searchCloseHandler = () => dispatch(setIsSearch(false))
  console.log(users)
  useEffect(() => {
    const timeOutId= setTimeout(() => {
      searchUser(search.value)
        .then(({data})=>{
          return setUsers(data)
          console.log(data)
        })
        .catch((error)=>console.log(" error in search user",error))
    }, 1000)   
    return () => clearTimeout(timeOutId)
  }, [search.value])

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          // value={search.value}
          // onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>

  )
}

export default Search