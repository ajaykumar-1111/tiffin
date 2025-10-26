'use client'

import { useState } from 'react'
import MenuList from '@/components/customer/MenuList'
import Cart from '@/components/customer/Cart'

export default function CustomerMenu() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3 p-4">
        <MenuList onAddToCart={addToCart} />
      </div>
      <div className="md:w-1/3 p-4">
        <Cart items={cartItems} />
      </div>
    </div>
  )
}