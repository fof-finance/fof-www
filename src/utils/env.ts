/**
 * @format
 */

export const isDevelopment = function(): boolean {
  return process.env.REACT_APP_ENV === 'development';
};

export const isStaging = function(): boolean {
  return process.env.REACT_APP_ENV === 'staging';
};

export const isProduction = function(): boolean {
  return process.env.REACT_APP_ENV === 'production';
};
