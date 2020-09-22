/**
 * @format
 */
import React from "react";
import {
  makeStyles, Container, Box, Typography, Grid, Button, useTheme, useMediaQuery, Link,
  Accordion, AccordionSummary, AccordionDetails, Theme
} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import clsx from 'clsx';
import ExpandMoreIcon from "src/components/expand.compoent";
import {useWeb3React} from "@web3-react/core";
import {useDispatch, useSelector} from "react-redux";

import {useI18n} from 'src/i18n';
import colors from 'src/theme/colors';
import Loader from 'src/components/loader.compoent';
import {
  getProposals, getVoteStatus, configure, registerVote,
  voteFor, voteAgainst,
  // revokeVote,
} from "src/actions/vote";
import {RootState} from "src/reducers";
import {showSnackbar} from "src/actions/ui";

// import Page from 'src/components/page.component';
// import {getProposalsData} from './data';
import Proposal from './proposal';
import {depositAllVault} from "../../actions/vault";

import ColorButton from 'src/components/color-button.component';

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

const useStyles = makeStyles((theme: Theme) => ({
  ...baseStyles(theme),
  root: {},
  assetSummary: {
    color: colors.colorTextBase,
    padding: theme.spacing(3, 6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 5),
    }
  },
  assetDetail: {
    padding: theme.spacing(3, 6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 5),
    }
  },
  itemBox: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1)
    },
  },
  itemTitle: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    }
  },
  itemLabel: {
    color: colors.colorTextSecondary,
    fontSize: '14px',
    marginTop: '4px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
    '& .number': {
      fontSize: '16px',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    }
  },
  claimContainer: {
    display: 'flex',
    alignItems: 'center',
    background: colors.white,
    width: '100%',
    height: '88px',
    borderRadius: '4px',
    border: `1px solid ${colors.gray}`
  },
  stakeTitle: {
    fontSize: '20px',
    width: '100%',
    color: colors.darkGray,
    textAlign: 'center',
  },
  pageBox: {
    paddingTop: '70px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '50px'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '30px'
    },
  },
  controlBox: {
    marginBottom: '37px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '27px',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '15px',
    },
  },
  voteBtn: {
    padding: '3px 40px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 20px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '3px 10px',
    },
  },
  toggleBtn: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '110px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto'
    },
  }
}));
const getShowNameOfUser = (id: string, startNum: number = 8, endNum: number = 6) => {
  return id.substr(0, startNum) + '...' + id.substr(id.length - endNum, id.length)
};
const convertNumber = (num: string): number => {
  return parseFloat(num) / 10 ** 18
}

const getNumber = (num: string, fixedNum: number = 4): string => {
  return convertNumber(num).toLocaleString(undefined, {
    maximumFractionDigits: fixedNum,
    minimumFractionDigits: fixedNum
  })

};

