'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  /* ========== DATE & TIME ========== */
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Jakarta" };
      const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" };

      setCurrentDate(new Intl.DateTimeFormat("id-ID", optionsDate).format(now));
      setCurrentTime(new Intl.DateTimeFormat("id-ID", optionsTime).format(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ========== CART STATE (format: id, name, price, qty, image) ========== */
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Produk Osdabel ",
      price: 25000,
      qty: 1,
      image: "/your-product.jpg",
    },
    {
      id: 2,
      name: "Paket Plus Osdabel - Bonus Stiker & Packaging Eksklusif",
      price: 35000,
      qty: 2,
      image: "/your-product.jpg",
    },
  ]);

  const increase = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrease = (id) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty - 1) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  /* ========== RENDER ========== */
  return (
    <div className="w-screen h-max pb-20 bg-blue-100 pt-0.5"> <div className="w-full h-max mt-4 flex justify-around items-center"> <h2 className="text-xl font-bold">{currentDate}</h2> <h2 className="text-3xl">{currentTime}</h2> </div>

{/* ======== MAIN CONTENT ======== */} <div className="w-screen h-max px-4 mt-4 relative z-0"> <div className="w-full h-max bg-white rounded-lg p-4 pb-10 mb-5"> <div className="w-full h-43"> <div className="bg-blue-500 w-full h-28 rounded-lg"></div> <div className="w-25 h-25 bg-gray-200 rounded-full relative top-[-49] left-5 flex items-center justify-center overflow-hidden"> <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#000000"><path d="M480-504.62q-49.5 0-84.75-35.25T360-624.62q0-49.5 35.25-84.75T480-744.62q49.5 0 84.75 35.25T600-624.62q0 49.5-35.25 84.75T480-504.62ZM200-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q760-306 760-281.23v65.85H200Zm40-40h480v-25.85q0-13.31-8.58-25-8.57-11.69-23.73-19.77-49.38-23.92-101.83-36.65-52.45-12.73-105.86-12.73t-105.86 12.73Q321.69-349.92 272.31-326q-15.16 8.08-23.73 19.77-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z"/></svg> </div> </div> <div className="w-full h-max px-6"> <div className="flex justify-between pb-2"> <h3 className="font-bold">Guest_1</h3> <div><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m405.38-120-14.46-115.69q-19.15-5.77-41.42-18.16-22.27-12.38-37.88-26.53L204.92-235l-74.61-130 92.23-69.54q-1.77-10.84-2.92-22.34-1.16-11.5-1.16-22.35 0-10.08 1.16-21.19 1.15-11.12 2.92-25.04L130.31-595l74.61-128.46 105.93 44.61q17.92-14.92 38.77-26.92 20.84-12 40.53-18.54L405.38-840h149.24l14.46 116.46q23 8.08 40.65 18.54 17.65 10.46 36.35 26.15l109-44.61L829.69-595l-95.31 71.85q3.31 12.38 3.7 22.73.38 10.34.38 20.42 0 9.31-.77 19.65-.77 10.35-3.54 25.04L827.92-365l-74.61 130-107.23-46.15q-18.7 15.69-37.62 26.92-18.92 11.23-39.38 17.77L554.62-120H405.38ZM440-160h78.23L533-268.31q30.23-8 54.42-21.96 24.2-13.96 49.27-38.27L736.46-286l39.77-68-87.54-65.77q5-17.08 6.62-31.42 1.61-14.35 1.61-28.81 0-15.23-1.61-28.81-1.62-13.57-6.62-29.88L777.77-606 738-674l-102.08 42.77q-18.15-19.92-47.73-37.35-29.57-17.42-55.96-23.11L520-800h-79.77l-12.46 107.54q-30.23 6.46-55.58 20.81-25.34 14.34-50.42 39.42L222-674l-39.77 68L269-541.23q-5 13.46-7 29.23t-2 32.77q0 15.23 2 30.23t6.23 29.23l-86 65.77L222-286l99-42q23.54 23.77 48.88 38.12 25.35 14.34 57.12 22.34L440-160Zm38.92-220q41.85 0 70.93-29.08 29.07-29.07 29.07-70.92t-29.07-70.92Q520.77-580 478.92-580q-42.07 0-71.04 29.08-28.96 29.07-28.96 70.92t28.96 70.92Q436.85-380 478.92-380ZM480-480Z"/></svg></div> </div> <div className="w-full h-max flex gap-4 justify-between"> <div># 0081234</div> <div>[...kelas...]</div> </div> <div className="w-full h-max flex gap-4 justify-between text-sm"> <div>[Gmail]</div> <div>[No Hp]</div> </div> </div> </div> </div>

      {/* MAIN LAYOUT */}
      <div className="w-full max-w-5xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
    


        {/* MAIN CONTENT (Profile + Cart) */}
        <main className="lg:col-span-2 flex flex-col gap-6">
          {/* PROFILE CARD */}
          

          {/* CART CARD (Pilihan B - terpisah & premium) */}
          <section className="bg-white rounded-xl shadow-sm p-4 border border-pink-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-pink-600">Keranjang Belanja</h2>
              <p className="text-sm text-gray-500">{cart.length} item</p>
            </div>

            {/* EMPTY */}
            {cart.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Keranjang kosong — <Link href="#" className="text-pink-600 underline">Mulai belanja</Link>
              </div>
            )}

            {/* CART LIST */}
            <div className="flex flex-col gap-3">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  {/* IMAGE */}
                  <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    {/* title (wrap aman) */}
                    <h3 className="text-sm font-medium text-gray-800 leading-snug break-words">
                      {item.name}
                    </h3>

                    {/* variant/notes area (optional) */}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="text-pink-600 font-semibold text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-gray-400 mt-1">Subtotal: Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                      </div>

                      {/* QTY + ACTIONS */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-md p-1 border">
                          <button
                            onClick={() => decrease(item.id)}
                            aria-label="Kurangi"
                            className="w-7 h-7 rounded-md flex items-center justify-center text-pink-600 hover:bg-pink-50"
                          >
                            −
                          </button>
                          <div className="text-sm font-medium w-6 text-center">{item.qty}</div>
                          <button
                            onClick={() => increase(item.id)}
                            aria-label="Tambah"
                            className="w-7 h-7 rounded-md flex items-center justify-center bg-pink-600 text-white hover:brightness-110"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER: TOTAL + CHECKOUT */}
            {cart.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-extrabold text-pink-600">Rp {total.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 rounded-xl bg-white border border-pink-200 text-pink-600 font-semibold shadow-sm hover:shadow-md"
                  >
                    Masukkan Keranjang
                  </button>

                  <button
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-semibold shadow-md"
                  >
                    Checkout Sekarang
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* BONUS: quick links or recommendations */}
          <section className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <h4 className="font-semibold mb-2">Rekomendasi Untukmu</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-gray-50 rounded-lg p-2 flex flex-col items-start">
                  <div className="w-full aspect-square bg-gray-200 rounded-md overflow-hidden">
                    <img src="/your-product.jpg" alt="rec" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-gray-700 mt-2 line-clamp-2">Produk rekomendasi contoh {i}</p>
                  <p className="text-pink-600 font-semibold text-sm mt-1">Rp 19.000</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
