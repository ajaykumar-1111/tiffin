# Tiffin Center Management System

A comprehensive web application for managing a tiffin center with admin, kitchen staff, and customer interfaces.

## Features

### Admin Dashboard
- Staff Management
- Inventory Management
- Menu Management
- Order Management
- Reports and Analytics

### Kitchen Dashboard
- View and Update Order Status
- Manage Item Availability
- Real-time Order Updates

### Customer Interface
- Browse Menu
- Place Orders
- Track Order Status

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js for Authentication
- Tailwind CSS for Styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your values

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tiffin-center/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── kitchen/          # Kitchen dashboard
│   └── menu/             # Customer menu
├── components/           # React components
├── lib/                 # Utility functions
└── prisma/              # Database schema and migrations
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: NextAuth base URL
- `NEXTAUTH_SECRET`: Secret key for NextAuth

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT