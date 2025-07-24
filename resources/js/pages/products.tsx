import React from "react";
import HomePageHeader from "@/components/homepage-header";
import HomePageFooter from "@/components/homepage-footer";
import { Head } from '@inertiajs/react';

const products = [
  { code: "0", name: "TERPAL" },
  { code: "01", name: "TAPIOKA" },
  { code: "02", name: "MINYAK SAWIT" },
  { code: "03", name: "MINYAK KELAPA" },
  { code: "04", name: "ROKOK" },
  { code: "05", name: "CITRIC ACID KEMASAN" },
  { code: "06", name: "KARUNG PLASTIK" },
  { code: "07", name: "ACETYLENE" },
  { code: "08", name: "OXIGEN" },
  { code: "09", name: "SABUN CREAM" },
  { code: "10", name: "SABUN BATANG" },
  { code: "11", name: "TEPUNG BERAS" },
  { code: "12", name: "TEPUNG KETAN" },
  { code: "13", name: "ON. BIGTOX" },
  { code: "14", name: "ON. TOP JUMBO" },
  { code: "15", name: "BIHUN" },
  { code: "16", name: "BIJI BERAS" },
  { code: "17", name: "TERPAL" },
  { code: "18", name: "SABUN LOVE" },
  { code: "20", name: "KACANG TANAH" },
  { code: "21", name: "DRUM & DIRIGEN KOSONG" },
  { code: "26", name: "GLUKOSE" },
  { code: "27", name: "SULPHURIC ACID" },
  { code: "28", name: "SORBITOL" },
  { code: "29", name: "MSG KEMASAN" },
  { code: "30", name: "SODIUM CITRAT" },
  { code: "31", name: "MINYAK ROSE BRAND" },
  { code: "32", name: "FRUCTOSE" },
  { code: "33", name: "DECTROSE" },
  { code: "36", name: "BIHUN INSTAN" },
  { code: "37", name: "MALTODEXTRIN" },
  { code: "38", name: "KACANG KEDELAI" },
  { code: "39", name: "BIJI KETAN" },
  { code: "40", name: "TAPIOKA TANI GUNUNG" },
  { code: "41", name: "TAPIOKA KEMASAN" },
  { code: "42", name: "MINYAK GRG CAP TAWON" },
  { code: "43", name: "MARGARIN" },
  { code: "45", name: "AIR MINERAL" },
  { code: "46", name: "MIE TELOR" },
  { code: "47", name: "GULA KRISTAL" },
  { code: "48", name: "NATA DEL COCO" },
  { code: "49", name: "SANTAN INDUSTRI" },
  { code: "50", name: "KARUNG PLASTIK LOKAL" },
  { code: "56", name: "GULA TRADING" },
  { code: "57", name: "SHORTENING" },
  { code: "58", name: "SANTAN/COCONUT CREAM" },
  { code: "59", name: "COCONUT WATER" },
  { code: "60", name: "GULA KEMASAN" },
  { code: "61", name: "BAWANG PUTIH" },
  { code: "62", name: "MINYAK GORENG KITA" },
  { code: "63", name: "AIR MINERAL BW GALON" },
  { code: "64", name: "GULA HALUS" },
  { code: "66", name: "MANGKOK SABUN" },
  { code: "67", name: "MAIZENA DUS" },
  { code: "68", name: "MAIZENA ZAK" },
  { code: "69", name: "CITRIC ACID ZAK" },
  { code: "70", name: "MSG ZAK" },
  { code: "77", name: "BONUS PENJUALAN" },
  { code: "97", name: "SOKLIN" },
  { code: "98", name: "MANGKOK/PIRING" },
];

// Fungsi untuk mengatur urutan produk sesuai pola vertikal
const arrangeProducts = (products: { code: string; name: string }[]) => {
  const columns = 3;
  const rows = Math.ceil(products.length / columns);
  const arranged = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const index = i + j * rows;
      if (products[index]) arranged.push(products[index]);
    }
  }

  return arranged;
};

export default function ProductPage() {
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Head title="Products">
      <link rel="icon" type="image/png" href="/internalsupportsb/public/images/logo_internalsb.png" />
      </Head>
      <HomePageHeader />

      {/* Kontainer teks + gambar */}
      <div className="max-w-7xl mx-auto flex items-center gap-8 p-6">
        {/* Gambar */}
        <div className="w-1/3">
          <img
            src="/internalsupportsb/public/images/produk_rosebrand.jpg"
            alt="Produk Rose Brand"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Teks "Produk Kami" */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Produk Kami</h1>
          <p className="text-gray-600">
          Kami menyediakan berbagai produk berkualitas tinggi untuk memenuhi kebutuhan sehari-hari, mulai dari bahan baku makanan hingga produk olahan. Produk utama kami meliputi tepung beras, tepung ketan, dan minyak goreng, yang diproses dengan standar terbaik untuk memastikan kualitas, kebersihan, dan keamanan pangan. Dengan komitmen terhadap mutu, kami menghadirkan produk yang cocok untuk berbagai keperluan, baik untuk rumah tangga maupun industri kuliner.
          </p>
        </div>
      </div>

      {/* Daftar produk dengan urutan vertikal */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">
        {arrangeProducts(products).map((product) => (
          <div key={product.code} className="bg-white shadow-md rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
            <p className="text-gray-500">Kode Produk: {product.code}</p>
          </div>
        ))}
      </div>

      <HomePageFooter />
    </div>
  );
}
