/*
  # NaijaLet Platform Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `phone` (text)
      - `role` (text: tenant, landlord, agent, admin)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `properties`
      - `id` (uuid, primary key)
      - `landlord_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `property_type` (text: apartment, house, duplex, etc.)
      - `price` (numeric)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `state` (text)
      - `city` (text)
      - `area` (text)
      - `address` (text)
      - `images` (jsonb array of image URLs)
      - `amenities` (jsonb array)
      - `is_verified` (boolean, default false)
      - `verified_at` (timestamptz)
      - `status` (text: available, rented, draft)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `saved_properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `property_id` (uuid, references properties)
      - `created_at` (timestamptz)
    
    - `inquiries`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `sender_id` (uuid, references profiles)
      - `landlord_id` (uuid, references profiles)
      - `message` (text)
      - `sender_name` (text)
      - `sender_email` (text)
      - `sender_phone` (text)
      - `status` (text: pending, replied, closed)
      - `created_at` (timestamptz)
    
    - `featured_cities`
      - `id` (uuid, primary key)
      - `state` (text)
      - `city` (text)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to properties
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'tenant',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  property_type text NOT NULL,
  price numeric NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  state text NOT NULL,
  city text NOT NULL,
  area text NOT NULL,
  address text,
  images jsonb DEFAULT '[]'::jsonb,
  amenities jsonb DEFAULT '[]'::jsonb,
  is_verified boolean DEFAULT false,
  verified_at timestamptz,
  status text DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available properties"
  ON properties FOR SELECT
  TO public
  USING (status = 'available' OR status = 'rented');

CREATE POLICY "Landlords can view own properties"
  ON properties FOR SELECT
  TO authenticated
  USING (landlord_id = auth.uid());

CREATE POLICY "Landlords can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (landlord_id = auth.uid());

CREATE POLICY "Landlords can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (landlord_id = auth.uid())
  WITH CHECK (landlord_id = auth.uid());

CREATE POLICY "Landlords can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (landlord_id = auth.uid());

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved properties"
  ON saved_properties FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can save properties"
  ON saved_properties FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unsave properties"
  ON saved_properties FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  landlord_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  sender_phone text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Landlords can view inquiries for their properties"
  ON inquiries FOR SELECT
  TO authenticated
  USING (landlord_id = auth.uid());

CREATE POLICY "Senders can view own inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid());

CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Landlords can update inquiry status"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (landlord_id = auth.uid())
  WITH CHECK (landlord_id = auth.uid());

-- Create featured_cities table
CREATE TABLE IF NOT EXISTS featured_cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state text NOT NULL,
  city text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(state, city)
);

ALTER TABLE featured_cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active featured cities"
  ON featured_cities FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage featured cities"
  ON featured_cities FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert initial featured city (Ibadan)
INSERT INTO featured_cities (state, city, display_order, is_active)
VALUES ('Oyo', 'Ibadan', 1, true)
ON CONFLICT (state, city) DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_landlord ON properties(landlord_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_saved_properties_user ON saved_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_landlord ON inquiries(landlord_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_sender ON inquiries(sender_id);
