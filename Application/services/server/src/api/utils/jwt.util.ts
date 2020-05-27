import jwt, {SignOptions} from 'jsonwebtoken';
import fs from 'fs';
import Cryptr from 'cryptr'

const warning = "Path for private and/or public key not defined in the .env file.";

class JWTUtil {

    private privateKey: string;
    private publicKey: string;
    private cypherTool: Cryptr;

    constructor() {
        this.privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH || warning, 'utf-8');
        this.publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH || warning, 'utf-8');

        if(process.env.ENCRYPTION_SECRET == undefined) {
            throw new Error('Encryption secret not specified in the .env file.');
        } else {
            this.cypherTool = new Cryptr(process.env.ENCRYPTION_SECRET);
        }
    }

    private static getOptions() : SignOptions {
        return {
            issuer: process.env.JWT_PROVIDER,
            expiresIn: '60 days',
            algorithm: "RS256"
        };
    }

    public sign(payload: object) : string {
        const token: string = jwt.sign(payload, this.privateKey, JWTUtil.getOptions());
        return token;
        // return this.cypherTool.encrypt(token)
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
