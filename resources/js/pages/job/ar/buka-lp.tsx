import React, { useState } from 'react';
import axios from 'axios';
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface FormData {
  company: string;
  nomorLp: string;
}

interface ResultData {
  [key: string]: string | number | null;
}

const BukaLp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    nomorLp: ''
  });
  
  const [results, setResults] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckOrRun = async (e: React.FormEvent, isRun: boolean) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = isRun ? '/api/buka-lp/run' : '/api/buka-lp/check';
      const response = await axios.post(endpoint, formData);
      setResults(response.data.results || []);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <Head title="Buka LP" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Buka LP</h1>
        
        <form className="bg-white p-4 rounded shadow mb-4" onSubmit={(e) => handleCheckOrRun(e, false)}>
          <div className="mb-4">
            <label className="block mb-2">Company:</label>
            <input
              type="text"
              name="company"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Nomor LP:</label>
            <input
              type="text"
              name="nomorLp"
              minLength={10}
              maxLength={10}
              value={formData.nomorLp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Checking...' : 'Check'}
            </button>
            <button onClick={(e) => handleCheckOrRun(e, true)} className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Running...' : 'Run'}
            </button>
          </div>
        </form>
        
        {error && <p className="text-red-500">{error}</p>}

        {results.length > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Results</h3>
            <table className="w-full border-collapse border border-gray-300">
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
                        {value?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BukaLp;