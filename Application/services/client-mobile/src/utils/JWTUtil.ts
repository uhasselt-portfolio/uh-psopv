import jwt, {SignOptions} from 'jsonwebtoken';
import fs from 'fs';
// import Cryptr from 'cryptr'

const warning = "Path for private and/or public key not defined in the .env file.";

class JWTUtil {

    private publicKey: string;
    // private cypherTool: Cryptr;

    constructor() {
        this.publicKey = "-----BEGIN PUBLIC KEY-----\n" +
            "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJGAeuvDce4//KYqjVEGA/jGopACL+3k\n" +
            "PpePi9HmjW1oKlTMOZqBq2iUcL/trpg1yTXAgJVseg88uKyBgxD5wq8CAwEAAQ==\n" +
            "-----END PUBLIC KEY-----";
    }

    private static getOptions() : SignOptions {
        return {
            // issuer: process.env.JWT_PROVIDER,
            // expiresIn: process.env.JWT_EXPIRATION,
            issuer: "localhost",
            expiresIn: "30s",
            algorithm: "RS256"
        };
    }

    public verify(token: string) : boolean | object | string {
        // const decryptedToken = this.cypherTool.decrypt(token);
        try {
            return jwt.verify(token, this.publicKey, JWTUtil.getOptions());
        } catch(error) {
            return false;
        }
    }

    public decode(token: string) : string | { [key: string]: any; } | null {
        // const decryptedToken = this.cypherTool.decrypt(token);
        return jwt.decode(token, {complete: true})
    }
}

export default JWTUtil;