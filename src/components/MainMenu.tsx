import React from 'react';
import { useAuthStore } from '../store/authStore';

interface MenuOption {
  id: string;
  title: string;
}

interface MainMenuProps {
  currentView: string;
  onOptionSelect: (option: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  currentView,
  onOptionSelect,
}) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const menuOptions: MenuOption[] = [
    { id: 'entry', title: 'Entrada de Peças' },
    { id: 'withdrawal', title: 'Retirada de Peças' },
    { id: 'sale', title: 'Venda de Peças' },
    { id: 'stock', title: 'Consulta de Estoque' },
    { id: 'report', title: 'Relatórios' },
  ];

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Auto Peças - {user?.role === 'admin' ? 'Administrador' : 'Colaborador'}
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200">
          <div className="flex space-x-8">
            {menuOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionSelect(option.id)}
                className={`${
                  currentView === option.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};