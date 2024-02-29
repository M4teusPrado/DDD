import EventInterface from "../../@shared/event/event.interface";

export default class AddressChangedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: any;
  
  constructor(
    public customerId: string,
    public customerName: string,
    public newAddress: string
  ) {
    this.dataTimeOccured = new Date();
    this.eventData = {
      customerId: this.customerId,
      customerName: this.customerName,
      newAddress: this.newAddress,
    };
  }
}
