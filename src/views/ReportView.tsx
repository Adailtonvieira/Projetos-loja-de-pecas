import React, { useState } from 'react';
import { usePartsStore } from '../store/partsStore';
import { Sale, StockMovement } from '../types';
import { SalesTable } from '../components/tables/SalesTable';
import { MovementsTable } from '../components/tables/MovementsTable';

interface Report {
  sales: Sale[];
  movements: StockMovement[];
}

export const ReportView: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const getReportByDateRange = usePartsStore((state) => state.getReportByDateRange);
  const [report, setReport] = useState<Report | null>(null);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      const reportData = getReportByDateRange(
        new Date(startDate),
        new Date(endDate)
      );
      setReport(reportData);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
      <form onSubmit={handleGenerateReport} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Gerar Relatório
        </button>
      </form>

      {report && (
        <div className="space-y-6">
          <SalesTable sales={report.sales} />
          <MovementsTable movements={report.movements} />
        </div>
      )}
    </div>
  );
};