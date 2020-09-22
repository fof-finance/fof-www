import {Grid} from "@material-ui/core";
import React from "react";

const whitelist: Array<any> = [
  {
    id: "1",
    name: "Yield Farming",
    source: {
      name: "DAI",
      symbol: "DAI",
      description: "Useless",
    },
    disabled: false,
    balance: 0.00,
    depositSymbol: 'DAI',
    depositedBalance: 0,
    apy: 12.00,
    withdraw: true,
    withdrawAll:true,
    deposit: true,
    depositAll:true,
    discussCount: 622,
    forumUrl: 'https://app.mockplus.cn/run/rp/CRXnP2RJjzre/510LbVgXA',
    vaultAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
    strategyAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
    administratorAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
  },
  {
    id: "2",
    name: "Farm YAM",
    source: {
      name: "FTM",
      symbol: "FTM",
      description: "Useless",
    },
    disabled: false,
    balance: 0.00,
    vaultSymbol: 'DAI',
    vaultBalance: 0,
    apy: 12.00,
    withdraw: true,
    withdrawAll:true,
    deposit: true,
    depositAll:true,
    discussCount: 634,
    forumUrl: 'https://app.mockplus.cn/run/rp/CRXnP2RJjzre/510LbVgXA',
    vaultAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
    strategyAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
    administratorAddress: '0x9dA46d0F573F5499584ee141d53b5e61123717D7',
  },
]
export default whitelist;
