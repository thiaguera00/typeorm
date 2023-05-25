import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";


const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const userRegistrations = async (userData: IUser) => {
    const userRepository = AppDataSource.getRepository(User); 

    return userRepository.save(userData);
}

const deleteUser = async ( id: number) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({where:{id}});
    
    if (user) {
        return userRepository.remove(user);
    }
    return null;
};

const updateUser = async (id:number, userData: IUser) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({where: {id}});

    if (user) {
      return userRepository.update(id, 
        {
            name: userData.name, 
            last_name: userData.last_name, 
            email: userData.email
        })
    }

    return null;
}

export { getUsers, userRegistrations, deleteUser, updateUser};