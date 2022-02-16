import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import bcryptjs from 'bcryptjs'

interface IRequest {
  email: string;
  password: string;
}



class CreateSessionService {
  public async execute({email, password}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findByEmail(email);

    if(!user){
      throw new AppError('Invalid credentials. Cod: 001', 401);
    }
    
    const passCheck = await bcryptjs.compare(password, user.password);

    if(!passCheck){
      throw new AppError('Invalid credentials. Cod: 002', 401);
    }

    return user;
  }
}
 export default CreateSessionService;
