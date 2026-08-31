import {Router} from "express";
import type {Router as ExpressRouter} from "express";

import {Role} from "@menorahgroupmep/common";
import {secureService} from "@menorahgroupmep/auth";
import {systemsController} from "../controller/systems.controller";

const systemsRouter: ExpressRouter = Router();

/* ------------------------------------------------------------------
 * Internal API - Microservice to Microservice
 * ------------------------------------------------------------------ */


/* ------------------------------------------------------------------
 * Public API - Through Gateway
 * ------------------------------------------------------------------ */

systemsRouter.get("/getServiceHealth", systemsController.getServiceHealth);
systemsRouter.get("/getSystemsList", secureService.verifyRole(Role.Administrator, Role.Manager, Role.Operator, Role.Viewer), systemsController.getSystemsList);
systemsRouter.get("/getSingleSystem/:id", secureService.verifyRole(Role.Administrator, Role.Manager, Role.Operator, Role.Viewer), systemsController.getSingleSystem);

export {systemsRouter};