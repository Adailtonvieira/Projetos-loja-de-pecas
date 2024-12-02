import React from 'react';
import { usePartsStore } from '../store/partsStore';

export const StockView: React.FC = () => {
  const parts = usePartsStore((state) => state.parts);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Consulta de Estoque</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parts.map((part) => (
              <tr key={part.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{part.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{part.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {part.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};