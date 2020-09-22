import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Slider,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  depositVault,
  depositAllVault,
  withdrawVault,
  withdrawAllVault,
} from "src/actions/vault";
import { useWeb3React } from "@web3-react/core";
import { showSnackbar } from "src/actions/ui";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import colors from "src/theme/colors";
import { useI18n } from "src/i18n";

const useStyles = makeStyles((theme) => ({
  value: {
    cursor: "pointer",
  },
  actionInput: {
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
  inputSymbol: {
    padding: "14px",
    width: "100%",
    "margin-bottom": "12px",
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
}));

function AssetsActionView(props: any) {
  const classes = useStyles();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const web3React = useWeb3React();
  const { account } = web3React;
  
  const i18n = useI18n();
  const asset = props.asset;

  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [amountError] = React.useState(false);
  const [wAmount, setwAmount] = React.useState("");
  const [wAmountError] = React.useState(false);

  const onChange = (event: any) => setAmount(event.target.value);
  const onChangeWithdraw = (event: any) => setwAmount(event.target.value);

  const inputKeyDown = () => {};
  const inputRedeemKeyDown = () => {};

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

  const onDeposit = async () => {
    if (amount && parseFloat(amount) > 0 && account) {
      setLoading(true);
      let r = await dispatch(
        depositVault(web3React, account, asset, amount)
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onDepositAll = async () => {
    if (account) {
      setLoading(true);
      let r = await dispatch(depositAllVault(web3React, account, asset));
      showMessage(r);
      setLoading(false);
    }
  };

  const onWithdraw = async () => {
    if (wAmount && parseFloat(wAmount) > 0 && account) {
      setLoading(true);
      let r = await dispatch(
        withdrawVault(web3React, account, asset, wAmount)
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onWithdrawAll = async () => {
    if (account) {
      setLoading(true);
      let r = await dispatch(withdrawAllVault(web3React, account, asset));
      showMessage(r);
      setLoading(false);
    }
  };



  const onChangeAmountP = (event: any, newValue: number | number[]) => {
    const value = newValue as number;
    setAmount(
      (((Math.floor(asset.balance * 10000) / 10000) * value) / 100).toFixed(4)
    );
  };
  const onChangewAmountP = (event: any, newValue: number | number[]) => {
    const value = newValue as number;
    setwAmount(
      (
        ((Math.floor(asset.vaultBalance * 10000) / 10000) * value) /
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
          id="amount"
          value={amount}
          error={amountError}
          onChange={onChange}
          disabled={loading}
          placeholder={
            "Balance: " +
            (asset.balance
              ? (Math.floor(asset.balance * 10000) / 10000).toFixed(4)
              : "0.0000")
          }
          variant="outlined"
          onKeyDown={inputKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{asset.symbol}</InputAdornment>
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
          {asset.deposit === true && (
            <Button
              className={classes.actionButton}
              variant="outlined"
              color="primary"
              disabled={loading || asset.depositDisabled === true}
              onClick={onDeposit}
              fullWidth
            >
              <Typography className={classes.buttonText} variant={"h5"}>
                {i18n.t("vault.deposit")}
              </Typography>
            </Button>
          )}
          {asset.depositAll === true && (
            <Button
              className={classes.actionButton}
              variant="outlined"
              color="primary"
              disabled={loading || asset.depositDisabled === true}
              onClick={onDepositAll}
              fullWidth
            >
              <Typography className={classes.buttonText} variant={"h5"}>
                {i18n.t("vault.depositAll")}
              </Typography>
            </Button>
          )}
        </div>
        {asset.depositDisabled === true && (
          <div className={classes.disabledContainer}>
            <Typography variant="h4">
              Deposits are currently disabled for this vault
            </Typography>
          </div>
        )}
      </div>
      <div className={classes.sepperator}></div>
      <div className={classes.tradeContainer}>
        <TextField
          fullWidth
          className={classes.actionInput}
          id="wAmount"
          value={wAmount}
          error={wAmountError}
          onChange={onChangeWithdraw}
          disabled={loading}
          placeholder={
            "Balance: " +
            (asset.vaultBalance
              ? (Math.floor(asset.vaultBalance * 10000) / 10000).toFixed(4)
              : "0.0000")
          }
          variant="outlined"
          onKeyDown={inputRedeemKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {asset.vaultSymbol}
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          getAriaValueText={valueText}
          onChange={onChangewAmountP}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
        <div className={classes.buttons}>
          {asset.withdraw === true && (
            <Button
              className={classes.actionButton}
              variant="outlined"
              color="primary"
              disabled={loading}
              onClick={onWithdraw}
              fullWidth
            >
              <Typography variant={"h5"}>
                {i18n.t('vault.withdraw')}
              </Typography>
            </Button>
          )}
          {asset.withdrawAll === true && (
            <Button
              className={classes.actionButton}
              variant="outlined"
              color="primary"
              disabled={loading}
              onClick={onWithdrawAll}
              fullWidth
            >
              <Typography variant={"h5"}> {i18n.t('vault.withdrawAll')}</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetsActionView;
