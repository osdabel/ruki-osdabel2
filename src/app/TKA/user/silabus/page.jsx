'use client'

import Sidemenu from "@/components/ui/Sidemenu";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

// SyllabusPage.jsx
// Single-file React component (Next.js page friendly).
// Tailwind CSS assumed.

const syllabusData = {
  "Matematika (Wajib)": {
    "Bilangan": [
      "Bilangan Real",
    ],
    "Aljabar": [
      "Persamaan dan Pertidaksamaan Linear",
      "Fungsi",
      "Barisan dan Deret",
    ],
    "Geometri dan Pengukuran": [
      "Objek Geometri",
      "Transformasi Geometri",
      "Pengukuran",
    ],
    "Trigonometri": [
      "Perbandingan Geometri",
    ],
    "Data dan Peluang": [
      "Data",
      "Peluang",
    ],
  },
  "Bahasa Inggris (Wajib)": {
    "Teks": ["descriptive", "recount", "narrative", "procedure", "analytical exposition"],
    "Grammar": [
      "Simple Present",
      "Present Continuous",
      "Past Tense",
      "Modal Verbs",
    ],
    "European Framework of Reference for Languages": [
      "Pemahaman Tekstual",
      "Pemahaman Inferensial",
      "Evaluasi dan Apresiasi",
    ],
  },
  "Bahasa Indonesia (Wajib)": {
    "Pemahaman Tekstual": [''],
    "Pemahaman Inferensial": [''],
    "Evaluasi dan Apresiasi": ['']
  },
  "Matematika Tingkat Lanjut": {
    "Aljabar": ["Matriks", "Polinomial", "Fungsi"],
    "Geometri dan Pengukuran": ["Vektor", "Lingkaran", "Transformasi Geometri"],
    "Trigonometri": ["Limit"],
  },
  "Bahasa Indonesia Tingkat lanjut": {
    "Pemahaman Tekstual": [''],
    "Pemahaman Inferensial": [''],
    "Evaluasi dan Apresiasi": ['']
  },
  "Bahasa Inggris Tingkat Lanjut": {
    "Teks": ["descriptive", "recount", "narrative", "procedure", "analytical exposition"],
    "Grammar": [
      "Simple Present",
      "Present Continuous",
      "Past Tense",
      "Modal Verbs",
    ],
    "European Framework of Reference for Languages": [
      "Pemahaman Tekstual",
      "Pemahaman Inferensial",
      "Evaluasi dan Apresiasi",
    ],
  },
  "Fisika": {
    "Kinematika": ["Pengukuran", "Gerak Lurus", "Gerak Lengkung"],
    "Dinamika": ["Hubungan Gaya dan Gerak", "Momentum dan Impuls"],
    "Fluida": ["Fluida Statis dan Dinamis"],
    "Gelombang": ["Bunyi", "Cahaya"],
  },
  "Kimia": {
  "Kimia Dasar": [
    "Struktur atom",
    "Teori model atom",
    "Sistem dan sifat periodik unsur",
    "Ikatan kimia",
    "Geometri molekul",
    "Interaksi antar molekul",
    "Hukum dasar kimia",
    "Stoikiometri dan persamaan reaksi kimia"
  ],
  "Kimia Analitik": [
    "Larutan",
    "Kesetimbangan larutan",
    "Asam-basa",
    "pH",
    "Koloid"
  ],
  "Kimia Fisik": [
    "Energetika dan dinamika reaksi"
  ],
  "Kimia Organik": [
    "Struktur dan kereaktifan senyawa karbon"
  ]
},
"Biologi": {
  "Keanekaragaman Hayati": [
    "Klasifikasi dan keanekaragaman makhluk hidup",
    "Bakteri",
    "Ekosistem"
  ],
  "Bakteri": [
    "Struktur bakteri Gram positif dan negatif",
    "Peranan bakteri bagi manusia"
  ],
  "Ekosistem": [
    "Komponen ekosistem dan interaksi antar komponen",
    "Pelestarian ekosistem"
  ],
  "Sel": [
    "Metabolisme sel"
  ],
  "Proses-proses pada Makhluk Hidup": [
    "Transport dan pertukaran zat pada manusia (sirkulasi, respirasi, ekskresi)",
    "Sistem imun",
    "Sistem koordinasi",
    "Sistem reproduksi"
  ],
  "Transport dan pertukaran zat pada manusia": [
    "Sistem sirkulasi",
    "Sistem respirasi",
    "Sistem ekskresi"
  ],
  "Sistem imun": [
    "Mekanisme kerja sistem imun"
  ],
  "Sistem koordinasi": [
    "Mekanisme kerja sistem saraf dan sistem hormon"
  ],
  "Sistem reproduksi": [
    "Sistem reproduksi pria",
    "Sistem reproduksi wanita"
  ]
},
"PPKn": {
  "Pancasila": [
    "Pancasila sebagai dasar negara",
    "Ideologi negara",
    "Identitas nasional",
    "Hak asasi manusia",
    "Demokrasi Pancasila"
  ],
  "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945": [
    "Penegakan hukum",
    "Perlindungan HAM",
    "Ketentuan UUD NRI Tahun 1945",
    "Demokrasi",
    "Hubungan pemerintah pusat dan daerah",
    "Kewenangan lembaga negara",
    "Hak dan kewajiban warga negara"
  ],
  "Bhinneka Tunggal Ika": [
    "Integrasi nasional",
    "Mengelola kebinekaan sebagai modal sosial",
    "Harmoni dalam keberagaman",
    "Implementasi prinsip gotong royong",
    "Ancaman terhadap kebinekaan"
  ],
  "Negara Kesatuan Republik Indonesia": [
    "Perilaku warga negara yang baik",
    "Bentuk negara",
    "Bentuk dan sistem pemerintahan",
    "Pengaruh kemajuan IPTEKS terhadap NKRI",
    "Menjaga keutuhan NKRI dalam konteks Wawasan Nusantara",
    "Menjadi pelopor pemilih pemula dalam demokrasi Indonesia",
    "Menjaga keutuhan NKRI",
    "Sistem pertahanan Indonesia",
    "Peran Indonesia dalam perdamaian dunia",
    "Demokrasi Indonesia"
  ]
},
"Ekonomi": {
  "Konsep Dasar Ilmu Ekonomi": [
    "Kelangkaan",
    "Biaya peluang",
    "Kegiatan ekonomi"
  ],
  "Ekonomi Mikro dan Makro": [
    "Permintaan, penawaran, dan keseimbangan pasar",
    "Pendapatan nasional, pertumbuhan ekonomi, dan pembangunan ekonomi",
    "Ketenagakerjaan",
    "Indeks harga dan inflasi",
    "Bank sentral dan kebijakan moneter",
    "Kebijakan fiskal dan perpajakan",
    "Manajemen badan usaha dalam perekonomian Indonesia (BUMN, BUMD, BUMS, dan Koperasi)"
  ],
  "Ekonomi Internasional": [
    "Kerja sama ekonomi dan perdagangan internasional"
  ],
  "Akuntansi Keuangan Dasar": [
    "Persamaan dasar akuntansi dan laporan keuangan"
  ]
},
"Sosiologi": {
  "Sosiologi sebagai Ilmu": [
    "Pengertian dan perkembangan sosiologi",
    "Manfaat sosiologi dalam kehidupan masyarakat"
  ],
  "Hubungan dan Gejala Sosial": [
    "Konsep dan bentuk hubungan sosial",
    "Pembentukan kepribadian, kelompok dan lembaga sosial",
    "Ragam gejala sosial",
    "Masyarakat multikultural"
  ],
  "Penelitian Sosial": [
    "Langkah penelitian sosial",
    "Metode penelitian sosial"
  ],
  "Kelompok Sosial, Kesetaraan, dan Konflik Sosial": [
    "Konsep kelompok sosial dan dinamika kelompok sosial",
    "Ketidaksetaraan sosial dan upaya mewujudkan kesetaraan sosial",
    "Konflik sosial dan penanganan konflik"
  ],
  "Perubahan Sosial dan Globalisasi": [
    "Bentuk-bentuk perubahan sosial dan dampaknya",
    "Globalisasi dan dampak globalisasi",
    "Sikap kritis terhadap globalisasi"
  ]
},
"Sejarah": {
  "Pengantar Ilmu Sejarah": [
    "Konsep dasar sejarah",
    "Fenomena sejarah dalam kehidupan sehari-hari",
    "Sumber-sumber sejarah"
  ],
  "Periode Kerajaan Hindu-Buddha dan Islam": [
    "Kehidupan religi, budaya, politik, dan ekonomi masyarakat di Nusantara pada masa kerajaan Hindu-Buddha",
    "Kehidupan religi, budaya, politik, dan ekonomi masyarakat di Nusantara pada masa kerajaan Islam"
  ],
  "Perlawanan terhadap Bangsa Eropa": [
    "Proses kedatangan bangsa Eropa ke Nusantara",
    "Perlawanan terhadap bangsa Eropa sebelum abad ke-20"
  ],
  "Pergerakan Nasional sampai Proklamasi Kemerdekaan": [
    "Pergerakan Nasional Indonesia",
    "Relevansi semangat Pergerakan Nasional dengan masa kini",
    "Kehidupan bangsa Indonesia di bawah penjajahan Jepang dan perlawanan bangsa Indonesia",
    "Peristiwa dan makna Proklamasi Kemerdekaan Indonesia"
  ],
  "Revolusi Kemerdekaan Indonesia sampai Demokrasi Terpimpin": [
    "Perjuangan mempertahankan kemerdekaan",
    "Kehidupan masyarakat Indonesia pada masa Demokrasi Liberal",
    "Kehidupan masyarakat pada masa Demokrasi Terpimpin"
  ],
  "Orde Baru sampai Reformasi": [
    "Kehidupan masyarakat pada masa Orde Baru",
    "Kehidupan masyarakat pada masa Reformasi"
  ]
},
};

