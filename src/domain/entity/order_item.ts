export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this._productId;
    }

    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }

    

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }

    validate(): boolean {
        if (this._id === "") {
            throw new Error("ID is required");
        }

        if (this._productId === "") {
            throw new Error("ProductID is required");
        }

        if (this._name === "") {
            throw new Error("Name is required");
        }

        if (this._price < 0) {
            throw new Error("Price must be greater than 0");
        }

        if (this._quantity <= 0) {
            throw new Error("Item qtd must be greater than 0");
        }

        return true;
    }

    get price(): number {
        return this._price;
    }

    orderItemTotal() {
        return this._price * this._quantity;
    }

}