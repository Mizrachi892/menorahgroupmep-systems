import { systemsService } from "../service/systems.service";

class SystemsManager {

    public async getSystemsList() {
        return await systemsService.getSystemsList();
    }

    public async getSingleSystem(id: number) {
        return await systemsService.getSingleSystem(id);
    }
}

export const systemsManager = new SystemsManager();