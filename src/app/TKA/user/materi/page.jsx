"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Sidemenu from "@/components/ui/Sidemenu";

// Helper untuk slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const SUBJECTS = [
  { name: "Matematika Wajib", color: "from-indigo-500 to-purple-500" },
  { name: "Fisika", color: "from-emerald-400 to-teal-500" },
  { name: "Matematika Lanjutan", color: "from-violet-400 to-indigo-500" },
  { name: "Bahasa Indonesia Lanjutan", color: "from-lime-400 to-emerald-500" },
  { name: "Bahasa Inggris Lanjutan", color: "from-amber-300 to-rose-400" },
  { name: "Kimia", color: "from-yellow-400 to-amber-500" },
  { name: "Biologi", color: "from-green-400 to-lime-500" },
  { name: "Sejarah", color: "from-orange-400 to-red-400" },
  { name: "Sosiologi", color: "from-cyan-400 to-sky-500" },
  { name: "Ekonomi", color: "from-fuchsia-400 to-pink-500" },
  { name: "PPKN", color: "from-red-500 to-white-500" },
  { name: "Bahasa Indonesia Wajib", color: "from-rose-400 to-pink-500" },
  { name: "Bahasa Inggris Wajib", color: "from-sky-400 to-blue-500" },
].map((s) => ({ ...s, slug: slugify(s.name) }));

export default function SubjectsGridPage() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("favSubjects") || "[]");
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favSubjects", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (slug) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return SUBJECTS;
    const q = query.toLowerCase().trim();
    return SUBJECTS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.slug.includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 antialiased">

    <Sidemenu />

      {/* Mobile-first container */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Sticky header on small screens for easy search access */}
        <header className=" bg-white/80 backdrop-blur-sm py-3 -mx-4 px-4 rounded-b-lg shadow-sm mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold leading-tight">Silabus & Kisi-kisi</h1>
              <p className="text-xs text-gray-500 mt-0.5">Pilih mapel untuk melihat silabus</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="px-3 py-2 text-sm rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm"
                aria-expanded={showFilters}
                aria-controls="filters"
                title="Tampilkan filter"
              >
                Filter
              </button>

              <button
                onClick={() => setQuery("")}
                className="hidden sm:inline px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 shadow-sm"
                title="Reset pencarian"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Search bar - full width, large touch target */}
          <div className="mt-3">
            <input
              aria-label="Cari mata pelajaran"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full block px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Cari (contoh: matematika, bahasa)..."
            />
          </div>

          {/* Collapsible filters for mobile */}
          <div id="filters" className={`mt-3 transition-all duration-200 ${showFilters ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button onClick={() => { setQuery(''); setShowFilters(false); }} className="flex-shrink-0 px-3 py-2 rounded-full bg-gradient-to-r from-gray-100 to-white text-sm border border-gray-200">Semua</button>
              <button onClick={() => { setQuery('matematika'); setShowFilters(false); }} className="flex-shrink-0 px-3 py-2 rounded-full bg-white text-sm border">Matematika</button>
              <button onClick={() => { setQuery('bahasa'); setShowFilters(false); }} className="flex-shrink-0 px-3 py-2 rounded-full bg-white text-sm border">Bahasa</button>
            </div>
          </div>
        </header>

        {/* Grid: mobile-first is single column, then expand */}
        <main className="mt-4">
          {filtered.length === 0 ? (
            <div className="p-8 rounded-lg bg-white border border-dashed border-gray-200 text-center text-gray-500">
              Tidak ada mapel yang cocok.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((sub) => (
                <motion.article
                  key={sub.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link href={`/TKA/user/materi/${sub.slug}`} className="block rounded-xl shadow-md overflow-hidden" aria-label={`Buka ${sub.name}`}>
                    <div className={`h-28 sm:h-24 w-full bg-gradient-to-br ${sub.color} flex items-center justify-center p-3`}>
                      <h3 className="text-lg sm:text-base font-semibold text-white text-center px-2">{sub.name}</h3>
                    </div>

                    <div className="bg-white px-4 py-3 border border-t-0 border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs text-gray-500">Jumlah Materi</div>
                        <div className="text-sm font-medium text-gray-700">???</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(sub.slug); }}
                          aria-pressed={favorites.includes(sub.slug)}
                          className={`px-3 py-2 rounded-lg text-sm border ${favorites.includes(sub.slug) ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-white border-gray-200'}`}
                        >
                          {favorites.includes(sub.slug) ? 'Favorit' : 'Simpan'}
                        </button>

                        <div className="text-xs text-indigo-600 font-medium">Lihat →</div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </main>

        {/* Footer info */}
        <footer className="mt-6 mb-20 text-xs text-gray-500 text-center">
          Ketuk mapel untuk membuka halaman silabus.
        </footer>
      </div>

      {/* Floating quick-access for favorites on mobile */}
      <div className="fixed bottom-6 right-4 sm:right-6">
        <Link href="/favorites" className="inline-block px-4 py-3 rounded-full shadow-lg bg-indigo-600 text-white text-sm font-medium">Favorit ({favorites.length})</Link>
      </div>
    </div>
  );
}
