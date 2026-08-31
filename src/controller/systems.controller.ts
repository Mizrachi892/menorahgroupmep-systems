import {Request, Response} from "express";
import {StatusCode, ServiceHealth, SERVICE_NAMES} from "@menorahgroupmep/common";

import {systemsManager} from "../manager/systems.manager";
import {serviceStartTime} from "../config/serviceStartTime";

class SystemsController {

    public async getServiceHealth(request: Request, response: Response): Promise<void> {

        const health: ServiceHealth = {
            service: SERVICE_NAMES.systems,
            status: "UP",
            timestamp: new Date().toISOString(),
            version: "1.0.0",
            startedAt: serviceStartTime.toISOString(),
        };
        response.status(StatusCode.OK).json(health);
    }


    public async getSystemsList(request: Request, response: Response): Promise<void> {
        const systems = await systemsManager.getSystemsList();
        response.status(StatusCode.OK).json(systems);
    }


    public async getSingleSystem(request: Request, response: Response): Promise<void> {
        const id = Number(request.params.id);
        const system = await systemsManager.getSingleSystem(id);
        response.status(StatusCode.OK).json(system);
    }
}

export const systemsController = new SystemsController();