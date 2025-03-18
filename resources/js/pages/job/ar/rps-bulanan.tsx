import React, { useState } from 'react';
import axios from 'axios';
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import ConvertBox from '@/components/convert-box';

interface FormData {
  companyCop: string;
  custCodeRaw: string;
  isLiveX: number;
}

interface ResultRow {
  [key: string]: string | number | Date | null;
}

const RpsBulanan: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyCop: '',
    custCodeRaw: '',
    isLiveX: 0
  });

  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleExecute = async (e: React.FormEvent, isLiveX: number) => {
    e.preventDefault();
    
    if (isLiveX !== 0 && isLiveX !== 6 && isLiveX !== 8 && isLiveX !== 88 && 
        !confirm('Are you sure you want to execute this operation?')) {
      return;
    }
  
    setLoading(true);
    
    try {
      const requestData = {
        ...formData,
        isLiveX: isLiveX
      };
      
      const response = await axios.post('/api/rps-bulanan/check', requestData);
  
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setResults(response.data.results);
        
        // Show success message for operations
        if (isLiveX !== 0 && isLiveX !== 6 && isLiveX !== 8 && isLiveX !== 88) {
          alert('Operation completed successfully.');
        }
      }
    } catch (error: any) {
      console.error('Error executing operation:', error);
  
      if (error.response) {
        console.error('Server Response:', error.response);
        alert(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Please check your network.');
      } else {
        console.error('Request Error:', error.message);
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const buttonConfigs = [
    { isLiveX: 0, label: 'Check (EXCEL)', color: 'blue' },
    { isLiveX: 88, label: 'Check All (EXCEL)', color: 'blue' },
    { isLiveX: 1, label: 'Insert ke RPS Bulanan (EXCEL)', color: 'green' },
    
    { isLiveX: 123, label: 'RUN SCRIPT KO JT', color: 'green' },
    { isLiveX: 6, label: 'Check di RPS Mingguan', color: 'blue' },
    { isLiveX: 8, label: 'Check di RPS Bulanan', color: 'blue' },
    { isLiveX: 99, label: 'Keluarin dari RPS Bulanan', color: 'red' },
    { isLiveX: 7777, label: 'Keluarin dari RPS Bulanan (Excel) ALL', color: 'red' }
  ];

  const buttonColors: Record<string, string> = {
    blue: "bg-blue-600 hover:bg-blue-500",
    green: "bg-green-500 hover:bg-green-400",
    red: "bg-red-500 hover:bg-red-400"
  };

  return (
    <AppLayout>
      <Head title="RPS Bulanan" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">RPS Bulanan</h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Form Container */}
          <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
            <form>
              <div className="mb-4">
                <label htmlFor="companyCop" className="block mb-2">Company COP:</label>
                <input
                  type="text"
                  id="companyCop"
                  name="companyCop"
                  placeholder="Company COP"
                  minLength={4}
                  maxLength={4}
                  value={formData.companyCop}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="custCodeRaw" className="block mb-2">Customer Code:</label>
                <input
                  type="text"
                  id="custCodeRaw"
                  name="custCodeRaw"
                  placeholder="Customer Code"
                  value={formData.custCodeRaw}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
    {buttonConfigs.map((config) => (
      <button
        key={config.isLiveX}
        type="button"
        onClick={(e) => handleExecute(e, config.isLiveX)}
        disabled={loading || !formData.companyCop || !formData.custCodeRaw}
        className={`${buttonColors[config.color]} text-white px-4 py-2 rounded disabled:bg-gray-400 text-sm`}
      >
        {loading ? 'Loading...' : config.label}
      </button>
    ))}
  </div>
            </form>
          </div>

          {/* ConvertBox Container */}
          <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
            <ConvertBox />
          </div>
        </div>

        {/* Results Table */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key} className="border px-4 py-2">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border px-4 py-2">
                          {value instanceof Date ? value.toISOString().split('T')[0] : value?.toString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RpsBulanan;