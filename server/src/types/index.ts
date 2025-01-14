export type FilteredObject =
  | {
      categoryId: string;
    }
  | object;

export type ReviewFilteredObject =
  | {
      product: string;
    }
  | object;
export type Role = 'ADMIN' | 'USER' | 'EMPLOYEE';
export type SearchType = 'Product' | 'Else' | 'User';

// NOTE: Auth services

export interface SignupProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  slug: string;
  profileImage?: string;
  role: 'USER';
}
