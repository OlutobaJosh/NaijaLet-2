'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { nigerianStates, propertyTypes, amenitiesList } from '@/lib/nigeria-data';
import { Plus, CreditCard as Edit, Trash2, Eye, Zap } from 'lucide-react';
import { BoostModal } from '@/components/BoostModal';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/lib/supabase';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

type Property = Database['public']['Tables']['properties']['Row'];

export default function DashboardPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [boostProperty, setBoostProperty] = useState<Property | null>(null);

  const mockUserId = '00000000-0000-0000-0000-000000000000';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    state: '',
    city: '',
    area: '',
    address: '',
    images: '',
    amenities: [] as string[],
    status: 'available' as 'available' | 'rented' | 'draft',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
    } else {
      setProperties(data || []);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const propertyData = {
      title: formData.title,
      description: formData.description,
      property_type: formData.property_type,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      state: formData.state,
      city: formData.city,
      area: formData.area,
      address: formData.address,
      images: formData.images
        ? formData.images.split(',').map((url) => url.trim())
        : [],
      amenities: formData.amenities,
      status: formData.status,
      landlord_id: mockUserId,
    };

    if (editingProperty) {
      const { error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', editingProperty.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update property',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Property updated successfully',
        });
        resetForm();
        fetchProperties();
      }
    } else {
      const { error } = await supabase.from('properties').insert(propertyData);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create property',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Property listed successfully',
        });
        resetForm();
        fetchProperties();
      }
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description || '',
      property_type: property.property_type,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      state: property.state,
      city: property.city,
      area: property.area,
      address: property.address || '',
      images: property.images ? property.images.join(', ') : '',
      amenities: property.amenities || [],
      status: property.status as 'available' | 'rented' | 'draft',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const { error } = await supabase.from('properties').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
      fetchProperties();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      property_type: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      state: '',
      city: '',
      area: '',
      address: '',
      images: '',
      amenities: [],
      status: 'available',
    });
    setEditingProperty(null);
    setIsDialogOpen(false);
  };

  const selectedState = nigerianStates.find((s) => s.name === formData.state);
  const cities = selectedState ? selectedState.cities : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            My Properties
          </h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={resetForm}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Property Title *</Label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Modern 3 Bedroom Flat in Ibadan"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your property..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Property Type *</Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, property_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Price (₦/year) *</Label>
                  <Input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Bedrooms *</Label>
                  <Input
                    type="number"
                    required
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bedrooms: e.target.value })
                    }
                    placeholder="2"
                  />
                </div>

                <div>
                  <Label>Bathrooms *</Label>
                  <Input
                    type="number"
                    required
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: e.target.value })
                    }
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      setFormData({ ...formData, state: value, city: '' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>City *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) =>
                      setFormData({ ...formData, city: value })
                    }
                    disabled={!formData.state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Area/Neighborhood *</Label>
                <Input
                  required
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  placeholder="e.g., Bodija, Ring Road"
                />
              </div>

              <div>
                <Label>Full Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Complete address"
                />
              </div>

              <div>
                <Label>Image URLs (comma-separated)</Label>
                <Textarea
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={3}
                />
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, amenity],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter(
                                (a) => a !== amenity
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'available' | 'rented' | 'draft') =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {editingProperty ? 'Update Property' : 'Create Property'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading properties...</p>
        </div>
      ) : properties.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{property.title}</p>
                      <p className="text-sm text-gray-600">
                        {property.bedrooms} bed · {property.bathrooms} bath
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">
                      {property.area}, {property.city}
                    </p>
                  </TableCell>
                  <TableCell>{formatPrice(property.price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        property.status === 'available'
                          ? 'default'
                          : property.status === 'rented'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {property.is_verified ? (
                      <Badge className="bg-green-600">Verified</Badge>
                    ) : (
                      <Link href="/pricing">
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Get Verified
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/property/${property.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setBoostProperty(property)}
                        title="Boost listing"
                      >
                        <Zap className="h-4 w-4 text-orange-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">
            You haven't listed any properties yet
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Property
          </Button>
        </div>
      )}

      {boostProperty && (
        <BoostModal
          property={boostProperty}
          onClose={() => setBoostProperty(null)}
        />
      )}
    </div>
  );
}
