/**
 * @format
 */
import async from 'async';
import { Dispatch } from 'redux';
import Web3 from 'web3';
import { getRewardBalances } from 'src/actions/reward';
import config from 'src/utils/config';
import {
  getGasPrice
} from 'src/utils/web3';

export const SET_VOTING = 'SET_VOTING';
export const SET_PROPOSALS = 'SET_PROPOSALS';
export const SET_CURRENT_BLOCK = 'SET_CURRENT_BLOCK';

export const callPropose = async (dispatch: Dispatch<any>, web3React: any, address: string, executor: string, hash: string, callback: any) => {
  const web3 = new Web3(web3React.library.provider);
  const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);

  const call = governanceContract.methods.propose(executor, hash);

  await call.send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
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

export function propose(web3React: any, address: string, executor: string, hash: string) {
  return async (dispatch: Dispatch<any>) => {
    const returnValue = {
      error: '',
      proposeResult: ''
    };
    await callPropose(dispatch, web3React, address, executor, hash, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.proposeResult = hash;
    });
    return returnValue;
  };
}

export const getProposalCount = async (web3: Web3, address: string, callback: any) => {
  try {
    const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);
    var proposals = await governanceContract.methods.proposalCount().call({ from: address });
    callback(null, proposals);
  } catch (e) {
    return callback(e);
  }
};

const getProposal = async (web3: Web3, address: string, number: number, callback: any) => {
  try {
    const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);
    var proposal = await governanceContract.methods.proposals(number).call({ from: address });

    proposal.executor = proposal.executor;
    proposal.hash = proposal.hash;
    proposal.quorum = proposal.quorum;
    proposal.quorumRequired = proposal.quorumRequired;

    callback(null, proposal);
  } catch (e) {
    return callback(e);
  }
};

export function getProposals(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      proposalCount: 0
    };
    await getProposalCount(web3, address, (error: any, proposalCount: string) => {
      returnValue.error = error || '';
      returnValue.proposalCount = parseInt(proposalCount);
    });
    if (returnValue.error) {
      return returnValue.error;
    }
    let arr = Array.from(Array(returnValue.proposalCount).keys());
    if (returnValue.proposalCount == 0) {
      arr = [];
    }

    async.map(arr, (proposal, callback) => {
      getProposal(web3, address, proposal, callback);
    }, (error: any, proposals) => {
      if (error) {
        returnValue.error = error;
      }
      dispatch({
        type: SET_PROPOSALS,
        payload: proposals
      });
    });
    return returnValue.error;
  };
}

export function getVoteStatus(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const web3 = new Web3(web3React.library.provider);
      const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);
      const status = await governanceContract.methods.voters(address).call({ from: address });
      dispatch({
        type: SET_VOTING,
        payload: status
      });
    } catch (e) {
    }
  };
}

const callRegisterVote = async (dispatch: Dispatch<any>, web3: Web3, address: string, callback: any) => {
  const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress);
  await governanceContract.methods.register().send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function(hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if(confirmationNumber == 2) {
        dispatch(getVoteStatus(web3, address));
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
        if(error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

export function registerVote(web3React: any, address: string) {
  return async (dispatch: Dispatch<any>) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      voteResult: ''
    };
    await callRegisterVote(dispatch, web3, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.voteResult = hash;
    });
    return returnValue;
  };
}

const callVoteFor = async (dispatch: Dispatch<any>, web3: Web3, proposal: any, address: string, callback: any) => {
  const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress)

  await governanceContract.methods.voteFor(proposal.id).send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function(hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if(confirmationNumber == 2) {
        dispatch(getProposals(web3, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if(error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if(error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

export function voteFor(web3React: any, proposal: any, address: string) {
  return async (dispatch: Dispatch<any>) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      voteForResult: ''
    };
    await callVoteFor(dispatch, web3, proposal, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.voteForResult = hash;
    });
    return returnValue;
  };
}

const callVoteAgainst = async (dispatch: Dispatch<any>, web3: Web3, proposal: any, address: string, callback: any) => {
  const governanceContract = new web3.eth.Contract(config.governanceABI as any, config.governanceAddress)

  await governanceContract.methods.voteAgainst(proposal.id).send({ from: address, gasPrice: web3.utils.toWei(await getGasPrice(), 'gwei') })
    .on('transactionHash', function(hash: string) {
      callback(null, hash);
    })
    .on('confirmation', function (confirmationNumber: any, receipt: any) {
      if(confirmationNumber == 2) {
        dispatch(getProposals(web3, address));
      }
    })
    .on('receipt', function (receipt: any) {
    })
    .on('error', function (error: any) {
      if (!error.toString().includes('-32601')) {
        if(error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    })
    .catch((error: any) => {
      if (!error.toString().includes('-32601')) {
        if(error.message) {
          return callback(error.message);
        }
        callback(error);
      }
    });
};

export function voteAgainst(web3React: any, proposal: any, address: string) {
  return async (dispatch: Dispatch<any>) => {
    const web3 = new Web3(web3React.library.provider);
    const returnValue = {
      error: '',
      voteForResult: ''
    };
    await callVoteAgainst(dispatch, web3, proposal, address, (error: any, hash: string) => {
      returnValue.error = error || '';
      returnValue.voteForResult = hash;
    });
    return returnValue;
  };
}

export function configure(web3React: any) {
  return async (dispatch: Dispatch<any>) => {
    const web3 = new Web3(web3React.library.provider);
    const currentBlock = await web3.eth.getBlockNumber();
    dispatch({
      type: SET_CURRENT_BLOCK,
      payload: currentBlock
    });
  };
}
