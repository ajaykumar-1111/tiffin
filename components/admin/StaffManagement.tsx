'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Staff = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'STAFF'
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([])
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        // Refresh staff list
        fetchStaff()
        reset()
      }
    } catch (error) {
      console.error('Error creating staff:', error)
    }
  }

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
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
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...register('role')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Staff
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Staff List</h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {staff.map((person) => (
                      <tr key={person.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{person.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
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