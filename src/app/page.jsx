import Footer from "@/components/alwaysUsed/Footer";
import PinCircle from "@/components/ui/home/PinCircle";
import IntroText from "@/components/ui/home/IntroText";
import VisiRUKI from "@/components/ui/home/VisiRUKI";


export default function Home() {
  return (
    <>
    <main className="w-screen h-108 bg-blue-700 text-white rounded-br-4xl px-4 pt-10 relative z-10 top-0 left-0 overflow-hidden">
      <div className="">
        <h6>RUKI</h6>
        <IntroText />
        <h2 className="text-sm font-light mt-10">RUKI mewujudkan platform untuk berkreasi, menciptakan ekosistem informasi yang terintegrasi. Dan menginspirasi untuk berinovasi</h2>
      </div>
      <div className="text-blue-400 mt-13">
        <h2 className="text-sm font-light">Dibawah naungan :</h2>
        <h3 className="text-sm font-light">OSIS SMA NEGERI 18 GARUT 2025/2026</h3>
      </div>
    </main>
    <div id="trigger-circle" className="bg-gray-100 w-screen h-400 flex relative z-9 top-[-25px] ">
    <h1>slkflj</h1>
    </div>
    <PinCircle />
    <div className="w-screen h-130 px-4 pt-18 relative z-12 bg-blue-100">
      <h2 className="">Tentang Ruki</h2>
      <h3 className="text-blue-500">Overview</h3>
      <h1 className="text-4xl font-black mt-5">RUKI merupakan singkatan dari : Ruang Kreasi <br></br> Dan Informasi</h1>
      <p className="text-sm mt-10">Sebagai implementasi Program Kerja OSIS 2025/2026, RUKI merupakan platform/website yang menyediakan fitur - fitur penunjang aktivitas warga sekolah, yang dikelola langsung oleh Tim dari OSIS SMAN 18 Garut.</p>
    </div>
    <VisiRUKI />
    <div className="bg-blue-50 w-screen h-70 relative z-12 top-[-25px] px-4 py-10">
      <h1 className="font-black text-xl">TIM RUKI</h1>
      <p className="text-sm font-light mt-3">Diinisiasi OSIS, Tim RUKI bersifat sebagai unit independen dibawah naungan OSIS SMAN 18 Garut. Dimana statusnya terbuka bagi seluruh warga sekolah yang ingin berkontribusi dalam pengembangan platform.</p>
    </div>
    <Footer />
    </>
  );
}
