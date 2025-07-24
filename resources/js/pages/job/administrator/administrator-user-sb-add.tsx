import React from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const AdministratorUserSbAdd: React.FC = () => {
  const { data, setData, post, errors, processing } = useForm({
    nama: '',
    company: '',
    lokasi: '',
    posisi: '',
    rdweb: '',
    website_rosebrand: '',
    sfa: '',
    mobile_sales: '',
    application_login: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('job.administrator-user-sb.store'), {
      preserveScroll: true,
      onSuccess: () => {
        // Redirect to the list page after successful creation using Inertia router
        router.visit(route('job.administrator-user-sb.index'));
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Add New Administrator" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Add New Administrator</h1>
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
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {processing ? 'Creating...' : 'Create Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdministratorUserSbAdd;