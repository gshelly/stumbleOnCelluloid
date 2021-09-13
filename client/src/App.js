import "./App.css";
import { Switch, Route, Redirect } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Navbar from './utils/Navbar';
import Movie from "./components/Movie";
import Registration from "./components/Registration";
import Signin from "./components/Signin";
import { withCookies } from 'react-cookie';
import React, {useState} from "react";
import PostComment from "./components/PostComment";
import ChatRoom from "./components/chatComponents/ChatRoom/ChatRoom"


function App(props) {
  const { cookies } = props;
  const [user, setUser] = useState("")
  const [movieId, setMovieId] = useState("")

  let isLoggedIn = cookies.get('userToken') ? true : false
  
  return (
    <>
    <Navbar  isLoggedIn= {isLoggedIn} user={user? user : localStorage.getItem("userName")}/>
    <Switch>
      <Route exact path="/" component={() => <Movie setMovieId={setMovieId} isLoggedIn= {isLoggedIn} />} ></Route>
      <Route path="/registration" component={Registration} ></Route>
      <Route path="/signin" component={() => <Signin setUser={setUser} />} ></Route>
      <Route path="/postComment" component={() => <PostComment movieId={movieId} />} ></Route>
      <Route exact path="/chatRoom" component={() => <ChatRoom movieQuestion={localStorage.getItem("MovieQestion")} user={user? user : localStorage.getItem("userName")} />} />
      {/* {console.log("mq", movieQuestion)} */}
      <Redirect to="/" />
    </Switch>
  </>
  );
}

export default withCookies(App);