
import Customer from "../../customer/entity/customer";
import RepositoryInterface from "../../customer/repository/repository-interface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
    
}