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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.toUpperCase()
    }));
    
    // Clear previous messages
    setError(null);
    setSuccessMessage(null);
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await axios.post(route('api.buka-lp.check'), formData);
      
      if (response.data.success) {
        setResults(response.data.results || []);
        if (response.data.results && response.data.results.length === 0) {
          setSuccessMessage('Check completed - No data found');
        }
      }
    } catch (error: any) {
      console.error('Check failed:', error);
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await axios.post(route('api.buka-lp.run'), formData);
      
      if (response.data.success) {
        setSuccessMessage('Operation completed successfully');
        
        // Refresh data after successful run by calling check
        const checkResponse = await axios.post(route('api.buka-lp.check'), formData);
        if (checkResponse.data.success) {
          setResults(checkResponse.data.results || []);
        }
      }
    } catch (error: any) {
      console.error('Run failed:', error);
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <Head title="Buka LP" />
      
      {/* Professional monochrome background */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
              Buka LP
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

          {/* Form Container */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">Enter company code and LP document number</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Company Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Company Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        placeholder="ABCD"
                        minLength={4}
                        maxLength={4}
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-300 font-mono tracking-wider"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">4 character company identifier</p>
                  </div>

                  {/* LP Number Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      LP Document Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="nomorLp"
                        placeholder="LP12345678"
                        minLength={10}
                        maxLength={10}
                        value={formData.nomorLp}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-300 font-mono tracking-wider"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">LP + 8 characters</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={handleCheck}
                    disabled={loading || !formData.company || !formData.nomorLp}
                    className="group relative px-6 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Checking...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>Check Document</span>
                      </div>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={handleRun}
                    disabled={loading || !formData.company || !formData.nomorLp}
                    className="group relative px-6 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-500 focus:ring-2 focus:ring-gray-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Running...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Run Process</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="max-w-6xl mx-auto mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-fade-in">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Processing Results</h3>
                      <p className="text-gray-600 text-sm mt-1">Document processing results</p>
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
                              {value?.toString() || '-'}
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
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Process</h3>
                <p className="text-gray-600 text-sm">Enter your company code and LP document number to begin processing</p>
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

export default BukaLp;