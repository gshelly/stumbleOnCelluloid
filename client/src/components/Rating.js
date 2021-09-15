import React, { useState, useEffect } from 'react'
import '../styles/MoviePage.css'
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import AlertBox from '../utils/AlertBox';


function Rating(props) {
  const [displayMovieRating, setMovieRating,] = useState([])
  const [showAlert, setAlert] = useState(false)
  const [userRating, setUserRating] = useState([])
  const [dummy, setDummy] = useState(props.dummy)
  

  useEffect(() => {
    let userId = localStorage.getItem('userId')
    // if (!props.isLoggedIn && props.movieId) {
  
      axios.get('http://localhost:8001/api/movie/rating/' + props.movieId)  // Avg Movie Rating for all user(guest and loggedin)
        .then(response => {
          localStorage.setItem("movieRating",response.data[0].movieAvgRating)
          setMovieRating(response.data[0])
        })
        .catch(error => console.log(error))
    // }
    // else {
      if (props.isLoggedIn && props.movieId) {
        axios.get('http://localhost:8001/api/movie/rating/' + userId + '/' + props.movieId, {
          withCredentials: true
        })
          .then(response => {
            localStorage.setItem("uRating",response.data[0].rating)
            localStorage.setItem("movieRating",response.data[0].movieAvgRating)
            setUserRating(response.data[0])
            setMovieRating(response.data[0])
            // window.location.reload()
            setDummy(!dummy)
          })
          .catch(error => console.log(error))
      }
    // }
  }, [dummy, props.isLoggedIn, props.movieId])

  const ratingChanged = (newRating) => {
    console.log("displayMovieRating",displayMovieRating);
    if(localStorage.getItem("uRating")) {
      axios
      .put("http://localhost:8001/api/movie/rating/edit/" + displayMovieRating._id, {
        rating: newRating
      }, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("uRating",response.data.rating)
        getMovieRating()

      })
      .catch((err) => {
        console.log(err.data);
      });
    }
    else {
      axios
      .post("http://localhost:8001/api/movie/rating/" + props.movieId, {
        rating: newRating
      }, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("uRating",response.data.rating)
        getMovieRating()
      })
      .catch((err) => {
        console.log(err.data);
      });
    }
  };


  const getMovieRating = () => {
    axios
      .put("http://localhost:8001/api/movie/rating/avg/" + props.movieId, {}, {
        withCredentials: true,
      })
      .then((response) => {
        setDummy(!dummy)
      })
      .catch((err) => {
        console.log("errr", err.response);
      });
  }

  const showAlertBox = (e) => {
    console.log(showAlert);
    props.isLoggedIn ? setAlert(false) : setAlert(true)
  };

  return (
    <div className="rating-Wrapper">
     
      <div id="avg-rating">
        <p>Movie Average Rating:  {displayMovieRating.movieAvgRating} 

        {displayMovieRating.movieAvgRating > 0 ?
       <ReactStars
            count={localStorage.getItem("movieRating")}
            value={localStorage.getItem("movieRating")}
            isHalf={true}
            size={24}
            edit={false}
            fullIcon={<i className="fa fa-star"></i>}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            activeColor="#ffd700" />
        : null}
        </p>
      </div>

      <div id="user-rating">
        <p onClick={showAlertBox}>Your Rating
          {showAlert ? <AlertBox
            open={showAlert}
            title="Login Alert!!"
            content="Stumbleoids!! You need to login to participate in StumbleOnCelluloid"
            isRatingAlert= {true}
          /> : false
          }
            <ReactStars
              count={5}
              value={props.isLoggedIn ? localStorage.getItem("uRating"): 0}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              edit={props.isLoggedIn}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            /> 
        </p>
      </div>


    </div>
  )
}

export default Rating

