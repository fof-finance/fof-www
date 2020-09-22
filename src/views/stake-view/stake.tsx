import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import colors from "src/theme/colors";
import { useI18n } from "src/i18n";
import StackAction from "./stake-action";
import ExpandMore from "src/components/expand.compoent";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  investedContainerLoggedOut: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    marginTop: "40px",
    [theme.breakpoints.up("md")]: {
      minWidth: "900px",
    },
  },
  balancesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    padding: "12px 12px",
    position: "relative",
  },
  connectContainer: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "450px",
    [theme.breakpoints.up("md")]: {
      width: "450",
    },
  },
  intro: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "32px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      maxWidth: "calc(100vw - 24px)",
      flexWrap: "wrap",
    },
  },
  introCenter: {
    maxWidth: "500px",
    textAlign: "center",
    display: "flex",
    padding: "24px 0px",
  },
  introText: {
    paddingLeft: "20px",
  },
  actionButton: {
    "&:hover": {
      backgroundColor: "#2F80ED",
    },
    padding: "12px",
    backgroundColor: "#2F80ED",
    border: "1px solid #E1E1E1",
    fontWeight: 500,
    [theme.breakpoints.up("md")]: {
      padding: "15px",
    },
  },
  heading: {
    display: "none",
    flex: 1,
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  headingName: {
    display: "flex",
    alignItems: "center",
    width: "325px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      flex: 1,
    },
  },
  headingEarning: {
    flex: 1,
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      justifyContent: "flex-end",
      "text-align": "right",
      width: "auto",
    },
  },
  buttonText: {
    fontWeight: 700,
    color: "white",
  },
  poolSummary: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  poolIcon: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "middle",
    borderRadius: "20px",
    height: "30px",
    width: "30px",
    textAlign: "center",
    cursor: "pointer",
    marginRight: "20px",
    [theme.breakpoints.up("sm")]: {
      height: "40px",
      width: "40px",
      marginRight: "24px",
    },
  },
  addressContainer: {
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    flex: 1,
    whiteSpace: "nowrap",
    fontSize: "0.83rem",
    textOverflow: "ellipsis",
    cursor: "pointer",
    padding: "28px 30px",
    borderRadius: "50px",
    border: "1px solid " + colors.borderBlue,
    alignItems: "center",
    maxWidth: "450px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },

  expansionPanel: {
    maxWidth: "calc(100vw - 24px)",
    width: "100%",
  },
  versionToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tableHeadContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  investAllContainer: {
    paddingTop: "24px",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  assetIcon: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "middle",
    borderRadius: "20px",
    height: "30px",
    width: "30px",
    textAlign: "center",
    cursor: "pointer",
    marginRight: "20px",
    [theme.breakpoints.up("sm")]: {
      height: "40px",
      width: "40px",
      marginRight: "24px",
    },
  },
  fees: {
    paddingRight: "75px",
    padding: "12px",
    lineHeight: "1.2",
  },
  walletAddress: {
    padding: "0px 12px",
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray,
  },
  grey: {
    color: colors.darkGray,
  },
  flexy: {
    display: "flex",
    alignItems: "center",
  },
  on: {
    color: colors.darkGray,
    padding: "0px 6px",
  },
  sep: {
    height: "1px",
    background: "#eee",
    margin: "0px 15px 12px",
  },
}));

function StacksView(props: any) {
  const i18n = useI18n();
  let classes = useStyles();
  let stake = props.stake;
  const handleChange = props.handleChange;
  const expanded = props.expanded;
  return (
    <Accordion
      className={classes.expansionPanel}
      square
      key={stake.id + "_expand"}
      expanded={expanded === stake.id}
      onChange={() => {
        handleChange(stake.id);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container className={classes.poolSummary}>
          <Grid item xs={6} sm={12} md={3} className={classes.headingName}>
            <div className={classes.assetIcon}>
              <img
                alt=""
                src={require("../../assets/img/" +
                  stake.rewardsSymbol +
                  "-logo.png")}
                style={stake.disabled ? { filter: "grayscale(100%)" } : {}}
                height="40px"
              />
            </div>
            <div>
              <Typography variant={"h4"} noWrap>
                {stake.id}
              </Typography>
              <Typography variant={"h5"} className={classes.grey}>
                {stake.symbol}
              </Typography>
            </div>
          </Grid>
          {!["LINK"].includes(stake.id) && (
            <Grid item xs={12} sm={5} md={3} className={classes.heading}>
              <Typography variant={"h5"} noWrap>
                {stake.balance ? stake.balance.toFixed(4) : "0.0000"} {stake.symbol}
              </Typography>
              <Typography variant={"h5"} className={classes.grey}>
                {i18n.t("stake.yourBalance")}
              </Typography>
            </Grid>
          )}
          {!["LINK"].includes(stake.id) && (
            <Grid item xs={12} sm={5} md={3} className={classes.heading}>
              <Typography variant={"h5"} noWrap>
                {stake.stakedBalance ? stake.stakedBalance.toFixed(4) : "0.0000"}{" "}
                {stake.symbol}
              </Typography>
              <Typography variant={"h5"} className={classes.grey}>
                {i18n.t("stake.currentlyStaked")}
              </Typography>
            </Grid>
          )}
          <Grid item xs={6} sm={5} md={3} className={classes.headingEarning}>
            <Typography variant={"h5"} noWrap>
              {stake.rewardsSymbol == "$" ? stake.rewardsSymbol : ""}{" "}
              {stake.rewardsAvailable ? stake.rewardsAvailable.toFixed(4) : "0.0000"}{" "}
              {stake.rewardsSymbol != "$" ? stake.rewardsSymbol : ""}
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t("stake.rewardsAvailable")}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <div className={classes.sep}></div>
      <AccordionDetails>
        <StackAction
          stake={stake}
          poolName={props.poolName}
          BPTLPRequirements={props.BPTLPRequirements}
        ></StackAction>
      </AccordionDetails>
    </Accordion>
  );
}

export default StacksView;
