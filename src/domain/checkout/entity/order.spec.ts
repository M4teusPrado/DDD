import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty ", () => {
        expect(() => {
            new Order("", "123", []);
        }).toThrowError("ID is required");
    });

    it("should throw error when customerId is empty ", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrowError("CustomerID is required");
    });

    it("should throw error when item is empty ", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrowError("Item qtd must be greater than 0");
    });
    

    it("should calculate total", () => {
       
        const item = new OrderItem("i1", "p1", "Item 1", 100, 2);
        const order = new Order("1", "1", [item]);

        let total = order.total();
        expect(total).toBe(200);

        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);
        const order2 = new Order("2", "2", [item, item2]);

        total = order2.total();
        expect(total).toBe(600);
    });


    it("should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "p1", "Item 1", 100, 0);
            const order = new Order("1", "1", [item]);
        }).toThrowError("Item qtd must be greater than 0");
      
    });

    
});
