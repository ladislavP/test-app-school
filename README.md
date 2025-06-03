# Mobile-First Next.js School Management Application

This is a Next.js application with Tailwind CSS, optimized for mobile devices with responsive design. The application includes authentication, school listing with infinite scroll, device status monitoring, and QR code scanning functionality.

## Features

- **Authentication**: Login with username/password
- **School Listing**: View schools with infinite scroll pagination
- **Device Management**: Monitor device statuses (green, yellow, red)
- **QR Code Scanning**: Scan QR codes to identify devices

## API Integration

The application uses a simulated API library that handles:
- Authentication with token management
- Paginated data loading
- Device status information
- QR code processing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

- Username: `demo`
- Password: `password`

## Mobile Optimization

This application is designed with a mobile-first approach:
- Responsive layouts that adapt to different screen sizes
- Touch-friendly UI elements
- Optimized input fields for mobile devices
- Efficient navigation patterns

## Project Structure

- `/src/app`: Next.js application routes
- `/src/components`: Reusable UI components
- `/src/lib/api`: API library with mock data

## Error Handling

The application includes comprehensive error handling:
- Global error context for consistent user feedback
- Toast notifications for transient errors
- Full-page error states for critical issues
- Retry mechanisms for failed operations
