import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';

import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '123',
    table: '123',
    status: '123',
    products: [
      {
        _id: '123',
        quantity: 1,
        product: {
          name: '123',
          imagePath: '123',
          price: 1,
        },
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={orders}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={orders}
      />
    </Container>
  );
}
