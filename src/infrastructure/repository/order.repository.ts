import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

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
          price: item.price
        },
        {
          where: { id: item.id },
        }
      );
    }
  }
  

  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
