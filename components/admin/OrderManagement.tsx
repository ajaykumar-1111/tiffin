'use client'

import { useState, useEffect } from 'react'

type Order = {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  items: Array<{
    menuItem: {
      name: string
    }
    quantity: number
  }>
  user: {
    name: string
    email: string
  }
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrders()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{order.id.slice(-6)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>{order.user.name}</div>
                        <div className="text-xs text-gray-400">{order.user.email}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {order.items.map((item, index) => (
                          <div key={index}>
                            {item.quantity}x {item.menuItem.name}
                          </div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'PREPARING' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="PREPARED">Prepared</option>
                          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}