'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import StaffManagement from '@/components/admin/StaffManagement'
import InventoryManagement from '@/components/admin/InventoryManagement'
import MenuManagement from '@/components/admin/MenuManagement'
import OrderManagement from '@/components/admin/OrderManagement'
import Reports from '@/components/admin/Reports'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminDashboard() {
  const [categories] = useState({
    'Staff Management': <StaffManagement />,
    'Inventory': <InventoryManagement />,
    'Menu': <MenuManagement />,
    'Orders': <OrderManagement />,
    'Reports': <Reports />,
  })

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((component, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}