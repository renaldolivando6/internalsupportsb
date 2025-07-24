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
    
    { id: 1, title: "User Internal Support", route: "update-f8", icon: "flag" },
    { id: 2, title: "Database User SB", route: "internalsupportsb/public/administrator-user-sb", icon: "flag" },
  ];
  
  // Helper function to render appropriate icon with proper typing
  const renderIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'flag':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 20v-1a7 7 0 0114 0v1M12 12a5 5 0 100-10 5 5 0 000 10z" />
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
      <Head title="Administrator" />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Administrator Menu</h1>
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