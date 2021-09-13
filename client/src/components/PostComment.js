import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PostComment = (props) => {
  const [text, setText] = useState("");
  // const [authError, setAuthError] = useState("");
  const [errors, setErrors] = useState("");

  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    setText(props.editedUser.text)
  }, [props.editedUser.text])

  const handleClose = () => {
    setOpen(false);
    props.setComment(false);
  }



  const handleSubmit = (e) => {
    console.log("movieid", props.editedUser);
    e.preventDefault();
    if (!props.isEditFlow) {
      axios
        .post("http://localhost:8001/api/movie/post/" + props.movieId, {
          text: text
        }, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setOpen(false);
          // props.setReloadsComments(!props.reloadComments)
          props.setComment(false);
        })
        .catch((err) => {
          setErrors("Retry")
          console.log(errors, err.data);
        });
    }
    else {
      axios
        .put("http://localhost:8001/api/movie/post/edit/" + props.editedUser._id, {
          text: text
        }, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setOpen(false);
          // props.setReloadsComments(!props.reloadComments)
          props.setComment(false);
        })
        .catch((err) => {
          setErrors("Retry")
          console.log(errors, err.data);
        });
    }
  }


  return (

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Let the Stumbleoids know what do you think!!</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
        <TextareaAutosize
          autoFocus
          minRows={3}
          maxRows={12}
          // aria-label="maximum height"
          label="Your Comment"
          placeholder="Add your comments"
          onChange={(e) => setText(e.target.value)}
          value={text}
          defaultValue=""
          style={{ width: "100%", borderColor: `${errors ? "red" : "black"}` }}
        />
        {errors ? <p style={{ color: "red", fontSize: "10px" }}>Sorry for Network interuption !! Please try to re-submit</p> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostComment;