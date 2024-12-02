import { create } from 'zustand';
import { Part, Sale, StockMovement } from '../types';

interface PartsState {
  parts: Part[];
  sales: Sale[];
  movements: StockMovement[];
  addPart: (part: Omit<Part, 'id' | 'createdAt'>) => void;
  updatePartQuantity: (partId: string, quantity: number) => boolean;
  withdrawPart: (partId: string, quantity: number) => boolean;
  sellPart: (partId: string, quantity: number) => boolean;
  getPart: (partId: string) => Part | undefined;
  getReportByDateRange: (startDate: Date, endDate: Date) => {
    sales: Sale[];
    movements: StockMovement[];
  };
}

export const usePartsStore = create<PartsState>((set, get) => ({
  parts: [],
  sales: [],
  movements: [],
  
  addPart: (partData) => {
    const parts = get().parts;
    const existingPart = parts.find((p) => p.name === partData.name);
    
    if (existingPart) {
      get().updatePartQuantity(existingPart.id, partData.quantity);
      return;
    }
    
    const newPart = {
      ...partData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    set((state) => ({
      parts: [...state.parts, newPart],
      movements: [
        ...state.movements,
        {
          id: Date.now().toString(),
          partId: newPart.id,
          type: 'entry',
          quantity: partData.quantity,
          date: new Date(),
        },
      ],
    }));
  },
  
  updatePartQuantity: (partId, quantity) => {
    const part = get().getPart(partId);
    if (!part) return false;
    
    set((state) => ({
      parts: state.parts.map((p) =>
        p.id === partId ? { ...p, quantity: p.quantity + quantity } : p
      ),
      movements: [
        ...state.movements,
        {
          id: Date.now().toString(),
          partId,
          type: quantity > 0 ? 'entry' : 'withdrawal',
          quantity: Math.abs(quantity),
          date: new Date(),
        },
      ],
    }));
    
    return true;
  },
  
  withdrawPart: (partId, quantity) => {
    const part = get().getPart(partId);
    if (!part || part.quantity < quantity) return false;
    
    return get().updatePartQuantity(partId, -quantity);
  },
  
  sellPart: (partId, quantity) => {
    const part = get().getPart(partId);
    if (!part || part.quantity < quantity) return false;
    
    const success = get().withdrawPart(partId, quantity);
    if (!success) return false;
    
    const sale = {
      id: Date.now().toString(),
      partId,
      partName: part.name,
      quantity,
      price: part.price,
      total: part.price * quantity,
      date: new Date(),
    };
    
    set((state) => ({
      sales: [...state.sales, sale],
      movements: [
        ...state.movements,
        {
          id: Date.now().toString(),
          partId,
          type: 'sale',
          quantity,
          date: new Date(),
        },
      ],
    }));
    
    return true;
  },
  
  getPart: (partId) => {
    return get().parts.find((p) => p.id === partId);
  },
  
  getReportByDateRange: (startDate, endDate) => {
    const sales = get().sales.filter(
      (sale) => sale.date >= startDate && sale.date <= endDate
    );
    
    const movements = get().movements.filter(
      (movement) => movement.date >= startDate && movement.date <= endDate
    );
    
    return { sales, movements };
  },
}));