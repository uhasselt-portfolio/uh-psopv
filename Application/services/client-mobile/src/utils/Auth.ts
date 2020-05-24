import JWTUtil from "./JWTUtil";
import {connect} from "react-redux";

class Auth {

    private authenticated: boolean;
    private expiresAt: number;
    private user : any

    constructor() {
        this.authenticated = false;
        this.expiresAt = -1;
        this.user = {};
    }

    isAuthenticated() : boolean {

        const token = localStorage.getItem('token');

        if(token != null) {
            const verifiedToken: any = new JWTUtil().verify(token);

            if(verifiedToken) {

                if(!this.isTokenExpired(verifiedToken)) {
                    this.authenticated = true;
                    this.expiresAt = verifiedToken.exp;
                    this.user = verifiedToken.user
                } else {
                    this.logout();
                }
            } else{
                this.authenticated = false;
            }
        } else {
            this.authenticated = false;
        }

        return this.authenticated;
    }

    logout() {
        localStorage.removeItem('token');
        this.authenticated = false;
    }

    getAuthenticatedUser() : any {
        return this.user;
    }

    hasUnverifiedToken() : boolean {
        const token = localStorage.getItem('token');

        return token != null;
    }

    isTokenExpired(token : any) : boolean {
        return token.exp <= Math.round(Date.now() / 1000);
    }
}

export default new Auth();
