import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useI18n } from "src/i18n";
import {
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import colors from "src/theme/colors";
import { getTokenPrice } from "src/actions/tools";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getVaultBalances } from 'src/actions/vault';
import { useWeb3React } from "@web3-react/core";
import { RootState } from "src/reducers";

const useStyles = makeStyles((theme) => ({
  tool: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
    minWidth: "100%",
    marginTop: "40px",
    [theme.breakpoints.up("md")]: {
      minWidth: "900px",
    },
    "& h3": {
      marginBottom: 50,
      fontSize: 16,
      fontFamily: "PingFangSC-Regular, PingFang SC",
      fontWeight: 400,
      color: "#666666",
      lineHeight: "50px",
      "& span": {
        display: "inline-block",
        verticalAlign: "middle",
      },
      "&>span:last-child": {
        marginLeft: 12,
        fontSize: 36,
        fontFamily: "PingFangSC-Semibold, PingFang SC",
        fontWeight: 600,
        color: "#9082C3",
        lineHeight: "50px",
        background: "linear-gradient(110deg, #493889 0%, #CE380C 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
  },
  list: {
    marginTop: 42,
    "& .MuiTableCell-root": {
      border: `1px solid ${colors.borderGray}`,
      padding: 14,
      fontFamily: "PingFangSC-Regular, PingFang SC",
      fontWeight: 400,
      color: "#333333",
    },
    "& .MuiTableCell-head": {
      color: "#666",
    },
  },
  red: {
    color: "#C86B63",
  },
}));

// 金额千分位
const moneyFormat = (num: string | number) => {
  return Number(num)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};

export default function ToolView() {
  const classes = useStyles();
  const i18n = useI18n();
  const theme = useTheme();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  // const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [sort, setSort] = React.useState("totalSum");
  const web3React = useWeb3React();
  const { account } = web3React;
  const assetsList = useSelector((state: RootState) => state.vault.vaultAssets);

  const [aList, setAList] = React.useState(assetsList);

  React.useEffect(() => {
    if (account) dispatch(getVaultBalances(web3React, account));
  }, [account]);

  // DAI value
  React.useEffect(()=>{
    if(account){
      if(assetsList.length){
        for(let i = 0; i< assetsList.length; i++){
            dispatch(getTokenPrice(assetsList[i].erc20address, assetsList[i].decimals)).then((r) => {
                const p: number = +r.price * +r.ethprice
                assetsList[i].price = p
                // 个人
                assetsList[i].value = (p * assetsList[i].vaultBalance).toFixed(2);
                // 总额
                assetsList[i].totalValue = (p * assetsList[i].total).toFixed(2)
                setAList([...assetsList])
              }
            ).catch((e: any) => {
              console.log(assetsList[i].erc20address,e)
            })   
        }
      }
    }
  }, [])

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newSort: string
  ) => {
    setSort(newSort);
  };
  
  const getTotalSum = ()=>{
    let num = 0;
    assetsList.map((item)=>{
      num += Number(item.totalValue || 0)
    })
    return num
  }

  return (
    <Container component="main" maxWidth="md">
      <Box>
        <div className={classes.tool}>
          <h3>
            <span>{i18n.t("tool.global value")}:</span>{" "}
            <span>$ {moneyFormat(getTotalSum())}</span>
          </h3>
          <div>
            <ToggleButtonGroup
              value={sort}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              // size={upSm ? 'medium' : 'small'}
              size="small"
            >
              <ToggleButton value="totalSum" aria-label="left aligned">
                {i18n.t("tool.total sum")}
              </ToggleButton>
              <ToggleButton value="personal" aria-label="centered">
                {i18n.t("tool.personal")}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={classes.list}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{i18n.t("tool.asset")}</TableCell>
                    <TableCell align="center">
                      {i18n.t("tool.deposit")}
                    </TableCell>
                    <TableCell align="center">{i18n.t("tool.value")}</TableCell>
                    <TableCell align="center">{i18n.t("tool.ARY")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aList.map((row: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{sort==='personal'?Number(row.vaultBalance).toFixed(2):Number(row.total).toFixed(2)}</TableCell>
                      <TableCell align="center">{sort==='personal'?(row.value || 0):(row.totalValue || 0)}</TableCell>
                      <TableCell align="center">
                        <span className={classes.red}>{Number(row.apy).toFixed(2)}</span> %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </Container>
  );
}
