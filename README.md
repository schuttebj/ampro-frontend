# AMPRO License System Frontend

This is the frontend application for the AMPRO License System, built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Docker Setup

If you prefer using Docker, use the following commands:

1. Build the Docker image:

```bash
docker build -t ampro-frontend .
```

2. Run the container:

```bash
docker run -p 80:80 ampro-frontend
```

The application will be available at [http://localhost](http://localhost).

## Features

The AMPRO License System frontend provides the following key features:

- Authentication and user management
- Citizen registration and management
- License application processing
- License issuance and printing
- Transaction tracking

## API Integration

This frontend connects to the AMPRO License System backend API at:
```
https://ampro-licence.onrender.com
```
