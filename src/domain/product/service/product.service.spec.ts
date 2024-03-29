import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit test", () => {

    it("should change the prices of all products", () => {


        const product1 = new Product("i1", "product1", 100);
        const product2 = new Product("i2", "product2", 200);
        const products = [product1, product2];

        ProductService.increasePrice(products, 100);
        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);

    })
})