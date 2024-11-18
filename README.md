# Watched It?

A movie discovery website built with modern web technologies.

## Tech Stack

- **Frontend Framework:** NextJS with TypeScript
- **Styling:** TailwindCSS
- **API:** TMDB (The Movie Database)

## Key Packages

- **State Management:** Zustand
- **Environment Variables:** @t3-oss/env-nextjs
- **Type Validation:** Zod
- **UI Components:** Shadcn-ui
- **Icons:** Lucide React
- **Data Fetching:** @tanstack/react-query
- **Code Quality:** Biome
- **Package Manager:** Bun

## Design Philosophy

The application follows a minimalist and functional design approach, adhering to Gestalt principles of similarity, symmetry, and order.

## Features

- Detailed movie information including cast and production data
- Fast and efficient movie search functionality
- SEO-friendly metadata for each page
- Modern sharing capabilities using Web Share API and Clipboard API

## Project Structure


.
├── .vscode/          # IDE configuration
├── app/             # Pages and routes
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
└── lib/             # Core utilities
    ├── constants/   # Application constants
    ├── env/        # Environment configuration
    ├── store/      # State management
    ├── types/      # TypeScript definitions
    └── utils/      # Helper functions


## Getting Started

1. Obtain an API key from [TMDB](https://www.themoviedb.org/documentation/api)
2. Clone the repository:
   
   git clone [repository-url]
   
3. Install dependencies:
   
   bun install
   
4. Run the development server:
   
   bun dev
   
5. Build for production:
   
   bun build
   
