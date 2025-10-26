import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create staff user
  const staffPassword = await hash('staff123', 10)
  await prisma.user.create({
    data: {
      email: 'staff@example.com',
      name: 'Staff User',
      password: staffPassword,
      role: 'STAFF',
    },
  })

  // Create menu items
  const menuItems = [
    {
      name: 'Masala Dosa',
      description: 'Crispy crepe filled with spiced potatoes',
      price: 8.99,
      category: 'breakfast',
      isAvailable: true,
    },
    {
      name: 'Idli Sambar',
      description: 'Steamed rice cakes with lentil soup',
      price: 7.99,
      category: 'breakfast',
      isAvailable: true,
    },
    {
      name: 'Veg Thali',
      description: 'Complete meal with rice, roti, dal, and vegetables',
      price: 12.99,
      category: 'lunch',
      isAvailable: true,
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato gravy',
      price: 11.99,
      category: 'dinner',
      isAvailable: true,
    },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item })
  }

  // Create inventory items
  const inventoryItems = [
    {
      name: 'Rice',
      quantity: 50,
      unit: 'kg',
      threshold: 10,
    },
    {
      name: 'Dal',
      quantity: 25,
      unit: 'kg',
      threshold: 5,
    },
    {
      name: 'Oil',
      quantity: 30,
      unit: 'L',
      threshold: 5,
    },
  ]

  for (const item of inventoryItems) {
    await prisma.inventory.create({ data: item })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })