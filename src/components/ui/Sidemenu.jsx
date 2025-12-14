"use client"
import { useState, useEffect } from "react";
import Link from "next/link";


const Sidemenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Tutup menu ketika klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest("#menuButton") && !e.target.closest("#sideMenu")) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    return (
        <>

            {/* ======== TOP MENU BAR ======== */}
            <div
                id="menuButton"
                className="fixed top-14 left-0 w-full h-max z-30 flex items-center gap-2 px-4 cursor-pointer bg-white/70 backdrop-blur-md py-2 shadow-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    // X icon
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#000000">
                        <path d="M256-256 480-480 704-256l48-48-224-224 224-224-48-48-224 224-224-224-48 48 224 224-224 224 48 48Z" />
                    </svg>
                ) : (
                    // Hamburger icon
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#000000">
                        <path d="M160-269.23v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.77v-40h640v40H160Z" />
                    </svg>
                )}
                <h1 className="text-blue-500 font-semibold">Menu</h1>
            </div>

            {/* ======== SIDE MENU (di bawah menu bar) ======== */}
            <div
                id="sideMenu"
                className={`fixed left-0 top-[90px] w-screen h-max bg-white shadow-lg z-20 transform transition-transform duration-300 rounded-br-2xl border-t border-gray-200 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <ul className="flex flex-col gap-3 p-5 text-gray-700 font-semibold">
                    <Link href={'/sportif18'}>
                        <li className="hover:text-blue-500 cursor-pointer">Sportif18</li>
                    </Link>
                </ul>
            </div>

            {/* ======== OVERLAY (klik luar untuk tutup) ======== */}
            {isMenuOpen && (
                <div className="fixed top-[90px] left-0 w-full h-full bg-black/30 z-10"></div>
            )}
        </>
    )
}

export default Sidemenu;
