import { Router} from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import { appendFile } from 'fs';


const routes = Router();


routes.use('/products', productsRouter);


export default routes;
