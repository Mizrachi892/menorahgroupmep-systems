import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize/connection";
import dotenv from "dotenv";

dotenv.config();

const systemsTableName = process.env.DB_TABLE_NAME_SYSTEMS;

if (!systemsTableName) {
    throw new Error("Missing environment variable: DB_TABLE_NAME_SYSTEMS");
}

interface SystemsAttributes {
    id: number;
    name: string;
    description: string | null;
    system_type: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

type SystemsCreationAttributes = Optional<
    SystemsAttributes,
    | "id"
    | "description"
    | "enabled"
    | "created_at"
    | "updated_at"
>;

export class SystemsEntity
    extends Model<SystemsAttributes, SystemsCreationAttributes>
    implements SystemsAttributes
{
    public id!: number;
    public name!: string;
    public description!: string | null;
    public system_type!: string;
    public enabled!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

SystemsEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },

        system_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,

        tableName: systemsTableName,
        modelName: "SystemsEntity",

        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);