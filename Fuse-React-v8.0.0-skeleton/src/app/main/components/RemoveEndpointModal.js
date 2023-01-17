import {Button, IconButton, Tooltip} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {useDispatch, connect} from "react-redux";
import React, {useEffect, useState} from "react";
import { removeEndpoint, setEndpoints} from "app/store/sparql-endpoints/endpointActions";
import {showMessage} from "app/store/fuse/messageSlice";
import Delete from "@mui/icons-material/Delete";
import DialogContentText from "@mui/material/DialogContentText";
import EndpointRepository from "../../repository/EndpointRepository";

const RemoveEndpointModal = ({id, endpointsList}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const endpoint = endpointsList.find(x => x.id === id);

    useEffect(()=> {
        console.log("endpointsList", endpointsList.find(x => x.id === id))
    }, [])

    const deleteNewEndpoint = () => {
        EndpointRepository.removeEndpoint({id})
            .then(() => dispatch(removeEndpoint(id)))
            .then(() =>  EndpointRepository.getAllEndpoints().then(res =>{
                const endpoints = res.data
                dispatch(setEndpoints(endpoints));
                handleClose()
            }))
            .then(() => dispatch(
                showMessage({
                    message: "Successfully removed",
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
                        message: "Error occurred",
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


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Tooltip title="Delete" placement="left-start">
                <IconButton
                    variant="contained"
                    color="inherit"
                    onClick={handleClickOpen}
                    aria-label="REMOVE"
                >
                    <Delete/>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Delete</DialogTitle>
                <DialogContentText className="ml-24">
                    Are you sure you want to delete this SPARQL endpoint: {endpoint.url}?
                </DialogContentText>
                <DialogActions>
                    <Button color="primary" onClick={deleteNewEndpoint}>Delete</Button>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
function mapStateToProps(state) {
    return ({
        endpointsList: state.endpoint.endpointsList
    })
}

export default connect(mapStateToProps)(RemoveEndpointModal);