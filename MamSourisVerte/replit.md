# Overview

This is a French childcare management web application called "M.A.M Maison des p'tites souris vertes" (MAM House of Little Green Mice). It's a full-stack application built for a Maison d'Assistantes Maternelles (MAM - Childminders' House) that allows parents to pre-register their children for childcare services and send contact messages. The application features a responsive design with a warm, child-friendly color scheme and provides forms for pre-registration and contact inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Presentation, Pre-inscription, and Contact
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom color palette (sage green, coral warm, sky soft, cream, charcoal)
- **State Management**: React Hook Form for form handling with Zod validation
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Design System**: Custom design tokens with CSS variables, responsive design with mobile-first approach

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for pre-registrations (`/api/pre-registration`, `/api/pre-registrations`) and contact messages (`/api/contact`, `/api/contact-messages`)
- **Validation**: Zod schemas for request validation with proper error handling
- **Storage**: Currently using in-memory storage (MemStorage class) with interface for future database integration
- **Development**: Hot module replacement with Vite integration for development workflow

## Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with migrations support
- **Database Schema**: Two main tables - `pre_registrations` for childcare applications and `contact_messages` for inquiries
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations
- **Current State**: Memory-based storage implementation with database configuration ready for production deployment

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic Express session configuration present but not actively used
- **Access Control**: All API endpoints are currently public

## External Dependencies
- **Database**: Neon PostgreSQL (configured but not active - using @neondatabase/serverless)
- **Session Store**: PostgreSQL session store configured via connect-pg-simple
- **UI Libraries**: Extensive Radix UI component collection for accessibility
- **Fonts**: Google Fonts integration (Nunito, Inter, Fira Code, Geist Mono, Architects Daughter, DM Sans)
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for server-side bundling, PostCSS for CSS processing