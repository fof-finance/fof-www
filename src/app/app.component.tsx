/**
 * @format
 */
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import {
  createMuiTheme,
  createStyles,
  jssPreset,
  makeStyles,
  CssBaseline,
  MuiThemeProvider,
  StylesProvider
} from '@material-ui/core';
import { Web3ReactProvider } from '@web3-react/core';
import { AppLoading, Task } from 'src/app/app-loading.component';
import Routes from 'src/app/routes.component';
import Auth from 'src/components/auth.component';
import ScrollReset from 'src/components/scroll-reset.component';
import Snackbar from 'src/components/snackbar.component';
import { I18nProvider } from 'src/i18n';
import { RootState } from 'src/reducers';
import { theme } from 'src/theme';
import { injected } from 'src/utils/connectors';

const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

const loadingTasks: Task[] = [
  async (dispatch: any, activate: any) => {
    const isAuthorized = await injected.isAuthorized();
    if (isAuthorized) {
      await activate(injected);
    }
    return null;
  }
];

const App = (props:object): React.ReactElement => {
  return (
    <Router history={history}>
      <Auth>
        <CssBaseline/>
        <ScrollReset/>
        <Routes/>
        <Snackbar/>
      </Auth>
    </Router>
  );
};

const Application = (): React.ReactElement => {
  const language = useSelector((state: RootState) => state.ui.language);

  useStyles();

  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  };

  return (
    <I18nProvider language={language}>
      <MuiThemeProvider theme={ createMuiTheme(theme as any) }>
        <StylesProvider jss={jss}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <AppLoading
              tasks={loadingTasks}
            >
              {(props: any) => <App {...props}/>}
            </AppLoading>
          </Web3ReactProvider>
        </StylesProvider>
      </MuiThemeProvider>
    </I18nProvider>
  );
};

export default Application;
export{
  history
}
