import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";

import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import ProductModel from "../../../product/repository/sequelize/product.model";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
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



  it("should find an order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customer = await createCustomer();
    const product1 = await createProduct();
  
    const orderItem1 = new OrderItem("1", product1.id, product1.name, product1.price, 2);

    
    const order1 = new Order("123", customer.id, [orderItem1]);
  
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    

    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([order1]);
});

});
