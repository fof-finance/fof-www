import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Slider,
  Box,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { showSnackbar } from "src/actions/ui";
import {
  stake as stakeCall,
  withdraw as unstakeCall,
  getReward as rewardCall,
  exit as exitCall,
} from "src/actions/reward";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useI18n } from "src/i18n";
import colors from "src/theme/colors";

const useStyles = makeStyles((theme) => ({
  value: {
    cursor: "pointer",
  },
  actionInput: {
    padding: "0px 0px 12px 0px",
    fontSize: "0.5rem",
  },
  balances: {
    width: "100%",
    textAlign: "right",
    paddingRight: "20px",
    cursor: "pointer",
  },
  actionsContainer: {
    paddingBottom: "12px",
    display: "flex",
    flex: "1",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  title: {
    paddingRight: "24px",
  },
  actionButton: {
    height: "36px",
    border: "1px solid " + colors.darkPurple,
    color: colors.darkPurple,
    "&:hover": {
      border: "1px solid " + colors.darkPurple,
      backgroundColor: colors.darkPurple,
      color: "#fff",
    },
    "&:disabled": {
      color: colors.gray,
    },
  },
  tradeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sepperator: {
    borderBottom: "1px solid #E1E1E1",
    margin: "24px",
    [theme.breakpoints.up("sm")]: {
      width: "40px",
      borderBottom: "none",
      margin: "0px",
    },
  },
  scaleContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 0px 12px 0px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  scale: {
    minWidth: "10px",
  },
  buttonText: {
    fontWeight: 700,
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  heading: {
    paddingBottom: "12px",
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  right: {
    textAlign: "right",
  },
  buttons: {
    display: "flex",
    width: "100%",
  },
  disabledContainer: {
    width: "100%",
    paddingTop: "12px",
    textAlign: "center",
  },
}));

function StackActionView(props: any) {
  const i18n = useI18n();
  const classes = useStyles();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const web3React = useWeb3React();
  const { account } = web3React;

  const stake = props.stake;
  console.log(props.BPTLPRequirements)
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [amountError, setAmountError] = React.useState(false);
  const [uamount, setUAmount] = React.useState("");
  const [uamountError, setUAmountError] = React.useState(false);
  const [rewardsAvailable, setrewardsAvailable] = React.useState(
    stake.rewardsAvailable
  );
  const [rewardsAvailableError, setrewardsAvailableError] = React.useState(
    false
  );

  const onChangeAmount = (event: any) => setAmount(event.target.value);
  const onChangeUAmount = (event: any) => setUAmount(event.target.value);

  const onStake = async () => {
    if (amount && parseFloat(amount) > 0 && account) {
      setLoading(true);
      let r = await dispatch(stakeCall(web3React, stake, account, amount));
      showMessage(r);
      setLoading(false);
    }
  };

  const onStakeAll = async () => {
    if (account) {
      setLoading(true);
      let r = await dispatch(
        unstakeCall(web3React, stake, account, stake.balance + "")
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onUnstake = async () => {
    if (uamount && parseFloat(uamount) > 0 && account) {
      setLoading(true);
      let r = await dispatch(unstakeCall(web3React, stake, account, uamount));
      showMessage(r);
      setLoading(false);
    }
  };

  const onUnstakeAll = async () => {
    if (account) {
      console.log(stake.stakedBalance);
      setLoading(true);
      let r = await dispatch(
        unstakeCall(web3React, stake, account, stake.stakedBalance + "")
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onGetReward = async () => {
    if (account) {
      setLoading(true);
      let r = await dispatch(rewardCall(web3React, stake, account));
      showMessage(r);
      setLoading(false);
    }
  };

  const onExit = async () => {
    if (account) {
      setLoading(true);
      let r = await dispatch(exitCall(web3React, stake, account));
      showMessage(r);
      setLoading(false);
    }
  };

  const inputKeyDown = (event: any) => {};

  const inputRedeemReward = (event: any) => {};

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

  const onChangeAmountP = (event: any, newValue: number | number[]) => {
    const value = newValue as number;
    setAmount(
      (((Math.floor(stake.balance * 10000) / 10000) * value) / 100).toFixed(4)
    );
  };
  const onChangeUAmountP = (event: any, newValue: number | number[]) => {
    const value = newValue as number;
    setUAmount(
      (
        ((Math.floor(stake.stakedBalance * 10000) / 10000) * value) /
        100
      ).toFixed(4)
    );
  };

  const valueText = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className={classes.actionsContainer}>
      <div className={classes.tradeContainer}>
        <TextField
          fullWidth
          className={classes.actionInput}
          id="a"
          value={amount}
          error={amountError}
          onChange={onChangeAmount}
          disabled={loading}
          placeholder={
            "Balance: " +
            (stake.balance
              ? (Math.floor(stake.balance * 10000) / 10000).toFixed(4)
              : "0.0000")
          }
          variant="outlined"
          onKeyDown={inputKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment key={stake.symbol} position="end">{stake.symbol}</InputAdornment>
            ),
          }}
        />
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          getAriaValueText={valueText}
          onChange={onChangeAmountP}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
        <div className={classes.buttons}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={onStake}
            fullWidth
          >
            <Typography className={classes.buttonText} variant={"h5"}>
              {i18n.t("stake.stake")}
            </Typography>
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={onStakeAll}
            fullWidth
          >
            <Typography className={classes.buttonText} variant={"h5"}>
              {i18n.t("stake.stakeAll")}
            </Typography>
          </Button>
        </div>
        <div className={classes.buttons}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading || (props.poolName =='POOL 3' && (!props.BPTLPRequirements.balanceValid || !props.BPTLPRequirements.voteLockValid))}
            onClick={onGetReward}
            fullWidth
          >
            <Typography className={classes.buttonText} variant={"h5"}>
              {i18n.t("stake.claimRewards")}
            </Typography>
          </Button>
        </div>
      </div>
      <div className={classes.sepperator}></div>
      <div className={classes.tradeContainer}>
        <TextField
          fullWidth
          className={classes.actionInput}
          id="ua"
          value={uamount}
          error={uamountError}
          onChange={onChangeUAmount}
          placeholder={
            "Balance: " +
            (stake.stakedBalance
              ? (Math.floor(stake.stakedBalance * 10000) / 10000).toFixed(4)
              : "0.0000")
          }
          variant="outlined"
          onKeyDown={inputRedeemReward}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {stake.symbol}
              </InputAdornment>
            ),
          }}
        />
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          getAriaValueText={valueText}
          onChange={onChangeUAmountP}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
        <div className={classes.buttons}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading || (props.poolName =='POOL 3' && !props.BPTLPRequirements.withdrawValid)}
            onClick={onUnstake}
            fullWidth
          >
            <Typography className={classes.buttonText} variant={"h5"}>
              {i18n.t("stake.unstake")}
            </Typography>
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading || (props.poolName =='POOL 3' && !props.BPTLPRequirements.withdrawValid)}
            onClick={onUnstakeAll}
            fullWidth
          >
            <Typography className={classes.buttonText} variant={"h5"}>
              {i18n.t("stake.unstakeAll")}
            </Typography>
          </Button>
        </div>
        <div className={classes.buttons}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            disabled={loading || (props.poolName =='POOL 3' && (!props.BPTLPRequirements.balanceValid || !props.BPTLPRequirements.voteLockValid))}
            onClick={onExit}
            fullWidth
          >
            <Typography variant={"h5"}>{i18n.t("stake.exit")}</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StackActionView;
