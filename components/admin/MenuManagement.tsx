'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  isAvailable: boolean
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          isAvailable: true,
        }),
      })
      
      if (response.ok) {
        fetchMenuItems()
        reset()
      }
    } catch (error) {
      console.error('Error creating menu item:', error)
    }
  }

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu-items')
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/menu-items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus }),
      })
      fetchMenuItems()
    } catch (error) {
      console.error('Error updating menu item:', error)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Menu Item
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Menu Items</h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {menuItems.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.category}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={() => toggleAvailability(item.id, item.isAvailable)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Toggle Availability
                          </button>
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
    </div>
  )
}