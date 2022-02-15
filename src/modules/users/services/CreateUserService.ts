import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({name, email, password}: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UserRepository);

    const emailExists = await usersRepository.findByEmail(email);
    
    if(emailExists){
      throw new AppError('Email already in use.')
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    })
    
    return user;
  }
}

export default CreateUserService;
