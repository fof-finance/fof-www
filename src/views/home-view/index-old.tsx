/**
 * @format
 */
import React from "react";
import { makeStyles, Typography, Avatar, CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import logo from 'src/assets/img/logo.png';
import Wallet from "src/views/home-view/wallet-modal"
import colors from 'src/theme/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  subtitle: {
    color: colors.gray,
    margin: theme.spacing(2, 4),
  },
  paper: {
    margin: theme.spacing(0, 4),
    display: "flex",
    height: '100%',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
}));

function HomeView() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo}>
          </Avatar>
          <Typography component="h1" variant="h1">
            Plouto
          </Typography>
          <Typography component="h1" variant="h5" className={classes.subtitle}>
            Next Generalization Blockchain Finance Platform
          </Typography>
           <Wallet></Wallet>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomeView;
