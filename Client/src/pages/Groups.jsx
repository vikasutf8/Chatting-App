import { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography, } from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from '@mui/icons-material'
import { bgGradient, matBlack } from '../constants/color.js'
import { Link } from '../components/styles/styledComponents'
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats } from "../constants/sampleData.js";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);
const Groups = () => {
  const isAddMember =true;  //redux
  const chatId = useSearchParams()[0].get("group")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
  // const [isLoadingGroupName, setIsLoadingGroupName] = useState(true)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const navigate = useNavigate()

  const handleMobile = () => { setIsMobileMenuOpen((prev) => !prev) };
  const handleMobileClose = () => setIsMobileMenuOpen(false)
  const navigateBack = () => { navigate("/") }

  const updateGroupName = () => {
    setIsEdit(false)
    console.log(groupNameUpdatedValue)
  }
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
    console.log("Delete Group") 
  }
  const closeConfirmDeleteHandler = () => { 
    setConfirmDeleteDialog(false)
   }
  const openAddMemberHandler = () => { 
    console.log("Add Member") 
  }

  const deleteHandler = () => {
    console.log("Delete Handlers")
    closeConfirmDeleteHandler()
  }

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}
          // disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            // disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  useEffect(() => {
    setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdatedValue(`Group Name ${chatId}`)

    // setcleaner function
    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  }, [chatId])

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container spacing={2} height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupsList myGroups={samepleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {
          groupName && (
            <>
              {GroupName}

              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >
                {/* members */}

              </Stack>
              {ButtonGroup}
            </>
          )
        }
      </Grid>


    {
      isAddMember && (
        <Suspense fallback={<Backdrop open />}>
        <AddMemberDialog
          open={isAddMember}
          handleClose={openAddMemberHandler}
          deleteHandler={deleteHandler}
        />
      </Suspense>
      )
    }

    {
      confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
        <ConfirmDeleteDialog
          open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
        />
      </Suspense>
      )
    }


      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },

        }}
      >
        <GroupsList w={"50vw"} myGroups={samepleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;

