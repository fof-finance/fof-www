/**
 * @format
 */
import { SET_REWARD_POOLS } from 'src/actions/reward';
import config from 'src/utils/config';

const initialState = {
  rewardPools: [
    {
      id: 'POOL 1',
      name: 'POOL 1',
      website: 'plouto.finance',
      link: 'https://app.plouto.finance/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'pDAI',
          address: '0x5075A70F5C86a4132E57fcEA857C0C1d87e43093',
          symbol: 'pDAI',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pDAIRewardsAddress,
          rewardsABI: config.pDAIRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0
        },
        {
          id: 'pUSDT',
          address: '0xD2fA9DaA3be5B30913b883fD76d27eF3e4cB351c',
          symbol: 'pUSDT',
          abi: config.erc20ABI,
          decimals: 6,
          rewardsAddress: config.pUSDTRewardsAddress,
          rewardsABI: config.pUSDTRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0
        }
      ]
    },
    {
      id: 'POOL 2',
      name: 'POOL 2',
      website: 'Balancer Pool 2 Token',
      link: 'https://pools.balancer.exchange/#/pool/0xd5b58830b159d86ddf229a0429817fc7d446b45c/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'POOL2 BPT',
          address: '0xd5b58830b159d86ddf229a0429817fc7d446b45c',
          symbol: 'POOL2 BPT',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.bptRewardsAddress,
          rewardsABI: config.bptRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0
        }
      ]
    },
    {
      id: 'POOL 3',
      name: 'POOL 3',
      website: 'plouto.finance',
      link: 'https://app.plouto.finance/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'PLU',
          address: '0x091D2CcF3A03cc1753DD0D62325AC5319213cb00',
          symbol: 'PLU',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.governanceAddress,
          rewardsABI: config.governanceABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0
        }
      ]
    }
  ]
};

const rewardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REWARD_POOLS: {
      return {
        ...state,
        rewardPools: action.payload as any[]
      };
    }

    default: {
      return state;
    }
  }
};
  
export default rewardReducer;
