import { useState } from 'react';
import { toast } from 'react-toastify';

import { OrderModal } from '../OrderModal';
import { Order } from '../../types/Order';

import { Board, OrdersContainer } from './styles';
import { api } from '../../utils/api';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;

    setIsLoading(true);

    const status =
      selectedOrder?.status === 'WAITING'
        ? 'IN_PRODUCTION'
        : 'DONE';

    await api.patch(`orders/${selectedOrder?._id}`, { status });
    setIsLoading(false);
    setIsModalVisible(false);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi alterado!`);
    onChangeOrderStatus(selectedOrder._id, status);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;

    setIsLoading(true);
    await api.delete(`orders/${selectedOrder._id}`);
    setIsLoading(false);
    setIsModalVisible(false);
    onCancelOrder(selectedOrder._id);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {!!orders.length && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
