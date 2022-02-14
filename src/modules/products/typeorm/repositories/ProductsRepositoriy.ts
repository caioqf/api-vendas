import { EntityRepository, Repository } from "typeorm";
import Product  from "../entities/Product";

//Manipulação das funções ja existentes no TypeORM pra modificação de album campo da tabela
//No exemplo abaixo, extende Repository e crio uma função de procurar determinado produto pelo NOME dele.

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  
  public async findByName(name: string): Promise< Product | undefined > {
    const product = this.findOne({
      where: {
        name,
      }
    });
    return product;
  }
}
