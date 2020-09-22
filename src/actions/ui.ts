/**
 * @format
 */
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export type SnackbarType = 'Error' | 'Success' | 'Warning' | 'Info' | 'Hash';

export interface SnackbarInfo {
  type: SnackbarType;
  message: string;
}

export function hideSnackbar() {
  return {
    type: HIDE_SNACKBAR
  };
}

export function showSnackbar(info: SnackbarInfo) {
  return {
    type: SHOW_SNACKBAR,
    payload: info
  };
}

export function setLanguage(language: string) {
  return {
    type: SET_LANGUAGE,
    payload: language
  };
}
