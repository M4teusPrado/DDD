import Address from "../value-object/address";

export default class Customer {
    
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;


    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name() {
        return this._name;
    }

    get Address() {
        return this._address;
    }

    isActive(): boolean {
        return this._active;
    }

    changeAddress(address: Address) {
        this._address = address;
      }

    validate() {

        if(this._id === "") {
            throw new Error("ID is required");
        }

        if (this._name === "") {
            throw new Error("Name is required");
        }


    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {

        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate the customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }


    set Address(Address: Address) {
        this._address = Address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    get id() {
        return this._id;
    }
}