import { StaticImageData } from "next/image";

// TypeScript interfaces

export interface ProductImage {
  id: number;
  name: string;
  src: StaticImageData;
  alt: string;
}

export interface ColorOption {
  name: string;
  class: string;
  selectedClass: string;
}

export interface SizeOption {
  name: string;
  inStock: boolean;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  details: string[];
  images: ProductImage[];
}
