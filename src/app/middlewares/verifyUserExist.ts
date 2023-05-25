import { AppDataSource } from "../../database/data-source";
import { User } from "../entities/User";
import { Request, Response, NextFunction } from "express";

const verifyUserExist = async (req: Request, _res: Response, next: NextFunction) => {
    const {id} = req.body;
    const user = AppDataSource.getRepository(User);

    try {
        const userExist = await user.findOne({where: {id} });
        if (userExist) {
            next();
        } else {
            throw new Error("User not found");
        }

    } catch (err) {
        next(err);
    }
}

export { verifyUserExist};