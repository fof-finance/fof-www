import React from 'react';
import Color from 'color';
import {
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colors from 'src/theme/colors';

const {purple, purpleHover, darkPurple} = colors;
const darkPurpleColor = Color(darkPurple);
const ColorButton = withStyles((theme: Theme) => ({
  root: {
    padding: '3px 24px',
    '&.border-radius': {
      borderRadius: '18px;',
    }
  },
  containedPrimary:{
    color: colors.white,
    background: darkPurple,
    borderColor: darkPurple,
    '&:hover': {
      color: '#fff',
      borderColor: darkPurple,
      background: darkPurpleColor.hsl().lighten(0.9).string()
    },
    '&:active': {
      color: '#fff',
      borderColor: darkPurple,
      background: darkPurple
    }
  },
  outlinedPrimary: {
    color: darkPurple,
    borderColor: darkPurple,
    '&:hover': {
      color: '#fff',
      borderColor: darkPurple,
      background: darkPurpleColor.hsl().lighten(0.9).string()
    },
    '&:active': {
      color: '#fff',
      borderColor: darkPurple,
      background: darkPurple
    }
  }
}))(Button);

export default ColorButton;
