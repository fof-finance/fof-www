/**
 * @format
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  IconButton,
  Snackbar as MUSnackbar,
  SnackbarCloseReason,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { hideSnackbar } from 'src/actions/ui';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';
import colors from 'src/theme/colors';

const iconStyle = {
  fontSize: '22px',
  marginRight: '10px',
  verticalAlign: 'middle'
};

interface IconProps {
  color?: string;
}

function CloseIcon(props: IconProps) {
  const { color } = props;

  return (
    <SvgIcon style={{ fontSize: '22px' }}>
      <path
        fill={color}
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </SvgIcon>
  );
}

function SuccessIcon(props: IconProps) {
  const { color } = props;

  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={color}
        d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM10.75,16.518,6.25,12.2l1.4-1.435L10.724,13.7l6.105-6.218L18.25,8.892Z"
      />
    </SvgIcon>
  );
}

function ErrorIcon(props: IconProps) {
  const { color } = props;

  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={ color }
        d="M16.971,0H7.029L0,7.029V16.97L7.029,24H16.97L24,16.971V7.029L16.971,0Zm-1.4,16.945-3.554-3.521L8.5,16.992,7.079,15.574l3.507-3.566L7,8.536,8.418,7.119,12,10.577l3.539-3.583,1.431,1.431-3.535,3.568L17,15.515Z"
      />
    </SvgIcon>
  );
}

function WarningIcon(props: IconProps) {
  const { color } = props;

  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={color}
        d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
      />
    </SvgIcon>
  );
}

function InfoIcon(props: IconProps) {
  const { color } = props;

  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={color}
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5"
      />
    </SvgIcon>
  );
}

function Snackbar() {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state: RootState) => state.ui.snackbarState);
  const i18n = useI18n();

  const handleClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideSnackbar());
  };

  let icon = <SuccessIcon color={colors.blue}/>;
  let color = colors.blue;
  let messageType = i18n.t('snackbar.success');
  let actions = [
    <IconButton
      key="close"
      aria-label={i18n.t('snackbar.close')}
      onClick={handleClose as any}
    >
      <CloseIcon/>
    </IconButton>,
  ];

  switch (snackbarState?.type) {
    case 'Error':
      icon = <ErrorIcon color={colors.red}/>;
      color = colors.red;
      messageType = i18n.t('snackbar.error');
      break;
    case 'Warning':
      icon = <WarningIcon color={colors.orange}/>;
      color = colors.orange;
      messageType = i18n.t('snackbar.warning');
      break;
    case 'Info':
      icon = <InfoIcon color={colors.blue}/>;
      color = colors.blue;
      messageType = i18n.t('snackbar.info');
      break;
    case 'Hash':
      icon = <SuccessIcon color={colors.blue}/>;
      color = colors.blue;
      messageType = i18n.t('snackbar.hash');

      let snackbarMessage = 'https://etherscan.io/tx/' + snackbarState.message;
      actions = [
        <Button
          variant="text"
          size="small"
          onClick={() => window.open(snackbarMessage, '_blank')}
        >
          {i18n.t('snackbar.view')}
        </Button>,
        <IconButton
          key="close"
          aria-label={i18n.t('snackbar.close')}
          onClick={handleClose as any}
        >
          <CloseIcon/>
        </IconButton>,
      ];
      break;
    case 'Success':
    default:
      // pass through
      break;
  }

  return (
    <MUSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackbarState?.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={
        <div style={{ padding: '12px', borderLeft: '5px solid ' + color, borderRadius: '4px' }}>
          {icon}
          <div style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '400px' }}>
            <Typography
              variant='body1'
              style={{ fontSize: '12px', color: color }}
            >
              { messageType }
            </Typography>
            <Typography
              variant='body1'
              style={{ fontSize: '10px', color: colors.lightBlack }}
            >
              { snackbarState?.message }
            </Typography>
          </div>
        </div>
      }
      action={actions}
    />
  );
}

export default Snackbar;
