import React, { useState, useEffect } from 'react'
import '../styles/MoviePage.css'
import ReactPlayer from "react-player";
import moviePic from '../images/inceptionProfile.jpg'
import axios from 'axios';
import Rating from './Rating';
import DisplayComments from './DisplayComment';
import Question from './Question';
import AlertBox from '../utils/AlertBox';
// import { useHistory } from 'react-router-dom'
import PostComment from './PostComment';
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";


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
    axios.get('http://localhost:8000/api/movie')
      .then(response => {
        setMovie(response.data[0])
        localStorage.setItem("MovieQestion", response.data[0].movieQuestion)
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
    if (props.isLoggedIn) {
      history.push('/chatRoom')
    }

  }


  return (
    <div>
      <div className="video-background">
        <div class="overlay">
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
        <div>
          <img src={moviePic} alt="moviePic" className="movieImage" ></img>
          <Rating
          movieId={displayMovie._id}
          isLoggedIn={props.isLoggedIn}
          setDummy={!dummy}
        />
        </div>
          <div className="content-desc">
            <h1 style={{ color: "black", textAlign: 'left', paddingTop: "30px", fontSize: "35px", fontWeight: "bolder" }}> Pick Of The Day: <span style={{ color: "#c90c0c", fontWeight: "bolder", fontSize: "40px" }}>{displayMovie.movieTitle} </span></h1>
            <p>{displayMovie.movieDescription}</p>
            <table style={{ width: "550px", fontSize: "1.1rem" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px 10px 0px 0px", color: "black", width: "10%" }}> Director: </td>
                  <td style={{ padding: "5px 20px 0px 0px", color: "black"}}> Christopher Nolan </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px 10px 0px 0px", color: "black", width: "10%" }}> Writer: </td>
                  <td style={{ padding: "5px 20px 0px 0px", color: "black"}}> Christopher Nolan </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px 10px 0px 0px", color: "black", width: "10%" }}> Stars: </td>
                  <td style={{ padding: "5px 20px 0px 0px", color: "black" }}> Leonardo DiCaprioJoseph Gordon-LevittElliot Page </td>
                </tr>
              </tbody>
            </table>
            {/* <hr style={{color:"black"}}/> */}
            <svg width="500px" height="10%">
              <text x="18%" y="80%" text-anchor="middle"  >
                Fun Facts
              </text>
            </svg>
            <Paper className="display-comments" style={{margin:"0px 30px 0px 0px"}}>
            <table style={{ width: "700px" }}>
              <tbody>
                <tr >
                  <td style={{ padding: "0px 20px 10px 0px", color: "black", fontSize: "1.3rem", width: "10%" }}>  
                   Inception was initially toyed with idea of making it a horror movie.
                  </td>
                </tr>
                <tr >
                  <td style={{ padding: "0px 20px 10px 0px", color: "black", fontSize: "1.3rem", width: "10%" }}>  
                   The famous hotel fight sequence was shot in a set that was shifting and rotating.
                  </td>
                </tr>
              </tbody>
            </table>
            </Paper>
           
          </div>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button-class" style={{ width: "50%" }} onClick={handleComments}>Add a Comment</button>
          <button className="button-class" style={{ width: "50%" }} onClick={handleChat}>Join Group Discussion</button>
          {showAlert ? <AlertBox
            open={showAlert}
            title="Login Alert!!"
            content="Stumbleoids!! You need to login to participate in StumbleOnCelluloid"
            setAlert={setAlert}
            showAlert={showAlert}
            isRatingAlert={false}
          /> : false
          }

          {showComment ? <PostComment
            open={showComment}
            setComment={setComment}
            movieId={displayMovie._id}
            editedUser={editedUser}
            isEditFlow={isEditFlow}
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
