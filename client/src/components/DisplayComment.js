import React, { useState, useEffect } from 'react'
import '../styles/MoviePage.css'
import axios from 'axios';
import { Avatar, Grid, Paper } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import imgLink from '../images/User.png'

function DisplayComments(props) {
  const [displayMovieComments, setMovieComments] = useState([])
  const [reloadComments, setReloadsComments] = useState(props.reloadComments)
  // const [showComment, setComment] = useState(false)


  useEffect(() => {
    if (props.movieId) {
      axios.get('http://localhost:8001/api/movie/post/' + props.movieId)
        .then(response => {
          setMovieComments(response.data)
          setReloadsComments(!reloadComments)
        })
        .catch(error => console.log(error))
    }
  }, [props.movieId, reloadComments])


  const handleEdit = (user) => {
    props.isLoggedIn ? props.setComment(true) : props.setComment(false)
    props.setDummy(!props.dummy)
    props.setEditedUser(user)
    props.setIsEditFlow(true)
    console.log('clicked');
  }

  const handleDelete = (user) => {
    axios
    .delete("http://localhost:8001/api/movie/post/delete/" + user._id, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      props.setComment(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '20pt', color: 'black', paddingLeft: '30px', fontWeight: "bolder" }}> User Comments </p>
      {displayMovieComments.map((user, index) => {
        return (
          <Paper className="display-comments" key={index}>
            {user.user_id !== null && localStorage.getItem("userId") === user.user_id._id ?
              <div>
                <DeleteForeverIcon className="edit-button" onClick={() => handleDelete(user)} />
                <CreateIcon className="edit-button" onClick={()=>handleEdit(user)} />
              </div> : <p></p>
            }
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{user.user_id === null ? 'Anonymous User' : user.user_id.name}</h4>
                <p style={{ textAlign: "left" }}>
                  {user.text}
                </p>
              </Grid>
            </Grid>
          </Paper>
        )
      })}
    </div>
  )
}

export default DisplayComments
