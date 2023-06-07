
import prisma from "../../utils/prisma";
import { CreateProductData } from "./product.schema";


const createProduct = async (product: CreateProductData & { ownerId: number }) => {
    const newProduct = await prisma.product.create({
        data: product
    });
    return newProduct;
}

const getProducts = () => {
    return prisma.product.findMany({
        select: {
            content: true,
            id: true,
            title: true,
            price: true,
            owner: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}

export {
    createProduct,
    getProducts
}