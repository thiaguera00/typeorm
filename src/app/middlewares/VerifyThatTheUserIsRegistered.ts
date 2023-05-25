import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import {User} from "../entities/User";


const VerifyThatTheUserIsRegistered =  async (req: Request, _res: Response, next: NextFunction) => {
    const {email } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {

    const user = await userRepository.findOne({where: { email } });

    if (user) {
        throw new Error("User already registered");
    }
 
    next(); 

    } catch (error) {
        next(error);
    }
};

export { VerifyThatTheUserIsRegistered };