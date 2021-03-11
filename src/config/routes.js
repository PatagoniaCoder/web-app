import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../scenes/login/Login";
import Register from "../scenes/register/Register";
import Layout from "../scenes/layout/Layout";
import Dashboard from "../scenes/dashboard/Dashboard";



const mapStateToProps = ({ auth }) => ({
    auth
});

export const privateRoute = (WrappedComponent) =>
    connect(mapStateToProps)(({ auth, ...rest }) =>
        auth.logged === true ? (
            <WrappedComponent auth={true} {...rest} />
        ) : (
                <Redirect to="/login" />
            )
    );
export const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        exact={route.exact}
        render={(props) => <route.component {...props} {...route} />}
    />
);
export const NotFound = () => <Redirect to="/dashboard" />;
const routes = [
    {
        path: "/login",
        component: Login,
        exact: true,
    },
    {
        path: "/register",
        component: Register,
        exact: true,
    },
    {
        path: "/",
        component: privateRoute(Layout),
        routes: [
            {
                path: "/dashboard",
                component: privateRoute(Dashboard),
                exact: true,
            },
        ],
    },
    {
        component: NotFound,
    },
];


export default routes;