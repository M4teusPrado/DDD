import Product from "./product";

describe("Product unit tests", () => {
    
   it("should throw error when id is empty ", () => {
         expect(() => {
              const product = new Product("", "123", 10);
         }).toThrowError("ID is required");
    });

    it("should throw error when name is empty ", () => {
        expect(() => {
            const product = new Product("123", "", 10);
        }).toThrowError("Name is required");
    });

    it("shoud throw error when price is negative", () => {
        expect(() => {
            const product = new Product("123", "123", -10);
        }).toThrowError("Price must be greater than 0");
    });

    it("should change the name of the product", () => {
        const product = new Product("123", "Product 1", 10);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change the price of the product", () => {
        const product = new Product("123", "Product 1", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });    
});
