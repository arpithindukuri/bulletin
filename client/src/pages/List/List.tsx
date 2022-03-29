import StyledMenu from "../../components/StyledMenu";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@material-ui/core/TextField";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./List.css";
import { Container, withStyles } from "@material-ui/core";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import { List as ListType, ListItem } from "../../../../types";

interface ListErrors {
  name: string;
  type: string;
}

interface ListItemErrors {
  name: string;
  description: string;
  isDone?: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 270,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function List() {
  const BrownTextField = withStyles({
    root: {
      "& .MuiInput-underline:before": {
        borderBottomColor: "#683900",
      },
      "& .MuiInput-underline:hover:before": {
        borderBottomColor: "##68390D",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#68390D",
      },
    },
  })(TextField);

  const params = useParams();
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [listType, setlistType] = useState("");
  const [listName, setListName] = useState("");
  const [listItemName, setListItemName] = useState("");
  const [listItemDescription, setListItemDescription] = useState("");
  const [boardName, setBoardName] = useState("");
  const [lists, setLists] = useState<Array<ListType>>([]);
  const [listErrors, setListErrors] = useState<ListErrors>({
    name: "",
    type: "",
  });
  const [listItemErrors, setListItemErrors] = useState<ListItemErrors>({
    name: "",
    description: "",
    isDone: false,
  });
  const [currentListID, setCurrentListId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleOpenTask = (id: string) => {
    setCurrentListId(id);
    setOpenTask(true);
  };
  const handleClose = () => {
    setOpen(false);
    setListName("");
  };
  const handleCloseTask = () => {
    setOpenTask(false);
    setListItemName("");
    setListItemDescription("");
  };
  const handleSort = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setlistType(event.target.value as string);
  };

  const handleListNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setListName(event.target.value);
  };

