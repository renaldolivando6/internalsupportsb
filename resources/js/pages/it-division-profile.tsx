import React from "react";
import { Link } from "@inertiajs/react";
import HomePageHeader from "@/components/homepage-header";
import HomePageFooter from "@/components/homepage-footer";
import { Head } from '@inertiajs/react';

const itSupportTeam = [
  { name: "Darwin", image: "/internalsupportsb/public/images/itdivision/darwin.jpg", ext: "1111" },
  { name: "Tj", image: "/internalsupportsb/public/images/itdivision/tj.jpg", ext: "1111" },
  { name: "Gersang", image: "/internalsupportsb/public/images/itdivision/gersang.jpg", ext: "1111" },
  { name: "Nathan", image: "/internalsupportsb/public/images/itdivision/nathan.jpg", ext: "1111" },
  { name: "Rere", image: "/internalsupportsb/public/images/itdivision/rere.jpg", ext: "1111" },
  { name: "Marco", image: "/internalsupportsb/public/images/itdivision/marco.jpg", ext: "1111" },
  { name: "JTK", image: "/internalsupportsb/public/images/itdivision/jtk.jpg", ext: "1111" },
  { name: "Edison", image: "/internalsupportsb/public/images/itdivision/edison.jpg", ext: "1111" },
  { name: "Zulvri", image: "/internalsupportsb/public/images/itdivision/zulvri.jpg", ext: "1111" },
];

export default function ITDivisionProfile() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head title="Division Profile">
      <link rel="icon" type="image/png" href="/internalsupportsb/public/images/logo_internalsb.png" />
      </Head>
      <HomePageHeader />
      
      {/* Banner */}
      <div className="w-full max-w-7xl mx-auto mt-4">
        <img
          src="/internalsupportsb/public/images/itdivision/it_division.jpg"
          alt="IT Division Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 flex gap-8">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Divisi IT</h1>
          <p className="text-gray-600 leading-relaxed">
            Divisi IT berperan sebagai tulang punggung teknologi dalam organisasi kami. Dengan fokus pada inovasi,
            efisiensi, dan keamanan sistem, kami memastikan bahwa setiap proses digital berjalan lancar dan optimal.
            Dari pengembangan perangkat lunak, manajemen infrastruktur, hingga perlindungan data, tim kami berkomitmen
            untuk menghadirkan solusi teknologi terbaik yang mendukung pertumbuhan dan keberlanjutan bisnis.
          </p>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Divisi Kami</h2>
          <ul className="text-gray-600 space-y-2">
            <li>1. Infrastructure and Network</li>
            <li>2. Support</li>
            <li>3. Website Developer</li>
            <li>4. Application and Database Developer</li>
            <li>5. Android Developer</li>
          </ul>
        </div>
      </div>

      {/* Manager Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-800">Our Manager</h2>
        <div className="flex flex-col items-center mt-6">
          <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src="/internalsupportsb/public/images/itdivision/manager.jpg"
              alt="Gunawan Tjen"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-2xl font-semibold text-gray-700 mt-4">Gunawan Tjen</p>
        </div>
      </div>

      {/* IT Support Team Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-800">Need Assistance? </h2>
        <h3 className="text-l text-gray-600">Call us IT Support Team or Email at it.support@sungaibudi.com</h3>
        <div className="grid grid-cols-3 gap-8 mt-6 max-w-5xl mx-auto">
          {itSupportTeam.map((member, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-lg font-medium text-gray-700">{member.name}</p>
                <p className="text-sm text-gray-500">Ext: {member.ext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HomePageFooter />
    </div>
  );
}