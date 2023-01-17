import {Button, TextField} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addEndpoint, setEndpoints} from "app/store/sparql-endpoints/endpointActions";
import {showMessage} from "app/store/fuse/messageSlice";
import EndpointRepository from "../../repository/EndpointRepository";

const AddEndpointModal = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(null);
    const [name, setName] = useState(null);

    const addNewEndpoint = () => {
        EndpointRepository.createEndpoint({url, name})
            .then(res => dispatch(addEndpoint(res)))
            .then(() =>  EndpointRepository.getAllEndpoints().then(res =>{
                const endpoints = res.data
                dispatch(setEndpoints(endpoints));
                handleClose()
            }))
            .then(() => dispatch(
                showMessage({
                    message: "Successfully added",
                    autoHideDuration: 6000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    variant: "success"
                })
            ))
            .catch((error) => {
                dispatch(
                    showMessage({
                        message: "The URL you entered is not valid",
                        autoHideDuration: 6000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        variant: "error"
                    })
                )
            })

    }

    const handleUrlChange = (e) => {
        const { value } = e.target;
        setUrl(value);
    }

    const handleNameChange = (e) => {
        const { value } = e.target;
        setName(value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Button variant="contained"
                    color="inherit"
                    endIcon={<AddCircle />}
                    onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add new endpoint</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter SPARQL endpoint URL
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={handleNameChange}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        name="url"
                        label="URL"
                        type="text"
                        fullWidth
                        required
                        onChange={handleUrlChange}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={addNewEndpoint}>Add</Button>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AddEndpointModal;