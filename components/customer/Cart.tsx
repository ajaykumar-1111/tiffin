'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartProps = {
  items: CartItem[]
}

export default function Cart({ items }: CartProps) {
  const { data: session } = useSession()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const groupedItems = items.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += 1
    } else {
      acc.push({ ...item, quantity: 1 })
    }
    return acc
  }, [] as CartItem[])

  const total = groupedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (!session) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: groupedItems.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
        }),
      })

      if (response.ok) {
        // Clear cart and show success message
        // You'll need to implement this functionality
        window.location.href = '/orders'
      }
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-medium">Your Cart</h2>
      <div className="space-y-2">
        {groupedItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <span className="font-medium">{item.quantity}x</span> {item.name}
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        disabled={isCheckingOut}
        className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isCheckingOut ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  )
}