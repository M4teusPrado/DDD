import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        itens: entity.itens.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    // Atualizar detalhes do pedido
    await OrderModel.update(
      {
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    // Atualizar itens do pedido
    for (const item of entity.itens) {
      await OrderItemModel.update(
        {
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        },
        {
          where: { id: item.id },
        }
      );
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["itens"],
    });
    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.itens.map(
        (item) =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    return (await OrderModel.findAll({ include: ["itens"] })).map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customerId,
          orderModel.itens.map(
            (item) =>
              new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
              )
          )
        )
    );
  }
}
