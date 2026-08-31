import { createSequelize } from "@menorahgroupmep/common";
import { appConfig } from "../config/app.config";

export const sequelize = createSequelize(appConfig);