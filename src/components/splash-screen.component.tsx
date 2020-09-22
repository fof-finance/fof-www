/**
 * @format
 */
import React from 'react';
import {
  makeStyles,
  Box,
  CircularProgress
} from '@material-ui/core';
import Logo from 'src/components/logo.component';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  },
  logo: {
    width: 100,
    height: 100,
  }
}));

function SplashScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        mb={6}
      >
        <Logo className={classes.logo}/>
      </Box>
      <CircularProgress/>
    </div>
  );
}

export default SplashScreen;
