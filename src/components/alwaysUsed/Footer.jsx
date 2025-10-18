const Footer = () => {
    return (
        <div className="bg-gray-900 w-screen h-200 relative z-12 top-[-25px] px-4 py-10 text-white">
            <h1 className="font-bold text-xl">Ruang Kreasi Dan Informasi</h1>
            <div className="mt-10 w-full h-max flex justify-between">
                <div>
                    <h2>Navigation</h2>
                    <ul className="list-none opacity-50">
                        <li className="mb-4 mt-4">Home</li>
                        <li className="mb-4">OSIS</li>
                        <li className="mb-4">Berlatih TKA</li>
                        <li className="mb-4">Profile</li>
                        <li className="mb-4">MPK (Soon)</li>
                        <li className="mb-4">AKSI SISWA (Soon)</li>
                        <li className="mb-4">E - Commerce (Soon)</li>
                    </ul>
                </div>
                <div>
                    <h2>Supported By</h2>
                    <ul className="list-none opacity-50">
                        <li className="mb-4 mt-4">SMAN 18 GARUT</li>
                        <li className="mb-4">OSDABEL</li>
                        <li className="mb-4">MPK DABEL</li>
                    </ul>
                    <h2>Partner & Sponsor</h2>
                    <ul className="list-none opacity-50">
                        <li className="mb-4 mt-4">Media Center 18</li>
                        <li className="mb-4">-</li>
                        <li className="mb-4">-</li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-max flex items-center justify-center mt-20">
            <h2>Social</h2>
            </div>
            <div className="w-full h-max flex flex-col items-center justify-center mt-1 opacity-50">
            <h3 className="underline italic">osdabelgrt@gmail.com</h3>
            <h3>Youtube | osdabelgrt</h3>
            <h3>Instagram | @osdabel</h3>
            </div>
            <hr className="mt-10 mb-2"/>
            <div>
                <h3 className="text-center text-sm opacity-100">
                    SMA NEGERI 18 GARUT, <br />
                    Jalan Perum Bumi Abdi Negara 1 Karangpawitan - Garut Telp (0262) 441185
                </h3>
                <h3 className="text-center text-sm opacity-50">
                    © 2025 OSIS SMAN 18 GARUT | All Rights Reserved
                </h3>
            </div>
        </div>
    )
}

export default Footer;