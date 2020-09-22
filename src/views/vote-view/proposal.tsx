import React from "react";
import {
  makeStyles,
  Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Link, Button, Box, Theme
} from "@material-ui/core";
// import Page from "src/components/page.component";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useI18n} from 'src/i18n';
import colors from 'src/theme/colors';
import CopyIcon from '@material-ui/icons/FileCopy';
import moment from 'moment';
import colorbutton from 'src/components/color-button.component';
import ColorButton from "src/components/color-button.component";

const baseStyles = (theme: Theme) => (
    {
      mt: {marginTop: theme.spacing(2)},
      mb: {marginBottom: theme.spacing(2)},
      'ml-xs': {marginRight: theme.spacing(0.5)},
      grey: {color: colors.gray},
      blue: {color: colors.blue},
      red: {color: colors.red},
      colorBase: {color: colors.colorTextBase},
      colorSecondary: {color: colors.colorTextSecondary},
    }
)
export const useStyles = makeStyles((theme: Theme) => ({
  ...baseStyles(theme),
  itemBox: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1)
    },
  },
  itemContent: {
    minHeight: '50px',
    [theme.breakpoints.down('md')]: {
      minHeight: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '20px',
    },
    '&:last-child': {
      marginTop: '24px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '0px',
      },
    }
  },
  itemTitle: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  itemTitleBig: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  itemLabel: {
    color: colors.darkGray,
    fontSize: '14px',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
    '&>span': {
      marginRight: theme.spacing(0.5)
    }
  },
  root: {
    position: 'relative',
    width: '100%',
  },
  line: {
    position: 'absolute',
    top: '-17px',
    left: '0',
    width: '100%',
    height: '1px',
    background: colors.gray,
  },
  actionButton: {
    width: '136px',
    height: '36px'
  },
}));

const handleChange = (id: string) => {

}

function Proposal(props: any) {
  const classes = useStyles();
  const i18n = useI18n();
  const {proposal, currentBlock, votingStatus, loading, onVoteFor, onVoteAgainst,} = props;
  const [currentTime] = React.useState(Date.now());

  const blocksTillEnd = proposal.end - currentBlock
  const blocksSinceStart = currentBlock - proposal.start

  const endTime = currentTime + (blocksTillEnd * 1000 * 13.8)
  const startTime = currentTime - (blocksSinceStart * 1000 * 13.8)

  // todo
  const yipURL = `https://yips.yearn.finance/YIPS/yip-${proposal.id}`;

  var address = null;
  if (proposal.executor) {
    address = proposal.executor.substring(0, 8) + '...' + proposal.executor.substring(proposal.executor.length - 6, proposal.executor.length)
  }
  // todo
  const hashURL = proposal.hash
  const showBtn = proposal.end > currentBlock && votingStatus;

  return (
      <Box className={classes.root}>
        <div className={classes.line}/>
        <Grid container>
          <Grid item container xs={12} sm={12} md={9}>
            <Grid item xs={12} sm={2} md={3} className={classes.itemBox}>

              <div className={classes.itemContent}>
                <Link href={yipURL} className={classes.itemTitle} target="_blank">YIP</Link>
              </div>

              <div className={classes.itemContent}>
                <Link href={hashURL} className={classes.itemTitle} target="_blank">IPFS</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5} className={classes.itemBox}>
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle} variant={'h3'}> {address} </Typography>
                <Typography variant={'h5'} className={classes.itemLabel}> {i18n.t('vote.proposer')}</Typography>
              </div>
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle} variant={'h3'}>
                  {(proposal.quorum / 100).toFixed(2)}% / {(proposal.quorumRequired / 100).toFixed(2)}%
                </Typography>
                <Typography variant={'h5'}
                            className={classes.itemLabel}> {i18n.t('vote.quorum')}/{i18n.t('vote.required')}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={4} className={classes.itemBox}>
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle}
                            variant={'h3'}> {moment(startTime).format("YYYY/MM/DD kk:mm")} </Typography>
                <Typography variant={'h5'} className={classes.itemLabel}>
                  <span>{i18n.t('vote.voteStart')}:</span>
                  {proposal.start}
                </Typography>
              </div>
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle}
                            variant={'h3'}> {moment(endTime).format("YYYY/MM/DD kk:mm")} </Typography>
                <Typography variant={'h5'} className={classes.itemLabel}>
                  <span>{i18n.t('vote.voteEnd')}:</span>
                  {proposal.start}
                </Typography>
              </div>
            </Grid>
          </Grid>
          {
            showBtn &&
            (
                <Grid item container xs={12} sm={12} md={3}>
                  <Grid item xs={6} sm={6} md={12} className={classes.itemBox}>
                    <ColorButton
                        className={classes.actionButton}
                        variant="contained"
                        color="primary"
                        disabled={loading || proposal.end < currentBlock}
                        onClick={() => {
                          onVoteFor(proposal);
                        }}
                    >
                      <Typography variant={'h5'}>{i18n.t('vote.voteFor')}</Typography>
                    </ColorButton>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12} className={classes.itemBox}>
                    <ColorButton
                        className={classes.actionButton}
                        variant="outlined"
                        color="primary"
                        disabled={loading || proposal.end < currentBlock}
                        onClick={() => {
                          onVoteAgainst(proposal);
                        }}
                    >
                      <Typography variant={'h5'}>{i18n.t('vote.voteAgainst')}</Typography>
                    </ColorButton>
                  </Grid>
                </Grid>
            )
          }
        </Grid>
      </Box>
  )
}

export default Proposal;
