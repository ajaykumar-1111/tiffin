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
    const menuItem = await prisma.menuItem.create({ data })

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Error creating menu item' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany()
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Error fetching menu items' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { id, ...updateData } = data

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Error updating menu item' },
      { status: 500 }
    )
  }
}