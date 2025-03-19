import React, { useState, useEffect } from 'react';
import { Head, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';

interface User {
  id: number;
  company: string;
  nama: string;
  lokasi: string | null;
  posisi: string | null;
  rdweb: string | null;
  website_rosebrand: string | null;
  sfa: string | null;
  mobile_sales: string | null;
  application_login: string | null;
  group_id: number | null;
  group_name: string | null;
  id_entry: string;
  created_at: string;
  updated_at: string | null;
}

interface ResignedUser {
  id: number;
  user_id: number;
  company: string;
  nama: string;
  lokasi: string | null;
  posisi: string | null;
  rdweb: string | null;
  website_rosebrand: string | null;
  sfa: string | null;
  mobile_sales: string | null;
  application_login: string | null;
  group_id: number | null;
  group_name: string | null;
  resigned_by: string;
  resigned_at: string;
  access_removal: {
    rdweb_removed: boolean;
    website_rosebrand_removed: boolean;
    sfa_removed: boolean;
    mobile_sales_removed: boolean;
    application_login_removed: boolean;
    removed_by: string | null;
    removed_at: string | null;
  };
}

interface Group {
  id: number;
  name: string;
}

const AdministratorUserSb: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [resignedUsers, setResignedUsers] = useState<ResignedUser[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showResignModal, setShowResignModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tab, setTab] = useState<'active' | 'resigned'>('active');
  const [accessRemovalUpdates, setAccessRemovalUpdates] = useState<{[key: number]: {[key: string]: boolean}}>({});

  const { data, setData, post, processing, errors, reset } = useForm({
    id: 0,
    company: '',
    nama: '',
    lokasi: '',
    posisi: '',
    rdweb: '',
    website_rosebrand: '',
    sfa: '',
    mobile_sales: '',
    application_login: '',
    group_id: '',
    group_name: '',
    id_entry: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchResignedUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/administrator-users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const fetchResignedUsers = async () => {
    try {
      const response = await axios.get('/api/administrator-resigned-users');
      setResignedUsers(response.data);
    } catch (error) {
      console.error('Error fetching resigned users:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/administrator-groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleAddUser = () => {
    reset();
    setShowAddModal(true);
  };

  const handleUpdateUser = (user: User) => {
    setCurrentUser(user);
    setData({
      id: user.id,
      company: user.company,
      nama: user.nama,
      lokasi: user.lokasi || '',
      posisi: user.posisi || '',
      rdweb: user.rdweb || '',
      website_rosebrand: user.website_rosebrand || '',
      sfa: user.sfa || '',
      mobile_sales: user.mobile_sales || '',
      application_login: user.application_login || '',
      group_id: user.group_id?.toString() || '',
      group_name: user.group_name || '',
      id_entry: user.id_entry,
    });
    setShowUpdateModal(true);
  };

  const handleResignUser = (user: User) => {
    setCurrentUser(user);
    setShowResignModal(true);
  };

  const submitAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post('/api/administrator-users', {
        onSuccess: () => {
          setShowAddModal(false);
          fetchUsers();
          reset();
        },
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const submitUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/administrator-users/${data.id}`, data);
      setShowUpdateModal(false);
      fetchUsers();
      reset();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const submitResignUser = async () => {
    if (!currentUser) return;
    
    try {
      await axios.post(`/api/administrator-users/${currentUser.id}/resign`);
      setShowResignModal(false);
      fetchUsers();
      fetchResignedUsers();
    } catch (error) {
      console.error('Error resigning user:', error);
    }
  };

  const handleAccessRemovalChange = (userId: number, accessType: string, checked: boolean) => {
    setAccessRemovalUpdates(prev => {
      const userUpdates = prev[userId] || {};
      return {
        ...prev,
        [userId]: {
          ...userUpdates,
          [accessType]: checked
        }
      };
    });
  };

  const updateAccessRemoval = async (userId: number) => {
    try {
      await axios.post(`/api/administrator-resigned-users/${userId}/update-access-removal`, {
        accessUpdates: accessRemovalUpdates[userId]
      });
      fetchResignedUsers();
      setAccessRemovalUpdates(prev => {
        const newUpdates = {...prev};
        delete newUpdates[userId];
        return newUpdates;
      });
    } catch (error) {
      console.error('Error updating access removal status:', error);
    }
  };

  return (
    <AppLayout>
      <Head title="Administrator User Management" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Administrator User Management</h1>
        
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
        
        {/* Active Users Tab */}
        {tab === 'active' && (
          <div>
            <div className="mb-4">
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add User
              </button>
            </div>
            
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">No ID</th>
                      <th className="border px-4 py-2">Company</th>
                      <th className="border px-4 py-2">Nama</th>
                      <th className="border px-4 py-2">Lokasi</th>
                      <th className="border px-4 py-2">Posisi</th>
                      <th className="border px-4 py-2">RDWeb</th>
                      <th className="border px-4 py-2">Website Rosebrand</th>
                      <th className="border px-4 py-2">SFA</th>
                      <th className="border px-4 py-2">Mobile Sales</th>
                      <th className="border px-4 py-2">Application Login</th>
                      <th className="border px-4 py-2">Group</th>
                      <th className="border px-4 py-2">ID Entry</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{user.id}</td>
                        <td className="border px-4 py-2">{user.company}</td>
                        <td className="border px-4 py-2">{user.nama}</td>
                        <td className="border px-4 py-2">{user.lokasi || '-'}</td>
                        <td className="border px-4 py-2">{user.posisi || '-'}</td>
                        <td className="border px-4 py-2">{user.rdweb || '-'}</td>
                        <td className="border px-4 py-2">{user.website_rosebrand || '-'}</td>
                        <td className="border px-4 py-2">{user.sfa || '-'}</td>
                        <td className="border px-4 py-2">{user.mobile_sales || '-'}</td>
                        <td className="border px-4 py-2">{user.application_login || '-'}</td>
                        <td className="border px-4 py-2">{user.group_name || '-'}</td>
                        <td className="border px-4 py-2">{user.id_entry}</td>
                        <td className="border px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateUser(user)}
                              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleResignUser(user)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
            )}
          </div>
        )}
        
        {/* Resigned Users Tab */}
        {tab === 'resigned' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No ID</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Nama</th>
                  <th className="border px-4 py-2">Lokasi</th>
                  <th className="border px-4 py-2">Posisi</th>
                  <th className="border px-4 py-2 bg-red-100">RDWeb</th>
                  <th className="border px-4 py-2 bg-red-100">Website Rosebrand</th>
                  <th className="border px-4 py-2 bg-red-100">SFA</th>
                  <th className="border px-4 py-2 bg-red-100">Mobile Sales</th>
                  <th className="border px-4 py-2 bg-red-100">Application Login</th>
                  <th className="border px-4 py-2">Resigned By</th>
                  <th className="border px-4 py-2">Resigned At</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resignedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.user_id}</td>
                    <td className="border px-4 py-2">{user.company}</td>
                    <td className="border px-4 py-2">{user.nama}</td>
                    <td className="border px-4 py-2">{user.lokasi || '-'}</td>
                    <td className="border px-4 py-2">{user.posisi || '-'}</td>
                    <td className="border px-4 py-2 bg-red-50">
                      {user.rdweb && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={user.access_removal.rdweb_removed || (accessRemovalUpdates[user.id]?.rdweb_removed ?? false)}
                            onChange={(e) => handleAccessRemovalChange(user.id, 'rdweb_removed', e.target.checked)}
                            disabled={user.access_removal.rdweb_removed}
                            className="mr-2"
                          />
                          <span className={user.access_removal.rdweb_removed ? 'line-through text-gray-500' : ''}>
                            {user.rdweb}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 bg-red-50">
                      {user.website_rosebrand && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={user.access_removal.website_rosebrand_removed || (accessRemovalUpdates[user.id]?.website_rosebrand_removed ?? false)}
                            onChange={(e) => handleAccessRemovalChange(user.id, 'website_rosebrand_removed', e.target.checked)}
                            disabled={user.access_removal.website_rosebrand_removed}
                            className="mr-2"
                          />
                          <span className={user.access_removal.website_rosebrand_removed ? 'line-through text-gray-500' : ''}>
                            {user.website_rosebrand}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 bg-red-50">
                      {user.sfa && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={user.access_removal.sfa_removed || (accessRemovalUpdates[user.id]?.sfa_removed ?? false)}
                            onChange={(e) => handleAccessRemovalChange(user.id, 'sfa_removed', e.target.checked)}
                            disabled={user.access_removal.sfa_removed}
                            className="mr-2"
                          />
                          <span className={user.access_removal.sfa_removed ? 'line-through text-gray-500' : ''}>
                            {user.sfa}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 bg-red-50">
                      {user.mobile_sales && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={user.access_removal.mobile_sales_removed || (accessRemovalUpdates[user.id]?.mobile_sales_removed ?? false)}
                            onChange={(e) => handleAccessRemovalChange(user.id, 'mobile_sales_removed', e.target.checked)}
                            disabled={user.access_removal.mobile_sales_removed}
                            className="mr-2"
                          />
                          <span className={user.access_removal.mobile_sales_removed ? 'line-through text-gray-500' : ''}>
                            {user.mobile_sales}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 bg-red-50">
                      {user.application_login && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={user.access_removal.application_login_removed || (accessRemovalUpdates[user.id]?.application_login_removed ?? false)}
                            onChange={(e) => handleAccessRemovalChange(user.id, 'application_login_removed', e.target.checked)}
                            disabled={user.access_removal.application_login_removed}
                            className="mr-2"
                          />
                          <span className={user.access_removal.application_login_removed ? 'line-through text-gray-500' : ''}>
                            {user.application_login}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2">{user.resigned_by}</td>
                    <td className="border px-4 py-2">{new Date(user.resigned_at).toLocaleString()}</td>
                    <td className="border px-4 py-2">
                      {accessRemovalUpdates[user.id] && Object.keys(accessRemovalUpdates[user.id]).length > 0 && (
                        <button
                          onClick={() => updateAccessRemoval(user.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Update
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={submitAddUser}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block mb-1">Company*</label>
                    <input
                      type="text"
                      value={data.company}
                      onChange={(e) => setData('company', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    {errors.company && <div className="text-red-500 text-sm">{errors.company}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Nama*</label>
                    <input
                      type="text"
                      value={data.nama}
                      onChange={(e) => setData('nama', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    {errors.nama && <div className="text-red-500 text-sm">{errors.nama}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Lokasi</label>
                    <input
                      type="text"
                      value={data.lokasi}
                      onChange={(e) => setData('lokasi', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Posisi</label>
                    <input
                      type="text"
                      value={data.posisi}
                      onChange={(e) => setData('posisi', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">RDWeb</label>
                    <input
                      type="text"
                      value={data.rdweb}
                      onChange={(e) => setData('rdweb', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="example@sungaibudi.local"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Website Rosebrand</label>
                    <input
                      type="text"
                      value={data.website_rosebrand}
                      onChange={(e) => setData('website_rosebrand', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="example@sungaibudi.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">SFA</label>
                    <input
                      type="text"
                      value={data.sfa}
                      onChange={(e) => setData('sfa', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="UPBDS05"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Mobile Sales</label>
                    <input
                      type="text"
                      value={data.mobile_sales}
                      onChange={(e) => setData('mobile_sales', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="UPBDS05"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Application Login</label>
                    <input
                      type="text"
                      value={data.application_login}
                      onChange={(e) => setData('application_login', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="dayatbd"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Group</label>
                    <select
                      value={data.group_id}
                      onChange={(e) => {
                        setData('group_id', e.target.value);
                        const selectedGroup = groups.find(g => g.id.toString() === e.target.value);
                        setData('group_name', selectedGroup ? selectedGroup.name : '');
                      }}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.id} - {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    {processing ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Update User Modal */}
        {showUpdateModal && currentUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Update User: {currentUser.nama}</h2>
              <form onSubmit={submitUpdateUser}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block mb-1">Company*</label>
                    <input
                      type="text"
                      value={data.company}
                      onChange={(e) => setData('company', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Nama*</label>
                    <input
                      type="text"
                      value={data.nama}
                      onChange={(e) => setData('nama', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Lokasi</label>
                    <input
                      type="text"
                      value={data.lokasi}
                      onChange={(e) => setData('lokasi', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Posisi</label>
                    <input
                      type="text"
                      value={data.posisi}
                      onChange={(e) => setData('posisi', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">RDWeb</label>
                    <input
                      type="text"
                      value={data.rdweb}
                      onChange={(e) => setData('rdweb', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Website Rosebrand</label>
                    <input
                      type="text"
                      value={data.website_rosebrand}
                      onChange={(e) => setData('website_rosebrand', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">SFA</label>
                    <input
                      type="text"
                      value={data.sfa}
                      onChange={(e) => setData('sfa', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Mobile Sales</label>
                    <input
                      type="text"
                      value={data.mobile_sales}
                      onChange={(e) => setData('mobile_sales', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Application Login</label>
                    <input
                      type="text"
                      value={data.application_login}
                      onChange={(e) => setData('application_login', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Group</label>
                    <select
                      value={data.group_id}
                      onChange={(e) => {
                        setData('group_id', e.target.value);
                        const selectedGroup = groups.find(g => g.id.toString() === e.target.value);
                        setData('group_name', selectedGroup ? selectedGroup.name : '');
                      }}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.id} - {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    {processing ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Resign User Modal */}
        {showResignModal && currentUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Resign User</h2>
              <p className="mb-4">
                Are you sure you want to mark <span className="font-bold">{currentUser.nama}</span> as resigned?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowResignModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitResignUser}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Resign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AdministratorUserSb;