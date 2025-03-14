import React, { useState } from "react";
import { Link } from '@inertiajs/react';

const HomePageHeader: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link href={route('home')}>
      <img src="/images/logo_sungaibudi.png" alt="Sungai Budi Group" className="h-12 cursor-pointer" />
      </Link>
        <nav className="flex items-center space-x-8">
          <Link href={route('home')} className="cursor-pointer">
            Home
          </Link>

          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
              className="focus:outline-none cursor-pointer"
            >
              Profile
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-md py-1 border rounded-md">
                <Link href={route('company_profile.page')} className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Company Profile
                </Link>
                <Link href={route('it_division_profile.page')} className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Division Profile
                </Link>
              </div>
            )}
          </div>

          <Link href={route('products.page')} className="cursor-pointer">
            Products
          </Link>

          <Link href="/dashboard">
            <span className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Internal
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HomePageHeader;
