import dotenv from "dotenv";

dotenv.config();

class AppConfig {
    public readonly host = process.env.DB_HOST ?? "localhost";
    public readonly port = Number(process.env.DB_PORT ?? 3306);
    public readonly user = process.env.DB_USER ?? "root";
    public readonly password = process.env.DB_PASSWORD ?? "";
    public readonly database = process.env.DB_NAME ?? "";
    public readonly secretKey = process.env.JWT_SECRET ?? "";

    constructor() {
        if (!this.database) {
            throw new Error("DB_NAME is missing from the .env file");
        }

        if (!this.password) {
            throw new Error("DB_PASSWORD is missing from the .env file");
        }
    }
}

export const appConfig = new AppConfig();