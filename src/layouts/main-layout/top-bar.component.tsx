/**
 * @format
 */
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Menu, ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import Wallet from "../../views/home-view/wallet-modal";
import PropTypes from 'prop-types';
import logo from 'src/assets/img/plouto-logo.png';
import { useI18n } from 'src/i18n';
import { useI18nLanguage } from 'src/i18n';
import { setLanguage } from "src/actions/ui";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  AppBar,
  Box,
  Button,
  Divider,
  Hidden,
  Link,
  Toolbar,
  Typography,
  IconButton,
  ListItemText,
  ListItem,
  List,
  Popover,
  CssBaseline
} from "@material-ui/core";
import Logo from "src/components/logo.component";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    "& img": {
      width: 156
    },
    "& p": {
      background: '-webkit-linear-gradient(111deg, #493889 0%, #CE380C 100%)',
      height: 46,
      fontSize: 24,
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      lineHeight: '46px',
      width: 'calc(100% - 96px)',
      textAlign: "center",
      fontWeight: 700
    }
  },
  toolbar: {
    height: 64,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  toggle: {
    cursor: "pointer",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  fullLan: {
    position: 'absolute',
    top: 6,
    right: 0,
    "& .MuiButton-text":{
      padding: 10
    }
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
    "& .MuiList-padding":{
      paddingLeft: 8,
      paddingRight: 8
    },
  },
  lanListItem: {
    width: 132,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    fontWeight: 400,
    color: '#666666',
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
    "&:hover":{
      backgroundColor: '#9082C3'
    }
  }
}));

export interface TopBarProps {
  className?: string;
  handleOpen: any
}


interface language{
  lan: string;
  description: string;
  des: string;
}
const language: language[] = [
  {
    lan: 'en-US',
    description: 'English',
    des: "EN"
  },
  {
    lan: 'zh-Hans',
    description: '简体中文',
    des: "CN"
  }
]

function TopBar({ className, handleOpen, ...rest }: TopBarProps) {
  const classes = useStyles();
  const web3React = useWeb3React();
  const { account, activate, chainId, deactivate } = web3React;
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
  const id = open ? 'top-popover' : undefined;
  // 切换语言
  const changeLanguage = (lan: string) => {
    dispatch(
      setLanguage(lan)
    )
    handleClose();
  }

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleOpen}
        >
          <Menu />
        </IconButton>
        <p>PLOUTO</p>
        <div className={classes.fullLan}>
        <Button aria-describedby={id} onClick={handleClick} className={classes.currentLan}>
          {language.filter(item => item.lan === curLan)[0].des}
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
                    className={item.lan===curLan?classes.lanChecked:classes.lanListItem}
                  >
                    <ListItemText primary={item.description} />
                  </ListItem>
                )
              })
            }
          </List>
        </Popover>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;
