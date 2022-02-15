import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoriy";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsReposotory = getCustomRepository(ProductRepository);
    
    const products = await productsReposotory.find();
    
    return products;
  }
}

export default ListProductService;
