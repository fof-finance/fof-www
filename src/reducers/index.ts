/**
 * @format
 */
import { combineReducers } from 'redux';
import rewardReducer from 'src/reducers/reward';
import uiReducer from 'src/reducers/ui';
import vaultReducer from 'src/reducers/vault';
import voteReducer from 'src/reducers/vote';

const rootReducer = combineReducers({
  reward: rewardReducer,
  ui: uiReducer,
  vault: vaultReducer,
  vote: voteReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
