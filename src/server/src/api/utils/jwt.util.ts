import jwt, {SignOptions} from 'jsonwebtoken';
import fs from 'fs';
import Cryptr from 'cryptr'

// Warning constant
const warning = "Path for private and/or public key not defined in the .env file.";

/**
 * @author Michiel Swaanen
 *
 * JWT creates a unique session token for each user
 * This way we can validate and authorize specific route calls
 *
 * The Cypher library is an extra layer of encryption, this is not used at the moment
 */
class JWTUtil {

    private privateKey: string;
    private publicKey: string;
    private cypherTool: Cryptr;

    constructor() {
        this.privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH || warning, 'utf-8');
        this.publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH || warning, 'utf-8');

        if (process.env.ENCRYPTION_SECRET == undefined) {
            throw new Error('Encryption secret not specified in the .env file.');
        } else {
            this.cypherTool = new Cryptr(process.env.ENCRYPTION_SECRET);
        }
    }

    /**
     * @return SignOptions JWT its validation settings
     */
    private static getOptions(): SignOptions {
        return {
            issuer: process.env.JWT_PROVIDER,
            expiresIn: '60d',
            algorithm: "RS256"
        };
    }

    /**
     * @param payload Information that is sent with the token to the client-side
     *
     * @return string A new JWT token
     */
    public sign(payload: object): string {
        const token: string = jwt.sign(payload, this.privateKey, JWTUtil.getOptions());
        return token;
        // return this.cypherTool.encrypt(token)
    }

    /**
     * Validity of the JWT is decided by the signature and expiration time
     *
     * @param token An unverified JWT
     *
     * @return boolean false if the JWT is not valid
     * @return object information that contains the payload
     */
    public verify(token: string): boolean | object | string {
        // const decryptedToken = this.cypherTool.decrypt(token);

        try {
            return jwt.verify(token, this.publicKey, JWTUtil.getOptions());
        } catch (error) {
            return false;
        }
    }

    /**
     *
     * @param token A verified or unverified JWT
     *
     * @return object information that contains the payload
     */
    public decode(token: string): string | { [key: string]: any; } | null {
        // const decryptedToken = this.cypherTool.decrypt(token);
        return jwt.decode(token, {complete: true})
    }
}

export default JWTUtil;
