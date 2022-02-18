import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoriy";
import RedisCache from "@shared/cache/RedisCache";


class ListProductService {
  public async execute(): Promise<Product[]> {

    const productsReposotory = getCustomRepository(ProductRepository);
  
    const redisCache = new RedisCache()

    const products = await productsReposotory.find();
    
    await redisCache.save('teste', 'teste')

    return products;
  }
}

export default ListProductService;
