import React, { useState, useMemo } from 'react';
import { Head, router, Link } from "@inertiajs/react";
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
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            currentPage === i 
              ? 'bg-gray-900 text-white' 
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
      router.post(route('job.administrator-user-sb.resign', id), {}, {
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
      router.post(route('job.administrator-user-sb.update-delete-status', selectedAdmin.id), {
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Data User SB</h2>
        <p className="text-gray-600 text-sm">System access statistics and user management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        {/* Total Active Users */}
        <div className="md:col-span-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Active Users</h3>
            <p className="text-4xl font-light text-gray-900">{dashboardStats.totalActive}</p>
          </div>
        </div>
        
        {/* Access Stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-2">RD Web</h3>
          <p className="text-2xl font-light text-gray-900">{dashboardStats.rdWebCount}</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Website Rosebrand</h3>
          <p className="text-2xl font-light text-gray-900">{dashboardStats.websiteRosebrandCount}</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-2">SFA</h3>
          <p className="text-2xl font-light text-gray-900">{dashboardStats.sfaCount}</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Mobile Sales</h3>
          <p className="text-2xl font-light text-gray-900">{dashboardStats.mobileSalesCount}</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Application Login</h3>
          <p className="text-2xl font-light text-gray-900">{dashboardStats.applicationLoginCount}</p>
        </div>
      </div>
    </div>
  );

  // Render active users
  const renderActiveUsers = () => (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Lokasi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Posisi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">RD Web</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Website RB</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">SFA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Mobile Sales</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">App Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAdministrators.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 text-xs text-gray-900">{admin.nama}</td>
                  <td className="px-4 py-3 text-xs text-gray-900">{admin.company}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.lokasi || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.posisi || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.rdweb || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.website_rosebrand || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.sfa || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.mobile_sales || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.application_login || '-'}</td>
                  <td className="px-4 py-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <Link 
                        href={route('job.administrator-user-sb.edit', admin.id)}
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleResign(admin.id)}
                        className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-1">
          {renderPageButtons()}
        </div>
      )}
    </>
  );

  // Render resigned users with delete status and action
  const renderResignedUsers = () => (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Lokasi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Posisi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">RD Web</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Website RB</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">SFA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Mobile Sales</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">App Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Delete Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAdministrators.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 text-xs text-gray-900">{admin.nama}</td>
                  <td className="px-4 py-3 text-xs text-gray-900">{admin.company}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.lokasi || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.posisi || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.rdweb || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.website_rosebrand || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.sfa || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.mobile_sales || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{admin.application_login || '-'}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      admin.delete_status === 'done' 
                        ? 'bg-gray-100 text-gray-800' 
                        : admin.delete_status === 'pending'
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gray-50 text-gray-500'
                    }`}>
                      {admin.delete_status || 'Not Set'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <button 
                      onClick={() => handleUpdateDeleteStatus(admin)}
                      className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Status Update Modal */}
      {selectedAdmin && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedAdmin(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900">Update Delete Status</h2>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedAdmin(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Delete Status for {selectedAdmin.nama}
                </label>
                <select
                  value={selectedAdmin.delete_status || ''}
                  onChange={(e) => setSelectedAdmin({
                    ...selectedAdmin, 
                    delete_status: e.target.value as 'pending' | 'done'
                  })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedAdmin(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteStatusUpdate}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-1">
          {renderPageButtons()}
        </div>
      )}
    </>
  );

  return (
    <AppLayout>
      <Head title="Administrator User Management" />
      
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
              Administrator User Management
            </h1>
            <p className="text-gray-600 text-sm">Manage system users and access permissions</p>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats />
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-gray-200 shadow-lg max-w-md mx-auto">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 ${
                    tab === 'active'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setTab('active')}
                >
                  Active Users ({dashboardStats.totalActive})
                </button>
                <button
                  className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 ${
                    tab === 'resigned'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setTab('resigned')}
                >
                  Resigned Users
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-shrink-0">
                  <select
                    value={selectedCompany}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                  >
                    {companies.map(company => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-grow max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                  />
                </div>
                
                <div className="flex-shrink-0">
                  <Link
                    href={route('job.administrator-user-sb.create')}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New User
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Render Active or Resigned Users based on tab */}
          {tab === 'active' ? renderActiveUsers() : renderResignedUsers()}
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

export default AdministratorUserList;