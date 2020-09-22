/**
 * @format
 */
import React from "react";
import {
  Container,
  Box,
  makeStyles,
} from "@material-ui/core";
import Asset from "./assets";
import colors from "src/theme/colors";

import Loader from "../../components/loader.compoent";
import { getVaultBalances } from "src/actions/vault";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { useI18n } from "src/i18n";

const useStyles = makeStyles((theme) => ({
  filters: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 12px",
    },
  },
  searchField: {
    flex: 1,
    background: colors.white,
    borderRadius: "50px",
  },
  checkbox: {
    flex: 1,
    margin: "0px !important",
  },

  positive: {
    color: colors.compoundGreen,
  },
  between: {
    width: "40px",
  },
  inputAdornment: {
    fontWeight: 600,
    fontSize: "1.5rem",
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
}));

function VaultView() {
  const i18n = useI18n();
  const web3React = useWeb3React();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { account } = web3React;

  const assetsList = useSelector((state: RootState) => state.vault.vaultAssets);

  React.useEffect(() => {
    if (account) dispatch(getVaultBalances(web3React, account));
  }, [account]);

  const [expanded, setExpanded] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleChange = (id: any) => {
    setExpanded(id == expanded ? "" : id);
  };

  return ( <Container component="main" maxWidth="lg">
    <Box className={classes.pageBox}>
      { loading && <Loader /> }
      {
        assetsList.map(asset => {
            return <Asset key={ asset.id } asset={ asset } expanded={ expanded } handleChange={ handleChange }></Asset>
        })
      }
    </Box>
  </Container>);
}

export default VaultView;
