import React, { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';
import HomePageHeader from "@/components/homepage-header";
import HomePageFooter from "@/components/homepage-footer";
import { Head } from '@inertiajs/react';

const Homepage: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Updated image paths
  const recipes = [
    "/internalsupportsb/public/images/resep_rosebrand_1.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_2.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_3.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_4.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_5.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_6.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_7.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_8.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_9.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_10.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_11.jpg",
    "/internalsupportsb/public/images/resep_rosebrand_12.jpg",
  ];

  const testimonials = [
    {
      image: "/internalsupportsb/public/images/testi_rosebrand_1.jpg",
      name: "Mas Zaing",
      age: "20th",
      job: "Pedagang Cakwe",
      comment: "Minyak goreng Rose Brand memiliki aroma sedap dan tidak menyengat. Terima Kasih ROSE BRAND!",
      rating: 5,
    },
    {
      image: "/internalsupportsb/public/images/testi_rosebrand_2.jpg",
      name: "Yanti",
      age: "41th",
      job: "Pedagang Sop Duren",
      comment: "Produk ROSE BRAND berkualitas, membantu ibu rumah tangga mencari nafkah. Terima Kasih ROSE BRAND!",
      rating: 5,
    },
    {
      image: "/internalsupportsb/public/images/testi_rosebrand_3.jpg",
      name: "Pak Narto",
      age: "45th",
      job: "Pedagang Kue Rangi",
      comment: "Dari awal dagang, selalu pakai Tepung Beras ROSE BRAND. Andalan terpercaya!",
      rating: 5,
    },
    {
      image: "/internalsupportsb/public/images/testi_rosebrand_4.jpg",
      name: "Pak Sukarjo",
      age: "48th",
      job: "Pedagang Martabak",
      comment: "Paling favorit kalau goreng martabak telur pakai Minyak Goreng ROSE BRAND!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "37.000+", label: "Loyal Customer", icon: "👥" },
    { number: "70+", label: "Kota di Indonesia", icon: "🏙️" },
    { number: "50+", label: "Produk Tersedia", icon: "📦" },
    { number: "50 Tahun+", label: "Pengalaman", icon: "⭐" },
  ];

  const totalSlides = Math.ceil(recipes.length / 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Head title="Home - Rose Brand">
        <link rel="icon" type="image/png" href="/internalsupportsb/public/images/logo_internalsb.png" />
        <meta name="description" content="Rose Brand - Produk berkualitas untuk kebutuhan dapur Anda" />
      </Head>

      {/* Header */}
      <HomePageHeader />

      {/* Hero Section - Modern Design */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-500/10"></div>
        <div className="relative">
          <img 
            src="/internalsupportsb/public/images/homepage.jpg" 
            alt="Rose Brand - Produk Berkualitas" 
            className="w-full h-auto object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Rose Brand
              </h1>
              <p className="text-lg md:text-xl mb-6 drop-shadow">
                Kualitas Terpercaya untuk Keluarga Indonesia
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Jelajahi Produk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Section - Enhanced */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Resep Praktis Rosebrand
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan inspirasi masakan sehari-hari dengan produk Rose Brand berkualitas
            </p>
          </div>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Previous recipes"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Next recipes"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Recipe Slider */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
                    {recipes.slice(slideIndex * 4, (slideIndex + 1) * 4).map((src, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                          <img 
                            src={src} 
                            alt={`Resep Rose Brand ${slideIndex * 4 + index + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="font-semibold">Resep #{slideIndex * 4 + index + 1}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-red-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Cards */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kenapa Memilih Kami?
            </h2>
            <p className="text-gray-600 text-lg">
              Dipercaya ribuan keluarga Indonesia selama puluhan tahun
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
                  <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-700 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Enhanced Design */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-gray-600 text-lg">
              Testimoni nyata dari pelanggan setia Rose Brand
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testi, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                  <div className="relative mb-6">
                    <img 
                      src={testi.image} 
                      alt={`Testimoni ${testi.name}`}
                      className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" 
                      loading="lazy"
                    />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      {renderStars(testi.rating)}
                    </div>
                    
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      "{testi.comment}"
                    </p>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-bold text-gray-900 text-lg">
                        {testi.name}
                      </p>
                      <p className="text-red-600 font-medium">
                        {testi.job}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testi.age}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Bergabung dengan Keluarga Rose Brand?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dapatkan produk berkualitas untuk kebutuhan dapur Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Lihat Produk
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      <HomePageFooter />
    </div>
  );
};

export default Homepage;