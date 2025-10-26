import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: data.totalAmount,
        items: {
          create: data.items
        }
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        },
        user: true
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const where = session.user.role === 'CUSTOMER'
      ? { userId: session.user.id }
      : undefined

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            menuItem: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    )
  }
}