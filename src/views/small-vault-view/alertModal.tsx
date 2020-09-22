import React, {useEffect} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, Box, makeStyles
} from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import colors from 'src/theme/colors';
import {useI18n} from 'src/i18n';

const useStyles = makeStyles((theme) => ({
  root: {},
  mt: {
    marginTop: theme.spacing(2)
  },
  mb: {
    marginBottom: theme.spacing(2)
  },
  pl: {
    paddingLeft: theme.spacing(1)
  },
  center: {
    textAlign: 'center'
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

export default function AlertDialog(props: any) {
  const classes = useStyles();
  const i18n = useI18n();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (props.open) {
      setOpen(true);
    }
  }, [props.open])

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box className={classes.center}>
            <ReportProblemOutlinedIcon style={{fontSize: '40px', color: colors.red}}/>
          </Box>
          <DialogContentText id="alert-dialog-slide-description"> {i18n.t('smallVault.warnText')} </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button
              style={{width: '200px'}}
              onClick={handleClose} color="primary" variant="contained">{i18n.t('confirm')}</Button>
        </DialogActions>
      </Dialog>
  );
}
