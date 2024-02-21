import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const createCustomer = async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);
    return customer;
  };

  const createProduct = async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);
    return product;
  };

  it("should create an order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();
    
    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["itens"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customerId: customer.id,
      itens: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ],
      total: 200
    });
  });

  it("should update an order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.itens[0].quantity = 3;
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [{ model: OrderItemModel }] });
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customerId: customer.id,
      itens: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: 3,
          order_id: "123",
          product_id: "123"
        }
      ],
      total: 300
    });
  });
});
