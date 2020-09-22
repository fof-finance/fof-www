/**
 * @format
 */
import React from "react";
import {
  makeStyles, Box, Grid, Typography, useTheme, useMediaQuery,
} from '@material-ui/core'
import clsx from 'clsx';
import {useI18n} from 'src/i18n';
import colors from 'src/theme/colors';
import ForwardIcon from '@material-ui/icons/Forward';
import AssetAction from './asset-action'

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2)
  },
  mb: {
    marginBottom: theme.spacing(2)
  },
  center: {
    textAlign: 'center'
  },
  red: {
    color: colors.red
  },
  grey: {
    color: colors.darkGray
  },
  bold: {
    fontWeight: 600,
  },
  addressTitle: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.colorTextBase,
    marginTop: '40px',
    marginBottom: '10px',
  },
  itemBox: {
    minHeight: '64px',
    background: '#FFFFFF',
    borderRadius: '2px',
    border: ` 1px solid ${colors.gray}`,
    marginBottom: '12px',
    color: colors.colorTextBase,
  },
  baseItem: {
    fontSize: '16px',
    fontWeight: 600,
    wordBreak: 'break-all'
  },
  vaultTitle: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.colorTextSecondary,
    marginTop: '40px',
    marginBottom: '10px',
  },
  vaultContent: {
    background: '#FFFFFF',
    borderRadius: '2px',
    border: ` 1px solid ${colors.gray}`,
    paddingTop: '10px',
  },
  vaultItem: {
    fontSize: '16px',
    wordBreak: 'break-all'
  },
  headingName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      flex: 1
    },
    '& h5': {
      fontSize: '16px',
      fontWeight: 400,
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
  actionBox: {
    margin: '0 40px',
    marginTop: '10px',
    borderTop: `1px solid ${colors.gray}`,
    paddingTop: '21px',
    paddingBottom: '13px'
  }
}));


type VaultDetailType = {
  vaultObj: any,
  onClick: Function,
};

const getShowNameOfUser = (id: string, startNum: number = 6, endNum: number = 6) => {
  return id.substr(0, startNum) + '...' + id.substr(id.length - endNum, id.length)
};

function VaultDetail(props: VaultDetailType) {
  const classes = useStyles();
  const i18n = useI18n();
  const {vaultObj, onClick} = props;

  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const {
    forumUrl, vaultAddress, strategyAddress, administratorAddress,
    disabled, source, balance, depositedBalance, apy
  } = vaultObj
  const renderAddress = () => {
    return (

        <Box>
          <Grid container className={clsx([classes.addressTitle])}>
            <Grid item xs={3}>{i18n.t('smallVault.vaultAddress')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.strategyAddress')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.administratorAddress')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.forumUrl')}</Grid>
          </Grid>
          <Grid container alignItems="center" className={classes.itemBox} spacing={1}>
            <Grid item container justify="center" xs={3} className={classes.baseItem}>
              <span>{getShowNameOfUser(vaultAddress)}</span>
            </Grid>
            <Grid item container justify="center" xs={3} className={classes.baseItem}>
              <span>{getShowNameOfUser(strategyAddress)}</span>
            </Grid>
            <Grid item container justify="center" xs={3} className={classes.baseItem}>
              <span>{getShowNameOfUser(administratorAddress)}</span>
            </Grid>
            <Grid item container justify="center" xs={3} className={classes.baseItem}>
              <span>{getShowNameOfUser(forumUrl, 15, 10)}</span>
            </Grid>
          </Grid>
        </Box>
    )
  }
  return (
      <Box>
        {renderAddress()}
        <Box>
          <Grid container className={clsx([classes.vaultTitle])}>
            <Grid item xs={3}>{i18n.t('smallVault.titleSource')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.titleBalance')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.titleDepositedBalance')}</Grid>
            <Grid item xs={3}>{i18n.t('smallVault.titleApy')}</Grid>
          </Grid>
          <Box className={classes.vaultContent}>
            <Grid container alignItems="center">
              <Grid item xs={3} sm={3} md={3} className={classes.center}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                        alt=""
                        src={require('src/assets/img/' + source.symbol + '-logo.png')}
                        style={disabled ? {filter: 'grayscale(100%)'} : {}}
                    />
                  </div>
                  <div>
                    <Typography variant={'h5'} noWrap>{source.name}</Typography>
                  </div>
                </div>
              </Grid>

              <Grid item container justify="center" xs={3} className={classes.vaultItem}>
                <span className={classes.bold}>{(balance ? (balance).toFixed(4) : '0.0000')}</span>
                <span>{source.symbol}</span>
              </Grid>
              <Grid item container justify="center" xs={3} className={classes.vaultItem}>
                <span className={classes.bold}>{(depositedBalance ? (depositedBalance).toFixed(4) : '0.0000')}</span>
                <span>{source.symbol}</span>
              </Grid>
              <Grid item container justify="center" xs={3} className={classes.vaultItem}>
                <span className={clsx([classes.red, classes.bold])}>{(apy ? (apy).toFixed(2) : '0.00')}</span>
                <span>%</span>
              </Grid>
            </Grid>
            <Box className={classes.actionBox}>
              <AssetAction asset={vaultObj}></AssetAction>
            </Box>
          </Box>
        </Box>
      </Box>

  )

}

export default VaultDetail;
