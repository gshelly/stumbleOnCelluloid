import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from 'react-router-dom'
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    height: "70vh",
    backgroundColor: "white",
    marginTop: '50px'
  },

  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
}));

const Signin = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [passErr, setPassErr] = useState("");
  let history = useHistory()
  // let cookie = Cookies()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const postData = { email, password };
    axios
      .post("http://localhost:8001/api/login", postData, {
        withCredentials: true,
      })
      .then((response) => {
        props.setUser(response.data.queriedUser.name)
        localStorage.setItem("userName", response.data.queriedUser.name);
        localStorage.setItem("userId", response.data.queriedUser._id);
        history.push('/')
        window.location.reload();
      })
      .catch((error) => {
        if(error.response.status === 401) {
          setErr(error.response.data.message)
        }
        else if(error.response.status === 402) {
          setErr(error.response.data.message)
          setPassErr(error.response.data.message)
        }
        else if (error.response.status === 403) {
          setPassErr(error.response.data.message)
        }
        // console.log("error",error.response.status);
        // setPassErr(error)
      });
  };

  // const handleLogout = () => {
  //   axios
  //     .post("http://localhost:8001/api/logout")
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  // };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            error={err ? true : false}
            helperText={err}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            error={passErr ? true : false}
            helperText={passErr}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Signin;
