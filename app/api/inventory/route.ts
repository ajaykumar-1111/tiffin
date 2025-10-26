import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const inventory = await prisma.inventory.create({ data })

    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error creating inventory item:', error)
    return NextResponse.json(
      { error: 'Error creating inventory item' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const inventory = await prisma.inventory.findMany()
    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Error fetching inventory' },
      { status: 500 }
    )
  }
}