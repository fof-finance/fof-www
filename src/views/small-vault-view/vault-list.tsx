/**
 * @format
 */
import React from "react";
import {
  makeStyles, Box, Grid, Typography,
} from '@material-ui/core'
import clsx from 'clsx';
import {useI18n} from 'src/i18n';
import colors from 'src/theme/colors';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles((theme) => ({
  listTitle: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.colorTextSecondary,
    marginTop: '40px',
    marginBottom: '10px',
  },
  listContent: {},
  whitelistItem: {
    height: '64px',
    background: '#FFFFFF',
    borderRadius: '2px',
    border: ` 1px solid ${colors.gray}`,
    cursor: 'pointer',
    marginBottom: '12px'
  },
  nameItem: {
    fontSize: '16px',
    color: colors.colorTextBase,
  },
  apyItem: {
    color: colors.colorTextBase,
    fontSize: '16px',
    '& .num': {
      fontSize: '18px',
      color: colors.red,
      fontWeight: 600,
    }
  },
  discussItem: {},
  linkItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '28px',
    background: colors.red,
    borderRadius: '14px',
    color: '#FFF',
    textDecoration: 'none',
  },
  brandItem: {},

  headingName: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      flex: 1
    },
    '& h3': {
      fontSize: '14px'
    },
    '& h5': {
      fontSize: '12px',
      fontWeight: 400,
      color: '#999999'
    }
  },
  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '20px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      height: '44px',
      width: '44px',
      marginRight: theme.spacing(1),
    },
    '&>img': {
      width: '100%'
    },
  },
}));


function WhitelistItem(props: any) {
  const {whitelistObj, onClick} = props
  console.log('whitelistObj', whitelistObj);
  const classes = useStyles();
  const {name, id, source, apy, discussCount, forumUrl, disabled} = whitelistObj;
  let count = discussCount > 100 ? 99 : discussCount;

  return (
      <Grid container alignItems="center" className={clsx([classes.whitelistItem])} key={id}
            onClick={() => {
              onClick(whitelistObj)
            }}
      >
        <Grid item container justify="center" xs={3} className={classes.nameItem}>
          <span>{name}</span>
        </Grid>
        <Grid item container justify="center" xs={3} className={classes.brandItem}>
          <div className={classes.headingName}>
            <div className={classes.assetIcon}>
              <img
                  alt=""
                  src={require('src/assets/img/' + source.symbol + '-logo.png')}
                  style={disabled ? {filter: 'grayscale(100%)'} : {}}
              />
            </div>
            <div>
              <Typography variant={'h3'} noWrap>{source.name}</Typography>
              <Typography variant={'h5'}>{source.description}</Typography>
            </div>
          </div>

        </Grid>
        <Grid item container justify="center" xs={3} className={classes.apyItem}>
          <span className="num">{(apy ? (apy).toFixed(2) : '0.00')}</span>
          <span>%</span>
        </Grid>
        <Grid item container justify="center" xs={3} className={classes.discussItem}>
          <a href={forumUrl} target="_blank" className={classes.linkItem}
             onClick={(e) => {
               e.stopPropagation()
             }}
          >
            <span> {count}{count > 0 ? '+' : ''} </span>
          </a>
        </Grid>
      </Grid>
  )
}

type VaultListType = {
  vaultListData: any,
  onItemClick: Function
};

function VaultList(props: VaultListType) {
  const {vaultListData, onItemClick} = props;
  const classes = useStyles();
  const i18n = useI18n();
  return (
      <Box>
        <Grid container className={clsx([classes.listTitle])}>
          <Grid item xs={3}>{i18n.t('smallVault.name')}</Grid>
          <Grid item xs={3}>{i18n.t('smallVault.source')}</Grid>
          <Grid item xs={3}>{i18n.t('smallVault.apy')}</Grid>
          <Grid item xs={3}>{i18n.t('smallVault.discuss')}</Grid>
        </Grid>
        <Box className={classes.listContent}>
          {vaultListData.map((whitelistObj: any) => (
              <WhitelistItem whitelistObj={whitelistObj} onClick={onItemClick}/>
          ))}
        </Box>
      </Box>
  )

}

export default VaultList;
