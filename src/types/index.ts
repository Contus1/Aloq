/**
 * Type definitions for Aloq platform
 * These will be used across the application for type safety
 */

// User Types
export type UserType = 'customer' | 'merchant' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

// Merchant Types
export type MerchantCategory = 'cafe' | 'restaurant' | 'bakery' | 'service' | 'health' | 'other';

export interface Merchant {
  id: string;
  userId: string;
  businessName: string;
  category: MerchantCategory;
  address: Address;
  phone: string;
  email: string;
  description?: string;
  openingHours: OpeningHours[];
  images?: string[];
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OpeningHours {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  open: string; // HH:mm format
  close: string; // HH:mm format
  isOpen: boolean;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

export interface Booking {
  id: string;
  merchantId: string;
  customerId: string;
  serviceType: string;
  datetime: Date;
  partySize?: number;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';
export type OrderType = 'pickup' | 'delivery' | 'dine-in';

export interface Order {
  id: string;
  merchantId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  pickupTime?: Date;
  deliveryAddress?: Address;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

// Search Types
export interface SearchResult {
  type: 'merchant' | 'service' | 'product';
  id: string;
  name: string;
  description?: string;
  category: string;
  address?: Address;
  image?: string;
  rating?: number;
  distance?: number; // in km
}

export interface SearchQuery {
  query: string;
  location?: {
    lat: number;
    lng: number;
  };
  category?: string;
  radius?: number; // in km
}
