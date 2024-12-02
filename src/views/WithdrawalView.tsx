import React, { useState } from 'react';
import { usePartsStore } from '../store/partsStore';
import { NumberInput } from '../components/inputs/NumberInput';

export const WithdrawalView: React.FC = () => {
  const [selectedPartId, setSelectedPartId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const parts = usePartsStore((state) => state.parts);
  const withdrawPart = usePartsStore((state) => state.withdrawPart);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPartId && quantity > 0) {
      const success = withdrawPart(selectedPartId, quantity);
      if (success) {
        setSelectedPartId('');
        setQuantity(0);
      } else {
        alert('Quantidade indisponível em estoque');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Retirada de Peças</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Peça</label>
          <select
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Selecione uma peça</option>
            {parts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name} (Em estoque: {part.quantity})
              </option>
            ))}
          </select>
        </div>
        <NumberInput
          label="Quantidade"
          value={quantity}
          onChange={setQuantity}
          min={1}
          required
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Retirar Peça
        </button>
      </form>
    </div>
  );
};