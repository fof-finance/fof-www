/**
 * @format
 */
import React, {useState, useEffect} from "react";
import {
  makeStyles, Container, Box, Grid, Typography,
  FormControl, InputLabel, OutlinedInput, ButtonGroup, Button, useTheme, useMediaQuery, Card, Link,
  TextField, InputAdornment, Theme
} from '@material-ui/core'
import clsx from 'clsx';
import {useI18n} from 'src/i18n';
import {useWeb3React} from "@web3-react/core";
import colors from 'src/theme/colors';
import Loader from 'src/components/loader.compoent';
import SearchIcon from "@material-ui/icons/Search";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ForwardIcon from '@material-ui/icons/Forward';

import AddModal from "./add-modal";
import whitelist from './whitelist'
import VaultList from "./vault-list";
import VaultDetail from "./vault-detail";
import AlertDialog from './alertModal';
import ColorButton from 'src/components/color-button.component';

const checkShowWarn = (account: string): boolean => {
  // todo hide account
  const key = `small-vault-warn=${account}`;
  if (localStorage.getItem(key)) {
    return false
  }
  localStorage.setItem(key, '1');
  return true;
}

const baseStyles = (theme: Theme) => (
    {
      mt: {marginTop: theme.spacing(2)},
      mb: {marginBottom: theme.spacing(2)},
      'ml-xs': {marginRight: theme.spacing(0.5)},
      grey: {color: colors.gray},
      blue: {color: colors.blue},
      red: {color: colors.red},
      colorBase: {color: colors.colorTextBase},
      colorSecondary: {color: colors.colorTextSecondary},
    }
)
const useStyles = makeStyles((theme: Theme) => ({
  ...baseStyles(theme),
  root: {},
  pl: {paddingLeft: theme.spacing(1)},
  center: {textAlign: 'center'},
  searchInput: {
    flex: 1,
    background: colors.white,
    borderRadius: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 15px',
      '& .MuiInputBase-input': {
        padding: '8px 8px',
        fontSize: '12px',
      }
    },

  },
  inputAdornment: {
    fontWeight: 600,
    fontSize: '1.5rem'
  },
  searchLabel: {
    position: 'static',
    transform: 'none',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    fontSize: '14px',
  },
  btnBox: {
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
  },
  pageBox: {
    paddingTop: '70px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '50px'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '30px'
    },
  },
  barBtn: {
    padding: '3px 30px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 15px',
      '& .MuiButton-label': {
        fontSize: '12px',
      }
    },
    [theme.breakpoints.down('xs')]: {
      padding: '3px 5px',
    },
  },
}));


function SmallVaultView() {
  const classes = useStyles();
  const i18n = useI18n();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState(false)
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('list'); //  list or detail
  const [currentVaultObj, setCurrentVaultObj] = useState(null);
  const [showJoined, setShowJoined] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const web3React = useWeb3React();
  const {account} = web3React
  React.useEffect(() => {
    if (account) {
      if (checkShowWarn(account)) {
        setWarnOpen(true)
      }
    }
  }, [account]);

  useEffect(() => {
    setLoading(false);
    setSearchError(false);

    // setType('detail');
    // setCurrentVaultObj(whitelist[0]);

  });
  const onSearchChanged = (event: any) => {
    setShowJoined(false);
    const {value} = event.target;
    setSearch(value);
  }
  const viewJoined = () => {
    setShowJoined(true);
    console.log('view joined')
  }
  const onSave = (form: any) => {
    console.log('form', form);
  }
  const hide = () => {
    setOpen(false);
  }
  const onItemClick = (itemObj: any) => {
    console.log('itemObj', itemObj);
    setType('detail');
    setCurrentVaultObj(itemObj);
  }


  const renderBar = () => {
    return (
        <Grid container justify="space-between" alignItems="flex-end">
          <Grid item xs={4} sm={4} md={5}>
            <FormControl fullWidth>
              <OutlinedInput
                  fullWidth
                  disabled={loading}
                  id="search-input"
                  className={classes.searchInput}
                  value={search}
                  placeholder={i18n.t('smallVault.vaultSearchPlaceholder')}
                  onChange={onSearchChanged}
                  startAdornment={
                    <InputAdornment position="end" className={classes.inputAdornment}><SearchIcon/></InputAdornment>
                  }
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={7} md={6} container justify="flex-end" className={classes.btnBox}>
            <ColorButton
                variant="outlined"
                color="primary"
                startIcon={<AddOutlinedIcon/>}
                onClick={() => {
                  setOpen(true)
                }}
                disabled={loading || !account}
                className={clsx(["border-radius", classes.barBtn])}
            >{i18n.t('smallVault.addText')}</ColorButton>
            <ColorButton
                variant={showJoined ? 'contained' : "outlined"}
                color="primary"
                onClick={viewJoined}
                className={clsx(["border-radius", classes.barBtn])}
            >
              {i18n.t('smallVault.existText')}
            </ColorButton>
          </Grid>
        </Grid>
    )
  }
  return (
      <Container component="main" maxWidth="lg">
        <Box className={classes.pageBox}>
          {renderBar()}
          {type === 'list' ?
              <VaultList onItemClick={onItemClick} vaultListData={whitelist}/> :
              <VaultDetail
                  vaultObj={currentVaultObj}
                  onClick={() => {
                  }}
              />
          }
          {loading && <Loader/>}
          <AddModal open={open} onClose={hide} onSave={onSave}/>
          <AlertDialog open={warnOpen}/>
        </Box>
      </Container>);

}

export default SmallVaultView;
