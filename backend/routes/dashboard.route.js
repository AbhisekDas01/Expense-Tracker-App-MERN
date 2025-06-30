import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get('/' , protect , getDashboardData);


export default dashboardRouter;