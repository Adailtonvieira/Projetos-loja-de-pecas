import React, { useState } from 'react';
import { Login } from './components/Login';
import { MainMenu } from './components/MainMenu';
import { EntryView } from './views/EntryView';
import { WithdrawalView } from './views/WithdrawalView';
import { SaleView } from './views/SaleView';
import { StockView } from './views/StockView';
import { ReportView } from './views/ReportView';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);
  const [currentView, setCurrentView] = useState('menu');

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'entry':
        return <EntryView />;
      case 'withdrawal':
        return <WithdrawalView />;
      case 'sale':
        return <SaleView />;
      case 'stock':
        return <StockView />;
      case 'report':
        return <ReportView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MainMenu currentView={currentView} onOptionSelect={setCurrentView} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderView()}
      </div>
    </div>
  );
}

export default App;