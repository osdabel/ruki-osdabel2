'use client'

import { useEffect, useState } from "react";
import Sidemenu from "@/components/ui/Sidemenu";
import Link from "next/link";
const Page = () => {


     const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Konversi ke zona waktu WIB (UTC+7)
      const optionsDate = { 
        weekday: "long", 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        timeZone: "Asia/Jakarta" 
      };
      const optionsTime = { 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false, 
        timeZone: "Asia/Jakarta" 
      };

      const formattedDate = new Intl.DateTimeFormat("id-ID", optionsDate).format(now);
      const formattedTime = new Intl.DateTimeFormat("id-ID", optionsTime).format(now);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime(); // Jalankan sekali di awal
    const interval = setInterval(updateDateTime, 1000); // Update tiap detik
    return () => clearInterval(interval);
  }, []);


  const [selected, setSelected] = useState("hari-ini");
  const [hariIni, setHariIni] = useState(""); // untuk menyimpan nama hari sekarang

  // Data jadwal
  const jadwal = {
    kemarin: [
      { mapel: "Biologi", waktu: "08.00 - 10.00", jp: "2 Jam Pelajaran" },
      { mapel: "Bahasa Inggris", waktu: "10.00 - 11.00", jp: "1 Jam Pelajaran" },
    ],
    "hari-ini": [
      { mapel: "Matematika Peminatan", waktu: "08.00 - 10.00", jp: "2 Jam Pelajaran" },
      { mapel: "Matematika Wajib", waktu: "10.00 - 11.00", jp: "1 Jam Pelajaran" },
      { mapel: "Kimia", waktu: "13.00 - 15.00", jp: "2 Jam Pelajaran" },
      { mapel: "Fisika", waktu: "15.00 - 16.00", jp: "1 Jam Pelajaran" },
    ],
    besok: [
      { mapel: "Ekonomi", waktu: "08.00 - 10.00", jp: "2 Jam Pelajaran" },
      { mapel: "Sosiologi", waktu: "10.00 - 11.00", jp: "1 Jam Pelajaran" },
      { mapel: "Sejarah", waktu: "13.00 - 15.00", jp: "2 Jam Pelajaran" },
    ],
  };

  // Deteksi hari otomatis (0 = Minggu, 6 = Sabtu)
  useEffect(() => {
    const day = new Date().getDay();
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    setHariIni(namaHari[day]);
  }, []);

  // Mengecek apakah hari ini adalah Sabtu atau Minggu
  const isWeekend = hariIni === "Sabtu" || hariIni === "Minggu";


    return (
        <div className="w-screen h-max pb-20 bg-gray-200 pt-0.5">




        <Sidemenu />

            {/* ======== MAIN CONTENT ======== */}
            <div className="w-screen h-max px-5 mt-18 relative z-0">
                <div className="w-full h-max bg-white rounded-lg p-4 pb-10 mb-5">
                    <div className="w-full h-43">
                        <div className="bg-blue-500 w-full h-28 rounded-lg"></div>
                        <div className="w-25 h-25 bg-gray-200 rounded-full relative top-[-49] left-5 flex items-center justify-center overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#000000"><path d="M480-504.62q-49.5 0-84.75-35.25T360-624.62q0-49.5 35.25-84.75T480-744.62q49.5 0 84.75 35.25T600-624.62q0 49.5-35.25 84.75T480-504.62ZM200-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q760-306 760-281.23v65.85H200Zm40-40h480v-25.85q0-13.31-8.58-25-8.57-11.69-23.73-19.77-49.38-23.92-101.83-36.65-52.45-12.73-105.86-12.73t-105.86 12.73Q321.69-349.92 272.31-326q-15.16 8.08-23.73 19.77-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z"/></svg>
                        </div>
                    </div>
                    <div className="w-full h-max px-6">
                        <div className="flex justify-between pb-2">
                            <h3 className="font-bold">Guest_1</h3>
                            <div><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m405.38-120-14.46-115.69q-19.15-5.77-41.42-18.16-22.27-12.38-37.88-26.53L204.92-235l-74.61-130 92.23-69.54q-1.77-10.84-2.92-22.34-1.16-11.5-1.16-22.35 0-10.08 1.16-21.19 1.15-11.12 2.92-25.04L130.31-595l74.61-128.46 105.93 44.61q17.92-14.92 38.77-26.92 20.84-12 40.53-18.54L405.38-840h149.24l14.46 116.46q23 8.08 40.65 18.54 17.65 10.46 36.35 26.15l109-44.61L829.69-595l-95.31 71.85q3.31 12.38 3.7 22.73.38 10.34.38 20.42 0 9.31-.77 19.65-.77 10.35-3.54 25.04L827.92-365l-74.61 130-107.23-46.15q-18.7 15.69-37.62 26.92-18.92 11.23-39.38 17.77L554.62-120H405.38ZM440-160h78.23L533-268.31q30.23-8 54.42-21.96 24.2-13.96 49.27-38.27L736.46-286l39.77-68-87.54-65.77q5-17.08 6.62-31.42 1.61-14.35 1.61-28.81 0-15.23-1.61-28.81-1.62-13.57-6.62-29.88L777.77-606 738-674l-102.08 42.77q-18.15-19.92-47.73-37.35-29.57-17.42-55.96-23.11L520-800h-79.77l-12.46 107.54q-30.23 6.46-55.58 20.81-25.34 14.34-50.42 39.42L222-674l-39.77 68L269-541.23q-5 13.46-7 29.23t-2 32.77q0 15.23 2 30.23t6.23 29.23l-86 65.77L222-286l99-42q23.54 23.77 48.88 38.12 25.35 14.34 57.12 22.34L440-160Zm38.92-220q41.85 0 70.93-29.08 29.07-29.07 29.07-70.92t-29.07-70.92Q520.77-580 478.92-580q-42.07 0-71.04 29.08-28.96 29.07-28.96 70.92t28.96 70.92Q436.85-380 478.92-380ZM480-480Z"/></svg></div>
                        </div>
                        <div className="w-full h-max flex gap-4 justify-between">
                            <div># 0081234</div>
                            <div>[...kelas...]</div>
                        </div>
                        <div className="w-full h-max flex gap-4 justify-between">
                            <div>[Mapel Pilihan 1]</div>
                            <div>[Mapel Pilihan 2]</div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-max my-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{currentDate}</h2>
                    <h2 className="text-3xl">{currentTime}</h2>
                </div>

                <div className="w-full h-10 bg-white rounded-tl-md rounded-tr-md flex items-center">
                    <div className="w-full h-full flex justify-between px-6 font-bold">
                        <div className="opacity-50 flex justify-center items-center px-1">
                            <Link href={"/TKA"}>
                            <h2>Kemarin</h2>
                            </Link>
                        </div>


                        <div className="opacity-100 flex justify-center items-center border-b-4 border-blue-500 px-1">
                            <h2>Hari Ini</h2>
                        </div>


                        <div className="opacity-50 flex justify-center items-center px-1">
                            <Link href={"/TKA"}>
                            <h2>Besok</h2>
                            </Link>
                        </div>

                    </div>
                </div>


                {/* <div>
                    <div className="w-full h-20 bg-white rounded-md my-2 px-4 flex flex-col justify-center text-black">
                        <h1 className="font-bold text-xl">Matematika Peminatan</h1>
                        <h2 className="text-sm">2 Jam Pelajaran | 08.00 - 10.00</h2>
                    </div>
                    <div className="w-full h-20 bg-white rounded-md my-2 px-4 flex flex-col justify-center text-black">
                        <h1 className="font-bold text-xl">Matematika Wajib</h1>
                        <h2 className="text-sm">1 Jam Pelajaran | 10.00 - 11.00</h2>
                    </div>
                    <div className="w-full h-20 bg-blue-500 rounded-md my-2 px-4 flex flex-col justify-center text-white">
                        <h1 className="font-bold text-xl">Kimia</h1>
                        <h2 className="text-sm">2 Jam Pelajaran | 13.00 - 15.00</h2>
                    </div>
                    <div className="w-full h-20 bg-white rounded-md my-2 px-4 flex flex-col justify-center text-black">
                        <h1 className="font-bold text-xl">Fisika</h1>
                        <h2 className="text-sm">1 Jam Pelajaran | 15.00 - 16.00</h2>
                    </div>
                </div> */}

                <div className="w-full h-60 bg-white rounded-md my-2 px-4 flex flex-col justify-center items-center">
                    <Link href={"/TKA"}>
                    <h2 className="text-blue-500">Login Klik Disini</h2>
                    </Link>
                    <p className="text-sm italic mt-1 text-center">
                     “Login terlebih dahulu untuk menggunakan fitur ini!”
                    </p>
                </div>

                

                <div className="font-bold opacity-75 my-2">
                    <h2>Pemateri</h2>
                </div>

                <div className="w-full h-max bg-white rounded-md flex flex-col px-3 py-2 pb-4">
                    <div className="w-full h-max">
                        <h1 className="text-blue-500 font-bold text-md">Kimia</h1>
                    </div>
                    <div className="w-full h-max flex gap-3 items-center my-3">
                        <div className="bg-blue-200 rounded-full w-13 h-13 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50x" fill="#000000"><path d="M480-504.62q-49.5 0-84.75-35.25T360-624.62q0-49.5 35.25-84.75T480-744.62q49.5 0 84.75 35.25T600-624.62q0 49.5-35.25 84.75T480-504.62ZM200-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q760-306 760-281.23v65.85H200Zm40-40h480v-25.85q0-13.31-8.58-25-8.57-11.69-23.73-19.77-49.38-23.92-101.83-36.65-52.45-12.73-105.86-12.73t-105.86 12.73Q321.69-349.92 272.31-326q-15.16 8.08-23.73 19.77-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z"/></svg>
                        </div>
                        <div>
                            <h1 className="font-bold text-sm">Ibu/Bapak ......</h1>
                            <h2 className="font-semibold text-sm">Guru ....</h2>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-semibold">Materi :</h1>
                        <h2 className="text-sm">- ....</h2>
                        <h2 className="text-sm">- ....</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
