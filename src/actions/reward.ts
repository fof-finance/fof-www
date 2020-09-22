/**
 * @format
 */
import async from 'async';
import { Dispatch } from 'redux';
import Web3 from 'web3';
import config from 'src/utils/config';
import { getGasPrice } from 'src/utils/web3';

export const SET_REWARD_POOLS = 'SET_REWARD_POOLS';

const getERC20Balance = async (web3: Web3, asset: any, address: string, callback: any) => {
  const erc20Contract = new web3.eth.Contract(config.erc20ABI as any, asset.address);

  try {
    let balance = await erc20Contract.methods.balanceOf(address).call({ from: address });
    balance = parseFloat(balance) / (10 ** asset.decimals);
    callback(null, parseFloat(balance));
  } catch (e) {
    return callback(e);
  }
};

const getStakedBalance = async (web3: Web3, asset: any, address: string, callback: any) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  try {
    let balance = await erc20Contract.methods.balanceOf(address).call({ from: address });
    balance = parseFloat(balance) / (10 ** asset.decimals);
    callback(null, parseFloat(balance));
  } catch (e) {
    return callback(e);
  }
};

const getRewardsAvailable = async (web3: Web3, asset: any, address: string, callback: any) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  try {
    let earned = await erc20Contract.methods.earned(address).call({ from: address });
    earned = parseFloat(earned) / (10 ** asset.rewardsDecimals);
    callback(null, parseFloat(earned));
  } catch (e) {
    return callback(e);
  }
};

const checkApproval = async (
  web3: Web3,
  asset: any,
  address: string,
  amount: string,
  contract: string,
  callback: any
) => {
  try {
    const erc20Contract = new web3.eth.Contract(asset.abi, asset.address);
    const allowance = await erc20Contract.methods.allowance(address, contract).call({ from: address });

    const ethAllowance = web3.utils.fromWei(allowance, 'ether');

    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      await erc20Contract.methods.approve(contract, web3.utils.toWei('999999999999999', 'ether')).send(
        {
          from: address,
          gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei')
        });
      callback();
    } else {
      callback();
    }
  } catch (error) {
    if (error.message) {
      return callback(error.message);
    }
    callback(error);
  }
};

const callStake = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  amount: string,
  callback: any
) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  let amountToSend = web3.utils.toWei(amount, 'ether');
  if (asset.decimals != 18) {
    amountToSend = (parseFloat(amount) * (10 ** asset.decimals)).toFixed(0);
  }

  await erc20Contract.methods.stake(amountToSend).send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getRewardBalances(web3React, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

const callWithdraw = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  amount: string,
  callback: any
) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  var amountToSend = web3.utils.toWei(amount, 'ether');
  if (asset.decimals != 18) {
    amountToSend = (parseFloat(amount) * (10**asset.decimals)).toFixed(0);
  }

  await erc20Contract.methods.withdraw(amountToSend).send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if(confirmationNumber == 2) {
        dispatch(getRewardBalances(web3React, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

const callGetReward = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  callback: any
) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  await erc20Contract.methods.getReward().send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getRewardBalances(web3React, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

const callExit = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  callback: any
) => {
  const erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  await erc20Contract.methods.exit().send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getRewardBalances(web3React, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if (error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};


export function getRewardBalances(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const rewardPools = getState().reward.rewardPools;
    const web3 = new Web3(web3React.library.provider);

    async.map(rewardPools, (pool: any, callback) => {
      async.map(pool.tokens, (token: any, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { getERC20Balance(web3, token, address, callbackInnerInner) },
          (callbackInnerInner) => { getStakedBalance(web3, token, address, callbackInnerInner) },
          (callbackInnerInner) => { getRewardsAvailable(web3, token, address, callbackInnerInner) }
        ], (error, data: any) => {
          if (error) {
            return callbackInner(error);
          }

          token.balance = data[0];
          token.stakedBalance = data[1];
          token.rewardsAvailable = data[2];

          callbackInner(null, token);
        })
      }, (error, tokens) => {
        if (error) {
          return callback(error);
        }

        pool.tokens = tokens;
        callback(null, pool);
      });
    }, (error, pools) => {
      dispatch({
        type: SET_REWARD_POOLS,
        payload: pools
      });
    });
  };
}

export function stake(web3React: any, asset: any, address: string, amount: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      stakeResult: ''
    };
    await checkApproval(web3, asset, address, amount, asset.rewardsAddress, (error: any) => {
      returnValue.error = error || '';
    });
    if (returnValue.error) {
      return returnValue;
    }
    await callStake(web3React, dispatch, web3, asset, address, amount, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.stakeResult = hash;
    });
    return returnValue;
  };
}

export function withdraw(web3React: any, asset: any, address: string, amount: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      withdrawResult: ''
    };
    await callWithdraw(web3React, dispatch, web3, asset, address, amount, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.withdrawResult = hash;
    });
    return returnValue;
  };
}

export function getReward(web3React: any, asset: any, address: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      getRewardResult: ''
    };
    await callGetReward(web3React, dispatch, web3, asset, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.getRewardResult = hash;
    });
    return returnValue;
  };
}

export function exit(web3React: any, asset: any, address: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      exitResult: ''
    };
    await callExit(web3React, dispatch, web3, asset, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.exitResult = hash;
    });
    return returnValue;
  };
}

export function getBPTLPRequirements(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);

    const erc20Contract = new web3.eth.Contract(config.bptRewardsABI as any, config.bptRewardsAddress);
    let balance = await erc20Contract.methods.balanceOf(address).call({ from: address });
    balance = parseFloat(balance) / (10 ** 18);

    const voteContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);
    const voteLock = await voteContract.methods.voteLock(address).call({ from: address });
    const currentBlock = await web3.eth.getBlockNumber();

    return {
      balanceValid: (balance > 1000),
      voteLockValid: voteLock > currentBlock,
      withdrawValid: voteLock < currentBlock,
      voteLock: voteLock
    };
  };
};
