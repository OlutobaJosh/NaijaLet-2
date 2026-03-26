-- Profiles table (for auth)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  role text default 'tenant' check (role in ('tenant','landlord','agent','admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add boost columns to properties
alter table properties
  add column if not exists is_featured boolean default false,
  add column if not exists featured_until timestamptz;

-- Transactions table
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id),
  user_id uuid references auth.users(id),
  type text check (type in ('boost','verification','tenant_passport','success_fee')),
  amount numeric not null,
  reference text unique,
  status text default 'pending' check (status in ('pending','success','failed')),
  created_at timestamptz default now()
);

-- RLS policies
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

alter table transactions enable row level security;
create policy "Users see own transactions" on transactions for select using (auth.uid() = user_id);
