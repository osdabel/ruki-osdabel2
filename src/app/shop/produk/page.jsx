"use client";
import { useState } from "react";

export default function ProductPage() {
  const packages = [
    {
      id: "basic",
      name: "Paket Basic",
      price: "25.000",
      desc: "Cocok untuk kebutuhan standar. Termasuk 1 item produk OSDABEL dengan kualitas terbaik.",
    },
    {
      id: "plus",
      name: "Paket Plus",
      price: "35.000",
      desc: "Pilihan paling favorit! Termasuk 1 produk premium + bonus stiker eksklusif.",
    },
    {
      id: "pro",
      name: "Paket Pro",
      price: "45.000",
      desc: "Paket lengkap. Termasuk produk premium + bonus eksklusif + packaging spesial.",
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);

  return (
    <section className="w-screen min-h-screen bg-white pb-28">

      {/* FLOATING CART */}
      <div className="
        fixed top-4 right-4 z-50
        bg-white/40 backdrop-blur-md
        border border-pink-300/40 shadow-md
        rounded-xl p-2
        flex items-center justify-center
      ">
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-pink-600"
          fill="none" strokeWidth="1.8">
          <path d="M6 6h15l-1.5 9h-13z" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="w-full aspect-square bg-gray-200">
        <img src="/product.jpg" alt="product" className="w-full h-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="px-4 py-4">

        {/* Title */}
        <h1 className="
          text-[22px] font-bold 
          bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600
          bg-clip-text text-transparent
        ">
          Nama Produk OSDABEL Keren Banget
        </h1>

        {/* Price */}
        <p className="text-pink-600 text-2xl font-extrabold mt-2">
          Rp {selectedPackage.price}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          180+ Pre Order • ⭐ Best Selling
        </p>

        {/* Description */}
        <div className="mt-4">
          <h2 className="font-semibold text-gray-700 mb-1">Deskripsi Produk</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Produk premium dari Osdabel dengan kualitas terbaik, desain modern,
            dan cocok untuk berbagai keperluan siswa.
          </p>
        </div>

        {/* Package Selector */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Pilih Paket</h3>

          <div className="grid grid-cols-3 gap-2">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`
                  border rounded-xl p-3 text-xs text-center font-medium
                  transition-all duration-200
                  ${
                    selectedPackage.id === pkg.id
                      ? "border-pink-500 text-pink-600 bg-pink-50 shadow"
                      : "border-gray-300 text-gray-500 bg-white hover:border-pink-400"
                  }
                `}
              >
                {pkg.name}
                <p className="text-[10px] text-gray-400">Rp {pkg.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* PACKAGE DETAIL */}
        <div className="mt-4 p-3 bg-pink-50 rounded-xl border border-pink-200 shadow-sm">
          <h4 className="text-sm font-semibold text-pink-600">Detail Paket</h4>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">
            {selectedPackage.desc}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-3">

          {/* Add to Cart */}
          <button className="
            flex-1 py-3 rounded-xl
            bg-white border border-pink-400
            text-pink-600 font-semibold
            shadow-sm active:scale-[0.98]
            transition-all
          ">
            Masukkan Keranjang
          </button>

          {/* Buy Now */}
          <button className="
            flex-1 py-3 rounded-xl
            bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600
            text-white font-semibold shadow-md
            active:scale-[0.98] transition-all
          ">
            Beli Sekarang
          </button>

        </div>

      </div>
    </section>
  );
}
