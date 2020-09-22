import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { GitHub, Twitter, Telegram } from '@material-ui/icons';
import { List, Grid, ListItem, ListItemText, ListItemIcon, Divider, Hidden, Drawer } from '@material-ui/core';
import logo from 'src/assets/img/plouto-logo.png';
import bigCoffers from 'src/assets/img/coffers-big.png';
import smallCoffers from 'src/assets/img/coffers-small.png';
import pledgeIcon from 'src/assets/img/pledge-icon.png';
import governIcon from 'src/assets/img/govern-icon.png';
import toolIcon from 'src/assets/img/tool-icon.png';
import forumIcon from 'src/assets/img/forum-icon.png';
import Wallet from "../../views/home-view/wallet-modal";
import { Link as RouterLink } from "react-router-dom";
import { useI18n } from 'src/i18n';
import { history } from "src/app/app.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 200,
      background: 'linear-gradient(137deg, #473394 0%, #9C5774 68%, #E77858 100%)',
      height: '100vh',
      overflowY: 'auto',
    },
    drawerPaper: {
      backgroundColor: 'transparent'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 200,
        flexShrink: 0,
      },
    },
    main: {
      paddingBottom: 94,
      minHeight: '100vh',
      overflowY: 'auto',
    },
    fullList: {
      fontSize: 16,
      fontFamily: 'PingFangSC-Regular, PingFang SC',
      fontWeight: 400,
      color: '#FFFFFF',
      // lineHeight: 40,
      position: 'relative',
      marginBottom: 12,
      "& img": {
        width: 20,
        height: 20
      },
      "& .MuiListItemIcon-root": {
        minWidth: 36,
      },
      "& .MuiListItem-gutters": {
        paddingLeft: 28
      },
      "& .MuiTypography-body1": {
        fontWeight: 400
      }
    },
    logo: {
      fontSize: 24,
      textAlign: 'center',
      color: 'blue',
      paddingTop: 85,
      fontWeight: 'bolder',
      cursor: 'pointer',
      marginBottom: 32,
      "& img": {
        width: 156
      },
      "&>div:last-child": {
        height: 46,
        marginTop: 36,
      },
    },
    othernNav: {
      fontSize: 14,
      marginTop: 36,
      position: 'relative',
      fontFamily: 'PingFangSC-Regular, PingFang SC',
      fontWeight: 400,
      color: '#E0E0E0',
      "& p": {
        paddingLeft: 58,
      },
      marginBottom: 36
    },
    navBottom: {
      textAlign: 'center',
      color: 'white',
      fontSize: 24,
      paddingLeft: 24,
      paddingRight: 24,
      marginTop: -94,
      "& a": {
        color: 'white'
      }
    },
    line: {
      "& .MuiDivider-root": {
        background: "white"
      }
    },
    link: {
      color: "white",
      textDecoration: 'none',
      "&:hover": {
        textDecoration: 'none'
      }
    },
    checked: {
      background: 'rgba(255,255,255,.2)'
    }
  }));

interface MenuItem {
  title: string;
  url: string;
  src: string;
}



interface Props {
  open: boolean;
  handleOpen: any;
}

export default function SwipeableTemporaryDrawer(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, handleOpen } = props;
  const i18n = useI18n();

  let path = history.location.pathname;
  // 菜单列表
  const menus: MenuItem[] = [
    {
      title: i18n.t("menu.vault"),
      url: '/vault',
      src: bigCoffers
    },
    {
      title: i18n.t("menu.small vault"),
      url: '/small-vault',
      src: smallCoffers
    },
    {
      title: i18n.t("menu.stake"),
      url: '/stake',
      src: pledgeIcon
    },
    {
      title: i18n.t("menu.admin"),
      url: '/vote',
      src: governIcon,
    },
    {
      title: i18n.t("menu.tool"),
      url: '/tool',
      src: toolIcon,
    },
    {
      title: i18n.t("menu.vote"),
      url: '',
      src: forumIcon
    }
  ];

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    handleOpen()
  };

  const container = window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <div className={classes.list}>
      <div className={classes.main}>
        <div className={classes.logo}>
          <div>
            <RouterLink to="/">
              <img src={logo} />
            </RouterLink>
          </div>
          <div><Wallet menuOpen={open} /></div>
        </div>
        <List className={classes.fullList}>
          {menus.map((item: any, index) => (
            <RouterLink to={item.url} className={classes.link} key={index}>
              <ListItem button key={index} className={path === item.url ? classes.checked : ''}>
                <ListItemIcon>
                  <img src={item.src} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </RouterLink>
          ))}
        </List>
        <div className={classes.line}><Divider /></div>
        <div className={classes.othernNav}>
          <ListItem button>
            <p>DOCS</p>
          </ListItem>
          <ListItem button>
            <p>{i18n.t("menu.audit")}</p>
          </ListItem>
        </div>
      </div>
      <div className={classes.navBottom}>
        <Grid container>
          <Grid item xs={3}>
            <a href="https://github.com/Plouto-finance" target="_blank"><GitHub /></a>
          </Grid>
          <Grid item xs={3}>
            <a href="https://twitter.com/Ploutoprotocol" target="_blank"><Twitter /></a>
          </Grid>
          <Grid item xs={3}>
            <a href="https://t.me/ploutofinance" target="_blank"><Telegram /></a>
          </Grid>
          <Grid item xs={3}>
            <a href="https://discord.gg/nfX5ax6" target="_blank">
              <svg width="24" height="24" fill="none">
                <path d="M8.725 10.488c-.717 0-1.283.625-1.283 1.387s.579 1.387 1.283 1.387c.716 0 1.282-.625 1.282-1.387.013-.762-.566-1.387-1.282-1.387zm4.588 0c-.716 0-1.282.625-1.282 1.387s.578 1.387 1.282 1.387c.717 0 1.282-.625 1.282-1.387s-.565-1.387-1.282-1.387z" fill="#fff"></path>
                <path d="M19.423 0H2.577A2.576 2.576 0 000 2.575v16.9a2.576 2.576 0 002.577 2.575h14.256l-.666-2.313 1.609 1.488 1.521 1.4L22 25V2.575A2.576 2.576 0 0019.423 0zM14.57 16.325s-.452-.537-.83-1.012c1.647-.463 2.276-1.488 2.276-1.488a7.209 7.209 0 01-1.446.738 8.31 8.31 0 01-1.823.537 8.856 8.856 0 01-3.256-.012 10.599 10.599 0 01-1.848-.538 7.387 7.387 0 01-.917-.425c-.038-.025-.076-.037-.113-.063-.026-.012-.038-.024-.05-.037-.227-.125-.353-.213-.353-.213s.604 1 2.2 1.476c-.377.474-.842 1.037-.842 1.037-2.778-.087-3.834-1.9-3.834-1.9 0-4.025 1.81-7.288 1.81-7.288 1.81-1.35 3.533-1.312 3.533-1.312l.125.15c-2.263.65-3.306 1.638-3.306 1.638s.277-.15.742-.363c1.345-.588 2.413-.75 2.853-.787.076-.013.139-.026.214-.026a10.29 10.29 0 016.323 1.175s-.993-.937-3.13-1.587l.176-.2s1.723-.038 3.533 1.313c0 0 1.81 3.262 1.81 7.287 0 0-1.068 1.813-3.847 1.9z" fill="#fff"></path>
              </svg>
            </a>
          </Grid>
        </Grid>
      </div>
    </div >
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div role="presentation" onClick={toggleDrawer}>{drawer}</div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
