'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Inventory = {
  id: string
  name: string
  quantity: number
  unit: string
  threshold: number
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          quantity: parseFloat(data.quantity),
          threshold: parseFloat(data.threshold),
        }),
      })
      
      if (response.ok) {
        fetchInventory()
        reset()
      }
    } catch (error) {
      console.error('Error creating inventory item:', error)
    }
  }

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setInventory(data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      await fetch(`/api/inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      fetchInventory()
    } catch (error) {
      console.error('Error updating inventory:', error)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            step="0.01"
            {...register('quantity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <input
            type="text"
            {...register('unit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Threshold</label>
          <input
            type="number"
            step="0.01"
            {...register('threshold')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Inventory Item
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Inventory List</h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Threshold</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {inventory.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value))}
                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          {item.unit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.unit}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.threshold} {item.unit}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.quantity > item.threshold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.quantity > item.threshold ? 'Sufficient' : 'Low Stock'}
                          </span>
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