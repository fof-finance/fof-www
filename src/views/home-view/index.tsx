/**
 * @format
 */
import React from "react";
import { makeStyles, Typography, Grid, Button, Popover, List, ListItem, ListItemText } from "@material-ui/core";
import Wallet from "src/views/home-view/wallet-modal";
import colors from 'src/theme/colors';
import { useI18n } from 'src/i18n';
import { ArrowRightAlt, ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import WalletList from "src/views/home-view/wallet-list";
import { history } from "src/app/app.component";
import { useI18nLanguage } from 'src/i18n';
import { setLanguage } from "src/actions/ui";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent"
    },
    textAlign: 'center',
    padding: 24,
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 48,
    fontFamily: "PingFangSC-Semibold, PingFang SC",
    fontWeight: 600,
    color: '#000000',
    background: "linear-gradient(110deg, #493889 0%, #CE380C 100%)",
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    marginBottom: 3
  },
  info: {
    color: "#666",
    margin: theme.spacing(2, 4),
  },
  paper: {
    // margin: theme.spacing(0, 4),
    display: "flex",
    // height: '100%',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    padding: 24,
    maxWidth: '100%',
    overflowX: 'hidden',
    marginTop: 36,
    [theme.breakpoints.up('sm')]: {
      marginTop: 0
    },
  },
  use: {
    color: colors.deepPurple,
    fontSize: 0,
    fontFamily: "PingFangSC-Regular, PingFang SC",
    fontWeight: 400,
    cursor: 'pointer',
    "& p": {
      display: 'inline-block',
      fontSize: 14,
      verticalAlign: 'middle'
    },
    "& .MuiSvgIcon-root": {
      verticalAlign: 'middle'
    }
  },
  prompt: {
    fontSize: 14,
    fontFamily: "PingFangSC-Regular, PingFang SC",
    fontWeight: 400,
    marginTop: 12,
    marginBottom: 120
  },
  agree: {
    fontSize: 14,
    fontFamily: "PingFangSC-Regular, PingFang SC",
    fontWeight: 400,
    marginTop: 24,
    "& span": {
      color: colors.deepPurple,
      marginLeft: 6,
      marginRight: 6
    }
  },
  list: {
    width: 584,
    marginTop: 36,
    marginBottom: 24,
    [theme.breakpoints.up('sm')]: {
      marginTop: 82,
    },
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
  fullLan: {
    position: 'absolute',
    top: 36,
    right: 36,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  currentLan: {
    fontSize: 14,
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    fontWeight: 400,
    color: '#493889',
    lineHeight: '20px'
  },
  lanList: {
    "& .MuiPaper-rounded": {
      boxShadow: '0px 2px 4px 0px #9082C3',
      borderRadius: '0px 0px 6px 6px'
    },
    "& .MuiListItem-root": {
      paddingTop: 4,
      paddingBottom: 4,
    },
    "& .MuiList-padding": {
      paddingLeft: 8,
      paddingRight: 8
    },
    "& .MuiListItem-button":{
      "&:hover":{
        transition: 'none'
      }
    }
  },
  lanListItem: {
    width: 132,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    fontWeight: 400,
    color: '#666666',
    "&:hover": {
      background: '#9082C3',
      boxShadow: '0px 2px 4px 0px #9082C3',
      borderRadius: 2,
      textAlign: 'center',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC',
      fontWeight: 400,
      color: '#fff',
      width: 132,
      // "&:hover":{
      //   backgroundColor: '#9082C3'
      // }
    }
  },
  lanChecked: {
    background: '#9082C3',
    boxShadow: '0px 2px 4px 0px #9082C3',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    fontWeight: 400,
    color: '#fff',
    width: 132,
    "&:hover": {
      backgroundColor: '#9082C3'
    }
  }
}));

interface language {
  lan: string;
  description: string;
}
const language: language[] = [
  {
    lan: 'en-US',
    description: 'English'
  },
  {
    lan: 'zh-Hans',
    description: '简体中文'
  }
]

function HomeView(props: object) {
  const classes = useStyles();
  const i18n = useI18n();
  const curLan = useI18nLanguage();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'home-popover' : undefined;

  // 跳转大金库
  const goVault = () => {
    history.push('/vault')
  }

  // 切换语言
  const changeLanguage = (lan: string) => {
    dispatch(
      setLanguage(lan)
    )
    handleClose();
  }

  return (
    <div className={classes.root}>
      <div className={classes.fullLan}>
        <Button aria-describedby={id} onClick={handleClick} className={classes.currentLan}>
          {language.filter(item => item.lan === curLan)[0].description}
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className={classes.lanList}
        >
          <List>
            {
              language.map((item, index) => {
                return (
                  <ListItem
                    button
                    key={index}
                    onClick={() => changeLanguage(item.lan)}
                    // className={item.lan===curLan?classes.lanChecked:classes.lanListItem}
                    className={classes.lanListItem}
                  >
                    <ListItemText primary={item.description} />
                  </ListItem>
                )
              })
            }
          </List>
        </Popover>
      </div>
      <div className={classes.paper}>
        <Typography component="h1" variant="h1" className={classes.welcome}>
          {i18n.t("home.welcome to plouto")}
        </Typography>
        <Typography component="h1" variant="h5" className={classes.info}>
          {i18n.t("home.info")}
        </Typography>
        <Grid container className={classes.list} alignContent="center">
          <WalletList showdisconnect={false} />
        </Grid>
        <div className={classes.use} onClick={goVault}>
          <p>{i18n.t("home.use")}</p>
          <ArrowRightAlt />
        </div>
        {/* <div className={classes.agree}>
            {i18n.t("home.agree")}
            <span>{i18n.t("home.items")}</span>,
            <span>{i18n.t("home.privacy")}</span>
            {i18n.t("home.and")}
            <span>{i18n.t("home.cookie")}</span>
          </div> */}
        {/* <div className={classes.prompt}>
            {i18n.t("home.prompt")}
          </div> */}
        {/* <Wallet></Wallet> */}
      </div>
    </div>
  );
}

export default HomeView;
