import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: 'tenant' | 'landlord' | 'agent' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'tenant' | 'landlord' | 'agent' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'tenant' | 'landlord' | 'agent' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          landlord_id: string;
          title: string;
          description: string | null;
          property_type: string;
          price: number;
          bedrooms: number;
          bathrooms: number;
          state: string;
          city: string;
          area: string;
          address: string | null;
          images: string[];
          amenities: string[];
          is_verified: boolean;
          verified_at: string | null;
          status: 'available' | 'rented' | 'draft';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          landlord_id: string;
          title: string;
          description?: string | null;
          property_type: string;
          price: number;
          bedrooms?: number;
          bathrooms?: number;
          state: string;
          city: string;
          area: string;
          address?: string | null;
          images?: string[];
          amenities?: string[];
          is_verified?: boolean;
          verified_at?: string | null;
          status?: 'available' | 'rented' | 'draft';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          landlord_id?: string;
          title?: string;
          description?: string | null;
          property_type?: string;
          price?: number;
          bedrooms?: number;
          bathrooms?: number;
          state?: string;
          city?: string;
          area?: string;
          address?: string | null;
          images?: string[];
          amenities?: string[];
          is_verified?: boolean;
          verified_at?: string | null;
          status?: 'available' | 'rented' | 'draft';
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_properties: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          property_id: string;
          sender_id: string | null;
          landlord_id: string;
          message: string;
          sender_name: string;
          sender_email: string;
          sender_phone: string | null;
          status: 'pending' | 'replied' | 'closed';
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          sender_id?: string | null;
          landlord_id: string;
          message: string;
          sender_name: string;
          sender_email: string;
          sender_phone?: string | null;
          status?: 'pending' | 'replied' | 'closed';
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          sender_id?: string | null;
          landlord_id?: string;
          message?: string;
          sender_name?: string;
          sender_email?: string;
          sender_phone?: string | null;
          status?: 'pending' | 'replied' | 'closed';
          created_at?: string;
        };
      };
      featured_cities: {
        Row: {
          id: string;
          state: string;
          city: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          state: string;
          city: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          state?: string;
          city?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
