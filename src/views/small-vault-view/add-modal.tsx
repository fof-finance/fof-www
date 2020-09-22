import React, {useState, useEffect} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Modal, Backdrop, Grid, Typography, Fade, Button, TextField, ButtonGroup} from "@material-ui/core";
import colors from 'src/theme/colors';
import {useI18n} from 'src/i18n';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const baseStyles = (theme: Theme) => (
    {
      mt: {marginTop: theme.spacing(2)},
      mb: {marginBottom: theme.spacing(2)},
      'ml-xs': {marginRight: theme.spacing(0.5)},
      grey: {color: colors.gray},
      blue: {color: colors.blue},
      red: {color: colors.red},
      colorBase: {color: colors.colorTextBase},
      colorSecondary: {color: colors.colorTextSecondary},
    }
)

const useStyles = makeStyles((theme: Theme) => ({
      ...baseStyles(theme),
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        width: '650px',
        maxWidth: '100%',
        outline: 'none',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5),
        borderRadius: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(3),
        },
      },
      mt: {
        marginTop: theme.spacing(2)
      },
      headerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& h4': {
          fontSize: '18px',
        },
        '&>a': {
          color: colors.colorTextBase
        }
      },
      titleItem: {
        display: 'flex',
        alignItems: 'center',
        '& a': {
          display: 'inline-block',
          height: '24px',
          marginLeft: theme.spacing(1),
        }
      }
    })
);
type AddProps = {
  open: boolean,
  onClose: Function,
  onSave: Function
}
type FieldType = 'sourceAddress' | 'administratorAddress' | 'strategyAddress'
type FieldObjType = {
  field: FieldType
}

export default function AddModal(props: AddProps) {
  const classes = useStyles();
  const i18n = useI18n();
  const {open, onClose, onSave} = props;
  const handleClose = () => {
    onClose()
  };
  const [form, setForm] = useState({
    sourceAddress: '',
    administratorAddress: '',
    strategyAddress: '',
  })
  useEffect(() => {
    if (!open) {
      setForm({
        sourceAddress: '',
        administratorAddress: '',
        strategyAddress: '',
      })
    }
  }, [open])

  const onchange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value
    })
  }
  const fieldArr: FieldObjType[] = [
    {field: 'sourceAddress',},
    {field: 'administratorAddress',},
    {field: 'strategyAddress',},
  ]
  let disabled = false;
  fieldArr.forEach((fieldObj: FieldObjType) => {
        if (!form[fieldObj.field]) {
          disabled = true
        }
      }
  )
  // @ts-ignore
  // @ts-ignore
  return (
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.headerBox}>
              <div className={classes.titleItem}>
                <Typography
                    variant={'h4'}
                    noWrap
                    className={classes.colorSecondary}>
                  {i18n.t('smallVault.addText')}
                </Typography>
                <a href="">
                  <HelpOutlineIcon/>
                </a>
              </div>
              <a href="" onClick={(e) => {
                e.preventDefault();
                handleClose()
              }}>
                <CloseIcon/>
              </a>
            </div>
            {
              fieldArr.map((fieldObj: FieldObjType) => {
                    const field = fieldObj.field
                    const labelText = i18n.t(`smallVault.${field}Label`)
                    // @ts-ignore
                    // @ts-ignore
                    return (
                        <Grid container justify="center" className={classes.mt} key={field}>
                          <Grid item xs={11} sm={8}>
                            <TextField
                                id={field}
                                label={labelText}
                                style={{margin: 8}}
                                fullWidth
                                margin="normal"
                                value={form[field]}
                                onChange={(e) => {
                                  onchange(field, e.target.value)
                                }}
                                variant="outlined"
                            />
                          </Grid>
                        </Grid>
                    )
                  }
              )
            }

            <Grid container justify="center" className={classes.mt} spacing={4}>
              <Grid item xs={11} sm={8}>
                <Button
                    disabled={disabled}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      onSave(form)
                    }}
                >
                  {i18n.t('confirm')}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
  );
}