function VoteView(props: any) {
  const classes = useStyles();
  const i18n = useI18n();
  const web3React = useWeb3React();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<number | null>(1);
  const [loading, setLoading] = React.useState(false)
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const {account} = web3React

  const voteState = useSelector((state: RootState) => state.vote);
  const {
    proposals,
    voting: votingStatus
  } = voteState;
  console.log('proposals', proposals);

  let now = voteState.currentBlock;
  // if (now) {
  //   now = 10788745
  // }

  React.useEffect(() => {
    dispatch(configure(web3React));
  }, [dispatch, web3React])
  React.useEffect(() => {
    if (account) {
      dispatch(getProposals(web3React, account));
      dispatch(getVoteStatus(web3React, account));
    }
  }, [account, dispatch, web3React]);


  const handleChange = (event: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (value !== null) {
      setValue(value)
    }
  };
  // const proposals = getProposalsData();

  let filteredProposals: any[] = [];
  if (proposals) {
    filteredProposals = proposals.filter((proposal: any): boolean => {
      return proposal.proposer != '0x0000000000000000000000000000000000000000'
    }).filter((proposal: any): boolean => {
      return (value === 0 ? proposal.end < now : proposal.end > now)
    })
  }

  const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault()
  }
  const onGtVoteStatus = async () => {
    if (account) {
      setLoading(true)
      const r = await dispatch(registerVote(web3React, account));
      showMessage(r)
      setLoading(false)
    }
  };

  const onVoteFor = async (proposal: any) => {
    if (account) {
      setLoading(true)
      const r = await dispatch(voteFor(web3React, proposal, account));
      showMessage(r)
      setLoading(false)
    }
  };
  const onVoteAgainst = async (proposal: any) => {
    if (account) {
      setLoading(true)
      const r = await dispatch(voteAgainst(web3React, proposal, account));
      showMessage(r)
      setLoading(false)
    }
  };
  const showMessage = (r: any) => {
    if (r.error) {
      dispatch(
          showSnackbar({
            type: "Error",
            message: r.error,
          })
      );
    } else {
      dispatch(
          showSnackbar({
            type: "Success",
            message: "TX " + r.depositResult + "sended.",
          })
      );
    }
    setLoading(false);
  };

  const renderProposals = () => {
    if (filteredProposals.length === 0) {
      return (
          <div className={classes.claimContainer}>
            {proposals ?
                <Typography className={classes.stakeTitle} variant={'h3'}>{i18n.t('vote.no proposals')}</Typography>
                :
                <Typography className={classes.stakeTitle}
                            variant={'h3'}>{i18n.t('vote.proposalsLoading')}...</Typography>
            }

          </div>
      )
    }
    // todo
    const EtherscanUrl = ''

    return filteredProposals.map((proposal) => {
      let address = null;
      if (proposal.proposer) {
        address = getShowNameOfUser(proposal.proposer)
      }

      return (
          <Accordion square key={proposal.id + "_expand"}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.assetSummary}
            >
              <Grid container>
                <Grid item xs={12} sm={6} md={2} className={classes.itemBox}>
                  <Typography className={classes.itemTitle} variant={'h3'}> {proposal.id} </Typography>
                  <Typography variant={'h5'} className={classes.itemLabel}>&nbsp;</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.itemBox}>
                  <Link href={EtherscanUrl} onClick={stopPropagation} className={classes.itemTitle}>{address}</Link>
                  <Typography variant={'h5'} className={classes.itemLabel}>{i18n.t('vote.proposer')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.itemBox}>
                  <Typography className={classes.itemTitle} variant={'h3'}>
                    {proposal.totalForVotes ? getNumber(proposal.totalForVotes) : 0}
                  </Typography>
                  <Typography variant={'h5'} className={classes.itemLabel}>
                    <span className={classes['ml-xs']}>{i18n.t('vote.voteForRate')}:</span>
                    <span className={clsx([value === 1 ? classes.blue : classes.colorBase, 'number'])}>
                      {proposal.totalForVotes !== "0" ? (convertNumber(proposal.totalForVotes) / (convertNumber(proposal.totalForVotes) + convertNumber(proposal.totalAgainstVotes)) * 100).toFixed(2) : 0}
                    </span>
                    <span>%</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.itemBox}>
                  <Typography className={classes.itemTitle} variant={'h3'}>
                    {proposal.totalAgainstVotes ? getNumber(proposal.totalAgainstVotes) : 0}
                  </Typography>
                  <Typography variant={'h5'} className={classes.itemLabel}>
                    <span className={classes['ml-xs']}>{i18n.t('vote.voteAgainstRate')}:</span>
                    <span className={clsx([value === 1 ? classes.red : classes.colorBase, 'number'])}>
                      {proposal.totalAgainstVotes !== "0" ? (convertNumber(proposal.totalAgainstVotes) / (convertNumber(proposal.totalForVotes) + convertNumber(proposal.totalAgainstVotes)) * 100).toFixed(2) : 0}
                    </span>
                    <span>%</span>
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.assetDetail}>
              <Proposal
                  loading={loading}
                  proposal={proposal}
                  onSetLoading={setLoading}
                  votingStatus={votingStatus || true}
                  onVoteFor={onVoteFor}
                  onVoteAgainst={onVoteAgainst}
                  currentBlock={now}/>
            </AccordionDetails>
          </Accordion>
      )
    })
  }

  return (
      <Container component="main" maxWidth="lg">
        <Box className={classes.pageBox}>
          <Grid container justify="space-between" alignItems="center" className={clsx([classes.controlBox])}>
            <Grid>
              <ToggleButtonGroup
                  value={value}
                  exclusive
                  onChange={handleChange}
                  aria-label="text alignment"
                  size={upSm ? 'medium' : 'small'}
              >
                <ToggleButton value={0} aria-label="left aligned" className={classes.toggleBtn}>
                  <Typography variant={'h4'} noWrap component="h4">
                    {i18n.t('vote.finished')}
                  </Typography>
                </ToggleButton>
                <ToggleButton value={1} aria-label="centered" className={classes.toggleBtn}>
                  <Typography variant={'h4'} noWrap component="h4">
                    {i18n.t('vote.unfinished')}
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>

            </Grid>
            <Grid>
              <ColorButton
                  size={upSm ? 'medium' : 'small'}
                  variant="outlined"
                  color="primary"
                  onClick={onGtVoteStatus}
                  disabled={loading || !account}
                  className={clsx(["border-radius", classes.voteBtn])}
              >{i18n.t('vote.getVote')}</ColorButton>
            </Grid>
          </Grid>
          {loading && <Loader/>}
          {renderProposals()}
        </Box>
      </Container>);

}

export default VoteView;
