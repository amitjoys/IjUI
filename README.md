# InfoJoy - Lead Generation Platform

InfoJoy is a comprehensive lead generation and outreach platform built with React, TypeScript, and Vite. The application provides tools for finding, enriching, and managing leads through automated sequences.

## Features

- **Lead Search & Discovery**: Find potential leads and contacts
- **Data Enrichment**: Enrich contact and company information
- **Automated Sequences**: Create and manage email outreach sequences
- **Analytics Dashboard**: Track performance metrics and insights
- **Team Management**: Manage team members and permissions
- **Billing & Subscription**: Handle payments and subscription management
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, Heroicons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## Development

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Scripts

- `yarn dev` - Start development server with hot reload
- `yarn start` - Start production server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Dashboard components
│   ├── Layout/             # Layout components (Header, Sidebar, Footer)
│   ├── Pages/              # Page components
│   ├── Resultssection/     # Results and table components
│   ├── smallcomponents/    # Small utility components
│   └── ui/                 # UI components
├── styles/                 # Style files
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software.
