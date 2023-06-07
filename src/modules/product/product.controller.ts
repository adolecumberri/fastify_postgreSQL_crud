import { FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { CreateProductData } from "./product.schema";

 async function createProductHandler(
    request: FastifyRequest<{
      Body: CreateProductData;
    }>
  ) {
    const product = await createProduct({
      ...request.body,
      ownerId: request.user.id,
    });
  
    return product;
  }

const getProductsHandler = async () => {
    const products = await getProducts();
    return products;
}

export {
    createProductHandler,
    getProductsHandler
}