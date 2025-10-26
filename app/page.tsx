import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  const userRole = session?.user?.role

  switch (userRole) {
    case 'ADMIN':
      redirect('/admin')
    case 'STAFF':
      redirect('/kitchen')
    default:
      redirect('/menu')
  }
}