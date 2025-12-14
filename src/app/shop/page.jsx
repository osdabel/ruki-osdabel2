"use client";

import { useState, useEffect, useRef } from "react";
import "./shop.css";
import Footer from "@/components/alwaysUsed/Footer";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);

  // --- FLOATING CART SECTION DETEC ---
  const shopRef = useRef(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShowCart(true); 
          } else {
            setShowCart(false);
          }
        });
      },
      { threshold: 0.3 } 
    );

    if (shopRef.current) observer.observe(shopRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* FLOATING CART — */}
{showCart && (
  <div
    className="
      fixed top-20 right-4 
      z-[9999]
      flex items-center justify-center
    "
  >
    <button
      className="
        relative
        w-14 h-14
        rounded-2xl
        backdrop-blur-xl
        bg-white/20
        border border-white/30
        shadow-lg
        flex items-center justify-center
        hover:scale-110
        active:scale-95
        transition-all duration-200
      "
    >
      {/* SVG CART ICON */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="gray"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-md"
      >
        <circle cx="9" cy="21" r="1.5" />
        <circle cx="18" cy="21" r="1.5" />
        <path d="M3 3h2l3.6 10.59A2 2 0 0 0 10.5 15h7.8a2 2 0 0 0 1.92-1.47L23 6H6" />
      </svg>

      {/* BADGE */}
      <span
        className="
          absolute -top-1 -right-1 
          bg-gradient-to-br from-yellow-300 to-yellow-500
          text-black text-xs font-bold
          w-5 h-5 flex items-center justify-center
          rounded-full shadow-md
        "
      >
        3
      </span>
    </button>
  </div>
)}


      {/* HERO SECTION */}
      <section className="hero-container">
        {/* VIDEO */}
        {showVideo && (
          <video
            src="/FlowerFess.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setShowVideo(false)}
            className="hero-media"
          />
        )}

        {/* IMAGE */}
        {!showVideo && (
          <img src="/FlowerFess_img.jpg" alt="last frame" className="hero-media" />
        )}

        {/* FLOATING HEART PARTICLES */}
        <div className="floating-hearts">
          {Array.from({ length: 8 }).map((_, i) => {
            const emojis = ["💖", "🦋", "✨", "🌸", "💐", "💖", "🌹"];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            return (
              <span
                key={i}
                className="heart-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${16 + Math.random() * 18}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${5 + Math.random() * 4}s`,
                  transform: `rotate(${Math.random() * 40 - 20}deg)`,
                }}
              >
                {randomEmoji}
              </span>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="center-btn">
          <button className="romantic-btn">
            <span className="btn-wave"></span>
            <span className="btn-pulse"></span>
            <span className="emoji">❤️</span>
            Beli Sekarang
          </button>
        </div>
      </section>

      {/* SHOP SECTION */}
      <section
        ref={shopRef}
        className="w-screen bg-white pt-6 px-4 mt-[-70] pb-50"
      >
        {/* TITLE */}
        <div className="mb-5">
          <h1
            className="
              text-[22px] font-bold 
              bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 
              bg-clip-text text-transparent
            "
          >
            Produk Osdabel
          </h1>

          <p className="text-gray-500 text-sm mt-1 leading-tight">
            Temukan Produk Favoritmu dan Beli Sekarang !
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-4">
          <div
            className="
              flex items-center gap-2 
              bg-white border border-gray-300 
              rounded-xl shadow-sm 
              px-3 py-2
              focus-within:border-pink-500
              transition-all duration-200
            "
          >
            <span className="text-gray-400 text-lg">🔍</span>

            <input
              type="text"
              placeholder="Cari produk OSDABEL..."
              className="
                w-full bg-transparent 
                text-sm text-gray-700 
                placeholder-gray-400 
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                bg-white rounded-xl shadow-md
                overflow-hidden
                border border-gray-200
                hover:shadow-lg 
                hover:scale-[1.02]
                active:scale-[0.97]
                transition-all duration-200
              "
            >
              <div className="relative w-full aspect-square bg-gray-200">
                <img
                  src="/your-product.jpg"
                  alt="Produk"
                  className="w-full h-full object-cover"
                />

                <span
                  className="
                    absolute top-2 left-2 
                    bg-pink-500 text-white text-xs
                    px-2 py-1 rounded-md shadow
                  "
                >
                  -45%
                </span>
              </div>

              <div className="px-3 py-2">
                <h2 className="text-sm font-semibold text-gray-700 leading-tight">
                  Nama Produk OSDABEL 
                </h2>

                <p className="text-pink-600 font-bold mt-1 text-base">Rp 25.000</p>

                <p className="text-gray-400 text-xs mt-1">80+ pre order</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
