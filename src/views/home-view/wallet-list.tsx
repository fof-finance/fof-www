import React from "react";
import { makeStyles, Typography, Grid, Paper, Icon } from "@material-ui/core";
import colors from 'src/theme/colors';
import { useI18n } from 'src/i18n';
import { ArrowRightAlt, ArrowForwardIos, FullscreenExit } from '@material-ui/icons';
import metaMask from 'src/assets/img/metamask.png';
import trustWallet from "src/assets/img/trustWallet.png";
import walletConnect from "src/assets/img/walletConnect.png";
import coinbaseWallet from 'src/assets/img/coinbaseWallet.png';
import ledger from 'src/assets/img/ledger-icon.png';
import trezor from 'src/assets/img/trezor.png';
import { connectorsByName } from "src/utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { history } from "src/app/app.component";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "src/actions/ui";

const useStyles = makeStyles((theme) => ({
  walletList: {
    maxWidth: 584,
    overflowX: "hidden",
    // [theme.breakpoints.up('md')]: {
    //   width: 584
    // },
  },
  walletItem: {
    width: 280,
    display: "flex",
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: '6px 15px 0',
    margin: '6px auto',
    cursor: 'pointer',
    border: '1px solid #E0E0E0',
    
    "&:hover": {
      boxShadow: '0px 2px 6px 2px #9082C3'
    },
    "& img": {
      width: 40,
      height: 40
    },
    "& .left": {
      width: 40,
    },
    "& .text": {
      textAlign: 'center',
      flex: 1,
      fontSize: 16,
      fontFamily: 'PingFangSC-Light, PingFang SC',
      fontWeight: 300,
      color: '#666666',
    },
    "& .right": {
      width: 16,
      "& .MuiSvgIcon-root": {
        width: 16,
        height: 16,
        color: '#666'
      }
    },
  },
  // disconnect: {
  //   width: 280,
  //   backgroundColor: 'white',
  //   borderRadius: 4,
  //   padding: '6px 15px 0',
  //   margin: '6px auto',
  //   cursor: 'pointer',
  //   border: '1px solid #E0E0E0',
  //   height: 54,
  //   textAlign: 'center',
  //   lineHeight: '42px',
  //   color: '#C86B63',
  //   "&:hover": {
  //     boxShadow: '0px 2px 6px 2px #9082C3'
  //   },
  // }
}));

// mock 钱包数据
interface WalletItem {
  title: string;
  icon: string;
  type: string;
}
const walletList: WalletItem[] = [
  {
    title: "MetaMask",
    icon: metaMask,
    type: 'MetaMask'
  },
  {
    title: "TrustWallet",
    icon: trustWallet,
    type: 'TrustWallet'
  },
  {
    title: "WalletConnect",
    icon: walletConnect,
    type: 'WalletConnect'
  },
  {
    title: "Coinbase Wallet",
    icon: coinbaseWallet,
    type: 'WalletLink'
  },
  {
    title: "Ledger",
    icon: ledger,
    type: 'Ledger'
  },
  {
    title: "Trezor",
    icon: trezor,
    type: 'Trezor'
  }
];

interface Props {
  showdisconnect?: boolean,
  handleClose?: any
}
const WalletList = (prop: Props) => {
  const classes = useStyles();
  const i18n = useI18n();
  const { showdisconnect, handleClose } = prop;
  // Connect Functions
  const { account, activate, chainId, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  const handleConnect = (type:string) => {
    activate((connectorsByName as any)[type] , (error) => handleSnackbar(error)).then(() => { handleClose && handleClose(); history.push('/vault'); })
  };

  const handleDisconnect = () => {
    deactivate();
    handleClose && handleClose()
  };

  const handleSnackbar = (message: any) => {
    dispatch(
      showSnackbar({
        type: 'Error',
        message: message,
      })
    );
  };

  return (
    <Grid container className={classes.walletList} alignContent="center">
      {
        walletList.map((item, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <div className={classes.walletItem} onClick={()=>handleConnect(item.type)}>
                <div className="left">
                  <img src={item.icon} />
                </div>
                <div className="text">
                  {item.title}
                </div>
                <div className="right">
                  <ArrowForwardIos />
                </div>
              </div>
            </Grid>
          )
        })
      }
      {/* {account && showdisconnect && <Grid item xs={12} sm={6} md={6}>
        <div className={classes.disconnect} onClick={handleDisconnect}>
          {i18n.t("home.disconnet")}
        </div>
      </Grid>} */}
    </Grid>
  )
}

export default WalletList;