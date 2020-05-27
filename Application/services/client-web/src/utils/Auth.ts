import JWTUtil from "./JWTUtil";

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

        const token : string | null = this.getToken();

        if(token == null)
            return this.authenticated = false;

        const verifiedToken: any = new JWTUtil().verify(token);

        if(!verifiedToken)
            return this.logout();

        if(this.isTokenExpired(verifiedToken))
            return this.logout();

        if(verifiedToken.user.permission_type_id != 3)
            return this.logout();

        this.expiresAt = verifiedToken.exp;
        this.user = verifiedToken.user

        return this.authenticated = true;;
    }

    logout() {
        localStorage.removeItem('token');
        return this.authenticated = false;
    }

    getAuthenticatedUser() : any {
        return this.user;
    }

    isTokenExpired(token : any) : boolean {
        return token.exp <= Math.round(Date.now() / 1000);
    }

    getToken() : string | null {
        return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWljaGllbCIsImxhc3RfbmFtZSI6IlN3YWFuZW4iLCJwYXNzd29yZCI6IiQyYiQwOCRFa29oTHpPcEpMRlJwMUZ4eUhUSzRPM2drRk1oVkp3aDdsQ2NjS2pBRUEuZFRKeHp5T2J2LiIsInBob25lX251bWJlciI6IjA0OTU4MTI0NTgiLCJlbWFpbCI6Im1pY2hpZWwuc3dhYW5lbkBzdHVkZW50LnVoYXNzZWx0LmJlIiwicGVybWlzc2lvbl90eXBlX2lkIjozLCJjdXJyZW50X2xhdGl0dWRlIjowLCJjdXJyZW50X2xvbmdpdHVkZSI6MCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiYXNzb2NpYXRpb25faWQiOjEsInVwZGF0ZWRfYXQiOiIyMDIwLTA1LTI2VDE0OjQ4OjQ1LjM2MloiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0yNlQxNDo0ODo0NS4zNjJaIn0sImlhdCI6MTU5MDUwNTAwNCwiZXhwIjoxNTk1Njg5MDA0LCJpc3MiOiJsb2NhbGhvc3QifQ.digiTZziYNW-VaJduJPrhiUJmi6C5JPU8xsY9d-yKkzxT69nSzw438Je01-Pew19PCH9D2x_n18soD6jeZn3bA"
    }
}

export default new Auth();
