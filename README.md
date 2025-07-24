# SecureSight - CCTV Monitoring Dashboard

This project is a submission for the Fullstack Developer Intern technical assessment. It implements the mandatory features of the SecureSight CCTV monitoring dashboard using Next.js 15, Prisma, and TailwindCSS.

## 🚀 Live Demo

[Deploy to Vercel](https://securesight-dashboard-ten.vercel.app/)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: postgresql with Prisma ORM
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **TypeScript**: Full type safety

## 📋 Features Implemented

### Mandatory Features ✅

1. **Navbar** - Navigation with active states and user profile
2. **Incident Player** - Main video feed with camera thumbnails
3. **Incident List** - Real-time incident management with resolve functionality
4. **Database Schema** - Camera and Incident models with proper relationships
5. **API Routes** - GET incidents and PATCH resolve endpoints
6. **Optimistic UI** - Smooth incident resolution with fade animations

### Optional Features ✅
1. **Interactive Timeline** - Under the player, draw an SVG/Canvas ruler for 24 h. Place incident markers, draggable scrubber.

### Database Models

\`\`\`prisma
model Camera {
  id        String     @id @default(cuid())
  name      String
  location  String
  incidents Incident[]
}

model Incident {
  id           String   @id @default(cuid())
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
  camera       Camera   @relation(fields: [cameraId], references: [id])
  cameraId     String
}
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Tarush5253/securesight-dashboard.git
   cd securesight-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Initialize the database**
   \`\`\`bash
   # Create database and apply schema
   npx prisma db push
   
   # Seed with sample data
   npx prisma db seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
securesight-dashboard/
├── app/
│   ├── api/
│   │   └── incidents/
│   │       ├── route.ts
│   │       └── [id]/resolve/route.ts
│   ├── components/
│   │   ├── navbar.tsx
│   │   ├── incident-player.tsx
│   │   ├── incident-list.tsx
│   │   ├── incident-item.tsx
|   |   └── incident-timeline
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
└── README.md
\`\`\`

## 🎨 Design System

The application uses a custom dark theme matching the provided Figma design:

- **Background**: `#0B0F19`
- **Surface**: `#171E2F` 
- **Outline**: `#2A3349`
- **Text Primary**: `#F0F4FF`
- **Text Secondary**: `#8A94AD`
- **Accent**: `#3F89EE`
- **Alert**: `#E54545`

## 🔧 API Endpoints

### GET `/api/incidents`
- Query params: `?resolved=false` (optional)
- Returns: Array of incidents with camera details
- Sorted by newest first

### PATCH `/api/incidents/[id]/resolve`
- Marks incident as resolved
- Returns: Updated incident object

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

\`\`\`env
DATABASE_URL="prisma://user:password@endpoint.neon.tech/dbname?sslmode=require"
\`\`\`

## 🧪 Development Commands

\`\`\`bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
\`\`\`

## 🎯 Technical Decisions

### Why Next.js 15 App Router?
- **Server Components**: Better performance with server-side rendering
- **File-based Routing**: Intuitive API route organization
- **Built-in Optimizations**: Image optimization, font loading, etc.
- **TypeScript Support**: Excellent developer experience

### Why Prisma + SQLite?
- **Type Safety**: Generated types for database operations
- **Developer Experience**: Intuitive schema definition and migrations
- **SQLite**: Perfect for development and small-scale deployments
- **Easy Migration**: Can easily switch to PostgreSQL/MySQL for production

### Why TailwindCSS?
- **Rapid Development**: Utility-first approach for quick styling
- **Design System**: Easy to maintain consistent colors and spacing
- **Responsive Design**: Built-in responsive utilities
- **Performance**: Purged CSS for optimal bundle size

## 🔮 If I Had More Time...

### Immediate Improvements
- **Real-time Updates**: WebSocket integration for live incident updates
- **Authentication**: NextAuth.js integration with role-based access
- **Error Boundaries**: Better error handling and user feedback
- **Loading States**: Skeleton loaders and better loading indicators

### Advanced Features
- **Interactive Timeline**: SVG/Canvas timeline with draggable scrubber (Optional scope)
- **Advanced Filtering**: Filter by date range, camera, incident type
- **Incident Details**: Modal with full incident information and video playback
- **Dashboard Analytics**: Charts and statistics for incident trends
- **Mobile Responsive**: Optimized mobile layout and touch interactions

### Technical Enhancements
- **Testing**: Unit tests with Jest and React Testing Library
- **E2E Testing**: Playwright for end-to-end testing
- **Performance**: React Query for better data fetching and caching
- **Monitoring**: Error tracking with Sentry
- **CI/CD**: GitHub Actions for automated testing and deployment

### Database & Backend
- **PostgreSQL**: Migration to production-ready database
- **Redis**: Caching layer for better performance
- **Rate Limiting**: API protection and abuse prevention
- **Audit Logs**: Track all incident resolution actions
- **Backup Strategy**: Automated database backups

### UI/UX Improvements
- **Dark/Light Mode**: Theme switching capability
- **Keyboard Shortcuts**: Power user navigation
- **Accessibility**: WCAG compliance and screen reader support
- **Animations**: Smooth transitions and micro-interactions
- **Drag & Drop**: Reorder incidents or assign to different operators

---

**Built with ❤️ by [Tarush](https://founder.freewaystudy.tech/)
