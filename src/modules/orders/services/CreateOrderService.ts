import { CustomerRepository } from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepositoriy";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OdersRepository from "../typeorm/repositories/OrdersRepository";


interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}


class CreateOrderService {
  public async execute({customer_id, products}: IRequest): Promise<Order> {
    const odersRepository = getCustomRepository(OdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    //Verificar se cliente existe
    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists){
      throw new AppError('Customer not found. Try to register or log in.')
    }

    //Verificar se produto existe
    const productExists = await productsRepository.findAllByIds(products);

    if (!productExists){
      throw new AppError('Product does not exists.');
    }

    const existentProductsIds = productExists.map(product => product.id);

    const checkInexistentProducts = products.filter(product => !existentProductsIds.includes(product.id));

    if (checkInexistentProducts.length){
      throw new AppError(`Could not find products ${checkInexistentProducts[0].id}`)
    }
    

    //Verificar se cada produto tem quantidade suficiente em estoque

    const quantityCheck = products.filter(
      product => productExists.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    )
    
    if (quantityCheck) {
      throw new AppError(`Not enought on stock of product: ${quantityCheck[0]}`)
    }

    const productsList = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: productExists.filter(p => p.id === product.id)[0].price
      })
    );

    const order = await odersRepository.createOrder({
      customer: customerExists,
      products: productsList,
    });

    const { order_products } = order;

    const updatedQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity: productExists.filter( p => p.id === product.id)[0].quantity - product.quantity,
      }),
    )

    await productsRepository.save(order);
    
    return order
  }
}

export default CreateOrderService;
