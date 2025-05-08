# AMPRO License System Frontend

This is the frontend application for the AMPRO License System, a driver's license processing system.

## Prerequisites

- Node.js 14.x or later
- npm 6.x or later

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ampro-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
REACT_APP_API_URL=https://ampro-licence.onrender.com
```

## Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To build the app for production:

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Deployment Options

### Option 1: Self-hosted Server Deployment

1. Build the application:
```bash
npm run build
```

2. Copy the contents of the `build` folder to your web server's document root or a specific directory configured to serve static content.

3. Configure your web server (Apache, Nginx, etc.) to serve the application and handle client-side routing. Below is an example Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/ampro-frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 2: Cloud Deployment (for PoC/Testing)

#### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the application:
```bash
vercel
```

#### Netlify Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy the application:
```bash
netlify deploy
```

#### Render Deployment

1. Sign up for an account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect to your GitHub repository
4. Configure as a Static Site with the following settings:
   - Build Command: `npm run build`
   - Publish Directory: `build`

## Environment Variables

- `REACT_APP_API_URL`: URL of the backend API

## Project Structure

```
src/
├── api/          # API services
├── assets/       # Static assets
├── components/   # Reusable components
├── contexts/     # React context providers
├── hooks/        # Custom hooks
├── layouts/      # Page layouts
├── pages/        # Top-level pages
├── types/        # TypeScript interfaces
├── utils/        # Utility functions
├── App.tsx       # Main application component
└── index.tsx     # Entry point
```

## License

[Your License Information] 