export interface Apartment {
  id: number;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  featured: boolean;
  image: string;
  description: string;
  amenities: string[];
}
