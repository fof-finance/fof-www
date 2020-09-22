import React from 'react';
import {makeStyles, Typography} from '@material-ui/core'
import colors from "../theme/colors";

const useStyles = makeStyles((theme) => ({
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '100%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      minWidth: '900px',
    }
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid rgb(174, 174, 174)',
    borderRadius: '0.75rem',
    lineHeight: '1.2',
    background: colors.white
  },
}));

type BetaProps = {
  text?: string;
}

function BetaWarn(props: BetaProps) {
  const {text = 'This project is in beta. Use at your own risk.'} = props;
  const classes = useStyles();
  return (
      <div className={classes.investedContainer}>
        <Typography variant={'h5'} className={classes.disaclaimer}>
          {text}
        </Typography></div>
  )
}

export default BetaWarn;
