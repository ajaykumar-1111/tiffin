'use client'

import { useState, useEffect } from 'react'
import OrderCard from '@/components/kitchen/OrderCard'

type Order = {
  id: string
  status: string
  items: Array<{
    menuItem: {
      name: string
    }
    quantity: number
  }>
  createdAt: string
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Fetch orders and set up real-time updates
    const fetchOrders = async () => {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    }

    fetchOrders()
    // Set up polling or WebSocket connection here
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}