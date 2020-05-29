import express, {NextFunction, Request, Response} from 'express';
// Routes
import userRoutes from "./api/routes/user.routes";
import importRoutes from "./api/routes/import.routes";
import problemRoutes from "./api/routes/problem.routes";
import itemRoutes from "./api/routes/item.routes";
import shiftRoutes from "./api/routes/shift.routes";
import messageRoutes from "./api/routes/message.routes";
import postRoutes from "./api/routes/post.routes";
import associationRoutes from "./api/routes/association.routes";
import generalPostRoutes from "./api/routes/general_post.routes";
import problemTypeRoutes from "./api/routes/problem_type.routes";
import itemTypeRoutes from "./api/routes/item_type.routes";
import planningRoutes from "./api/routes/planning.routes"
import sectorRoutes from "./api/routes/sector.routes"

/**
 * @author Michiel Swaanen
 * @version 1.0
 *
 * Starts up the server application
 */
class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    /**
     * Apply middleware to every route call that happens
     */
    private middleware(): void {
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

    /**
     * Connect all the controllers with the parent routes
     */
    private routes(): void {
        this.express.use("/api/user", userRoutes);
        this.express.use("/api/import", importRoutes);
        this.express.use("/api/problem", problemRoutes);
        this.express.use("/api/item", itemRoutes);
        this.express.use("/api/post", postRoutes);
        this.express.use("/api/shift", shiftRoutes);
        this.express.use("/api/message", messageRoutes);
        this.express.use("/api/association", associationRoutes);
        this.express.use("/api/general_post", generalPostRoutes);
        this.express.use("/api/item_type", itemTypeRoutes);
        this.express.use("/api/problem_type", problemTypeRoutes);
        this.express.use("/api/planning", planningRoutes);
        this.express.use("/api/sector", sectorRoutes);
    }
}

export default new App().express;