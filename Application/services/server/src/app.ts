import express, {NextFunction, Request, Response} from 'express';

// Routes
import userRoutes from "./api/routes/user.routes";
import problemRoutes from "./api/routes/problem.routes";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() : void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Expose-Headers", "x-total-count");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
            res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

            next();
        })
    }

    private routes() : void {
        this.express.use("/api/user", userRoutes);
        this.express.use("/api/problem", problemRoutes);
    }
}

export default new App().express;