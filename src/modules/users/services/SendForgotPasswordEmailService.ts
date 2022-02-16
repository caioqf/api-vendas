import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";


interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({email}: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Invalid email address.');
    }
    
    console.log(user);
    
    const token = await userTokenRepository.generate(user.id);

    console.log(token);
    
  }
}

export default SendForgotPasswordEmailService;
