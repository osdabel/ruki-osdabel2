'use client'
import Sidemenu from "@/components/ui/Sidemenu"
import Link from "next/link"
import { useState } from "react"

const subjects = [
  {
    name: "Matematika Wajib",
    description: "",
    packages: [
      { name: "Paket 1", desc: "Materi Aljabar dan Aritmatika dasar." },
      { name: "Paket 2", desc: "Materi Geometri dan Trigonometri." },
      { name: "Paket 3", desc: "Materi Statistika dan Peluang." },
    ]
  },
  {
    name: "Fisika",
    description: "",
    packages: [
      { name: "Paket 1", desc: "" },
      { name: "Paket 2", desc: "" },
    ]
  },
]

export default function TryoutPage() {
  const [selectedSubject, setSelectedSubject] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">

    <Sidemenu />

      <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-10">Pilih Mata Pelajaran Tryout</h1>

      {/* Grid Mapel */}
      {!selectedSubject && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {subjects.map((subject, i) => (
            <div
              key={i}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-100 hover:border-blue-400"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-400">{subject.name}</h2>
              <p className="text-gray-600 text-sm">{subject.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Paket dari Mapel yang dipilih */}
      {selectedSubject && (
        <div className="w-full max-w-3xl">
          <button
            onClick={() => setSelectedSubject(null)}
            className="text-blue-600 text-sm mb-4 hover:underline"
          >
            ← Kembali ke daftar mapel
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{selectedSubject.name}</h2>
          <p className="text-gray-600 mb-6">{selectedSubject.description}</p>

          <div className="space-y-4">
            {selectedSubject.packages.map((pkg, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg border border-gray-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{pkg.desc}</p>
                  </div>
                  <Link href={"/TKA"}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
                    Mulai
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
