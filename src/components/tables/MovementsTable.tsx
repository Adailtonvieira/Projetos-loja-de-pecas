import React from 'react';
import { format } from 'date-fns';
import { StockMovement } from '../../types';

interface MovementsTableProps {
  movements: StockMovement[];
}

const getMovementTypeLabel = (type: string): string => {
  switch (type) {
    case 'entry':
      return 'Entrada';
    case 'withdrawal':
      return 'Retirada';
    case 'sale':
      return 'Venda';
    default:
      return type;
  }
};

export const MovementsTable: React.FC<MovementsTableProps> = ({ movements }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Movimentações</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement, index) => (
              <tr key={`${movement.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(movement.date), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getMovementTypeLabel(movement.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};