import React, { useState, useEffect } from 'react'
import '../styles/MoviePage.css'
import ReactPlayer from "react-player";
import moviePic from '../images/InceptionProfile.jpeg'
import axios from 'axios';
import Rating from './Rating';
import DisplayComments from './DisplayComment';
import Question from './Question';
import AlertBox from '../utils/AlertBox';
// import { useHistory } from 'react-router-dom'
import PostComment from './PostComment';
import { useHistory } from "react-router-dom";


function Movie(props) {
  const [displayMovie, setMovie] = useState([])
  const [showAlert, setAlert] = useState(false)
  const [showComment, setComment] = useState(false)
  const [reloadComments, setReloadsComments] = useState(false)
  const [dummy, setDummy] = useState(false)
  const [editedUser, setEditedUser] = useState({})
  const [isEditFlow, setIsEditFlow] = useState(false)
  let history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:8001/api/movie')
      .then(response => {
        setMovie(response.data[0])
        localStorage.setItem("MovieQestion",response.data[0].movieQuestion)
        // props.setMovieQuestion(response.data[0].movieQuestion)
      })
      .catch(error => console.log(error))
  }, [dummy, props])

  const handleComments = () => {
    props.isLoggedIn ? setAlert(false) : setAlert(true)
    props.isLoggedIn ? setComment(true) : setComment(false)
    setIsEditFlow(false)
    setEditedUser({})
  }

  const handleChat = () => {
    props.isLoggedIn ? setAlert(false) : setAlert(true)
    if(props.isLoggedIn) {
      history.push('/chatRoom')
    }
    
  }
  

  return (
    <div>
      <div className="video-background">
        <div className="overlay">
          <ReactPlayer
            url="https://www.youtube.com/embed/YoHD9XEInc0?start=10&end=30&version=3&autoplay=0&controls=0"
            loop={true}
            playing
            style={{ pointerEvents: 'none' }}
            volume={0}
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  start: 10,
                  end: 30
                }
              }
            }}
          />
        </div>
      </div>
      <div class="wrapper">
        <div className="top-content">
          <img src={moviePic} alt="moviePic" className="movieImage" ></img>
          <div className="content-desc">
            <h1 style={{ color: "black", textAlign: 'center', paddingTop: "30px" }}> Pick Of The Day: <span style={{ color: "#c90c0c" }}>{displayMovie.movieTitle} </span></h1>
            <p>{displayMovie.movieDescription}</p>
          </div>
        </div>
        <Rating
          movieId={displayMovie._id}
          isLoggedIn={props.isLoggedIn}
          setDummy = {!dummy}
        />
        <Question movieQuestion={displayMovie.movieQuestion} />
        {/* <h2 style={{ textAlign: 'center' }}>Q {displayMovie.movieQuestion}</h2> */}
        <DisplayComments
          movieId={displayMovie._id}
          reloadComments={reloadComments}
          setReloadsComments={setReloadsComments}
          isLoggedIn={props.isLoggedIn}
          setComment={setComment}
          setDummy={setDummy}
          dummy={dummy}
          setEditedUser={setEditedUser}
          setIsEditFlow={setIsEditFlow}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="button-class" onClick={handleComments}>Add a Comment</button>
          <button className="button-class" onClick = {handleChat}>Join Group Discussion</button>
          {showAlert ? <AlertBox
            open={showAlert}
            title="Login Alert!!"
            content="Stumbleoids!! You need to login to participate in StumbleOnCelluloid"
            setAlert={setAlert}
            showAlert={showAlert}
            isRatingAlert= {false}
          /> : false
          }

          {showComment ? <PostComment
            open={showComment}
            setComment={setComment}
            movieId={displayMovie._id}
            editedUser={editedUser}
            isEditFlow = {isEditFlow}
          /> : false
          }
        </div>
      </div>
      <div className="background-div">
      </div>
    </div>
  )
}

export default Movie
