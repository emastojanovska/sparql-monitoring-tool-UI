import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editEndpoint, setEndpoints } from 'app/store/sparql-endpoints/endpointActions';
import { showMessage } from 'app/store/fuse/messageSlice';
import EditIcon from '@mui/icons-material/Edit';
import EndpointRepository from '../../repository/EndpointRepository';

const EditEndpointModal = ({ id }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);

  const editEndpointElem = () => {
    EndpointRepository.editEndpoint({ id, name })
      .then((res) => dispatch(editEndpoint(res.data)))
      .then(() =>
        EndpointRepository.getAllEndpoints().then((res) => {
          const endpoints = res.data;
          dispatch(setEndpoints(endpoints));
          handleClose();
        })
      )
      .then(() =>
        dispatch(
          showMessage({
            message: 'Successfully updated',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
      )
      .catch((error) => {
        dispatch(
          showMessage({
            message: 'The update is unsuccessful',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            variant: 'error',
          })
        );
      });
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Tooltip title="Edit" placement="left-start">
        <IconButton variant="contained" color="inherit" onClick={handleClickOpen} aria-label="EDIT">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update endpoint's name</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter SPARQL endpoint name</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={editEndpointElem}>
            Edit
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditEndpointModal;
