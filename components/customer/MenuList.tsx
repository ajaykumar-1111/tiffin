'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  isAvailable: boolean
  image?: string
}

type MenuListProps = {
  onAddToCart: (item: MenuItem) => void
}

export default function MenuList({ onAddToCart }: MenuListProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: session } = useSession()

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu-items')
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const categories = ['all', ...new Set(menuItems.map(item => item.category))]
  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => onAddToCart(item)}
                  disabled={!item.isAvailable}
                  className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white ${
                    item.isAvailable
                      ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {item.isAvailable ? 'Add to Cart' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}