/**
 * @format
 */
import React, {
  lazy,
  Fragment,
  Suspense
} from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import LoadingScreen from 'src/components/loading-screen.component';
import MainLayout from 'src/layouts/main-layout';
import HomeView from 'src/views/home-view/index';
import VaultView from 'src/views/vault-view';
import VoteView from 'src/views/vote-view';
import SmallVaultView from 'src/views/small-vault-view';
import StakeView from 'src/views/stake-view';
import ToolView from 'src/views/tool-view';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home"/>
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        exact: true,
        path: '/vault',
        component: VaultView,
      },
      {
        exact: true,
        path: '/stake',
        component: StakeView,
      },
      {
        exact: true,
        path: '/vote',
        component: VoteView,  
      },
      {
        exact: true,
        path: '/small-vault',
        component: SmallVaultView,
      },
      {
        exact: true,
        path: '/tool',
        component: ToolView,  
      },
    ]
  }
];

const renderRoutes = (routes: any) => (routes ? (
  <Suspense fallback={<LoadingScreen/>}>
    <Switch>
      {routes.map((route: any, i: number) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props}/>}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
