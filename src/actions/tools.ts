/**
 * @format
 */
import async from "async";
import { Dispatch } from "redux";
import {
  ChainId,
  Token,
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  WETH
} from "@uniswap/sdk";

export function getTokenPrice(tokenAddress: string, decimals: number) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const token = new Token(ChainId.MAINNET, tokenAddress, decimals);

    const Tether = await Fetcher.fetchTokenData(
      ChainId.MAINNET,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    );

    const DAI = await Fetcher.fetchTokenData(
      ChainId.MAINNET,
      "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    );
    
    const WETHPair = await Fetcher.fetchPairData(WETH[DAI.chainId], DAI)
    const TokenETHPair = await Fetcher.fetchPairData(token, WETH[DAI.chainId])



    const route = new Route([TokenETHPair], WETH[DAI.chainId])
    const route2 = new Route([WETHPair], WETH[DAI.chainId])
    
    // console.log(route.midPrice.toSignificant(6)) // 202.081
    // console.log(route.midPrice.invert().toSignificant(6)) 

    return { token: tokenAddress, price: route.midPrice.invert().toSignificant(6), ethprice: route2.midPrice.toSignificant(6) }
  };
}
