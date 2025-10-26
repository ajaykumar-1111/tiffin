'use client'

type OrderCardProps = {
  order: {
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
}

export default function OrderCard({ order }: OrderCardProps) {
  const updateStatus = async (status: string) => {
    try {
      await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PREPARING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PREPARED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Order #{order.id.slice(-6)}</h3>
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          Ordered at: {new Date(order.createdAt).toLocaleTimeString()}
        </p>
        <div className="border-t pt-2">
          <h4 className="text-sm font-medium mb-2">Items:</h4>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.menuItem.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {order.status === 'PENDING' && (
          <button
            onClick={() => updateStatus('PREPARING')}
            className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Start Preparing
          </button>
        )}
        {order.status === 'PREPARING' && (
          <button
            onClick={() => updateStatus('PREPARED')}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Mark as Prepared
          </button>
        )}
      </div>
    </div>
  )
}