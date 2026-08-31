import { initDB as initCommonDB } from "@menorahgroupmep/common";
import { SERVICE_NAMES } from "@menorahgroupmep/common";
import { sequelize } from "./connection";

let relationsDefined = false;

function defineRelations(): void {
    if (relationsDefined) return;

    relationsDefined = true;
}

export function initDB(): Promise<void> {
    return initCommonDB(
        sequelize,
        SERVICE_NAMES.systems,
        defineRelations
    );
}