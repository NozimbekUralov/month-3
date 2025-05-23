import c from "config";

export const serverConfig = {
    PORT: c.get("PORT") || 3000,
    token_key: c.get("mySecretTokenKey")
}