import { Role } from 'index';
import mongoose, { Document } from 'mongoose';

// Order

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  cartItems: ICartItem[];
  taxPrice: number;
  shippingAddress: mongoose.Schema.Types.ObjectId | string;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethod: 'PayPal' | 'Stripe' | 'Cash';
  isPaid: boolean;
  paidAt: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  deliveredAt: string;
}

// User
export interface IUser extends Document {
  name: string;
  slug?: string;
  email: string;
  phone?: string;
  profileImg?: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: number;
  passwordResetVerified?: boolean;
  role: Role;
  active: boolean;
  wishlist?: mongoose.Schema.Types.ObjectId[];
  addresses?: {
    _id: mongoose.Schema.Types.ObjectId;
    alias: string;
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
// SubCategory

export interface ISubCategory extends Document {
  _id: object;
  name: string;
  slug?: string;
  category: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Review

export interface IReview extends Document {
  title?: string;
  ratings: number;
  user: {
    _id: object;
    name: string;
  };
  product: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Product
export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  colors?: string[];
  imageCover: string;
  images?: string[];
  category: mongoose.Schema.Types.ObjectId;
  subcategories?: mongoose.Schema.Types.ObjectId[];
  brand?: mongoose.Schema.Types.ObjectId;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Coupon
export interface ICoupon extends Document {
  name: string;
  expire: Date;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Category
export interface ICategory extends Document {
  name: string;
  slug?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Brand
export interface IBrand extends Document {
  name: string;
  slug?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Cart
export interface ICartItem {
  _id: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
  color?: string;
  price: number;
}

export interface ICart extends Document {
  cartItems: ICartItem[];

  totalCartPrice: number;
  totalPriceAfterDiscount: number | undefined;
  user: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
