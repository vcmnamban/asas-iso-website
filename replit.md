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
- August 02, 2025. Optimized Cal.com calendar interface by eliminating blank spaces and double scrollbars through precise iframe height cropping (400px iframe in 310px container)
- August 02, 2025. Integrated Cal.com scheduling system for real-time consultation booking with embedded widget
- August 01, 2025. Replaced Calendly integration with Google Calendar direct booking system on consultation page
- August 01, 2025. Updated company email address to support@asasiso.com across all pages and contact forms
- August 01, 2025. Updated footer copyright to 2025 and removed "Registered in Kuwait" text
- July 29, 2025. Simplified training type options in quote form to only "In-House Training" and "Online Training" (removed Hybrid and Consultation Only)
- July 29, 2025. Updated quote form industry list: added "Food Processing" and "Supply Chain & Logistics", changed "Trading & Logistics" to "Trading & Contracting"
- July 29, 2025. Created comprehensive quote request system with dedicated /quote page, form validation, and backend API integration
- July 29, 2025. Fixed button hover styles with stronger CSS specificity to override shadcn/ui conflicts using explicit HSL color values
- July 29, 2025. Fixed training course layout structure - separated specialized training courses from regular training levels for better alignment and organization
- July 29, 2025. Updated homepage hero subtitle from "Proudly based in Kuwait, serving businesses across the GCC" to "Your trusted partner for ISO trainings across the GCC"
- July 28, 2025. Added specialized training courses under each ISO standard with 25+ additional training programs
- July 28, 2025. Removed "Public courses" from all sections of the website and training services
- July 26, 2025. Updated contact information: address to "5th Floor, Panasonic Tower, Qibla, Kuwait City" and phone to "+965 69668726"
- July 26, 2025. Added parent company information: "A subsidiary of Al Noor International Consultants" with website link
- July 26, 2025. Added ISO 17025:2017 (Testing and Calibration Laboratories) to training offerings
- July 26, 2025. Updated ISO standards to latest versions: ISO 22301:2019, ISO 20000-1:2018, ISO 22000:2018
- July 26, 2025. Updated branding with official Asas ISO logo and brand colors (#004aad, #1c98ed)
- July 05, 2025. Initial setup