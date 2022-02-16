import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import bcryptjs from 'bcryptjs'

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({id, name, email, password}: IRequest): Promise<User>{
  
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id)

    if(!user){
      throw new AppError('User not found.')
    }

    const hashed = await bcryptjs.hash(password, 10)

    user.name = name;
    user.email = email;
    user.password = hashed;
    
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
