import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import Order from './Order';

//Representa as entidades existentes no banco, essas que podem e serão manipuladas pela api pra depois
//serem persistidas no DB.

@Entity('orders_products')
class OrdersProducts {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  price: number;

  @Column()
  quantitu: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

export default OrdersProducts;
