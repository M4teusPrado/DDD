import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface{
    dataTimeOccured: Date;
    eventData: any;

    constructor(product: any) {
        this.dataTimeOccured = new Date();
        this.eventData = product;
    }

}