import React from "react";
import HomePageHeader from "@/components/homepage-header";
import HomePageFooter from "@/components/homepage-footer";
import { Head } from '@inertiajs/react';

const CompanyProfile: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head title="Company Profile">
      <link rel="icon" type="image/png" href="/images/logo_internalsb.png" />
      </Head>
      <HomePageHeader />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-24">
        <div className="flex items-start gap-6">
          <img
            src="/images/wisma_budi.png"
            alt="Wisma Budi"
            className="w-[500px] h-[300px] object-cover rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Sungai Budi Group</h1>
            <p className="text-gray-700 mb-4">
              Sungai Budi Group adalah perusahaan agribisnis terkemuka di Indonesia yang didirikan pada tahun 1947 di Lampung. Perusahaan ini telah berkembang menjadi produsen dan distributor utama berbagai produk pertanian seperti tepung tapioka, minyak goreng, dan gula.
            </p>
            <p className="text-gray-700 mb-4">
              Salah satu anak perusahaannya, PT Budi Starch & Sweetener Tbk, merupakan produsen tepung tapioka terbesar di Indonesia dengan sistem produksi yang terintegrasi. Selain itu, PT Tunas Baru Lampung Tbk telah menjadi pemain utama dalam produksi minyak goreng nabati.
            </p>
            <p className="text-gray-700 mb-4">
              Produk dari Sungai Budi Group dipasarkan dengan merek "Rose Brand", yang telah dikenal luas oleh masyarakat Indonesia. Produk-produk ini mencakup minyak goreng, tepung tapioka, serta gula yang digunakan di berbagai sektor industri dan rumah tangga.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-700 mb-4">
            Selain agribisnis, grup ini juga beroperasi di sektor manufaktur, properti, perhotelan, energi, dan pertambangan. Dengan portofolio bisnis yang luas, perusahaan ini terus berinovasi untuk menciptakan nilai tambah dalam berbagai industri.
          </p>
          <p className="text-gray-700 mb-4">
            Berkantor pusat di Wisma Budi, Jakarta, Sungai Budi Group mengelola bisnisnya dengan strategi yang efektif dan menjalin kerja sama dengan berbagai mitra strategis untuk memperluas jangkauan pasar.
          </p>
          <p className="text-gray-700 mb-4">
            Saat ini, perusahaan mempekerjakan lebih dari 65.000 karyawan dan terus membuka peluang bagi tenaga kerja profesional. Keberadaan tenaga kerja yang kompeten menjadi kunci dalam keberhasilan bisnis perusahaan.
          </p>
          <p className="text-gray-700 mb-4">
            Komitmen terhadap lingkungan juga menjadi perhatian utama. Sungai Budi Group mengelola limbah produksinya dengan mengubahnya menjadi energi listrik dan pupuk organik untuk mendukung keberlanjutan industri.
          </p>
          <p className="text-gray-700 mb-4">
            Perusahaan terus berinvestasi dalam teknologi dan memperluas jaringan distribusi agar dapat menjangkau lebih banyak konsumen, baik di dalam negeri maupun di pasar internasional.
          </p>
          <p className="text-gray-700">
            Dengan pengalaman panjang dan inovasi yang terus dilakukan, Sungai Budi Group terus berkontribusi dalam pertumbuhan ekonomi nasional dan memenuhi kebutuhan masyarakat Indonesia melalui berbagai produk unggulannya.
          </p>
        </div>
      </div>
      <HomePageFooter/>
    </div>
  );
};

export default CompanyProfile;
