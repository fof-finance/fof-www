import React from "react";
import {
  makeStyles, Typography, TextField, Button, Slider, Box, Grid
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
  depositVault,
  depositAllVault,
  withdrawVault,
  withdrawAllVault,
} from "src/actions/vault";
import {useWeb3React} from "@web3-react/core";
import {showSnackbar} from "src/actions/ui";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {all} from "async";
import colors from "src/theme/colors";
import {count} from "console";
import {useI18n} from 'src/i18n';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  inputWidth: {
    width: '320px'
  },
  buttonText: {
    fontWeight: 700,
  },
  countInputBox: {
    width: '100%'
  },
  countInput: {
    padding: "0px 0px 12px 0px",
    fontSize: "0.5rem",
  },
  buttons: {
    display: "flex",
    width: "100%",
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
    }
  },
  symbolBox: {
    position: 'relative'
  },
  haSymbol: {
    '& .MuiInputBase-input': {
      paddingRight: 55
    }
  },
  symbolItem: {
    position: 'absolute',
    top: 13,
    right: 19,
    fontSize: '16px',
  }
}));

function CountInput(props: any) {
  const {
    count, symbol, disabled, countError, id, allCount,
    hasOk = true, hasAllOk = true, okText = "ok", allOkText = 'all ok',
    onCountChange, onCountOk, onCountAllOk
  } = props;
  const haSymbol = !!symbol;
  const classes = useStyles();
  const onInputChange = (event: any) => onCountChange(event.target.value);
  const valueText = (value: number) => {
    return `${value}%`;
  }
  const onSliderChange = (event: any, newValue: number | number[]) => {
    const value = newValue as number
    onCountChange((((Math.floor(allCount * 10000) / 10000) * value) / 100).toFixed(4));
  }
  const onOk = () => {
    onCountOk(count)
  };
  const onAllOk = async () => {
    onCountChange(allCount.toFixed(4));
    onCountAllOk(allCount);
  };

  return (
      <Box className={classes.countInputBox}>
        <Box className={clsx([haSymbol ? classes.haSymbol : '', classes.symbolBox])}>
          <TextField
              fullWidth
              className={classes.countInput}
              id={id}
              value={count}
              error={countError}
              onChange={onInputChange}
              disabled={disabled}
              placeholder="0.00"
              variant="outlined"
          />
          {haSymbol && <span className={classes.symbolItem}>{symbol}</span>}
        </Box>
        <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            getAriaValueText={valueText}
            onChange={onSliderChange}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
        />
        <div className={classes.buttons}>
          {hasOk === true && (
              <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={disabled}
                  onClick={onOk}
                  fullWidth
              >
                <Typography className={classes.buttonText} variant={"h5"}>
                  {okText}
                </Typography>
              </Button>
          )}
          {hasAllOk === true && (
              <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={disabled}
                  onClick={onCountAllOk}
                  fullWidth
              >
                <Typography className={classes.buttonText} variant={"h5"}>
                  {allOkText}
                </Typography>
              </Button>
          )}
        </div>
      </Box>
  )
}

function AssetsActionView(props: any) {
  const classes = useStyles();
  const i18n = useI18n();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const web3React = useWeb3React();
  const {account} = web3React;
  const asset = props.asset;
  const symbol = asset.source.symbol;
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [redeemAmount, setRedeemAmount] = React.useState("");

  const onChange = (event: any) => setAmount(event.target.value);
  const onChangeWithdraw = (event: any) => setRedeemAmount(event.target.value);

  const inputKeyDown = (event: any) => {
  };
  const inputRedeemKeyDown = (event: any) => {
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

  const onDeposit = async () => {
    if (amount && account) {
      setLoading(true);
      let r = await dispatch(
          depositVault(web3React, account, asset, amount + "")
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onDepositAll = async () => {
    if (amount && account) {
      setLoading(true);
      let r = await dispatch(depositAllVault(web3React, account, asset));
      showMessage(r);
      setLoading(false);
    }
  };

  const onWithdraw = async () => {
    if (redeemAmount && account) {
      setLoading(true);
      let r = await dispatch(
          withdrawVault(web3React, account, asset, redeemAmount + "")
      );
      showMessage(r);
      setLoading(false);
    }
  };

  const onWithdrawAll = async () => {
    if (redeemAmount && account) {
      setLoading(true);
      let r = await dispatch(withdrawAllVault(web3React, account, asset));
      showMessage(r);
      setLoading(false);
    }
  };


  const {balance, depositedBalance} = asset
  return (
      <Box>
        <Grid container>
          <Grid item container justify="center" xs={12} sm={12} md={6}>
            <Box className={classes.inputWidth}>
              <CountInput
                  count={amount}
                  symbol={symbol}
                  disabled={loading}
                  id='c1'
                  allCount={balance}
                  okText={i18n.t('deposit')}
                  allOkText={i18n.t('depositAll')}
                  onCountChange={setAmount}
                  onCountOk={() => {
                    console.log('count ok')
                  }}
                  onCountAllOk={() => {
                    console.log('count ok all')
                  }}
              />
            </Box>
          </Grid>
          <Grid item container justify="center" xs={12} sm={12} md={6}>
            <Box className={classes.inputWidth}>
              <CountInput
                  count={redeemAmount}
                  symbol={symbol}
                  disabled={loading}
                  id='c1'
                  allCount={depositedBalance}
                  okText={i18n.t('withdraw')}
                  allOkText={i18n.t('withdrawAll')}
                  onCountChange={setRedeemAmount}
                  onCountOk={() => {
                    console.log('count ok')
                  }}
                  onCountAllOk={() => {
                    console.log('count ok all')
                  }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
}

export default AssetsActionView;
