"use client";

import { useState, useEffect } from "react";

type OrderItem = {
  id: number;
  food: { name: string };
  quantity: number;
};

type Order = {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const statusOptions = ["pending", "preparing", "ready", "delivered"];

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) fetchOrders();
    else alert("Failed to update status");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.userId}</td>
              <td className="border p-2">
                {order.items.map(item => (
                  <div key={item.id}>{item.food.name} x {item.quantity}</div>
                ))}
              </td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
