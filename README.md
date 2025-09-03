# Percel_delivery App with react vite, Shadcn, and TypeScript

This is a **React** application bootstrapped with **Vite** and **TypeScript**, using **Shadcn** for UI components. It's designed for modern web development, providing fast build times and a smooth development experience.

## Table of Contents

- [Project Setup](#project-setup)

---

## Project Live link:
https://percel-delievey-app.vercel.app/

### Prerequisites

Before getting started, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imran007-Programming/PERCEL_DELIVERY_APP.git
   cd percel_deleivery_app
   ```

# Parcel Management System

A simple web application for parcel management, designed with role-based dashboards for Senders, Receivers, and Admins. This app allows users to create and track parcels, with real-time status updates and administrative control over user and parcel data.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast, modern build tool and development server.
- **TypeScript**: A typed superset of JavaScript for improved development with better tooling and validation.
- **Shadcn**: A UI component library for React, used to build accessible and reusable components.
- **Node.js / Express**: Backend for handling parcel creation, status updates, user management, and more.
- **MongoDB**: A NoSQL database used to store parcel information, user data, and statuses.
- **JWT (JSON Web Tokens)**: For user authentication and role-based access control.

## Features

### 1. Role-Based Dashboard

- **Sender**:
  - Create a parcel with details such as destination, current location, and status.
  - Update the status of parcels.
  - View upcoming parcels in a dashboard.
  - Confirm parcel receipt when delivered.

- **Receiver**:
  - Sign up with a role as "Receiver".
  - Track and receive parcels.

- **Admin**:
  - Access a full dashboard with details about all parcels and users.
  - Block and unblock users.
  - Delete users and parcels.

### 2. Parcel Management

- **Sender**: Create and manage parcels.
- **Receiver**: Track parcels created by senders.
- **Admin**: View all parcels and user activities.

### 3. Authentication & Authorization

- Users sign up as either a Sender or Receiver.
- Role-based redirects and dashboard access.
- Admin has full access to manage users, parcels, and more.

### 4. Parcel Status Updates

- Senders can update the status of their parcels (e.g., "In Transit", "Delivered").
- The Receiver can view status updates in real-time.

## Available Scripts

In the project directory, you can run the following commands:

- `npm run dev` or `yarn dev`: Starts the Vite development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view your app. It supports Hot Module Replacement (HMR), so your changes will be reflected immediately.
  
- `npm run build` or `yarn build`: Builds the app for production. The optimized app is ready to be deployed.

- `npm run preview` or `yarn preview`: Previews the production build locally after running `npm run build`.

## Folder Structure
```
/src
  ├── /assets                # Static files like images, icons, etc.
  │    ├── /images            # Folder for image assets
  │    └── /icons             # Folder for icons
  ├── /components            # Reusable UI components (e.g., Button, Card)
  │    ├── Button.tsx         # Button component
  │    └── Card.tsx           # Card component
  ├── /pages                 # Page components (e.g., Home, Dashboard, Admin)
  │    ├── Home.tsx           # Home page component
  │    ├── Dashboard.tsx      # Dashboard page component
  │    └── Admin.tsx          # Admin page component
  ├── /services              # API calls and services (e.g., user authentication, parcel creation)
  │    ├── api.ts             # API services for user authentication
  │    └── parcelService.ts   # API services for parcel management
  ├── /styles                # Global styles and theming
  │    ├── globalStyles.css   # Global styles
  │    └── theme.ts           # Theme configurations (e.g., colors, fonts)
  ├── /types                 # TypeScript types for Parcel, User, and other entities
  │    ├── parcelTypes.ts     # Types for parcels
  │    └── userTypes.ts       # Types for users
  ├── App.tsx                # Main React component
  ├── index.tsx              # Entry point of the app
  └── vite-env.d.ts          # TypeScript definitions for Vite environment variables

/public
  └── index.html             # Main HTML file that loads the app
```
