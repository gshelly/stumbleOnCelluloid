import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import background from "../images/InceptionBackground1.jpg"


const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: "white"
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#9dd0c8",
    color: "black",
    '&:hover': {
      backgroundColor: '#eb8479',
      color: '#black',
  },
  },
}));

const Registration= () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      name: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    
    try {
      await axios.post("http://localhost:8001/api/register", postData);
      history.push('/signin')
    } catch (err) {
      console.log(err.response.data.errors);
      setErr(err.response.data.errors);
    }
  }

  return (
    <div style={{backgroundImage:`url(${background})`, backgroundSize:"cover", padding: "70px 0px"}}>
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                error={err.name ? true : false}
                helperText={err.name ? err.name.message : "" }
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={err.email ? true : false}
                helperText={err.email ? err.email.message : "" }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={err.password ? true : false}
                helperText={err.password ? err.password.message : "" }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={err.confirmPassword ? true : false}
                helperText={err.confirmPassword ? err.confirmPassword.message : "" }
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <MadeWithLove />
      </Box> */}
    </Container>
    </div>
  );
}

export default Registration;