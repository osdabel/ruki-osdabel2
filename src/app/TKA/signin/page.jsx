"use client";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [role, setRole] = useState("siswa");
  const [showPassword, setShowPassword] = useState(false);
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // ✅ Ganti dengan nomor WA tujuan (tanpa tanda + atau spasi)
  const nomorWA = "6285817248531";

  const handleSubmit = () => {
    // Format pesan ke WhatsApp
    const pesan = `Pendaftaran Akun osdabel.my.id
Role: ${role === "siswa" ? "Siswa/i" : "Guru"}
Nama: ${nama}
${role === "siswa" ? "NIS" : "NIP"}: ${nis}
Email: ${email}
Password: ${pass}`;

    // Encode pesan agar bisa dikirim via URL
    const encodedMessage = encodeURIComponent(pesan);

    // Buka WhatsApp dengan pesan terisi
    window.open(`https://wa.me/${nomorWA}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="w-screen h-max py-20 flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white shadow-lg w-80 rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Daftar Sebagai {role === "siswa" ? "Siswa" : "Guru"}
        </h1>

        {/* Role Switch */}
        <div className="flex justify-center mt-4 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setRole("siswa")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              role === "siswa"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Siswa/i
          </button>
          <button
            onClick={() => setRole("guru")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              role === "guru"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Guru
          </button>
        </div>

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700 font-medium">Nama Lengkap :</label>
            <input
              type="text"
              placeholder="Tuliskan Nama Lengkap"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              {role === "siswa" ? "NIS :" : "NIP :"}
            </label>
            <input
              type="number"
              placeholder={role === "siswa" ? "Tuliskan NIS" : "Tuliskan NIP"}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="contoh@gmail.com"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                className="w-full pr-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  // eye-off icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.14-5.978M6.18 6.18A9.953 9.953 0 0112 5c5.523 0 10 4.477 10 10 0 1.05-.162 2.06-.465 3.01M3 3l18 18" />
                  </svg>
                ) : (
                  // eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-2 rounded-lg shadow-sm"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Page;
