import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import ConvertBox from '@/components/convert-box';

interface ResultRow {
  [key: string]: string | number | Date | null;
}

interface Props {
  results1?: ResultRow[];
  results2?: ResultRow[];
  sessionData?: {
    exceptionCode?: string;
  };
}

const BukaSj: React.FC<Props> = ({ results1 = [], results2 = [], sessionData }) => {
  const [formData, setFormData] = useState({
    exceptionCode: sessionData?.exceptionCode || '',
    company: '',
    nomorPs: '',
    customerCode: '',
    prodcat: '',
    companyIm: '',
    companyWhin: '',
    nomorRc: '',
    nomorSj: '',
    nomorPb: ''
  });

  const [currentResults1, setCurrentResults1] = useState<ResultRow[]>(results1);
  const [currentResults2, setCurrentResults2] = useState<ResultRow[]>(results2);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'exceptionCode') {
      // Update session when exception code changes
      axios.post(route('api.buka-sj.session.update'), { exceptionCode: value })
        .catch(error => console.error('Error updating session:', error));
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(route('api.buka-sj.check'), formData);
      
      if (response.data.success) {
        if (response.data.result1) {
          setCurrentResults1(response.data.result1);
        }
        if (response.data.result2) {
          setCurrentResults2(response.data.result2);
        }
      }
    } catch (error: any) {
      console.error('Check failed:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(route('api.buka-sj.run'), formData);
      
      if (response.data.success) {
        // Show success message
        alert('Operation completed successfully');
        
        // Refresh data after successful run by calling check
        const checkResponse = await axios.post(route('api.buka-sj.check'), formData);
        if (checkResponse.data.success) {
          if (checkResponse.data.result1) {
            setCurrentResults1(checkResponse.data.result1);
          }
          if (checkResponse.data.result2) {
            setCurrentResults2(checkResponse.data.result2);
          }
        }
      }
    } catch (error: any) {
      console.error('Run failed:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (formData.exceptionCode) {
      case 'SJ':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company COP"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorPs"
              placeholder="Nomor PS"
              value={formData.nomorPs}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'SUSPEND':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company COP"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="customerCode"
              placeholder="Customer Code"
              value={formData.customerCode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="prodcat"
              placeholder="Prodcat"
              value={formData.prodcat}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'SJ_SUSPEND':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company COP"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorPs"
              placeholder="Nomor PS"
              value={formData.nomorPs}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="customerCode"
              placeholder="Customer Code"
              value={formData.customerCode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="prodcat"
              placeholder="Prodcat"
              value={formData.prodcat}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'RC':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company COP"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="customerCode"
              placeholder="Customer Code"
              value={formData.customerCode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'RT':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company COP"
              minLength={4}
              maxLength={4}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorRc"
              placeholder="Nomor RC"
              value={formData.nomorRc}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'BK':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="companyIm"
              placeholder="Company IM"
              minLength={4}
              maxLength={4}
              value={formData.companyIm}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorSj"
              placeholder="Nomor SJ"
              value={formData.nomorSj}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'BT':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="companyIm"
              placeholder="Company IM"
              minLength={4}
              maxLength={4}
              value={formData.companyIm}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorPb"
              placeholder="Nomor PB"
              value={formData.nomorPb}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'PB':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="companyIm"
              placeholder="Company IM"
              minLength={4}
              maxLength={4}
              value={formData.companyIm}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="companyWhin"
              placeholder="Company WH IN"
              minLength={4}
              maxLength={4}
              value={formData.companyWhin}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorSj"
              placeholder="Nomor SJ"
              value={formData.nomorSj}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      case 'BTRC':
      case 'BTRP':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="companyIm"
              placeholder="Company IM"
              minLength={4}
              maxLength={4}
              value={formData.companyIm}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
            <input
              type="text"
              name="nomorRc"
              placeholder="Nomor RC"
              value={formData.nomorRc}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <Head title="Buka SJ" />
      
      {/* Professional monochrome background - inspired by reference */}
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
              Buka SJ/Suspend
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Form Container */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2">Process Document</h2>
                <p className="text-gray-600 text-sm">Select exception code and enter details</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="exceptionCode" className="block text-sm font-medium text-gray-900 mb-2">
                    Exception Code
                  </label>
                  <select
                    id="exceptionCode"
                    name="exceptionCode"
                    value={formData.exceptionCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                  >
                    <option value="">Select Exception Code</option>
                    <option value="SJ">SJ</option>
                    <option value="SUSPEND">SUSPEND</option>
                    <option value="SJ_SUSPEND">SJ & SUSPEND</option>
                    <option value="RC">RC</option>
                    <option value="RT">RT</option>
                    <option value="BK">BK</option>
                    <option value="BT">BT</option>
                    <option value="PB">PB</option>
                    <option value="BTRC">BTRC</option>
                    <option value="BTRP">BTRP</option>
                  </select>
                </div>

                {formData.exceptionCode && renderFormFields()}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCheck}
                    disabled={loading || !formData.exceptionCode}
                    className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? 'Loading...' : 'Check'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={loading || !formData.exceptionCode}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? 'Loading...' : 'Run'}
                  </button>
                </div>
              </form>
            </div>

            {/* ConvertBox Container */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <ConvertBox />
            </div>
          </div>

          {/* Results Tables */}
          {currentResults1.length > 0 && (
            <div className="mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <h3 className="text-lg font-medium text-gray-900">Result 1</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(currentResults1[0]).map((key) => (
                          <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentResults1.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-3 text-xs text-gray-900 border-r border-gray-200 last:border-r-0">
                              {value instanceof Date ? value.toISOString().split('T')[0] : value?.toString()}
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

          {currentResults2.length > 0 && (
            <div className="mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <h3 className="text-lg font-medium text-gray-900">Result 2</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(currentResults2[0]).map((key) => (
                          <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentResults2.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-3 text-xs text-gray-900 border-r border-gray-200 last:border-r-0">
                              {value instanceof Date ? value.toISOString().split('T')[0] : value?.toString()}
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
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `
      }} />
    </AppLayout>
  );
};

export default BukaSj;