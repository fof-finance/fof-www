/**
 * @format
 */
import WorkSansTTF from 'src/assets/fonts/WorkSans-VariableFont_wght.ttf';
import colors from 'src/theme/colors';

const WorkSans = {
  fontFamily: 'Work Sans Thin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export default {
  MuiContainer: {
    root: {
      padding: '16px'
    }
  },
  MuiCssBaseline: {
    '@global': {
      '@font-face': [WorkSans],
    },
  },
  MuiSelect: {
    select: {
      padding: '9px'
    },
    selectMenu: {
      minHeight: '30px',
      display: 'flex',
      alignItems: 'center'
    }
  },
  MuiButton: {
    root: {
      borderRadius: '4px',
      padding: '10px 24px',
      margin: '5px 5px',

    },
    outlined: {
      padding: '10px 24px',
      borderWidth: '1px !important',
      border: '1px solid ' + colors.darkPurple
    },
    text: {
      padding: '10px 24px'
    },
    label: {
      textTransform: 'none',
      fontSize: '1rem'
    }
  },
  MuiSlider: {
    root: {
      color: colors.darkPurple
    }
  },
  MuiInputBase: {
    input: {
      fontSize: '16px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2
    }
  },
  MuiOutlinedInput: {
    input: {
      '&::placeholder': {
        color: colors.text
      },
      color: colors.text,
      padding: '14px',
    },
    root: {},
    notchedOutline: {}
  },
  MuiSnackbar: {
    root: {
      maxWidth: 'calc(100vw - 24px)'
    },
    anchorOriginBottomLeft: {
      bottom: '12px',
      left: '12px',
      '@media (min-width: 960px)': {
        bottom: '50px',
        left: '80px'
      }
    }
  },
  MuiSnackbarContent: {
    root: {
      backgroundColor: colors.white,
      padding: '0px',
      minWidth: 'auto',
      '@media (min-width: 960px)': {
        minWidth: '500px',
      }
    },
    message: {
      padding: '0px'
    },
    action: {
      marginRight: '0px'
    }
  },
  MuiAccordion: {
    root: {
      border: '1px solid ' + colors.gray,
      '&:hover,&.Mui-expanded': {
        boxShadow: '0px 2px 6px 2px #9082C3',
      },
      margin: '8px 0px',
      '&:before': { //underline color when textfield is inactive
        backgroundColor: 'none',
        height: '0px'
      },
    }
  },
  MuiAccordionSummary: {
    root: {
      padding: '12px 24px',
    },
    content: {
      margin: '0px !important'
    }
  },
  MuiAccordionDetails: {
    root: {
      padding: '0 12px 15px 12px',
      '@media (min-width: 960px)': {
        padding: '0 24px 10px 24px',
      }
    }
  },
  MuiPaper: {
    root: {
      color: '#333'
    },
    elevation1: {
      boxShadow: 'none'
    }
  },
  MuiToggleButtonGroup: {
    root: {
      padding: '3px',
      borderRadius: '20px',
      border: '1px solid ' + colors.borderGray
      // borderRadius: '50px',
    },
    groupedSizeSmall: {
      padding: '42px 30px'
    }
  },
  MuiToggleButton: {
    root: {
      textTransform: 'none',
      minWidth: '140px',
      height: "36px",
      border: 'none',
      padding: '8px 11px',
      borderRadius: '18px',

      '& > span > h4': {
        color: '#555',
      },
      '&:hover': {
        // backgroundColor: colors.purple,
        // color: '#fff',
      },
      '&$selected': {
        backgroundColor: colors.purple,
        'box-shadow': '0px 0px 6px 0px rgba(144, 130, 195, 0.62)',
        '& > span > h4': {
          color: '#fff',
        },
        '&:hover': {
          backgroundColor: colors.purpleHover,
          '& > span > h4': {
            color: '#fff',
          },
        },
      },
      '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
        border: 'none',
        borderRadius: '18px',
      },
      '&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
        border: 'none',
        borderRadius: '18px',
      }
    }
  },
  MuiFormControlLabel: {
    label: {
      color: colors.darkBlack,
      fontSize: '14px',
      fontWeight: '600',
      WebkitFontSmoothing: 'ntialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2
    }
  },
  MuiLink:{
    root:{
      color: colors.darkPurple
    }
  }
};
