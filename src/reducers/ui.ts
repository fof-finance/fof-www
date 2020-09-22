/**
 * @format
 */
import produce from 'immer';
import {
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
  SET_LANGUAGE,
  SnackbarInfo,
  SnackbarType
} from 'src/actions/ui';
import { findBestAvailableLanguage } from 'src/i18n';

interface SnackbarState {
  open: boolean;
  type: SnackbarType;
  message: string;
}

interface State {
  snackbarState: SnackbarState | null;
  language: string;
}

const initialState: State = {
  snackbarState: null,
  language: localStorage.getItem('lang') || findBestAvailableLanguage()
};

const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HIDE_SNACKBAR: {
      return produce(state, (draft) => {
        if (draft.snackbarState) {
          draft.snackbarState.open = false;
        }
      });
    }
    case SHOW_SNACKBAR: {
      const snackbarInfo: SnackbarInfo = action.payload;

      return produce(state, (draft) => {
        draft.snackbarState = {
          open: true,
          type: snackbarInfo.type,
          message: snackbarInfo.message
        };
      });
    }
    case SET_LANGUAGE: {
      const language: string = action.payload;
      localStorage.setItem('lang', language);

      return produce(state, (draft) => {
        draft.language = language;
      });
    }

    default: {
      return state;
    }
  }
};

export default uiReducer;
