/**
 * @format
 */
import produce from 'immer';
import {
  SET_VOTING,
  SET_PROPOSALS,
  SET_CURRENT_BLOCK
} from 'src/actions/vote';

interface State {
  voting: boolean;
  proposals: any[] | null;
  currentBlock: number;
}

const initialState: State = {
  voting: false,
  proposals: null,
  currentBlock: 0
};

const voteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_VOTING: {
      const voting: boolean = action.payload;

      return produce(state, (draft) => {
        draft.voting = voting;
      });
    }
    case SET_PROPOSALS: {
      const proposals: any[] = action.payload;

      return produce(state, (draft) => {
        draft.proposals = proposals;
      });
    }
    case SET_CURRENT_BLOCK: {
      const currentBlock: number = action.payload;

      return produce(state, (draft) => {
        draft.currentBlock = currentBlock;
      });
    }

    default: {
      return state;
    }
  }
};

export default voteReducer;
