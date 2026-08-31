import { SystemsEntity } from "../entity/systems.entity";

class SystemsDao {

    public async getSystemsList() {
        return await SystemsEntity.findAll({
            order: [["id", "ASC"]]
        });
    }

    public async getSingleSystem(id: number) {
        return await SystemsEntity.findByPk(id);
    }
}

export const systemsDao = new SystemsDao();