import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Administrator {
  id: number;
  nama: string;
  company: string;
  lokasi?: string;
  posisi?: string;
  rdweb?: string;
  website_rosebrand?: string;
  sfa?: string;
  mobile_sales?: string;
  application_login?: string;
}

interface Props {
  administrator: Administrator;
}

const AdministratorUserSbEdit: React.FC<Props> = ({ administrator }) => {
  const { data, setData, put, errors, processing } = useForm({
    nama: administrator.nama,
    company: administrator.company,
    lokasi: administrator.lokasi || '',
    posisi: administrator.posisi || '',
    rdweb: administrator.rdweb || '',
    website_rosebrand: administrator.website_rosebrand || '',
    sfa: administrator.sfa || '',
    mobile_sales: administrator.mobile_sales || '',
    application_login: administrator.application_login || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/administrator-user-sb/${administrator.id}`, {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout>
      <Head title={`Edit Administrator: ${administrator.nama}`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Edit Administrator</h1>
              <Link 
                href="/administrator-user-sb" 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to List
              </Link>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                  <input
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                  {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                  <input
                    type="text"
                    value={data.company}
                    onChange={(e) => setData('company', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={data.lokasi}
                    onChange={(e) => setData('lokasi', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Posisi</label>
                  <input
                    type="text"
                    value={data.posisi}
                    onChange={(e) => setData('posisi', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">RD Web</label>
                  <input
                    type="text"
                    value={data.rdweb}
                    onChange={(e) => setData('rdweb', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Website Rosebrand</label>
                  <input
                    type="text"
                    value={data.website_rosebrand}
                    onChange={(e) => setData('website_rosebrand', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                {/* Tambahan kolom baru */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">SFA</label>
                  <input
                    type="text"
                    value={data.sfa}
                    onChange={(e) => setData('sfa', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Sales</label>
                  <input
                    type="text"
                    value={data.mobile_sales}
                    onChange={(e) => setData('mobile_sales', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Application Login</label>
                  <input
                    type="text"
                    value={data.application_login}
                    onChange={(e) => setData('application_login', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {processing ? 'Updating...' : 'Update Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdministratorUserSbEdit;