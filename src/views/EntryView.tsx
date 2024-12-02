import React, { useState } from 'react';
import { usePartsStore } from '../store/partsStore';
import { NumberInput } from '../components/inputs/NumberInput';

export const EntryView: React.FC = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const addPart = usePartsStore((state) => state.addPart);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPart({ name, quantity, price });
    setName('');
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Entrada de Peças</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Peça</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <NumberInput
          label="Quantidade"
          value={quantity}
          onChange={setQuantity}
          min={1}
          required
        />
        <NumberInput
          label="Preço"
          value={price}
          onChange={setPrice}
          min={0}
          step={0.01}
          required
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Adicionar Peça
        </button>
      </form>
    </div>
  );
};