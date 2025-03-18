import React, { useState } from 'react';
import { Head, Link } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

// Define proper TypeScript interfaces
interface SubItem {
  name: string;
  route: string;
}

interface MenuItem {
  id: number;
  title: string;
  icon: string;
  route?: string;
  subItems?: SubItem[];
}

const CopPage: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  const toggleDropdown = (index: number): void => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Overzak Gagal",
      icon: "flag",
      subItems: [
        { name: "script JT", route: "open-flag.ps" },
        { name: "script Rere", route: "open-flag.tf" }
      ]
    },
    { id: 2, title: "Copy Item Master", route: "update-f8", icon: "refresh" },
    { id: 3, title: "Unpost IM", route: "unpost-cop", icon: "x-circle" },
    { id: 4, title: "BK Minus", route: "change-order-date", icon: "calendar" }
  ];
  
  // Helper function to render appropriate icon with proper typing
  const renderIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'flag':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        );
      case 'refresh':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'x-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Type definition for route function
  const route = (name: string, params: Record<string, any> = {}): string => {
    // This is a placeholder - replace with your actual route function
    return `/${name.replace('.', '/')}`;
  };

  return (
    <AppLayout>
      <Head title="IM Navigation" />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">IM Navigation</h1>
            <p className="text-gray-600 mb-8">Select a destination to continue</p>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {menuItems.map((item, index) => (
                  <li key={item.id} className="relative">
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {renderIcon(item.icon)}
                            </div>
                            <span className="font-medium text-gray-800">{item.title}</span>
                          </div>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 text-gray-400 transition-transform ${activeDropdown === index ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {activeDropdown === index && (
                          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                            <ul className="space-y-2">
                              {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link 
                                    href={route(subItem.route)}
                                    className="flex items-center pl-12 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  >
                                    <span className="text-sm">{subItem.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.route ? route(item.route) : '#'}
                        className="flex items-center p-5 transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          {renderIcon(item.icon)}
                        </div>
                        <span className="font-medium text-gray-800">{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CopPage;