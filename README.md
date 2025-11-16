# PC Builder - Interactive 3D Computer Building Application

An interactive web application that guides users through building a custom PC with real-time 3D visualization, compatibility checking, and budget management. Built with React, TypeScript, Three.js, and Redux Toolkit.

## Features

- **Guided Wizard Flow**: Step-by-step process from use case selection to complete build
- **3D Visualization**: Interactive 3D preview of your PC build using Three.js
- **Smart Compatibility Checking**: Real-time validation of component compatibility (CPU socket, RAM type, GPU clearance, PSU wattage, motherboard form factor)
- **Budget Management**: Set and track your budget with component filtering
- **Example Builds**: Pre-configured builds for Gaming, Content Creation, and Office use cases
- **Export & Share**: Download builds as JSON or share via URL
- **Redux State Management**: Centralized state management for complex build configuration
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Beautiful dark theme with electric cyan accents

## Tech Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing

### State Management
- **Redux Toolkit 2.10.1** - Centralized state management
- **React Redux 9.2.0** - React bindings for Redux

### 3D Graphics
- **Three.js 0.160.1** - 3D graphics library
- **@react-three/fiber 8.18.0** - React renderer for Three.js
- **@react-three/drei 9.122.0** - Helper utilities for React Three Fiber

### UI Components & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **tailwindcss-animate** - Animation utilities

### Data Fetching & Forms
- **@tanstack/react-query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

### Additional Libraries
- **Sonner** - Toast notifications
- **date-fns** - Date utilities

## Project Structure

