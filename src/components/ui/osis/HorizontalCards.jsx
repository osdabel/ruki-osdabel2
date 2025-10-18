'use client'

import { useRef, useState } from "react";

const cards = [1,2,3,4]; // ganti dengan data nyata

export default function HorizontalCards() {
  const sliderRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // mouse events (desktop)
  function onMouseDown(e){
    const slider = sliderRef.current;
    isDownRef.current = true;
    slider.classList.add("active"); // optional: styling saat drag
    startXRef.current = e.pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
  }
  function onMouseLeave(){
    isDownRef.current = false;
  }
  function onMouseUp(){
    isDownRef.current = false;
    const slider = sliderRef.current;
    slider && slider.classList.remove("active");
  }
  function onMouseMove(e){
    if(!isDownRef.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startXRef.current; // distance moved
    slider.scrollLeft = scrollLeftRef.current - walk;
  }

  // touch events (mobile)
  function onTouchStart(e){
    const slider = sliderRef.current;
    startXRef.current = e.touches[0].pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
  }
  function onTouchMove(e){
    const slider = sliderRef.current;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = x - startXRef.current;
    slider.scrollLeft = scrollLeftRef.current - walk;
  }

  // optional: arrow buttons to scroll programmatically
  function scrollBy(amount){
    sliderRef.current && sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-end gap-2 mb-3">
        {/* arrow controls */}
        <button aria-label="left" onClick={() => scrollBy(-300)} className="p-2 bg-gray-200 rounded-full">‹</button>
        <button aria-label="right" onClick={() => scrollBy(300)} className="p-2 bg-gray-200 rounded-full">›</button>
      </div>

      <div
        ref={sliderRef}
        className="
          flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded
          snap-x snap-mandatory px-2 py-1 cursor-grab active:cursor-grabbing
        "
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className="min-w-[280px] flex-shrink-0 snap-start"
          >
            <div className="bg-blue-300 w-full h-110 mt-0 rounded-lg">
              <div className="foto bg-gray-900 w-full h-50 rounded-tl-lg rounded-tr-lg">
                {/* isi foto */}
              </div>
              <div className="p-4">
                <h3 className="font-bold">(Tahap Developing...) {c}</h3>
                <p className="text-sm opacity-70">Deskripsi singkat program kerja.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
