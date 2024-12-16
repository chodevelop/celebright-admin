import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { getPayments } from '../api/requests/paymentApi';

interface Payment {
  id: number;
  order_id: string;
  user_id: number;
  product_id: number;
  order_name: string;
  amount: number;
  payment_method: string;
  approved_at: string;
  created_at: string;
}

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '주문번호',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: '사용자 ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: '상품 ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: '주문명',
      dataIndex: 'order_name',
      key: 'order_name',
    },
    {
      title: '결제 금액',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '결제 방법',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: '승인 일시',
      dataIndex: 'approved_at',
      key: 'approved_at',
      render: (approved_at: string) => new Date(approved_at).toLocaleString(),
    },
    {
      title: '생성 일시',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => new Date(created_at).toLocaleString(),
    },
  ];

  return (
    <div>
      <h1>결제 정보 조회</h1>
      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        loading={loading}
        style={{ marginTop: 16 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PaymentList;
