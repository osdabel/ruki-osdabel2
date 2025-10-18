'use client'

import React, { useEffect, useRef, useState } from "react";

const MisiOSIS = () => {
    const MAX_CHARS = 2000;
    const ALL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'.,<>?/|".split("");

    const [letters, setLetters] = useState([]);
    const [active, setActive] = useState(null);
    const timerRef = useRef(null);

    const presets = [
        {
        id: "0.1",
        title: "Misi-1 Kami,",
        subtitle: "",
        text: "Membangun Budaya Berpikir Kritis Dan\nInovatif Untuk Menyelesaikan\nPermasalahan Secara Solutif",
        },
        {
        id: "0.2",
        title: "Misi-2 Kami,",
        subtitle: "",
        text: "Peka Terhadap Lingkungan Yang\nMelibatkan Warga Sekolah",
        },
        {
        id: "0.3",
        title: "Misi-3 Kami,",
        subtitle: "",
        text: "Penataan Lingkungan Organisasi Untuk\nMembangun Kinerja Yang Optimal",
        },
        {
        id: "0.4",
        title: "Misi-4 Kami,",
        subtitle: "",
        text: "Meningkatkan Interaksi Yang Komuniktif\nDengan Ekstrakulikuler Dan\nWarga Sekolah",
        },
    ];

    useEffect(() => {
        applyPreset(presets[0]);
        return () => {
          if (timerRef.current) clearTimeout(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      function animateTo(raw) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
    
        const text = (raw || "").slice(0, MAX_CHARS);
        const chars = text.split("");
    
        setLetters(
          chars.map((c) => ({
            char: c === " " || c === "\n" || c === "\t" ? c : "",
            final: c,
          }))
        );
    
        const charCycles = 10;
        const cycleLength = 60;
        let i = 0;
    
        const step = () => {
          if (i < charCycles) {
            setLetters((prev) =>
              prev.map((p, idx) => {
                const final = chars[idx];
                if (final === " " || final === "\n" || final === "\t" || final === undefined)
                  return { ...p, char: final || "" };
                return { ...p, char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)] };
              })
            );
            i++;
            timerRef.current = setTimeout(step, cycleLength);
          } else {
            setLetters((prev) => prev.map((p, idx) => ({ ...p, char: chars[idx] || "" })));
          }
        };
    
        step();
      }
    
      function applyPreset(preset) {
        setActive(preset);
        setTimeout(() => animateTo(preset.text), 0);
      }
    




    return (
        <div className="w-screen h-150 bg-gray-900 text-white px-4 py-12">
            <div className="w-full h-max">
              <h1 className="font-bold text-2xl">osdabel</h1>
            </div>

            <div className="mt-10 border-b pb-4">
                <h2 className="opacity-50">0.1</h2>
                <h1 className="font-semibold">Visi Kami,</h1>
                <p>Aktualisasi Potensi Wujudkan Integritas Dalam Modernisasi</p>
            </div>

            <div className="mt-20 border-b pb-4">
                <h2 className="opacity-50">{active?.id}</h2>
                <h1 className="font-semibold">{active?.title}</h1>



                <p className="test animated-paragraph" style={{ whiteSpace: "pre-wrap" }}>
                    {letters.map((l, idx) =>
                        l.char === "\n" ? (
                            <br key={idx} />
                        ) : (
                            <span key={idx} className="inline-block transition-all duration-200">
                            {l.char}
                            </span>
                        )
                    )}
                </p>



            </div>

            <div className="mt-6 flex gap-3 justify-around">
                {presets.map((p, index) => (
                    <button
                    key={p.id}
                    onClick={() => applyPreset(p)}
                    className={`px-4 py-1 rounded text-md font-bold ${active?.id === p.id ? "bg-blue-600 text-blue-100" : "text-blue-50 bg-blue-400"}`}
                    >
                    {index + 1}
                    </button>
                ))}
        </div>
        </div>
    )
}

export default MisiOSIS