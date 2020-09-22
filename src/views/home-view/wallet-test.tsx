/**
 * @format
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { showSnackbar } from 'src/actions/ui';
import { getVaultBalances } from 'src/actions/vault';
import Page from 'src/components/page.component';
import { RootState } from 'src/reducers';
import { connectorsByName } from 'src/utils/connectors';

const useStyles = makeStyles(() => ({
  root: {}
}));

function HomeView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const web3React = useWeb3React();
  const { account, activate, chainId, deactivate } = web3React;
  const vaultAssets = useSelector((state: RootState) => state.vault.vaultAssets);

  React.useEffect(() => {
    if (account) {
      dispatch(getVaultBalances(web3React, '0x74e2F4FeB3CB4dF030c5ba1B3B12c6E2EF4bB225'));
    }
  }, [account]);

  const handleConnect = () => {
    activate(connectorsByName.MetaMask, (error) => console.log(error));
  };

  const handleConnectLedger = () => {
    activate(connectorsByName.Ledger, (error) => console.log(error));
  };

  const handleDisconnect = () => {
    deactivate();
  };

  const handleSnackbar = () => {
    dispatch(showSnackbar({
      type: 'Error',
      message: 'Hello world!'
    }));
  };

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Typography>
        {chainId}
      </Typography>
      <Typography>
        {account}
      </Typography>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleConnect}
      >
        Connect Wallet
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleConnectLedger}
      >
        Connect Ledger
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleDisconnect}
      >
        Disconnect Wallet
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleSnackbar}
      >
        Snackbar
      </Button>
      {vaultAssets.map((asset) => (
        <Typography key={asset.id}>
          {asset.balance}
        </Typography>
      ))}
    </Page>
  );
}

export default HomeView;
