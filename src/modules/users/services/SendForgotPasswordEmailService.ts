import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherealMail';

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
    
    // console.log(user);
    
    const token = await userTokenRepository.generate(user.id);

    await EtherealMail.sendEmail({
      to: email,
      body: `Email recovery recived: ${token}`,
    })
    
  }
}

export default SendForgotPasswordEmailService;
