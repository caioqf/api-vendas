import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoriy"

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({id}: IRequest): Promise<void>{
    const productsReposotory = getCustomRepository(ProductRepository);
    
    const product = await productsReposotory.findOne(id);
    if(!product){
      throw new AppError('Product not found.');
    }

    await productsReposotory.remove(product);

  }
}

export default DeleteProductService;
