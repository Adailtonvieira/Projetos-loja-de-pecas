export type UserRole = 'admin' | 'collaborator';

export interface User {
  username: string;
  password: string;
  role: UserRole;
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

export interface Sale {
  id: string;
  partId: string;
  partName: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

export interface StockMovement {
  id: string;
  partId: string;
  type: 'entry' | 'withdrawal' | 'sale';
  quantity: number;
  date: Date;
}