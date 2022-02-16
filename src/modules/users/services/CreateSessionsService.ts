import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import bcryptjs from 'bcryptjs'


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({email, password}: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findByEmail(email);

    if(!user){
      throw new AppError('Invalid credentials. Cod: 001', 401);
    }
    
    const passCheck = await bcryptjs.compare(password, user.password);

    if(!passCheck){
      throw new AppError('Invalid credentials. Cod: 002', 401);
    }

    const token = sign({}, '4304730ef8b98bff2878c84be7d80617', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {user, token};
  }
}

 export default CreateSessionService;
