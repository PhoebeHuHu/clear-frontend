# Clear AI Frontend

## Prerequisites

- Node.js >= 18
- npm >= 9

## Get Start

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:3000`

## Project Overview

The project is built with Next.js 15, React 19, and TypeScript, featuring:

```
src/
├── components/           # Shared components
│   ├── Button/          # Common UI components
│   ├── BaseInput/       # Form input components
│   └── EDIGenerator/    # EDI generation feature
│       └── components/
│           └── CargoForm.tsx    # Cargo information form
├── types/               # TypeScript interfaces
│   └── cargo.ts         # Cargo-related types
├── constants/           # Application constants
│   └── cargo.ts         # Cargo form configurations
└── app/                 # Next.js pages and routing
```

## Available Commands

- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Run code linting
