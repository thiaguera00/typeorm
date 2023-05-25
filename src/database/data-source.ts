import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../app/entities/User"
import {CreateUserTable1683645437420 } from "./migrations/1683645437420-CreateUserTable"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "7532",
    database: "test_ts",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUserTable1683645437420],
    subscribers: [],
})
