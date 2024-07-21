import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,

} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducer/misc";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  
  const [users, setUsers] = useState([]);

  const searchCloseHandler = () => dispatch(setIsSearch(false));
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", { userId :id });
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          return setUsers(data.users);
        })
        .catch((e) => console.log(e));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
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
  );
};

export default Search;