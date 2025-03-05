# ClariFi - Personal Finance Management

ClariFi is a modern, full-stack personal finance management application built with a focus on clarity and user experience. The project is structured as a monorepo using Turborepo for efficient build and dependency management.

🌐 **Live Demo**: [https://clarifi-finance.vercel.app/](https://clarifi-finance.vercel.app/)

## 🏗 Project Structure

```
clarifi/
├── apps/
│   ├── frontend/     # Next.js web application
│   └── backend/      # Express API server
├── packages/         # Shared packages (types, utils, etc.)
└── turbo.json        # Turborepo configuration
```

## 🚀 Tech Stack

### Frontend (`apps/frontend`)

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**:
  - Redux Toolkit for global state
  - React Query for server state
- **Styling**:
  - Tailwind CSS
  - Radix UI primitives
  - Custom UI components
- **Authentication**: Clerk
- **Features**:
  - Dark/Light mode support
  - Responsive design
  - Modern UI with animations
  - Real-time data updates
  - Progressive Web App (PWA) ready

### Backend (`apps/backend`)

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Clerk JWT verification
- **Features**:
  - RESTful API design
  - Type-safe database operations
  - Secure authentication middleware
  - Rate limiting and CORS protection

### Infrastructure

- **Frontend Hosting**: Vercel ([clarifi-finance.vercel.app](https://clarifi-finance.vercel.app/))
- **Backend Hosting**: Render
- **Database Hosting**: Supabase
- **Authentication Service**: Clerk
- **Development Tools**:
  - pnpm (Package Manager)
  - Turborepo (Monorepo Build System)
  - ESLint & Prettier (Code Quality)
  - TypeScript (Type Safety)

## 🌐 Deployment

The application is deployed and accessible at:

- Frontend: [https://clarifi-finance.vercel.app/](https://clarifi-finance.vercel.app/)
- Backend: [https://clarifi-backend.onrender.com](https://clarifi-backend.onrender.com)

### Deployment Infrastructure

- **Frontend**: Hosted on Vercel with automatic deployments from the main branch
- **Backend**: Hosted on Render with automatic deployments
- **Database**: Managed PostgreSQL instance on Supabase
- **Authentication**: Clerk development instance for secure user management

## 🛠 Development

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL (for local development)

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/clarifi.git
   cd clarifi
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_API_URL=

   # Backend (.env)
   CLERK_SECRET_KEY=
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

### Development Workflow

1. Start the development servers:

   ```bash
   pnpm dev
   ```

   This will start both frontend and backend in development mode.

2. Build the project:

   ```bash
   pnpm build
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

### Project Commands

- `pnpm dev` - Start development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean build outputs

## 🌟 Features

- **Secure Authentication**

  - Email/Password login
  - OAuth providers (coming soon)
  - Demo account access

- **Transaction Management**

  - Add/Edit/Delete transactions
  - Categorisation
  - Search and filtering
  - Bulk operations

- **Financial Insights**

  - Spending patterns
  - Category breakdowns
  - Trend analysis
  - Budget tracking

- **User Experience**
  - Responsive design
  - Dark/Light themes
  - Intuitive interface
  - Real-time updates

## 📱 Progressive Web App

ClariFi is configured as a Progressive Web App (PWA) with:

- Offline capability
- Install prompts
- App-like experience
- Fast loading times

## 🔒 Security

- JWT-based authentication
- CORS protection
- Rate limiting
- Secure password handling
- HTTP-only cookies
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [Supabase](https://supabase.com/)
- [Clerk](https://clerk.dev/)
- [Turborepo](https://turbo.build/repo)
- [Tailwind CSS](https://tailwindcss.com/)
