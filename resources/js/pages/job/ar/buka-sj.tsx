import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import ConvertBox from '@/components/convert-box';

interface FormData {
  exceptionCode: string;
  company: string;
  nomorPs: string;
  customerCode: string;
  prodcat: string;
  companyIm: string;
  companyWhin: string;
  nomorRc: string;
  nomorSj: string;
  nomorPb: string;
}

interface ResultRow {
  [key: string]: string | number | Date | null;
}

const BukaSj: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    exceptionCode: '',
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

  const [results1, setResults1] = useState<ResultRow[]>([]);
  const [results2, setResults2] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Get session data if any
    const fetchSessionData = async () => {
      try {
        const response = await axios.get('/api/buka-sj/session');
        if (response.data.exceptionCode) {
          setFormData(prevState => ({
            ...prevState,
            exceptionCode: response.data.exceptionCode
          }));
          
          // Toggle fields based on exception code
          toggleFields(response.data.exceptionCode);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'exceptionCode') {
      // Update the session when exception code changes
      axios.post('/api/buka-sj/session', {
        exceptionCode: value
      });
      
      toggleFields(value);
    }
  };

  const toggleFields = (exceptionCode: string) => {
    // This is now handled by conditional rendering in the JSX
  };

  const handleCheckOrRun = async (e: React.FormEvent, isRun: boolean) => {
    e.preventDefault();
    
    /*
    if (isRun && !confirm('Are you sure you want to run this operation?')) {
      return;
    }*/
  
    setLoading(true);
    
    try {
      const endpoint = isRun ? '/api/buka-sj/run' : '/api/buka-sj/check';
      const response = await axios.post(endpoint, formData);
  
      console.log(isRun ? 'Run Response:' : 'Check Response:', response.data);
      
      /*
      if (isRun) {
        alert('Operation completed successfully.');
      }*/
  
      // Refresh data after run or check
      const checkResponse = await axios.post('/api/buka-sj/check', formData);
      console.log('Check Response:', checkResponse.data);
  
      if (checkResponse.data.result1) {
        setResults1(checkResponse.data.result1);
      }
      
      if (checkResponse.data.result2) {
        setResults2(checkResponse.data.result2);
      }
    } catch (error: any) {
      console.error(isRun ? 'Error running operation:' : 'Error checking data:', error);
  
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

  return (
    <AppLayout>
          <Head title="Buka SJ" />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buka SJ/Suspend</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Form Container */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
          <form>
            <div className="mb-4">
              <label htmlFor="exceptionCode" className="block mb-2">Exception Code:</label>
              <select
                id="exceptionCode"
                name="exceptionCode"
                value={formData.exceptionCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Pilih Exception Code</option>
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

            {/* SJ Fields */}
            {formData.exceptionCode === 'SJ' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company COP"
                    minLength={4}
                    maxLength={4}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorPs"
                    placeholder="Nomor PS"
                    value={formData.nomorPs}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* SUSPEND Fields */}
            {formData.exceptionCode === 'SUSPEND' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company COP"
                    minLength={4}
                    maxLength={4}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="customerCode"
                    placeholder="Customer Code"
                    value={formData.customerCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="prodcat"
                    placeholder="Prodcat"
                    value={formData.prodcat}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* SJ_SUSPEND Fields */}
            {formData.exceptionCode === 'SJ_SUSPEND' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company COP"
                    minLength={4}
                    maxLength={4}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorPs"
                    placeholder="Nomor PS"
                    value={formData.nomorPs}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="customerCode"
                    placeholder="Customer Code"
                    value={formData.customerCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="prodcat"
                    placeholder="Prodcat"
                    value={formData.prodcat}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* RC Fields */}
            {formData.exceptionCode === 'RC' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company COP"
                    minLength={4}
                    maxLength={4}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="customerCode"
                    placeholder="Customer Code"
                    value={formData.customerCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* RT Fields */}
            {formData.exceptionCode === 'RT' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company COP"
                    minLength={4}
                    maxLength={4}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorRc"
                    placeholder="Nomor RC"
                    value={formData.nomorRc}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* BK Fields */}
            {formData.exceptionCode === 'BK' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyIm"
                    placeholder="Company IM"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyIm}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorSj"
                    placeholder="Nomor SJ"
                    value={formData.nomorSj}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* BT Fields */}
            {formData.exceptionCode === 'BT' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyIm"
                    placeholder="Company IM"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyIm}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorPb"
                    placeholder="Nomor PB"
                    value={formData.nomorPb}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* PB Fields */}
            {formData.exceptionCode === 'PB' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyIm"
                    placeholder="Company IM"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyIm}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyWhin"
                    placeholder="Company WH IN"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyWhin}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorSj"
                    placeholder="Nomor SJ"
                    value={formData.nomorSj}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* BTRC Fields */}
            {formData.exceptionCode === 'BTRC' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyIm"
                    placeholder="Company IM"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyIm}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorRc"
                    placeholder="Nomor RC"
                    value={formData.nomorRc}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* BTRP Fields - similar to BTRC */}
            {formData.exceptionCode === 'BTRP' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="companyIm"
                    placeholder="Company IM"
                    minLength={4}
                    maxLength={4}
                    value={formData.companyIm}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nomorRc"
                    placeholder="Nomor RC"
                    value={formData.nomorRc}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={(e) => handleCheckOrRun(e, false)}
                disabled={loading || !formData.exceptionCode}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Check'}
              </button>
              <button
                type="button"
                onClick={(e) => handleCheckOrRun(e, true)}
                disabled={loading || !formData.exceptionCode}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Run'}
              </button>
            </div>
          </form>
        </div>

        {/* ConvertBox Container - You'd need to migrate this component separately */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
            <ConvertBox />
        </div>
      </div>

      {/* Results Tables */}
      {results1.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Result 1</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  {Object.keys(results1[0]).map((key) => (
                    <th key={key} className="border px-4 py-2">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results1.map((row, index) => (
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

      {results2.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Result 2</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  {Object.keys(results2[0]).map((key) => (
                    <th key={key} className="border px-4 py-2">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results2.map((row, index) => (
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

export default BukaSj;