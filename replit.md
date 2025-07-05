# Asas ISO - Replit Project Documentation

## Overview

This is a full-stack bilingual (English/Arabic) website for Asas ISO, a professional ISO training company based in Kuwait serving the GCC region. The application is built with a modern tech stack featuring React frontend, Express backend, and PostgreSQL database with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state, React Context for language/theme
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and build

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for request validation
- **API Design**: RESTful endpoints with proper error handling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migration**: Database migrations stored in `/migrations`
- **Schema**: Centralized schema definition in `/shared/schema.ts`
- **Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### 1. Internationalization (i18n)
- **Languages**: English and Arabic with RTL support
- **Implementation**: Custom React Context with translation functions
- **Features**: Dynamic language switching, RTL layout support, localized content

### 2. Database Schema
- **Contact Submissions**: Stores user inquiries and contact form data
- **Consultation Requests**: Handles consultation booking requests
- **Chat Messages**: Manages chatbot interactions with session tracking

### 3. UI Components
- **Design System**: shadcn/ui components with custom Asas ISO branding
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA compliant components with keyboard navigation

### 4. SEO & Performance
- **SEO**: Dynamic meta tags, structured data, semantic HTML
- **Performance**: Code splitting, lazy loading, optimized images
- **Analytics**: Ready for Google Analytics integration

## Data Flow

1. **User Request**: Client makes request to React Router
2. **Component Rendering**: React components fetch data using React Query
3. **API Communication**: Frontend communicates with Express backend via REST APIs
4. **Database Operations**: Backend uses Drizzle ORM to interact with PostgreSQL
5. **Response**: Data flows back through the same chain with proper error handling

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-kit` for database operations
- **Validation**: `zod` for schema validation
- **UI**: `@radix-ui/*` components for accessible UI primitives
- **Forms**: `react-hook-form` with `@hookform/resolvers`
- **Styling**: `tailwindcss` with utility classes

### Development Dependencies
- **Build**: `vite` for development server and build
- **TypeScript**: Full TypeScript support across the stack
- **ESBuild**: For server-side bundling in production

## Deployment Strategy

### Development
- **Command**: `npm run dev` - Starts development server with hot reload
- **Database**: `npm run db:push` - Pushes schema changes to database
- **Type Checking**: `npm run check` - Validates TypeScript code

### Production
- **Build**: `npm run build` - Creates optimized production build
- **Start**: `npm start` - Runs production server
- **Database**: Uses connection pooling with Neon Database

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 05, 2025. Initial setup