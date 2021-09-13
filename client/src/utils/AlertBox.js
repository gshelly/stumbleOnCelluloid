import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';


export default function AlertBox(props) {
  const [open, setOpen] = React.useState(props.open);
  let history = useHistory()

  const handleClose = () => {
    setOpen(false);
    props.isRatingAlert ? window.location.reload() : props.setAlert(!props.showAlert)
  };

  const navigateLogin = () => {
    setOpen(false);
    history.push('/signin')
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{backgroundColor:"transparent"}}
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={navigateLogin} color="primary" autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
