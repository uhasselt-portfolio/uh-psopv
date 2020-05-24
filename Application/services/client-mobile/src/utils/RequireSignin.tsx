import React, {FunctionComponent} from 'react';
import Auth from "./Auth";
import JWTUtil from "./JWTUtil";
import {Redirect} from 'react-router-dom';
import {connect, ConnectedComponent} from "react-redux";
import {bindActionCreators} from 'redux';
import {logoutUser} from "../pages/login/LoginAction";

export default function (composed : FunctionComponent) : ConnectedComponent<any, any> {

    class RequireSignIn extends React.Component<any, any> {

        render() : React.ReactNode {

            const token = localStorage.getItem('token');

            if (this.isAuthenticated(token)) {
                return React.createElement(composed, null);
            } else {
                this.props.logoutUser();
            }

            localStorage.removeItem('token');
            return <Redirect to="/" /> // Log in

        }

        isAuthenticated(token : string | null): boolean {
            if(token != null) {
                const verifiedToken: any = new JWTUtil().verify(token);
                if(verifiedToken) {
                    if(!Auth.isTokenExpired(verifiedToken)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    function mapDispatchToProps(dispatch: any) {
        return bindActionCreators({
            logoutUser
        }, dispatch);
    }

    return connect(null, mapDispatchToProps)(RequireSignIn);
}