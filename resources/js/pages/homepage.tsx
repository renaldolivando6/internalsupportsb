import React, { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';
import HomePageHeader from "@/components/homepage-header";
import HomePageFooter from "@/components/homepage-footer";
import { Head } from '@inertiajs/react';

const Homepage: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const recipes = [
    "/images/resep_rosebrand_1.jpg",
    "/images/resep_rosebrand_2.jpg",
    "/images/resep_rosebrand_3.jpg",
    "/images/resep_rosebrand_4.jpg",
    "/images/resep_rosebrand_5.jpg",
    "/images/resep_rosebrand_6.jpg",
    "/images/resep_rosebrand_7.jpg",
    "/images/resep_rosebrand_8.jpg",
    "/images/resep_rosebrand_9.jpg",
    "/images/resep_rosebrand_10.jpg",
    "/images/resep_rosebrand_11.jpg",
    "/images/resep_rosebrand_12.jpg",
  ];

  const testimonials = [
    {
      image: "/images/testi_rosebrand_1.jpg",
      name: "Mas Zaing, 20th",
      job: "Pedagang Cakwe",
      comment:
        "Minyak goreng Rose Brand memiliki aroma sedap dan tidak menyengat. Terima Kasih ROSE BRAND!",
    },
    {
      image: "/images/testi_rosebrand_2.jpg",
      name: "Yanti, 41th",
      job: "Pedagang Sop Duren",
      comment:
        "Produk ROSE BRAND berkualitas, membantu ibu rumah tangga mencari nafkah. Terima Kasih ROSE BRAND!",
    },
    {
      image: "/images/testi_rosebrand_3.jpg",
      name: "Pak Narto, 45th",
      job: "Pedagang Kue Rangi",
      comment: "Dari awal dagang, selalu pakai Tepung Beras ROSE BRAND. Andalan terpercaya!",
    },
    {
      image: "/images/testi_rosebrand_4.jpg",
      name: "Pak Sukarjo, 48th",
      job: "Pedagang Martabak",
      comment: "Paling favorit kalau goreng martabak telur pakai Minyak Goreng ROSE BRAND!",
    },
  ];

  const totalSlides = Math.ceil(recipes.length / 4) - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= totalSlides ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= totalSlides ? 0 : prev - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? totalSlides : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <Head title="Home">
      <link rel="icon" type="image/png" href="/images/logo_internalsb.png" />
      </Head>
      {/* Header */}
      <HomePageHeader/>

      {/* Hero Section */}
      <section className="pt-20">
        <img src="/images/homepage.jpg" alt="Homepage Banner" className="w-full h-auto" />
      </section>

      {/* Resep Rosebrand */}
      <section className="py-12 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Resep Praktis Rosebrand</h2>
        <div className="relative overflow-hidden max-w-8xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {recipes.map((src, index) => (
              <div key={index} className="w-1/4 flex-shrink-0 px-2">
                <img src={src} className="w-full h-auto rounded-xl shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indikator Tambahan */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kenapa Memilih Kami?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-4xl font-bold text-red-600">37.000+</p>
            <p className="text-gray-700">Loyal Customer</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-4xl font-bold text-red-600">70+</p>
            <p className="text-gray-700">Kota di Indonesia</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-4xl font-bold text-red-600">50+</p>
            <p className="text-gray-700">Produk Tersedia</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-4xl font-bold text-red-600">50 Tahun+</p>
            <p className="text-gray-700">Pengalaman</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Apa Kata Mereka?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testi, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <img src={testi.image} className="w-full h-auto rounded-md mb-4" />
              <p className="text-gray-700 italic">"{testi.comment}"</p>
              <p className="mt-2 font-semibold text-gray-900">{testi.name}</p>
              <p className="text-gray-600 text-sm">{testi.job}</p>
            </div>
          ))}
        </div>
      </section>



      <HomePageFooter/>
      </div>
  );

  
};

export default Homepage;
