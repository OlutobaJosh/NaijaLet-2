# NaijaLet - Nigerian Rental Platform

Find your next home anywhere in Nigeria. No shady agents, just direct connections between landlords and tenants.

## Overview

NaijaLet is a modern rental platform built specifically for the Nigerian market, connecting landlords and tenants directly without predatory agents. The platform covers all 36 Nigerian states with a focus on making property search and listing simple and transparent.

## Features

### For Tenants
- Search properties by state, city, area, property type, and price range
- Filter by number of bedrooms and bathrooms
- View detailed property information with image galleries
- Send direct inquiries to landlords
- Save favorite properties
- No agent fees

### For Landlords
- List properties for free
- Manage all listings from a centralized dashboard
- Get verified badge for ₦5,000
- Receive inquiries directly from interested tenants
- Update property status (available, rented, draft)

### For Admins
- Feature specific cities on homepage
- Manage platform content

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Better-Auth (to be integrated)
- **Icons**: Lucide React

## Project Structure

```
/tmp/cc-agent/65021601/project/
├── app/
│   ├── dashboard/          # Landlord dashboard
│   ├── listings/           # Browse properties
│   ├── property/[id]/      # Single property page
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer
│   ├── PropertyCard.tsx    # Property card component
│   └── SearchBar.tsx       # Search bar component
├── lib/
│   ├── supabase.ts         # Supabase client & types
│   ├── nigeria-data.ts     # Nigerian states, cities, property types
│   └── utils.ts            # Utility functions
└── .env.example            # Environment variables template
```

## Database Schema

### Tables

1. **profiles**
   - User profiles with roles (tenant, landlord, agent, admin)
   - Linked to Supabase auth.users

2. **properties**
   - Property listings with location (state, city, area)
   - Price, bedrooms, bathrooms, property type
   - Images, amenities, verification status
   - Status: available, rented, draft

3. **saved_properties**
   - User's saved/favorited properties

4. **inquiries**
   - Messages from tenants to landlords
   - Contact information and inquiry status

5. **featured_cities**
   - Admin-managed featured cities on homepage

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. The database schema is already created via migrations

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Key Pages

### Homepage (`/`)
- Hero section with tagline
- Search bar for state, city, property type, and price range
- Featured cities (admin-managed)
- Featured properties grid
- Call-to-action for landlords

### Listings (`/listings`)
- Advanced filter sidebar
- Grid of property cards
- Filterable by location, type, price, bedrooms, bathrooms

### Property Details (`/property/[id]`)
- Image gallery
- Full property details
- Amenities list
- Inquiry form for contacting landlord

### Landlord Dashboard (`/dashboard`)
- Add new property form
- Manage existing listings
- Edit/delete properties
- View verification status

## Design System

### Colors
- Primary: Green (#16a34a)
- Secondary: White
- Accent: Gray scale for text and backgrounds

### Typography
- Font: Inter
- Headings: Bold, larger sizes
- Body: Regular weight, readable line height

### Components
- Mobile-first responsive design
- Clean, modern interface
- Nigeria-focused copy and terminology

## Nigerian Data

The platform includes comprehensive data for all 36 Nigerian states and major cities:

- Abia, Adamawa, Akwa Ibom, Anambra, Bauchi, Bayelsa, Benue, Borno, Cross River, Delta, Ebonyi, Edo, Ekiti, Enugu, FCT (Abuja), Gombe, Imo, Jigawa, Kaduna, Kano, Katsina, Kebbi, Kogi, Kwara, Lagos, Nasarawa, Niger, Ogun, Ondo, Osun, Oyo, Plateau, Rivers, Sokoto, Taraba, Yobe, Zamfara

Launch city: Ibadan, Oyo State

## Property Types

- Apartment
- House
- Duplex
- Bungalow
- Self-Contain
- Room & Parlour
- Mini Flat
- Penthouse
- Studio

## Amenities

- Parking Space
- Generator
- Security
- Water Supply
- WiFi
- Air Conditioning
- Swimming Pool
- Gym
- Balcony
- Garden
- Serviced
- Furnished

## Future Enhancements

- Better-Auth integration for user authentication
- Payment integration for verification badge (₦5,000)
- Advanced search with map view
- Property comparison feature
- Landlord ratings and reviews
- Email notifications for inquiries
- Mobile app (React Native)
- Admin dashboard for content management

## Contributing

This is a demo project showcasing a Nigerian rental platform. Feel free to fork and customize for your needs.

## License

MIT
