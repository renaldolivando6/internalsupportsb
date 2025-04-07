import React, { useState, useMemo } from 'react';
import { Head, router } from "@inertiajs/react";
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
  is_resigned: boolean | string;
  resigned_at: string | null;
  delete_status?: 'pending' | 'done';
}

interface Props {
  administrators: Administrator[];
}

const AdministratorUserList = (props: Props) => {
  const { administrators } = props;
  
  const [tab, setTab] = useState<'active' | 'resigned'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState<Administrator | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const itemsPerPage = 8;

  // Get unique companies for the filter
  const companies = useMemo(() => {
    const uniqueCompanies = new Set<string>();
    administrators.forEach(admin => {
      if (admin.company) {
        uniqueCompanies.add(admin.company);
      }
    });
    return ['ALL', ...Array.from(uniqueCompanies)];
  }, [administrators]);

  // Filtering logic
  const filteredAdministrators = useMemo(() => {
    let filtered = administrators.filter(admin => {
      const isResigned = typeof admin.is_resigned === 'string' 
        ? admin.is_resigned === '1' 
        : !!admin.is_resigned;
      
      // First filter by active/resigned status
      if (tab === 'active' ? isResigned : !isResigned) {
        return false;
      }
      
      // Then filter by company if not "ALL"
      if (selectedCompany !== 'ALL' && admin.company !== selectedCompany) {
        return false;
      }
  
      // Then filter by search term
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        return Object.values(admin).some(value => 
          value && value.toString().toLowerCase().includes(searchTermLower)
        );
      }
      
      return true;
    });
  
    return filtered;
  }, [administrators, searchTerm, tab, selectedCompany]);

  // Calculate dashboard statistics
  const dashboardStats = useMemo(() => {
    // Count only active users
    const activeUsers = administrators.filter(admin => {
      const isResigned = typeof admin.is_resigned === 'string' 
        ? admin.is_resigned === '1' 
        : !!admin.is_resigned;
      
      // Apply company filter if not "ALL"
      if (selectedCompany !== 'ALL' && admin.company !== selectedCompany) {
        return false;
      }
      
      return !isResigned;
    });

    // Count total active users
    const totalActive = activeUsers.length;
    
    // Count users with access to each system
    const rdWebCount = activeUsers.filter(admin => 
      admin.rdweb && admin.rdweb !== '' && admin.rdweb !== '-'
    ).length;
    
    const websiteRosebrandCount = activeUsers.filter(admin => 
      admin.website_rosebrand && admin.website_rosebrand !== '' && admin.website_rosebrand !== '-'
    ).length;
    
    const sfaCount = activeUsers.filter(admin => 
      admin.sfa && admin.sfa !== '' && admin.sfa !== '-'
    ).length;
    
    const mobileSalesCount = activeUsers.filter(admin => 
      admin.mobile_sales && admin.mobile_sales !== '' && admin.mobile_sales !== '-'
    ).length;
    
    const applicationLoginCount = activeUsers.filter(admin => 
      admin.application_login && admin.application_login !== '' && admin.application_login !== '-'
    ).length;
    
    return {
      totalActive,
      rdWebCount,
      websiteRosebrandCount,
      sfaCount,
      mobileSalesCount,
      applicationLoginCount
    };
  }, [administrators, selectedCompany]);

  // Pagination logic
  const paginatedAdministrators = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAdministrators.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAdministrators, currentPage]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredAdministrators.length / itemsPerPage);

  // Page number buttons rendering
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= Math.min(totalPages, 20); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  // Resign handler
  const handleResign = (id: number) => {
    if (window.confirm('Are you sure you want to mark this administrator as resigned?')) {
      router.post(`/administrator-user-sb/${id}/resign`, {}, {
        preserveScroll: true,
        preserveState: true,
      });
    }
  };

  // Update delete status handler
  const handleUpdateDeleteStatus = (admin: Administrator) => {
    setSelectedAdmin(admin);
  };

  // Confirm delete status update
  const confirmDeleteStatusUpdate = () => {
    if (selectedAdmin) {
      router.post(`/administrator-user-sb/${selectedAdmin.id}/update-delete-status`, {
        delete_status: selectedAdmin.delete_status
      }, {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => {
          setSelectedAdmin(null);
        }
      });
    }
  };

  // Dashboard Stats Component
  const DashboardStats = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Data User SB</h2>
      
      <div className="flex flex-wrap -mx-2">
        {/* Total Active Users */}
        <div className="w-full px-2 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-black-800">Total Active Users</h3>
            <p className="text-3xl font-bold text-black-900">{dashboardStats.totalActive}</p>
          </div>
        </div>
        
        {/* Access Stats */}
        <div className="w-1/5 px-2">
          <div className="bg-green-100 p-4 rounded-lg shadow h-full">
            <h3 className="text-sm font-medium text-black-800">RD Web</h3>
            <p className="text-2xl font-bold text-black-900">{dashboardStats.rdWebCount}</p>
          </div>
        </div>
        
        <div className="w-1/5 px-2">
          <div className="bg-purple-100 p-4 rounded-lg shadow h-full">
            <h3 className="text-sm font-medium text-black-800">Website Rosebrand</h3>
            <p className="text-2xl font-bold text-black-900">{dashboardStats.websiteRosebrandCount}</p>
          </div>
        </div>
        
        <div className="w-1/5 px-2">
          <div className="bg-yellow-100 p-4 rounded-lg shadow h-full">
            <h3 className="text-sm font-medium text-black-800">SFA</h3>
            <p className="text-2xl font-bold text-black-900">{dashboardStats.sfaCount}</p>
          </div>
        </div>
        
        <div className="w-1/5 px-2">
          <div className="bg-red-100 p-4 rounded-lg shadow h-full">
            <h3 className="text-sm font-medium text-black-800">Mobile Sales</h3>
            <p className="text-2xl font-bold text-black-900">{dashboardStats.mobileSalesCount}</p>
          </div>
        </div>
        
        <div className="w-1/5 px-2">
          <div className="bg-indigo-100 p-4 rounded-lg shadow h-full">
            <h3 className="text-sm font-medium text-black-800">Application Login</h3>
            <p className="text-2xl font-bold text-black-900">{dashboardStats.applicationLoginCount}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render active users
  const renderActiveUsers = () => (
    <>
      <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-auto">
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
            {paginatedAdministrators.map((admin) => (
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
                    <a 
                      href={`/administrator-user-sb/${admin.id}/edit`} 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </a>
                    <button 
                      onClick={() => handleResign(admin.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Resign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end items-center space-x-2">
          {renderPageButtons()}
        </div>
      )}
    </>
  );

  // Render resigned users with delete status and action
  const renderResignedUsers = () => (
    <>
      <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-auto">
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
              <th className="py-3 px-6 text-left">Delete Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {paginatedAdministrators.map((admin) => (
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
                  {admin.delete_status || 'Not Set'}
                </td>
                <td className="py-3 px-6 text-left">
                  <button 
                    onClick={() => handleUpdateDeleteStatus(admin)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Status Update Modal */}
      {selectedAdmin && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          onClick={() => setSelectedAdmin(null)} // Close modal when clicking outside
        >
          <div 
            className="relative w-auto max-w-lg mx-auto my-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h2 className="text-xl font-semibold">Update Delete Status</h2>
                <button
                  className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                  onClick={() => setSelectedAdmin(null)}
                >
                  ×
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <div className="mb-4">
                  <label className="block mb-2">Delete Status for {selectedAdmin.nama}</label>
                  <select
                    value={selectedAdmin.delete_status || ''}
                    onChange={(e) => setSelectedAdmin({
                      ...selectedAdmin, 
                      delete_status: e.target.value as 'pending' | 'done'
                    })}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">pending</option>
                    <option value="done">done</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button 
                  onClick={() => setSelectedAdmin(null)}
                  className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteStatusUpdate}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end items-center space-x-2">
          {renderPageButtons()}
        </div>
      )}
    </>
  );

  return (
    <AppLayout>
      <Head title="Administrator User Management" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Dashboard Stats */}
          <DashboardStats />
          
          {/* Tabs */}
          <div className="mb-4">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 ${tab === 'active' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setTab('active')}
              >
                Active Users
              </button>
              <button
                className={`py-2 px-4 ${tab === 'resigned' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setTab('resigned')}
              >
                Resigned Users
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div>
              
              <select
                id="companyFilter"
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border rounded-md"
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-grow">
              
              <input 
                id="searchInput"
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full max-w-md px-3 py-2 border rounded-md"
              />
            </div>
            {/* Add New Administrator Button */}
              <div className="flex justify-end mb-4">
                <a
                 href="/administrator-user-sb/create"
                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                 >
              <span>Add New User</span>
              </a>
            </div>
          </div>
          
          {/* Render Active or Resigned Users based on tab */}
          {tab === 'active' ? renderActiveUsers() : renderResignedUsers()}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdministratorUserList;