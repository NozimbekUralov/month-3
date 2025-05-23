import pkg from "jsonwebtoken";
import { serverConfig } from "../config.js";
const { sign, verify } = pkg;
export const jwtConfig = {
    createToken: (payload) => sign(payload, serverConfig.token_key, {expiresIn: "1d"}),
    verifyToken: (token) => verify(token, serverConfig.token_key)
}