const page = () => {
  const subjects = Object.keys(syllabusData);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [openSections, setOpenSections] = useState(() => {
    // by default open "Ruang Lingkup" if exists
    const defaultSubject = subjects[0];
    const keys = Object.keys(syllabusData[defaultSubject]);
    return new Set(keys.filter((k) => k === "Ruang Lingkup"));
  });
  const [query, setQuery] = useState("");

  const sectionsForSelected = syllabusData[selectedSubject];

  const filteredSections = useMemo(() => {
    if (!query.trim()) return sectionsForSelected;
    const q = query.toLowerCase();
    // filter sections and subtopics by query
    const result = {};
    for (const [section, items] of Object.entries(sectionsForSelected)) {
      const sectionMatch = section.toLowerCase().includes(q);
      const filteredItems = items.filter((it) => it.toLowerCase().includes(q));
      if (sectionMatch || filteredItems.length > 0) {
        result[section] = filteredItems.length > 0 ? filteredItems : items;
      }
    }
    return result;
  }, [query, sectionsForSelected]);

  const toggleSection = (name) => {
    setOpenSections((prev) => {
      const copy = new Set(prev);
      if (copy.has(name)) copy.delete(name);
      else copy.add(name);
      return copy;
    });
  };

  const expandAll = () => setOpenSections(new Set(Object.keys(filteredSections)));
  const collapseAll = () => setOpenSections(new Set());


    const [checkedItems, setCheckedItems] = useState([]);

  // Saat halaman pertama kali dimuat, ambil data dari cookies
  useEffect(() => {
    const saved = Cookies.get("checkedMaterials");
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Setiap kali ada perubahan pada checkedItems, simpan ke cookies
  useEffect(() => {
    Cookies.set("checkedMaterials", JSON.stringify(checkedItems), { expires: 7 }); // berlaku 7 hari
  }, [checkedItems]);

  const handleCheck = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item) // hapus dari daftar jika di-uncheck
        : [...prev, item] // tambahkan jika dicentang
    );
  };

  return (

    
    <div className="h-max pb-50 w-screen overflow-x-hidden bg-gray-50 p-6 md:p-12">

    <Sidemenu />

      <div className="max-w-5xl mx-auto mt-10">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-700">Kisi-kisi / Silabus <br /> TKA (Tes Kemampuan Akademik)</h1>
          <p className="text-gray-600 mt-1">Pilih mata pelajaran untuk melihat ruang lingkup & sub materi.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left column: subject list */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-6">
              <h2 className="text-lg font-semibold mb-3">Mata Pelajaran</h2>

              <div className="flex flex-col gap-2">
                {subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSubject(s);
                      // default: open 'Ruang Lingkup' when switching
                      const keys = Object.keys(syllabusData[s]);
                      setOpenSections(new Set(keys.filter((k) => k === "Ruang Lingkup")));
                      setQuery("");
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-300
                      ${s === selectedSubject ? "bg-sky-600 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Cari materi</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ketik nama materi atau submateri"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-sky-300 px-3 py-2"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={expandAll} className="flex-1 px-3 py-2 bg-sky-50 text-sky-700 rounded-md text-sm">
                  Expand All
                </button>
                <button onClick={collapseAll} className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-md text-sm">
                  Collapse
                </button>
              </div>
            </div>

            {/* small hint box */}
            <div className="mt-4 text-xs text-gray-600">
              Tips: Klik judul bagian (contoh: "Aljabar") untuk membuka sub-topiknya. Gunakan kotak pencarian untuk mencari submateri.
            </div>
          </aside>

          {/* Right column: content */}
          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{selectedSubject}</h2>
                  <p className="text-sm text-gray-500 mt-1">Menampilkan {Object.keys(filteredSections).length} bagian</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {Object.entries(filteredSections).map(([section, items]) => (
                  <section key={section} className="border rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                      aria-expanded={openSections.has(section)}
                    >
                      <div>
                        <h3 className="font-medium">{section}</h3>
                        <p className="text-xs text-gray-500">{items.length} sub-topik</p>
                      </div>
                      <div className="ml-4 text-gray-500">{openSections.has(section) ? "▲" : "▼"}</div>
                    </button>

                    <div
                      className={`px-4 py-3 transition-max-h duration-300 ease-in-out overflow-hidden ${
                        openSections.has(section) ? "max-h-96" : "max-h-0"
                      }`}
                      aria-hidden={!openSections.has(section)}
                    >
                      {items.length === 0 ? (
                        <p className="text-sm text-gray-500">Tidak ada sub-topik yang cocok.</p>
                      ) : (
                        <ul className="list-disc pl-5 space-y-1">
                          {items.map((it) => (
                            <li key={it} className="py-1">
                              <div className="flex items-center justify-between">
                                <span>{it}</span>
                                <button
                                  className="text-xs px-2 py-1 rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100"
                                  onClick={() => alert(`${it} — detail: bisa diisi oleh admin atau di-link ke halaman materi`)}
                                >
                                  Lihat
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}

                {Object.keys(filteredSections).length === 0 && (
                  <div className="text-center py-10 text-gray-500">Tidak ditemukan materi dengan kata kunci "{query}"</div>
                )}
              </div>
            </div>

            {/* Example: quick printable checklist */}
            <div className="mt-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium">Ringkasan Cepat</h3>
        <p className="text-sm text-gray-600 mt-2">
          Centang materi yang sudah dipelajari:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {Object.entries(sectionsForSelected).flatMap(([section, items]) =>
            items.map((it) => (
              <label
                key={it}
                className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={checkedItems.includes(it)}
                  onChange={() => handleCheck(it)}
                />{" "}
                <span>{it}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>

            <h1 className="mt-5">Materi dan Silabus diambil dari website resmi Kemendikasmen</h1>
            <h1 className="font-light text-sm text-wrap">https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-wajib/sma</h1>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
