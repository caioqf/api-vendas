import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async findByEmail(email: string): Promise<User | undefined> {
    const product = this.findOne({
      where: {
        email,
      }
    });
    return product;
  }
}
