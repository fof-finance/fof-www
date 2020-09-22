import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Popover, Fade, Button } from "@material-ui/core";
import colors from 'src/theme/colors';
import { showSnackbar } from "src/actions/ui";
import { connectorsByName } from "src/utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { useI18n } from 'src/i18n';
import WalletList from "src/views/home-view/wallet-list";
import { Close, ArrowDropUp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2, 4, 3),
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      width: 176,
      background: 'white',
      borderRadius: 23,
      lineHeight: '46px',
      fontSize: 16,
      fontFamily: 'PingFangSC-Semibold, PingFang SC',
      fontWeight: 600,
      color: '#5C3A89',
      margin: 0,
      height: '46px',
      boxShadow: 'none',
      "&:hover": {
        boxShadow: '0px 0px 6px 6px rgba(225,225,225,.2)',
        background: 'white'
      },
      "& .MuiButton-label": {
        background: '-webkit-linear-gradient(111deg, #493889 0%, #CE380C 100%)',
        // height: 46,
        fontSize: 16,
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        margin: 0,
        // lineHeight: '46px',
        lineHeight: '16px',
      }
    },
    wbutton: {
      backgroundColor: colors.white,
    },
    content: {
      background: 'white',
      padding: 30,
      "&:focus": {
        outline: 'none'
      }
    },
    close: {
      textAlign: 'right',
      cursor: 'pointer',
      transform: 'translate(10px,-10px)',
      height: '20px',
      width: "100%",
      "& .MuiSvgIcon-root": {
        width: '24px',
        height: '24px'
      }
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#29B7AF',
      marginRight: 6
    },
    connected: {
      position: 'relative'
    },
    disconnect: {
      width: 120,
      backgroundColor: 'white',
      borderRadius: 4,
      padding: '6px 15px',
      cursor: 'pointer',
      textAlign: 'center',
      color: '#C86B63',
      boxShadow: '0px 2px 6px 2px #fff',
      fontSize: 16,
      position: 'absolute',
      bottom: -42,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    arrow: {
      position: 'absolute',
      left: '50%',
      top: -18,
      transform: 'translateX(-50%)',
      color: 'white',
      fontSize: 28
    },
    disCon:{
      color: '#C86B63',
      fontSize: 16,
    }
  })
);


interface Props{
  menuOpen?: boolean;
}
export default function TransitionsModal(prop:Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const i18n = useI18n();
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(false);
  const { menuOpen } = prop;
  React.useEffect(()=>{
    pop && setPop(false)},
  [menuOpen])

  const handleClosePop = () => {
    handleDisconnect();
    setPop(false)
  }

  const handlePop = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPop(!pop)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Connect Functions
  const { account, activate, chainId, deactivate } = useWeb3React();

  const handleConnect = () => {
    activate(connectorsByName.MetaMask, (error) => console.log(error)).then(() => { handleClose() })
  };

  const handleConnectLedger = () => {
    activate(connectorsByName.Ledger, (error) => console.log(error));
  };

  const handleDisconnect = () => {
    deactivate();
  };


  return (
    <div>
      {account ?
        <div className={classes.connected}>
          <Button
            type="button"
            fullWidth
            className={classes.button}
            onClick={handlePop}
          >
            <span className={classes.dot} />
            {account.substr(0, 6) + '...' + account.substr(account.length - 4, account.length)}
          </Button>
          {
            pop && <div className={classes.disconnect} onClick={handleClosePop}>
              <span className={classes.arrow}><ArrowDropUp/></span>
              {i18n.t("home.disconnet")}
            </div>
          } 
        </div> :
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.button}
          onClick={handleOpen}
        >
          {i18n.t("home.connect")}
        </Button>
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.content}>
            <div className={classes.close}>
              <Close onClick={handleClose} />
            </div>
            <WalletList handleClose={handleClose} showdisconnect={true} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
