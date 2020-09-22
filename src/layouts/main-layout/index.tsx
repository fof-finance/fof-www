/**
 * @format
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import TopBar from 'src/layouts/main-layout/top-bar.component';
import SwipeableTemporaryDrawer from "src/layouts/main-layout/navigation.component";
import bg from 'src/assets/img/global-bg.png';
import Background from 'src/assets/img/background.png';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url('+Background+')',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    backgroundSize: "cover"
  },
  wrapper: {
    overflowX: 'hidden',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '64px',
    },
    overflowY: 'auto',
    position: 'relative',
    overflowScrolling:'touch',
    webkitOverflowScrolling: 'touch'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
}));

export interface MainLayoutProps {
  children?: any;
  className?: any;
}

function MainLayout(props: MainLayoutProps) {
  const classes = useStyles();
  const { className, children } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <TopBar handleOpen={() => setOpen(true)} />
      <SwipeableTemporaryDrawer
        open={open}
        handleOpen={() => setOpen(false)}
      />
      <div className={clsx(classes.wrapper, className)}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
