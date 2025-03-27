import React from 'react';
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface Administrator {
  id: number;
  nama: string;
  company: string;
  lokasi: string;
  posisi: string;
  rdweb: string;
  website_rosebrand: string;
  sfa: string;
  mobile_sales: string;
  application_login: string;
  group_name: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  administrators: Administrator[];
}

const AdministratorUserList = (props: Props) => {
  const { administrators } = props;
  
  return (
    <AppLayout>
      <Head title="Administrator Users" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-2xl font-bold mb-6">Administrator Users</h1>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Nama</th>
                      <th className="py-3 px-6 text-left">Company</th>
                      <th className="py-3 px-6 text-left">Lokasi</th>
                      <th className="py-3 px-6 text-left">Posisi</th>
                      <th className="py-3 px-6 text-left">RD Web</th>
                      <th className="py-3 px-6 text-left">Website Rosebrand</th>
                      <th className="py-3 px-6 text-left">SFA</th>
                      <th className="py-3 px-6 text-left">Mobile Sales</th>
                      <th className="py-3 px-6 text-left">Application Login</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {administrators && administrators.length > 0 ? (
                      administrators.map((admin) => (
                        <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-6 text-left">{admin.nama}</td>
                          <td className="py-3 px-6 text-left">{admin.company}</td>
                          <td className="py-3 px-6 text-left">{admin.lokasi || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.posisi || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.rdweb || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.website_rosebrand || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.sfa || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.mobile_sales || '-'}</td>
                          <td className="py-3 px-6 text-left">{admin.application_login || '-'}</td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center space-x-2">
                              <a href={`/administrators/${admin.id}/edit`} className="text-blue-500 hover:text-blue-700">
                                Edit
                              </a>
                              {/* Add delete functionality */}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-4 text-center">
                          No administrators found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdministratorUserList;