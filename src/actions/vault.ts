/**
 * @format
 */
import async from 'async';
import { Dispatch } from 'redux';
import Web3 from 'web3';
import config from 'src/utils/config';
import { getGasPrice } from 'src/utils/web3';

export const SET_VAULT_ASSETS = 'SET_VAULT_ASSETS';

const getERC20Balance = async (web3: Web3, asset: any, address: string, callback: any) => {
  if (asset.erc20address === 'Ethereum') {
    try {
      const ethBalance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
      callback(null, parseFloat(ethBalance));
    } catch (e) {
      return callback(e);
    }
  } else {
    const erc20Contract = new web3.eth.Contract(config.erc20ABI as any, asset.erc20address);

    try {
      let balance = await erc20Contract.methods.balanceOf(address).call({ from: address });
      balance = parseFloat(balance) / (10 ** asset.decimals);
      callback(null, parseFloat(balance));
    } catch (e) {
      return callback(e);
    }
  }
};

const getVaultBalance = async (web3: Web3, asset: any, address: string, callback: any) => {
  if (asset.vaultContractAddress === null) {
    return callback(null, 0);
  }

  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);
  let balance = await vaultContract.methods.balanceOf(address).call({ from: address });
  balance = parseFloat(balance) / (10 ** asset.decimals);
  callback(null, parseFloat(balance));
};

const getTotal = async (web3: Web3, asset: any, callback: any) => {
  if (asset.vaultContractAddress === null) {
    return callback(null, 0);
  }

  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);
  let balance = await vaultContract.methods.balance().call();
  balance = parseFloat(balance) / (10 ** asset.decimals);
  callback(null, parseFloat(balance));
};

const getVaultAPY = async (web3: Web3, asset: any, address: string, callback: any) => {
  try {
    if (asset.vaultContractAddress === null) {
      return callback(null, {
        pricePerFullShare: 0,
        apy: 0
      });
    }
  
    const block = await web3.eth.getBlockNumber();
    const contract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);
    let pricePerFullShare = await contract.methods.getPricePerFullShare().call();
  
    let balance = pricePerFullShare - asset.measurement;
    balance = balance / 1e18;
    let diff = block - asset.lastMeasurement;
  
    balance = balance / diff;
    balance = balance * 242584600;
  
    const returnObj = {
      pricePerFullShare: parseFloat(pricePerFullShare) / (10 ** 18),
      apy: parseFloat(balance as any)
    };
    callback(null, returnObj);
  } catch (e) {
    callback(null, {
      pricePerFullShare: 0,
      apy: 0
    });
  }
};

const checkApproval = async (web3: Web3, asset: any, address: string, amount: string, contract: string, callback: any) => {
  if(asset.erc20address === 'Ethereum') {
    return callback();
  }

  const erc20Contract = new web3.eth.Contract(config.erc20ABI as any, asset.erc20address);
  try {
    const allowance = await erc20Contract.methods.allowance(address, contract).call({ from: address });

    const ethAllowance = web3.utils.fromWei(allowance, 'ether');

    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      /*
        code to accomodate for "assert _value == 0 or self.allowances[msg.sender][_spender] == 0" in contract
        We check to see if the allowance is > 0. If > 0 set to 0 before we set it to the correct amount.
      */
      if (['crvV1', 'crvV2', 'crvV3', 'crvV4', 'USDTv1', 'USDTv2', 'USDTv3', 'USDT', 'sCRV'].includes(asset.id) && parseFloat(ethAllowance) > 0) {
        await erc20Contract.methods.approve(
          contract,
          web3.utils.toWei('0', 'ether')).send(
          {
            from: address,
            gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei')
          }
        );
      }

      await erc20Contract.methods.approve(
        contract,
        web3.utils.toWei('999999999999', 'ether')).send(
        {
          from: address,
          gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei')
        }
      );
      callback();
    } else {
      callback();
    }
  } catch(error) {
    if (error.message) {
      return callback(error.message);
    }
    callback(error);
  }
};

