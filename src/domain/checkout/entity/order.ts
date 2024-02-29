import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _itens: OrderItem[];
    private _total: number = 0;

    get id(): string {  return this._id; }

    get customerId(): string {  return this._customerId; }  

    get itens(): OrderItem[] {  return this._itens; }

    constructor(id: string, customerId: string, itens: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._itens = itens;
        this._total = this.total();

        this.validate();
    }

    validate(): boolean {
        if (this._id === "") {
            throw new Error("ID is required");
        }

        if (this._customerId === "") {
            throw new Error("CustomerID is required");
        }

        if (this._itens.length === 0) {
            throw new Error("Item qtd must be greater than 0");
        }

        return true;
    }


    total(): number {
        return this._itens.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}