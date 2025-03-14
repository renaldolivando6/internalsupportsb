import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

// Definisi tipe untuk props
interface RDRecord {
  id: number;
  tax_number: string;
  company: string;
  username: string;
  date_open: string;
}

interface OpenRDHistoryProps {
  data: RDRecord[];
  successMessage?: string | null;
}

const OpenRDHistory: React.FC<OpenRDHistoryProps> = ({ data, successMessage }) => {
  const { data: formData, setData, post, processing, reset } = useForm({
    company: "",
    rdNumber: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as "company" | "rdNumber", value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post('/job/tax/openrd', {
      preserveScroll: true,
      onSuccess: () => {
        reset('company', 'rdNumber');
      },
    });
  };

  // Format date_open to exclude seconds and milliseconds
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');
  };

  return (
    <AppLayout>
      <Head title="Open RD History" />

      <div className="p-8">
        {/* Form Section */}
        <h1 className="text-2xl font-bold mb-4">Open Data RD/RY</h1>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              minLength={4}
              maxLength={4}
              required
              className="border p-2 w-1/4"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nomor RD/RY"
              name="rdNumber"
              value={formData.rdNumber}
              onChange={handleChange}
              minLength={10}
              maxLength={10}
              pattern="^(RD|RY|rd|ry).{8}$"
              required
              className="border p-2 w-1/4"
            />
          </div>
          <button 
            type="submit" 
            disabled={processing}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Open'}
          </button>
        </form>

        {/* Table Section */}
        <div className="mt-8">
          <h1 className="text-xl font-bold mb-4">History Record</h1>
          <div className="overflow-y-auto max-h-48 border border-gray-300 rounded w-full">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-200 border-b border-gray-400">
                <tr>
                  <th className="p-2 border-r border-gray-300 text-left">Tax Number</th>
                  <th className="p-2 border-r border-gray-300 text-left">Company</th>
                  <th className="p-2 border-r border-gray-300 text-left">Opened By</th>
                  <th className="p-2 text-left">Date Open</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 20).map((record, index) => (
                  <tr key={record.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="border-t border-gray-300 p-2 text-left">{record.tax_number}</td>
                    <td className="border-t border-gray-300 p-2 text-left">{record.company}</td>
                    <td className="border-t border-gray-300 p-2 text-left">{record.username}</td>
                    <td className="border-t border-gray-300 p-2 text-left">{formatDate(record.date_open)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OpenRDHistory;