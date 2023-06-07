import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const productInput = {
    title: z.string(),
    price: z.number(),
    content: z.string().optional(),
}

const productGenerated = {
    id: z.number(),
    createAt: z.string(),
    updatedAt: z.string(),
}

const createProductSchema = z.object({
    ...productInput
});

const productResponseSchema = z.object({
    ...productInput,
    ...productGenerated
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductData = z.infer<typeof createProductSchema>;

export const {
    schemas: productSchemas, $ref
} = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
},  { $id: "PostSchema", } );