  const handleTaskNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setListItemName(event.target.value);
  };

  const handleTaskDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setListItemDescription(event.target.value);
  };

  const fetchLists = () => {
    axiosInstance
      .get("/readLists", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log("get lists response is: ", res);
        setLists(res.data.content);
      })
      .catch((err) => {
        console.log("error getting board lists: ", err);
      });
  };

  const validateAddListForm = () => {
    listErrors.name = "";
    listErrors.type = "";

    let errorsExits = false;

    if (!listName) {
      listErrors.name = "Please enter a list name.";
      errorsExits = true;
    }

    setListErrors({ ...listErrors });
    return !errorsExits;
  };

  const validateAddItemForm = () => {
    listItemErrors.name = "";
    listItemErrors.description = "";

    let errorsExits = false;

    if (!listItemName) {
      listItemErrors.name = "Please enter a task name.";
      errorsExits = true;
    }

    setListItemErrors({ ...listItemErrors });
    return !errorsExits;
  };

  const handleAddList = () => {
    if (!validateAddListForm()) {
      return;
    }

    const values: ListType = {
      id: null,
      name: listName,
      items: [],
    };

    axiosInstance
      .post("/createList", values, { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        handleClose();
        const newValues = {
          ...values,
          id: res.data.id,
        } as ListType;
        lists.push(newValues);
        setLists([...lists]);
      })
      .catch((err) => {
        console.log("error adding List: ", err);
      });
  };

  const handleAddListItem = () => {
    console.log("list id is: ", currentListID);
    if (!validateAddItemForm()) {
      return;
    }

    const values: ListItem = {
      id: null,
      name: listItemName,
      isDone: false, // functionality not implemented in frontend
    };

    axiosInstance
      .post("/createListItem", values, {
        params: { boardID: params.board_id, listID: currentListID },
      })
      .then((res) => {
        console.log("add list item response is: ", res);
        // const index = lists.findIndex((x) => x.id === currentListID);
        // if (index > -1) {
        //   const index2 = lists[index].listItem.findIndex(
        //     (x) => x.name === values.name
        //   );
        //   if (index2 === -1) {
        //     if (lists[index].listItem) {
        //       lists[index].listItem.push(values);
        //     } else {
        //       lists[index].listItem = [values];
        //     }
        //   }
        // }
        // setLists((prev) => {
        //   const currListIndex = prev.findIndex(
        //     (list) => list.id === currentListID
        //   );
        //   if (currListIndex > -1) {
        //     return prev.map((list, index) => {
        //       if (index === currListIndex) list.items.push(values);
        //       return list;
        //     });
        //   }
        //   return prev;
        // });
        fetchLists();
        handleCloseTask();
      })
      .catch((err) => {
        console.log("error adding List Item: ", err);
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/readBoard", { params: { boardID: params.board_id } })
      .then((res) => {
        setBoardName(res.data.content.name);
        console.log("Information recieved Successfully");
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
      });
  }, [params.board_id]);

  useEffect(() => {
    fetchLists();
  }, [params.board_id]);

  return (
    <Container style={{ marginTop: "40px", paddingBottom: "40px" }}>
      <a href={"/board/" + params.board_id}>
        <p>Back to '{boardName}' Board - Main</p>
      </a>
      <h1 style={{ color: "#68390D", fontSize: "2.8rem" }}>Lists</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Button
            style={{
              backgroundColor: "#ECD1C5",
              fontSize: "14px",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            + Add another list
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <StyledMenu />
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#AA896B",
                fontSize: "14px",
              }}
              variant="contained"
              onClick={handleSort}
            >
              Sort
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ height: "200px" }}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              style={{
                color: "#AA896B",
                backgroundColor: "#FFFFFF",
                fontSize: "14px",
                left: "600px",
              }}
              variant="text"
              disableElevation
              onClick={handleClose}
            >
              Discard
            </Button>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <BrownTextField
                  id="standard-basic"
                  label="List Name"
                  variant="standard"
                  InputLabelProps={{
                    style: { color: "#B8A590" },
                  }}
                  fullWidth
                  value={listName}
                  onChange={handleListNameChange}
                  error={listErrors.name != ""}
                  helperText={listErrors.name}
                  autoFocus
                />
              </div>
              <div>
                <Button
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#AA896B",
                    fontSize: "14px",
                    left: "600px",
                    top: "50px",
                  }}
                  variant="text"
                  disableElevation
                  onClick={handleAddList}
                >
                  Save List
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            style={{ marginTop: 50 }}
          >
            {lists.map((list) => (
              <Grid key={list.id} item>
                <Paper
                  sx={{
                    width: 250,
                    backgroundColor: "#F6F0E9",
                    padding: "10px",
                  }}
                >
                  <h2 className="listTitle">{list.name}</h2>
                  <Box>
                    {list.items?.map((value) => (
                      <>
                        <p className="taskName">{value.name}</p>
                        <p className="taskDots">...</p>
                      </>
                    ))}
                  </Box>
                  <Button
                    style={{
                      backgroundColor: "#F6F0E9",
                      color: "#68390D",
                      fontSize: "14px",
                    }}
                    variant="text"
                    onClick={() => {
                      list.id && handleOpenTask(list.id);
                    }}
                  >
                    + Add a Task
                  </Button>
                  <Modal
                    open={openTask}
                    onClose={handleCloseTask}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button
                          style={{
                            color: "#AA896B",
                            backgroundColor: "#FFFFFF",
                            fontSize: "14px",
                            left: "600px",
                          }}
                          variant="text"
                          disableElevation
                          onClick={handleCloseTask}
                        >
                          Discard
                        </Button>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Task Name"
                              variant="standard"
                              InputLabelProps={{
                                style: { color: "#B8A590" },
                              }}
                              fullWidth
                              onChange={handleTaskNameChange}
                              value={listItemName}
                              error={listItemErrors.name != ""}
                              helperText={listItemErrors.name}
                            />
                          </div>
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Task Description"
                              variant="standard"
                              InputLabelProps={{
                                style: { color: "#B8A590" },
                              }}
                              fullWidth
                              value={listItemDescription}
                              onChange={handleTaskDescriptionChange}
                            />
                          </div>
                          <div>
                            <Button
                              style={{
                                color: "#FFFFFF",
                                backgroundColor: "#AA896B",
                                fontSize: "14px",
                                left: "600px",
                                top: "50px",
                              }}
                              variant="text"
                              disableElevation
                              onClick={() => handleAddListItem()}
                            >
                              Save Task
                            </Button>
                          </div>
                        </Box>
                      </Typography>
                    </Box>
                  </Modal>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
