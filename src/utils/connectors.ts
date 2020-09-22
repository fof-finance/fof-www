/**
 * @format
 */
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.eth.aragon.network/',
  3: 'https://ropsten.infura.io/v3/4764026882694effbf418d24198e8b44',
  42: 'https://kovan.infura.io/v3/4764026882694effbf418d24198e8b44'
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'plouto.finance',
  appLogoUrl: 'https://app.plouto.finance/logo192.png'
});

export const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL
});

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'developer@plouto.finance',
  manifestAppUrl: 'https://app.plouto.finance/'
});

export const connectorsByName = {
  MetaMask: injected,
  TrustWallet: injected,
  WalletConnect: walletconnect,
  WalletLink: walletlink,
  Ledger: ledger,
  Trezor: trezor
};
