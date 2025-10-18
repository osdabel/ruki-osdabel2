"use client";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const data = {
    "Matematika (Wajib)": {
      "Bilangan": [
        { name: "Bilangan Real", url: "https://contoh.com/bilangan-real" },
      ],
      "Aljabar": [
        {
          name: "Persamaan dan Pertidaksamaan Linear",
          url: "https://contoh.com/persamaan-linear",
        },
        { name: "Fungsi", url: "https://contoh.com/fungsi" },
        { name: "Barisan dan Deret", url: "https://contoh.com/barisan-deret" },
      ],
    },
  };

  const [openCategory, setOpenCategory] = useState(null);
  const mapelName = Object.keys(data)[0];
  const categories = data[mapelName];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{mapelName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {Object.entries(categories).map(([judul, submateri]) => (
          <div
            key={judul}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{judul}</h2>
            <button
              onClick={() =>
                setOpenCategory(openCategory === judul ? null : judul)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {openCategory === judul ? "Tutup Materi" : "Uraikan Materi"}
            </button>

            {openCategory === judul && (
              <ul className="mt-4 space-y-2">
                {submateri.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-2"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition"
                    >
                      <span className="text-sm font-medium">Kunjungi</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
