import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed-event";


export default class SendConsoleLogAddressChangedHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente ${event.customerId}, ${event.customerName} alterado para: ${event.newAddress}`);
    }
}