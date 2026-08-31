import { systemsDao } from "../dao/systems.dao";
import { ResourceNotFound } from "@menorahgroupmep/common";

class SystemsService {

    public async getSystemsList() {
        return await systemsDao.getSystemsList();
    }

    public async getSingleSystem(id: number) {
        const system = await systemsDao.getSingleSystem(id);

        if (!system) {
            throw new ResourceNotFound(id);
        }

        return system;
    }
}

export const systemsService = new SystemsService();