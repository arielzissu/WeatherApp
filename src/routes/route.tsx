import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import WeatherPage from '../pages/weather.page';
import FavoritePage from '../pages/favorite.page';

type InternalRoute = {
    component?: React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    path: string;
    exact?: boolean;
    title: string;
};

export const Routes = {
    ROOT: '/',
    WEATHER: '/weather',
    FAVORITE: '/favorite',
};

const routes: InternalRoute[] = [
    {
        path: Routes.ROOT,
        render: () => <Redirect to={Routes.WEATHER} />,
        title: 'MDC Dashboard',
    },
    {
        path: Routes.WEATHER,
        component: WeatherPage,
        title: 'Weather',
    },
    {
        path: Routes.FAVORITE,
        component: FavoritePage,
        title: 'Favorite',
    },
];

export function RoutesSwitch() {

    const renderTitle = (title: string) => (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );

    return (
        // <Switch>
        //     {routes.map(({ path, exact, render, component }) => {
        //         return <Route key={path} exact={exact !== false} path={path} render={render} component={component} />;
        //     })}
        // </Switch>
        <>
            <Switch>
                {routes.map(({ path, exact, render, component }) => {
                    return <Route key={path} exact={exact !== false} path={path} render={render} component={component} />;
                })}
                {/* <Route component={Error404Page} path="/" /> */}
            </Switch>
            <Switch>
                {routes.map(({ path, exact, title }) => (
                    <Route key={path} exact={exact !== false} path={path} render={() => renderTitle(title)} />
                ))}
                {/* <Route render={(() => renderTitle('404 - Not Found'))} /> */}
            </Switch>
        </>
    );
}
