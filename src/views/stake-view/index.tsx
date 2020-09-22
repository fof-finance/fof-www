/**
 * @format
 */
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import Stake from "./stake";
import { Check, Clear } from '@material-ui/icons';

import Loader from "../../components/loader.compoent";
import { getRewardBalances, getBPTLPRequirements } from "src/actions/reward";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import colors from "src/theme/colors";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useI18n } from "src/i18n";

const useStyles = makeStyles((theme) => ({
  warning: {
    backgroundColor: "#fff",
    padding: "12px 24px",
    margin: "12px 0",
    border: "1px solid #e0e0e0"
  },
  grey: {
    color: colors.darkGray,
    display: "flex",
    alignItems: 'center'
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
  poolButton: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '100px'
    },
  }
}));

function StackView() {
  const i18n = useI18n();
  const web3React = useWeb3React();
  const dispatch = useDispatch();
  const thdispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  let classes = useStyles();
  const { account } = web3React;
  const [balanceValid, setBalanceValid] = React.useState(false);
  const [voteLockValid, setVoteLockValid] = React.useState(false);
  const [withdrawVaild, setWithdrawValid] = React.useState(false);
  const [BPTLPRequirements, setBPTLPRequirements] = React.useState({});
  React.useEffect(() => {
    if (account) {
      dispatch(getRewardBalances(web3React, account));
      thdispatch(getBPTLPRequirements(web3React, account)).then((result)=> {
        setBalanceValid(result.balanceValid);
        setVoteLockValid(result.voteLockValid);
        setWithdrawValid(result.withdrawValid);
        setBPTLPRequirements({...result})
      })
    }
  }, [account]);


  const poolsList = useSelector((state: RootState) => state.reward.rewardPools);
  const [expanded, setExpanded] = React.useState("");
  const [currentPool, setCurrentPool] = React.useState(0);
  const [loading] = React.useState(false);
  const [stakes, setStakes] = React.useState(poolsList[currentPool].tokens);

  const handleChange = (id: any) => {
    setExpanded(id == expanded ? "" : id);
  };

  const handleChangePool = (
    event: React.MouseEvent<HTMLElement>,
    value: number | null
  ) => {
    if (value != null) {
      setCurrentPool(value);
      setStakes(poolsList[value].tokens);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box className={classes.pageBox}>
        {loading && <Loader />}
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            <ToggleButtonGroup
              value={currentPool}
              exclusive
              onChange={handleChangePool}
              aria-label="text alignment"
            >
              {poolsList.map((pool, index) => {
                return (
                  <ToggleButton
                    className={classes.poolButton}
                    key={index}
                    value={index}
                    aria-label="left aligned"
                  >
                    <Typography variant={"h4"} noWrap component="h4">
                      {pool.name}
                    </Typography>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        {poolsList[currentPool].name == "POOL 3" && (
          <div className={classes.warning}>
            <Typography variant={"h4"} noWrap>
              {i18n.t('stake.pluWarning')}
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t('stake.pluWarning1')} { voteLockValid ? <Check style={{ color: colors.green }} /> : <Clear style={{ color: colors.red }} /> }
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t('stake.pluWarning2')} { balanceValid ? <Check style={{ color: colors.green }} /> : <Clear style={{ color: colors.red }} /> }
            </Typography>
          </div>
        )}
        {stakes &&
          stakes.map((stake: { id: any }) => {
            return (
              <Stake
                key={stake.id}
                stake={stake}
                expanded={expanded}
                handleChange={handleChange}
                poolName={poolsList[currentPool].name}
                BPTLPRequirements={BPTLPRequirements}

              ></Stake>
            );
          })}
      </Box>
    </Container>
  );
}

export default StackView;
