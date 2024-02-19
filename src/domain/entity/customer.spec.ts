import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    
    
        it("should throw error when id is empty ", () => {
            expect(() => {
                new Customer("", "John");
            }).toThrowError("ID is required");
        });

        it("should throw error when name is empty ", () => {
            expect(() => {
                new Customer("123", "");
            }).toThrowError("Name is required");
        });


        it("should change name", () => {
            const customer = new Customer("123", "John");
            customer.changeName("Doe");
            expect(customer.name).toBe("Doe");
        });

        it("should activate customer", () => {
            const customer = new Customer("1", "Customer 1");
            const address = new Address("Street 1", 126, "18117-140", "Sorocaba", "Brazil");
            customer.address = address;
            customer.activate();
            expect(customer.isActive).toBe(true);
        });

        it("should throw error when activating customer without address", () => {
            const customer = new Customer("1", "Customer 1");
            expect(() => {
                customer.activate();
            }).toThrowError("Address is mandatory to activate the customer");
        });

        it("should deactivate customer", () => {
            const customer = new Customer("1", "Customer 1");
            customer.deactivate();
            expect(customer.isActive).toBe(false);
        });

        it("shloud throw error when is address undefined when you activate a customer", () => {
            expect(() => {
                const customer = new Customer("1", "Customer 1");
                customer.activate();
            }).toThrowError("Address is mandatory to activate the customer");
        });

        it("should add reward points", () => {
            const customer = new Customer("1", "Customer 1");
            customer.addRewardPoints(100);
            expect(customer.rewardPoints).toBe(100);

            customer.addRewardPoints(200);
            expect(customer.rewardPoints).toBe(300);

            customer.addRewardPoints(300);
            expect(customer.rewardPoints).toBe(600);
        });   
    }
);
