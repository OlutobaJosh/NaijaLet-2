'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, BedDouble, Bath, Heart } from 'lucide-react';
import { Database } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyCardProps {
  property: Property;
  onSave?: () => void;
  isSaved?: boolean;
}

export function PropertyCard({ property, onSave, isSaved }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/property/${property.id}`}>
        <div className="relative h-48 bg-gray-200">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.is_verified && (
            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
              Verified
            </Badge>
          )}
          {property.status === 'rented' && (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Rented
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.area}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-green-700">
            {formatPrice(property.price)}<span className="text-sm font-normal text-gray-600">/year</span>
          </p>
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                onSave();
              }}
              className={isSaved ? 'text-red-500' : ''}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
