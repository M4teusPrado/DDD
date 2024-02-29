import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressChangedEvent from "./address-changed-event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log1-handler.event";
import SendConsoleLog2Handler from "./handler/send-console-log2-handler.event";
import SendConsoleLogAddressChangedHandler from "./handler/send-console.log-address-changed-handler.event";

describe("Domain events test", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2); 
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1); 
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2); 

    });

    it("should notify all event handlers for CustomerCreatedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerData = {
            id: "123",
            name: "John Doe",
            email: "john@example.com"
        };

        const customerCreatedEvent = new CustomerCreatedEvent(customerData);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });


    it("should register event handler for AddressChangedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const addressHandler = new SendConsoleLogAddressChangedHandler();

        eventDispatcher.register("AddressChangedEvent", addressHandler);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1); 
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(addressHandler); 
    });

    it("should notify event handler for AddressChangedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const addressHandler = new SendConsoleLogAddressChangedHandler();
        const spyEventHandler = jest.spyOn(addressHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", addressHandler);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(addressHandler);

        const customerId = "789";
        const customerName = "Jane Doe";
        const newAddress = "456 Oak St";

        const addressChangedEvent = new AddressChangedEvent(customerId, customerName, newAddress);

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
    
});