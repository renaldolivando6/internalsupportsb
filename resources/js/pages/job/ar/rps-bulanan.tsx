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
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value.toUpperCase()
    }));
    
    // Clear messages
    setError(null);
    setSuccessMessage(null);
  };

  const handleExecute = async (e: React.FormEvent, isLiveX: number) => {
    e.preventDefault();
    
    // Confirmation for destructive operations
    if ([1, 123, 99, 7777].includes(isLiveX) && 
        !confirm('Are you sure you want to execute this operation?')) {
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const requestData = {
        ...formData,
        isLiveX: isLiveX
      };
      
      const response = await axios.post(route('api.rps-bulanan.check'), requestData);
  
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setResults(response.data.results || []);
        
        // Show success message for operations
        if ([1, 123, 99, 7777].includes(isLiveX)) {
          setSuccessMessage('Operation completed successfully');
        } else if (response.data.results && response.data.results.length === 0) {
          setSuccessMessage('Check completed - No data found');
        }
      }
    } catch (error: any) {
      console.error('Error executing operation:', error);
      
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const buttonConfigs = [
    { isLiveX: 0, label: 'Check (EXCEL)', color: 'gray' },
    { isLiveX: 88, label: 'Check All (EXCEL)', color: 'gray' },
    { isLiveX: 1, label: 'Insert ke RPS Bulanan', color: 'primary' },
    { isLiveX: 123, label: 'RUN SCRIPT KO JT', color: 'primary' },
    { isLiveX: 6, label: 'Check di RPS Mingguan', color: 'gray' },
    { isLiveX: 8, label: 'Check di RPS Bulanan', color: 'gray' },
    { isLiveX: 99, label: 'Keluarin dari RPS Bulanan', color: 'danger' },
    { isLiveX: 7777, label: 'Keluarin All (Excel)', color: 'danger' }
  ];

  const buttonColors: Record<string, string> = {
    gray: "bg-gray-600 hover:bg-gray-500 text-white",
    primary: "bg-gray-800 hover:bg-gray-700 text-white", 
    danger: "bg-gray-500 hover:bg-gray-400 text-white"
  };

  return (
    <AppLayout>
      <Head title="RPS Bulanan" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-6">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-4 shadow-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
              RPS Bulanan
            </h1>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-6 animate-slide-down">
              <div className="max-w-md mx-auto bg-white backdrop-blur-lg rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium text-sm">{successMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 animate-slide-down">
              <div className="max-w-md mx-auto bg-white backdrop-blur-lg rounded-xl p-4 shadow-lg border border-red-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-800 font-medium text-sm">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Form Container */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2">RPS Operations</h2>
                <p className="text-gray-600 text-sm">Enter company and customer information</p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="companyCop" className="block text-sm font-medium text-gray-900">
                    Company COP
                  </label>
                  <input
                    type="text"
                    id="companyCop"
                    name="companyCop"
                    placeholder="ABCD"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyCop}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 font-mono tracking-wider"
                  />
                  <p className="text-gray-500 text-xs">4 character company identifier</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="custCodeRaw" className="block text-sm font-medium text-gray-900">
                    Customer Code
                  </label>
                  <input
                    type="text"
                    id="custCodeRaw"
                    name="custCodeRaw"
                    placeholder="Customer Code"
                    value={formData.custCodeRaw}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                  />
                  <p className="text-gray-500 text-xs">Customer identifier code</p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Available Operations:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {buttonConfigs.map((config) => (
                      <button
                        key={config.isLiveX}
                        type="button"
                        onClick={(e) => handleExecute(e, config.isLiveX)}
                        disabled={loading || !formData.companyCop || !formData.custCodeRaw}
                        className={`${buttonColors[config.color]} px-3 py-2 text-xs font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none text-left`}
                      >
                        {loading ? 'Processing...' : config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* ConvertBox Container */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <ConvertBox />
            </div>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-fade-in">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Processing Results</h3>
                      <p className="text-gray-600 text-sm mt-1">RPS operation results</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-gray-900">{results.length}</div>
                      <div className="text-xs text-gray-500">Records</div>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(results[0]).map((key) => (
                          <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-3 text-xs text-gray-900 border-r border-gray-200 last:border-r-0">
                              {value instanceof Date ? value.toISOString().split('T')[0] : value?.toString() || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && results.length === 0 && !error && !successMessage && (
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for RPS Operations</h3>
                <p className="text-gray-600 text-sm">Enter company COP and customer code to perform RPS operations</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
          .animate-slide-down {
            animation: slideDown 0.5s ease-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `
      }} />
    </AppLayout>
  );
};

export default RpsBulanan;