import express, {Application, ErrorRequestHandler, RequestHandler} from "express";
import cors from "cors";

// import { socketService } from "./sockets/socket.service";

import {loggerMiddleware, errorMiddleware, BASE_PORTS, SERVICE_NAMES} from "@menorahgroupmep/common";

import {systemsRouter} from "./routes/routes";
import {initDB} from "./sequelize/initDB";

class App {
    private server: Application;
    private httpServer?: ReturnType<Application["listen"]>;

    constructor() {
        this.server = express();

        this.setupCors();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandlers();
    }

    private setupCors(): void {
        this.server.use(cors({
            origin: [
                "http://localhost:3000",
                "http://10.0.0.139:3000",
            ],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));

        this.server.options(/.*/, cors());
    }

    private setupMiddlewares(): void {
        const middlewares: RequestHandler[] = [
            express.json(),
            loggerMiddleware.consoleLog,
        ];

        middlewares.forEach((middleware) => {
            this.server.use(middleware);
        });
    }

    private setupRoutes(): void {
        this.server.use(systemsRouter);
    }

    private setupErrorHandlers(): void {
        const errorHandlers: (RequestHandler | ErrorRequestHandler)[] = [
            errorMiddleware.routeNotFound,
            errorMiddleware.catchAll,
        ];

        errorHandlers.forEach((handler) => {
            this.server.use(handler);
        });
    }

    public async start(port: number): Promise<void> {
        try {
            await initDB();

            this.httpServer = this.server.listen(port, () => {
                console.log(
                    `🚀 ${SERVICE_NAMES.systems} service is running on port ${port}`
                );
            });

            // socketService.init(this.httpServer);

        } catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    }

    public stop(): void {
        if (!this.httpServer) {
            console.log("Server is not running.");
            return;
        }

        this.httpServer.close(() => {
            console.log("Server stopped successfully.");
        });
    }
}

const app = new App();

app.start(BASE_PORTS.systems);