import {Request, Response, Router} from 'express'
import { deleteUser, getUsers, updateUser, userRegistrations } from '../repositories/UserRepository'
import { VerifyThatTheUserIsRegistered } from '../middlewares/VerifyThatTheUserIsRegistered';
import { verifyUserExist } from '../middlewares/verifyUserExist';


const userRouter = Router();

userRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const users = await getUsers();

  return res.status(200).json(users);
});

userRouter.post('/', VerifyThatTheUserIsRegistered, async (req: Request, res: Response): Promise<Response> => {
  const { name, last_name, email } = req.body;

  try {
    await userRegistrations({ name, last_name, email });

    return res.status(201).send({ message: 'User created successfully' });

  } catch (error) {
    return res.status(500).send({ message: 'Error creating user' });
  }

});

userRouter.delete('/:id', verifyUserExist, async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const userId = parseInt(id)

        await deleteUser(userId)
    
        return res.status(200).send({ message: 'User deleted successfully' });
      } catch (error) {
        return res.status(500).send({ message: 'Error deleting user' });
      }

}); 

userRouter.put('/:id', verifyUserExist, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {name, last_name, email} = req.body;

    try {
      const userId = parseInt(id);

      await updateUser(userId, {name, last_name, email});

      return res.status(200).send({ message: 'User updated successfully'})
    } catch (error) {
      return res.status(404).send({ message: 'User not found'});
    }
});

export { userRouter };