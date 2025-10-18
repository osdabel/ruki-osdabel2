import HorizontalCards from "@/components/ui/osis/HorizontalCards";
import MisiOSIS from "@/components/ui/osis/MisiOSIS";
import './osis.css'
import Footer from "@/components/alwaysUsed/Footer";
import Image from "next/image";
import Link from "next/link";

const page = () => {

    return (
        <>
        
        <main className="bg-red-500 w-screen h-107 text-white py-6 px-4 rounded-br-4xl relative left-0 top-0 z-10">
            <h1 className="text-4xl font-black mt-8">Organisasi Siswa Intra Sekolah</h1>
            <h1 className="text-3xl font-black">SMA NEGERI 18 GARUT</h1>
            <p className="text-sm mt-7">
                Dari potensi yang tumbuh, <br />
                kekuatan akan tercipta. <br />
                Dari integritas yang dijaga, <br />
                kebersamaan akan bermakna. <br />
                Dan melalui kolaborasi, lahirlah inovasi yang nyata.
            </p>
            <p className="mt-6 opacity-70">2025/2026</p>
            <p className="mt-11 opacity-50 text-sm font-light">OSIS SMA Negeri 18 GARUT 2025/2026</p>
        </main>
        
        <div className="w-screen h-150 relative z-9">
            <div className="w-full h-full p-4">
                <div className="flex items-center justify-between">
                    <Link href={'/dev'}>
                    <div>
                        <h1 className="text-2xl font-bold">Event</h1>
                        <h2 className="">Periode 2025/2026</h2>
                    </div>
                    </Link>
                    <Link href={'/dev'}>
                    <div className="w-10 h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m531.69-480-184-184L376-692.31 588.31-480 376-267.69 347.69-296l184-184Z"/></svg>
                    </div>
                    </Link>
                </div>
<div className="w-full">
  <div className="bg-blue-400 w-full h-max mt-7 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    {/* ======== FOTO ======== */}
    <div className="foto bg-gray-900 w-full h-50 rounded-t-lg overflow-hidden border-b-2 border-white">
      <Image
        className="relative top-[-180px]"
        src="/augfest.jpg"
        width={350}
        height={350}
        alt="augfest"
      />
    </div>

    {/* ======== ISI CARD ======== */}
    <div className="p-4 text-white">
      <h2 className="text-lg font-bold mb-1">Augfest (Agustus Festival) 18</h2>
      <p className="text-sm opacity-80 mb-3">📅 Selasa, 19 Agustus 2025</p>
      <p className="text-sm mb-4">
        Untuk memperingati hari kemerdekaan yang ke 80, OSIS SMAN 18 Garut mengadakan sebuah Event bernama Augfest 18 yang diselenggarakan pada Selasa, 19 Agustus 2025 diikuti oleh siswa/i SMAN 18 Garut.
      </p>

      <div className="text-right">
        <Link href="/augfest">
          <span className="text-sm font-semibold underline hover:text-blue-100 cursor-pointer">
            Selengkapnya...
          </span>
        </Link>
      </div>
    </div>
  </div>
</div>

            </div>
        </div>

        <div className="w-screen h-170 bg-red-500 px-4 py-18 text-white">
            <div className="w-full h-max">
            <h1 className="text-xl">Tentang</h1>
            <h1 className="text-xl opacity-70">Overview</h1>
            </div>

            <div className="w-full h-max mt-7">
                <h1 className="text-4xl font-bold ">Organisasi Siswa Intra Sekolah</h1>
            </div>

            <div className="w-full h-max mt-13">
                <p className="text-justify">Organisasi Siswa Intra Sekolah adalah sebuah organisasi resmi di sekolah. OSIS sebagai salah satu jalur pembinaan kesiswaan secara nasional, organisasi ini memiliki peran sebagai penggerak siswa untuk aktif berkontribusi di sekolah. Ia merupakan wadah pembinaan kesiswaan di sekolah untuk pengembangan minat, bakat serta potensi siswa.</p>
            </div>
        </div>

        <MisiOSIS />

        <div className="w-screen h-180 px-4 py-8">
            <div>
                <h1 className="text-2xl font-bold">Program Kerja Unggulan</h1>
                <h2 className="">4 Proker Periode 2025/2026</h2>
            </div>
            <HorizontalCards />
        </div>

        <div className="w-screen h-max bg-white flex flex-col items-center">
        <div className="">
            Coming Soon <span className="text-amber-400">(75%)</span>
        </div>
        <div className="opacity-5 blur-sm ">

        <div className="w-screen h-490 px-4 py-8">
            <div className="bph w-full h-max">
                <div>
                    <h1 className="text-2xl font-bold">Badan Pengurus Harian</h1>
                    <h2 className="">Periode 2025/2026</h2>
                </div>
                <div className="w-full h-full flex flex-col items-center mt-10">
                    <div className="bg-gray-800 w-60 h-110">

                    </div>

                    <h2 className="font-black text-3xl mt-7">Kairina Siti Supyan</h2>
                    <h3>Bendahara OSIS</h3>
                </div>
            </div>

        
            <div className="h-10 mt-10 flex items-center gap-5 justify-around">
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Ketua OSIS</h1>
                </div>
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Wakil Ketua OSIS</h1>
                </div>
            </div>
            <div  className="h-30 flex items-center gap-5 overflow-x-auto">
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Benadahara OSIS</h1>
                </div>
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Sekretaris OSIS</h1>
                </div>
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Koordinator Kelas XI OSIS</h1>
                </div>
                <div className="w-max h-max flex justify-center items-center bg-blue-300 px-4 py-1 rounded">
                    <h1 className="font-bold text-blue-950 whitespace-nowrap">Koordinator Kelas X OSIS</h1>
                </div>
            </div>

            <div className="sekbid w-full h-max mt-10">
                <div>
                    <h1 className="text-2xl font-bold">Seksi Bidang</h1>
                    <h2 className="">Periode 2025/2026</h2>
                </div>
                <div className="w-full h-full flex flex-col items-center mt-10">
                    <div className="bg-gray-800 w-60 h-110">

                    </div>

                    <h2 className="font-black text-3xl mt-7">Firmansyah</h2>
                    <h3>Koordinator Sekbid 7</h3>
                </div>
                <div className="w-full h-50 bg-gray-800 mt-7">

                </div>
                <h3>Sekbid 7 : Kesehatan Dan Gizi</h3>
                <h3 className="text-blue-700">Selengkapnya....</h3>
            </div>
        </div>
        </div>
    </div>

        <div className="bg-gray-950 w-screen h-180">
            <div className="ekskul text-white" id="ekskul">
        <div className="title">
            <h2 className="font-bold text-xl"> Organisasi & Ekskul</h2>
            <h3 className="text-xs"> Organisasi dan Ekstrakulikuler di SMAN 18 GARUT </h3>
        </div>
        <div className="subtitle">
            <h4 className="font-semibold"> OSIS & MPK </h4>
            <h6 className="text-xs"> Organisasi Siswa Intra Sekolah & Majelis Perwakilan Kelas </h6>
        </div>
        <div className="wrap-eks font-black">
            <div className="item1 itemstyle">
                <h4>Sepak Bola</h4>
            </div>
            <div className="item2 itemstyle">
                <h4>Futsal</h4>
            </div>
            <div className="item3 itemstyle">
                <h4>Badminton</h4>
            </div>
            <div className="item4 itemstyle">
                <h4>Basket</h4>
            </div>
            <div className="item5 itemstyle">
                <h4>Tarung Derajat</h4>
            </div>
            <div className="item6 itemstyle">
                <h4>Taekwondo</h4>
            </div>
            <div className="item7 itemstyle">
                <h4>Silat</h4>
            </div>
            <div className="item8 itemstyle">
                <h4>Pramuka</h4>
            </div>
            <div className="item9 itemstyle">
                <h4>Paskibra</h4>
            </div>
            <div className="item10 itemstyle">
                <h4>PMR</h4>
            </div>
            <div className="item11 itemstyle">
                <h4>Tari</h4>
            </div>
            <div className="item12 itemstyle">
                <h4>Modelling</h4>
            </div>
            <div className="item13 itemstyle">
                <h4>Marching Band</h4>
            </div>
            <div className="item14 itemstyle">
                <h4>Teater</h4>
            </div>
            <div className="item15 itemstyle">
                <h4>Vocal</h4>
            </div>
            <div className="item16 itemstyle">
                <h4>IRMA</h4>
            </div>
            <div className="item17 itemstyle">
                <h4>Desain Grafis</h4>
            </div>
            <div className="item18 itemstyle">
                <h4>KIR</h4>
            </div>
            <div className="item19 itemstyle">
                <h4>English Club</h4>
            </div>
        </div>
    </div>
        </div>

    <Footer />

        </>
    )
}

export default page;