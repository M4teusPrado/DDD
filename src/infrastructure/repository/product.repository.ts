import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface {
    
    async create(entity: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(entity: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    
}