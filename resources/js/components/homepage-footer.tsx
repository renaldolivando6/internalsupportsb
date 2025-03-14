import React from "react";
import { Link } from '@inertiajs/react';

const HomePageFooter: React.FC = () => {
    return (
<footer className="bg-gray-700 text-white py-5 mt-10">
<div className="container mx-auto px-4 grid grid-cols-3 gap-8 text-left">
  {/* Quick Links */}
  <div>
  <h3 className="text-lg font-semibold text-red-400 mb-2">Company</h3>
  <ul className="space-y-2">
    <li>
      <Link href={route('home')} className="underline cursor-pointer">
        Home
      </Link>
    </li>
    <li>
      <Link href={route('company_profile.page')} className="underline cursor-pointer">
        Profile
      </Link>
    </li>
    <li>
      <Link href={route('products.page')} className="underline cursor-pointer">
        Products
      </Link>
    </li>
    <li>
      <Link href="/dashboard" className="underline cursor-pointer">
        Internal
      </Link>
    </li>
  </ul>
</div>

  {/* Contact Information */}
  <div>
    <h3 className="text-lg font-semibold text-red-400 mb-2">Office Headquarters</h3>
    <p className="mb-1">Wisma Budi 8th & 9th</p>
    <p className="mb-1">Jl. H.R. Rasuna Said</p>
    <p className="mb-1">Jakarta, Indonesia</p>
    
  </div>

  {/* Get in Touch */}
  <div>
    <h3 className="text-lg font-semibold text-red-400 mb-2">Contact Us</h3>
    <p className="mb-1">Email: info@rosebrand.co.id</p>
    <p className="mb-1">WhatsApp: +628001836678</p>
    <p className="mb-1">Telephone: +6281278678678</p>
    
  </div>
</div>

{/* Copyright */}
<div className="text-center text-sm text-gray-400 mt-8">
  <p>&copy; 2025 Sungai Budi Group</p>
  <p className="underline cursor-pointer">Privacy Policy</p>
</div>
</footer>
  );
};

export default HomePageFooter;