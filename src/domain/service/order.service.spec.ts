import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Coustomer from "../entity/customer";
import OrderService from "./order.service";

describe("Order service unit test", () => {

    it("should place an order", () => {


        const customer = new Coustomer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "p1", "Item 1",100, 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);

    });


    it("should get total price of all orders", () => {
        
        const  item1 = new OrderItem("i1", "p1", "Item 1",100, 2);
        const  item2 = new OrderItem("i2", "p2", "Item 2",100, 2);

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c2", [item2]);
        
        
        const total = OrderService.total([order1, order2]);
        expect(total).toBe(400);
        



    });
});