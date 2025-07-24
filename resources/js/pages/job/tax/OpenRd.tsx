import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const { data: formData, setData, post, processing, reset, errors } = useForm({
    company: "",
    rdNumber: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as "company" | "rdNumber", value.toUpperCase());
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post(route('job.tax.open_rd.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('company', 'rdNumber');
        setActiveTab('history');
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    }).replace(',', '');
  };

  return (
    <AppLayout>
      <Head title="RD/RY Document Manager" />

      {/* Professional monochrome background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-6">
          
          {/* Compact Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-4 shadow-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
              RD/RY Document Manager
            </h1>
          </div>

          {/* Success Message */}
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

          {/* Compact Tab Navigation */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 shadow-lg">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'form'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Open Document</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'history'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>History</span>
                    <span className="ml-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                      {data.length}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="max-w-3xl mx-auto">
            {activeTab === 'form' ? (
              // Compact Form Section
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">Open New Document</h2>
                  <p className="text-gray-600 text-sm">Enter company code and document number</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Company Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Company Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="ABCD"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          minLength={4}
                          maxLength={4}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-300 font-mono tracking-wider"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs">4 character identifier</p>
                    </div>

                    {/* RD Number Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Document Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="RD12345678"
                          name="rdNumber"
                          value={formData.rdNumber}
                          onChange={handleChange}
                          minLength={10}
                          maxLength={10}
                          pattern="^(RD|RY|rd|ry).{8}$"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-300 font-mono tracking-wider"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs">RD/RY + 8 characters</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      type="submit" 
                      disabled={processing}
                      className="group relative px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:ring-2 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      {processing ? (
                        <div className="flex items-center space-x-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>Process Document</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Compact History Section
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl animate-fade-in overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-medium text-gray-900">Document History</h2>
                      <p className="text-gray-600 text-sm mt-1">Recent processing activity</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-gray-900">{data.length}</div>
                      <div className="text-xs text-gray-500">Records</div>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden">
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {data.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {data.slice(0, 20).map((record, index) => (
                          <div key={record.id} className="px-6 py-4 hover:bg-gray-50/50 transition-all duration-200 group">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <div>
                                  <div className="flex items-center space-x-3 mb-1">
                                    <span className="text-base font-mono text-gray-900 font-medium tracking-wide">
                                      {record.tax_number}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border">
                                      {record.company}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-gray-500 text-xs">
                                    <span className="flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                      <span>{record.username}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>{formatDate(record.date_open)}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
                        <p className="text-gray-600 text-sm mb-4">Start processing your first document</p>
                        <button
                          onClick={() => setActiveTab('form')}
                          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 text-sm"
                        >
                          Process Document
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
          .animate-slide-down {
            animation: slideDown 0.5s ease-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
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

export default OpenRDHistory;