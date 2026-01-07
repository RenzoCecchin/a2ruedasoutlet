
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  gallery?: string[]; // Array of additional image URLs
  compatibleBrands?: string[]; // For parts specific to Voge, Benelli, etc.
  colors?: string[]; // Available colors
  description?: string; // Custom product description for better SEO and sales
  stock: number; // Inventory count
}

export interface SubcategoryGroup {
  name: string;
  items: string[];
}

export interface Category {
  id: string;
  name: string;
  groups: SubcategoryGroup[];
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: Date;
}

export type ImageSize = '1K' | '2K' | '4K';

export interface ImageGenConfig {
  prompt: string;
  size: ImageSize;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, never store plain text passwords
  role: 'admin' | 'customer';
  favorites?: string[]; // List of product IDs
}
