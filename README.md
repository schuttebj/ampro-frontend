# AMPRO License System Frontend

This is the frontend for the AMPRO License System, a driver's license processing system with features for authentication, citizen management, license applications, and role-based access control.

## Features

- User authentication and authorization
- Citizen management
- License application processing
- Role-based access control
- Modern and responsive UI with Tailwind CSS

## Technologies Used

- React 19
- TypeScript
- React Router
- Formik & Yup for form management
- React Query for data fetching
- Tailwind CSS for styling
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/schuttebj/ampro-frontend.git
   cd ampro-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build

To build the app for production, run:

```
npm run build
```

This will create an optimized build in the `build` folder.

## Project Structure

```
src/
├── api/            # API service files
├── components/     # Reusable components
├── contexts/       # React context providers
├── layouts/        # Layout components
├── pages/          # Page components organized by feature
│   ├── citizens/   # Citizen management pages
│   ├── licenses/   # License management pages
│   └── applications/ # Application management pages
└── utils/          # Utility functions
```

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited. 