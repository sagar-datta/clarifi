# ClariFi - Comprehensive Personal Finance Management

ClariFi is a sophisticated, full-stack personal finance management application designed to bring clarity to your financial life. Built with modern technologies and best practices, it offers a seamless experience for tracking, categorising, and analysing your financial transactions.

🌐 **Live Demo**: [https://clarifi-finance.vercel.app/](https://clarifi-finance.vercel.app/)

## 🔍 What ClariFi Does

ClariFi helps you take control of your finances through:

- **Intelligent Transaction Management**: Easily record, categorise, and search through your financial transactions
- **Automated Categorisation**: Smart algorithms that automatically sort your spending into appropriate categories
- **Comprehensive Financial Insights**: Visual breakdowns of your spending patterns and financial habits
- **Budget Tracking**: Set and monitor budgets to help achieve your financial goals
- **Intuitive Dashboard**: Get a complete overview of your financial health at a glance
- **Secure Authentication**: Keep your financial data private and secure

The application provides a holistic view of your financial situation, helping you make informed decisions about your money through detailed visualisations and actionable insights.

## 🏗 Project Architecture

ClariFi is structured as a monorepo using Turborepo for efficient build and dependency management:

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
  - Progressive Web App (PWA) capabilities

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

## 🌟 Key Features

### Transaction Management

- **Comprehensive Transaction Recording**: Add, edit, and delete financial transactions with ease
- **Smart Categorisation**: Automatic sorting of transactions into relevant categories
- **Advanced Filtering**: Search and filter transactions by date, amount, category, and more
- **Bulk Operations**: Efficiently manage multiple transactions at once

### Financial Insights

- **Spending Breakdown**: Visual representation of spending by category
- **Monthly Overview**: Track income vs expenses over time
- **Trend Analysis**: Identify spending patterns and financial trends
- **Budget Tracking**: Set category-specific budgets and monitor your progress

### User Experience

- **Intuitive Dashboard**: Get a complete overview of your financial situation at a glance
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Themes**: Choose your preferred visual mode with system preference detection
- **Real-time Updates**: See your financial data update in real-time as you make changes

### Security

- **Secure Authentication**: Industry-standard authentication with Clerk
- **Data Protection**: Robust security measures to protect your financial information
- **Privacy-focused**: Your financial data remains private and secure

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

## 📱 Progressive Web App

ClariFi is configured as a Progressive Web App (PWA) with:

- Offline capability
- Install prompts
- App-like experience
- Fast loading times

## 🔒 Security

- JWT-based authentication with Clerk
- CORS protection
- Rate limiting
- Secure environment variable handling
- XSS protection via React's built-in safeguards
- Type-safe database operations

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
