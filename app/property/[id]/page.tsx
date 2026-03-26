'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import { MapPin, BedDouble, Bath, Chrome as Home, CircleCheck as CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Property = Database['public']['Tables']['properties']['Row'];

export default function PropertyPage() {
  const params = useParams();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching property:', error);
    } else {
      setProperty(data);
    }

    setLoading(false);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!property) return;

    const { error } = await supabase.from('inquiries').insert({
      property_id: property.id,
      landlord_id: property.landlord_id,
      sender_name: formData.name,
      sender_email: formData.email,
      sender_phone: formData.phone,
      message: formData.message,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to send inquiry. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Your inquiry has been sent to the landlord!',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }

    setSubmitting(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Link href="/listings">
            <Button className="bg-green-600 hover:bg-green-700">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
        ];

  const amenities = property.amenities || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/listings">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            {property.is_verified && (
              <Badge className="absolute top-4 right-4 bg-green-600">
                Verified
              </Badge>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className={`h-24 object-cover rounded cursor-pointer border-2 ${
                    index === currentImageIndex
                      ? 'border-green-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {property.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>
                {property.area}, {property.city}, {property.state} State
              </span>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <BedDouble className="h-5 w-5 mr-2 text-gray-600" />
                <span className="font-semibold">
                  {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-gray-600" />
                <span className="font-semibold">
                  {property.bathrooms} Bathroom
                  {property.bathrooms !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-gray-600" />
                <span className="font-semibold">{property.property_type}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold text-green-700">
                {formatPrice(property.price)}
                <span className="text-lg font-normal text-gray-600">/year</span>
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description || 'No description provided.'}
              </p>
            </div>

            {amenities.length > 0 && (
              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Landlord</h2>
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="080XXXXXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="I'm interested in this property..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center">
                  By submitting, you agree to be contacted by the property owner
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