const callDepositVault = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3, asset: any,
  address: string,
  amount: string,
  callback: any
) => {
  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);

  let amountToSend = web3.utils.toWei(amount, 'ether');
  if (asset.decimals !== 18) {
    amountToSend = (parseFloat(amount) * (10 ** asset.decimals)).toString();
  }

  if (asset.erc20address === 'Ethereum') {
    await vaultContract.methods.depositETH().send({ from: address, value: amountToSend, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash: string) {
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber == 2) {
          dispatch(getVaultBalances(web3React, address));
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
      })
  } else {
    await vaultContract.methods.deposit(amountToSend).send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash: string) {
        callback(null, hash);
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber == 2) {
          dispatch(getVaultBalances(web3React, address));
        }
      })
      .on('receipt', function(receipt: any) {
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
  }
};

const callDepositAllVault = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  callback: any
) => {
  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);

  await vaultContract.methods.depositAll().send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function(hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getVaultBalances(web3React, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function(error: any) {
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

const callWithdrawVault = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  amount: string,
  callback: any
) => {
  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);

  let amountSend = web3.utils.toWei(amount, 'ether');
  if (asset.decimals !== 18) {
    amountSend = (parseFloat(amount) * (10 ** asset.decimals)).toString();
  }

  let functionCall = vaultContract.methods.withdraw(amountSend);
  if (asset.erc20address === 'Ethereum') {
    functionCall = vaultContract.methods.withdrawETH(amountSend);
  }

  await functionCall.send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getVaultBalances(web3React, address));
      }
    })
    .on('receipt', function(receipt: any) {
    })
    .on('error', function(error: any) {
      if (!error.toString().includes('-32601')) {
        if(error.message) {
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

const callWithdrawAllVault = async (
  web3React: any,
  dispatch: Dispatch<any>,
  web3: Web3,
  asset: any,
  address: string,
  callback: any
) => {
  const vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress);

  let functionCall = vaultContract.methods.withdrawAll();
  if (asset.erc20address === 'Ethereum') {
    functionCall = vaultContract.methods.withdrawAllETH();
  }

  await functionCall.send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function(confirmationNumber: any, receipt: any) {
      if (confirmationNumber == 2) {
        dispatch(getVaultBalances(web3React, address));
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


export function getVaultBalances(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    if (!address) {
      return false;
    }
    const vaultAssets = getState().vault.vaultAssets;
    const web3 = new Web3(web3React.library.provider);
    async.map(vaultAssets, (asset: any, callback) => {
      async.parallel([
        (callbackInner) => { getERC20Balance(web3, asset, address, callbackInner) },
        (callbackInner) => { getVaultBalance(web3, asset, address, callbackInner) },
        (callbackInner) => { getTotal(web3, asset, callbackInner) },
        (callbackInner) => { getVaultAPY(web3, asset, address, callbackInner) }
      ], (err, data: any) => {
        if (err) {
          return callback(err);
        }

        asset.balance = data[0];
        asset.vaultBalance = data[1];
        asset.total = data[2];
        asset.pricePerFullShare = data[3].pricePerFullShare;
        asset.apy = data[3].apy;

        callback(null, asset);
      });
    }, (err, assets) => {
      if (err) {
        return false;
      }

      dispatch({
        type: SET_VAULT_ASSETS,
        payload: assets
      });
      return true;
    });
  };
}

export function depositVault(web3React: any, address: string, asset: any, amount: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      depositResult: ''
    };
    await checkApproval(web3, asset, address, amount, asset.vaultContractAddress, (error: any) => {
      returnValue.error = error || '';
    });
    if (returnValue.error) {
      return returnValue;
    }
    await callDepositVault(web3React, dispatch, web3, asset, address, amount, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.depositResult = hash;
    });
    return returnValue;
  };
}

export function depositAllVault(web3React: any, address: string, asset: any) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      depositResult: ''
    };
    await checkApproval(web3, asset, address, asset.balance, asset.vaultContractAddress, (error: any) => {
      returnValue.error = error || '';
    });
    if (returnValue.error) {
      return returnValue;
    }
    await callDepositAllVault(web3React, dispatch, web3, asset, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.depositResult = hash;
    });
    return returnValue;
  };
}

export function withdrawVault(web3React: any, address: string, asset: any, amount: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      withdrawResult: ''
    };
    await callWithdrawVault(web3React, dispatch, web3, asset, address, amount, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.withdrawResult = hash;
    });
    return returnValue;
  };
}

export function withdrawAllVault(web3React: any, address: string, asset: any) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      withdrawResult: ''
    };
    await callWithdrawAllVault(web3React, dispatch, web3, asset, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.withdrawResult = hash;
    });
    return returnValue;
  };
};
