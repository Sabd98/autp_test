# AUTP Portal - Frontend

Admin portal for managing rice farming insurance claims (AUTP).

## Requirements

- Node.js 18+
- npm or yarn
- Backend API running at `http://localhost:8000`

## Setup & Installation

### Local Setup

```bash
# Install dependencies
npm install

# Create .env.local (optional - defaults to localhost:8000)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
```

Server runs at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

### Docker Setup

```bash
# Build image
docker build -t autp-fe .

# Run container (with backend at localhost:8000)
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  autp-fe
```

## Demo Account

```
Username: admin
Password: admin123
```

## Features

- **Dashboard:** Claims monitoring and statistics
- **Claims Management:** Create, view, edit, delete claims
- **Claim Validation:** Approve or reject surveyed claims
- **User Management:** Create and manage user accounts
- **Profile:** Update profile and reset password
- **Authentication:** JWT-based auth with token persistence

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **HTTP Client:** Axios
- **UI:** Custom components + Tailwind CSS + Lucide icons
- **Build Tool:** Webpack (Next.js)

## Directory Structure

```
app/
├── api/              # API service layer
├── components/       # Reusable components
├── dashboard/        # Route pages
├── login/            # Auth pages
├── store/            # Zustand stores
├── types/            # TypeScript types
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── data/             # Static data
└── globals.css       # Global styles
```

## Key Pages

- `/login` - Authentication
- `/dashboard` - Overview & statistics
- `/dashboard/claims` - Manage claims
- `/dashboard/validation` - Approve/reject claims
- `/dashboard/users` - User management

## API Integration

Frontend communicates with backend API at base URL configured in environment.

**Environment Variable:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For complete API workflow reference, see `WORKFLOW_GUIDE.md`

## Development

```bash
# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Type checking
npx tsc --noEmit
```

## Notes

- Auth tokens stored in localStorage
- Protected routes check authentication in layout
- Auto-redirect to login on session timeout
- All API errors shown as toast notifications
- Pagination support for claims and users lists

---

Generated: June 13, 2026
