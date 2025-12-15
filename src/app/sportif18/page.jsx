'use client';
import Link from "next/link";
import Footer from "@/components/alwaysUsed/Footer";
import CompetitionList from "@/components/ui/sportif18/CompetitionList";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sportif18 = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedDay, setSelectedDay] = useState(null);
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState(null);
    const [competitions, setCompetitions] = useState([]);
    const [routes, setRoutes] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [complaintCode, setComplaintCode] = useState('');

    const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

    // Registration State
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isMLFormOpen, setIsMLFormOpen] = useState(false);
    const [mlFormData, setMlFormData] = useState({ name: '', class: '', teamName: '', phone: '' });
    const [isSubmittingML, setIsSubmittingML] = useState(false);
    const [selectedCompForReg, setSelectedCompForReg] = useState(null);

    useEffect(() => {
        // Fetch Admin Data
        const fetchAdminData = async () => {
            try {
                const res = await fetch('/api/admin/sportif18', {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCompetitions(data.competitions || []);
                    setRoutes(data.routes || {});
                }
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchAdminData();

        // Realtime clock timer
        const clockTimer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Countdown timer
        const targetDate = new Date('2025-12-16T06:30:00');
        const countdownTimer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => {
            clearInterval(clockTimer);
            clearInterval(countdownTimer);
        };
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
    };

    // Logic for active days
    const today = currentTime.getDate();
    const currentMonth = currentTime.getMonth(); // 0-indexed (11 is December)
    const activeDays = [];

    // Assuming event is in December (month 11)
    if (currentMonth === 11) {
        if (today >= 16) activeDays.push('Selasa');
        if (today >= 17) activeDays.push('Rabu');
        if (today >= 18) activeDays.push('Kamis');
        if (today >= 19) activeDays.push('Jumat');
    }

    // Animation Variants - Clean & Smooth (Google-like)
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 }
        }
    };

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const countdownContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const countdownItemVariant = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.8, 0.2, 1] // Very smooth custom bezier curve
            }
        }
    };

    // Distinct animations for Menu Items - Smooth & Matched
    const smoothTransition = {
        duration: 0.8,
        ease: "easeInOut"
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: smoothTransition
        }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: smoothTransition
        }
    };

    const fadeInBottom = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: smoothTransition
        }
    };

    const handleCompetitionClick = (comp) => {
        if (comp.title.toLowerCase().includes('mobile legend')) {
            setSelectedCompForReg(comp);
            setIsRegistrationModalOpen(false);
            setIsMLFormOpen(true);
        } else {
            // WhatsApp redirection for other competitions
            const cp = comp.cps[0]; // Get the first CP
            if (cp) {
                const message = `Halo, saya ingin mendaftar untuk lomba ${comp.title} di Sportif 18.`;
                const whatsappUrl = `https://wa.me/${cp.phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            } else {
                alert('Maaf, kontak person belum tersedia untuk lomba ini.');
            }
        }
    };

    const handleMLSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCompForReg) return;

        setIsSubmittingML(true);
        try {
            const res = await fetch('/api/registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    competitionId: selectedCompForReg.id,
                    ...mlFormData
                }),
            });

            if (res.ok) {
                alert('Pendaftaran berhasil! Terima kasih telah mendaftar.');
                setIsMLFormOpen(false);
                setMlFormData({ name: '', class: '', teamName: '', phone: '' });
                setSelectedCompForReg(null);
            } else {
                const errorData = await res.json();
                alert(`Gagal mendaftar: ${errorData.error || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        } finally {
            setIsSubmittingML(false);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-gray-50 overflow-x-hidden relative">
            {/* Modal Popup */}
            <AnimatePresence>
                {selectedDay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => {
                            setSelectedDay(null);
                            setTimeout(() => {
                                setShowComplaintForm(false);
                                setShowComplaintInfo(false);
                            }, 300);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >

                            <AnimatePresence mode="wait">
                                {!showComplaintForm ? (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-6 pb-2 flex justify-between items-center">
                                            <h3 className="font-medium text-2xl text-gray-800">{selectedDay.name}</h3>
                                            <button onClick={() => setSelectedDay(null)} className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                            </button>
                                        </div>

                                        <div className="p-6 pt-2 flex flex-col gap-3">
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                            >
                                                <Link href={routes[selectedDay.name.toLowerCase()] || '#'} className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/60 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 transition-all duration-200 group w-full">
                                                    <div className="w-9 h-9 rounded-full bg-white border border-blue-200 text-blue-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform shadow-sm">📸</div>
                                                    <h4 className="font-bold text-blue-900 group-hover:text-blue-700">Lihat Galeri Dokumentasi</h4>
                                                </Link>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15, duration: 0.3 }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        const randomCode = 'KEL-' + Math.floor(100 + Math.random() * 900) + '-' + Math.random().toString(36).substring(2, 5).toUpperCase();
                                                        setComplaintCode(randomCode);
                                                        setShowComplaintForm(true);
                                                    }}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-orange-50/60 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 transition-all duration-200 group text-left w-full"
                                                >
                                                    <div className="w-9 h-9 rounded-full bg-white border border-orange-200 text-orange-500 flex items-center justify-center text-lg group-hover:scale-110 transition-transform shadow-sm">📢</div>
                                                    <h4 className="font-bold text-orange-900 group-hover:text-orange-700">Sampaikan Keluhan</h4>
                                                </button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ) : showComplaintInfo ? (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100 mb-4 bg-gray-50/50">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setShowComplaintInfo(false)} className="p-1.5 -ml-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
                                                </button>
                                                <h3 className="font-bold text-xl text-gray-800">Cara Kerja</h3>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                                                    <div className="h-full w-0.5 bg-blue-100 my-1"></div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Tulis & Simpan Kode</h4>
                                                    <p className="text-sm text-gray-500">Tulis keluhan Anda dan simpan Kode Tiket unik yang diberikan.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                                                    <div className="h-full w-0.5 bg-blue-100 my-1"></div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Dicatat Sistem</h4>
                                                    <p className="text-sm text-gray-500">Keluhan Anda disimpan secara aman di database kami.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                                                    <div className="h-full w-0.5 bg-blue-100 my-1"></div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Evaluasi Panitia</h4>
                                                    <p className="text-sm text-gray-500">Panitia akan membaca dan mengevaluasi keluhan tersebut.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">4</div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Feedback</h4>
                                                    <p className="text-sm text-gray-500">Cek respon atau tindak lanjut panitia pada section khusus nanti.</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShowComplaintInfo(false)}
                                                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all"
                                            >
                                                Mengerti, Kembali
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100 mb-4 bg-gray-50/50">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setShowComplaintForm(false)} className="p-1.5 -ml-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
                                                </button>
                                                <h3 className="font-bold text-xl text-gray-800">Sampaikan Keluhan</h3>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0">
                                            <button onClick={() => setShowComplaintInfo(true)} className="w-full text-center text-xs text-blue-500 hover:text-blue-700 hover:underline mb-4 font-medium transition-colors">
                                                (Klik disini untuk lihat cara kerja)
                                            </button>

                                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl mb-4 text-center">
                                                <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-1">Kode Tiket Keluhan</p>
                                                <p className="text-2xl font-black text-orange-500 font-mono tracking-widest">{complaintCode}</p>
                                                <p className="text-[10px] text-orange-400 mt-1">Simpan kode ini untuk mengecek status keluhan Anda nanti.</p>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Keluhan Anda</label>
                                                <textarea
                                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm min-h-[120px] resize-none text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all"
                                                    placeholder="Tuliskan keluhan Anda secara detail di sini..."
                                                ></textarea>
                                            </div>

                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95 flex items-center justify-center gap-2">
                                                <span>🚀</span> Kirim Keluhan
                                            </button>
                                            <p className="text-center text-xs text-gray-400 mt-3">Identitas Anda dirahasiakan sepenuhnya.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rules Modal */}
            <AnimatePresence>
                {isRulesModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => {
                            setIsRulesModalOpen(false);
                            setTimeout(() => setSelectedRule(null), 300); // Reset selection after close
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    {selectedRule && (
                                        <button
                                            onClick={() => setSelectedRule(null)}
                                            className="p-1.5 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
                                        </button>
                                    )}
                                    <h3 className="font-bold text-xl text-gray-800">
                                        {selectedRule ? selectedRule.title : "Peraturan Lomba"}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsRulesModalOpen(false);
                                        setTimeout(() => setSelectedRule(null), 300);
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition-colors bg-gray-100 p-2 rounded-full hover:bg-red-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {loadingData ? (
                                        <div className="text-center text-gray-400 py-10">Loading data...</div>
                                    ) : !selectedRule ? (
                                        <motion.div
                                            key="list"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="grid grid-cols-1 gap-3"
                                        >
                                            <p className="text-gray-500 text-sm mb-2">Pilih cabang lomba untuk melihat detail peraturan teknis.</p>
                                            {competitions.map((comp) => (
                                                <div
                                                    key={comp.id}
                                                    onClick={() => setSelectedRule(comp)}
                                                    className={`flex items-center justify-between p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group active:scale-[0.98]`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xl shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                                                            {comp.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{comp.title}</h4>
                                                            <span className="text-xs text-gray-400 group-hover:text-blue-400">Klik untuk detail</span>
                                                        </div>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-gray-300 group-hover:fill-blue-400 transition-colors"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
                                                </div>
                                            ))}
                                            {competitions.length === 0 && <p className="text-center text-gray-400 italic">Belum ada data lomba.</p>}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="detail"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-4"
                                        >
                                            <div className={`p-4 rounded-xl bg-blue-50 border ${selectedRule.color} border-l-4 mb-4`}>
                                                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                                    <span className="text-xl">{selectedRule.icon}</span>
                                                    Peraturan Teknis {selectedRule.title}
                                                </h4>
                                                <p className="text-sm text-blue-700/80">
                                                    Berikut adalah aturan wajib yang harus dipatuhi oleh setiap peserta lomba {selectedRule.title}.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {selectedRule.rules && selectedRule.rules.length > 0 ? (
                                                    selectedRule.rules.map((rule, idx) => (
                                                        <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{rule}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 italic">Belum ada peraturan spesifik untuk lomba ini.</p>
                                                )}
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <p className="text-xs text-gray-400 italic text-center">
                                                    *Keputusan panitia bersifat mutlak. Jika ada pertanyaan lebih lanjut, silakan hubungi Contact Person yang tersedia.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>

            <AnimatePresence>
                {isLeaderboardModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsLeaderboardModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-xl text-gray-800">
                                        🏆 Leaderboard
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsLeaderboardModalOpen(false)}
                                    className="text-gray-400 hover:text-red-500 transition-colors bg-gray-100 p-2 rounded-full hover:bg-red-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <p className="text-gray-500 text-sm mb-4">Pilih cabang lomba untuk melihat juara sementara.</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {competitions.map((comp) => (
                                        <Link
                                            key={comp.id}
                                            href={`/sportif18/leaderboard/${comp.id}`}
                                            className={`flex items-center justify-between p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-yellow-200 hover:bg-yellow-50/50 transition-all duration-200 group active:scale-[0.98]`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-xl shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300 border border-yellow-100">
                                                    {comp.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 group-hover:text-yellow-700 transition-colors">{comp.title}</h4>
                                                    <span className="text-xs text-gray-400 group-hover:text-yellow-500">Lihat Match</span>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-gray-300 group-hover:fill-yellow-500 transition-colors"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
                                        </Link>
                                    ))}
                                    {competitions.length === 0 && <p className="text-center text-gray-400 italic">Belum ada data lomba.</p>}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Registration Choice Modal */}
            <AnimatePresence>
                {isRegistrationModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsRegistrationModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 pb-2 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-xl text-gray-800">Pilih Lomba</h3>
                                <button onClick={() => setIsRegistrationModalOpen(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">✕</button>
                            </div>
                            <div className="p-6 grid gap-3 max-h-[60vh] overflow-y-auto">
                                {competitions.map((comp) => (
                                    <div
                                        key={comp.id}
                                        onClick={() => handleCompetitionClick(comp)}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all"
                                    >
                                        <div className="text-2xl">{comp.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800">{comp.title}</h4>
                                            <p className="text-xs text-gray-500">
                                                {comp.title.toLowerCase().includes('mobile legend') ? 'Isi Formulir' : 'Via WhatsApp'}
                                            </p>
                                        </div>
                                        <div className="text-gray-300">➜</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Legends Form Modal */}
            <AnimatePresence>
                {isMLFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMLFormOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 pb-2 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-xl text-gray-800">Formulir Mobile Legends</h3>
                                <button onClick={() => setIsMLFormOpen(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">✕</button>
                            </div>
                            <form onSubmit={handleMLSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nama Ketua / Perwakilan</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                        placeholder="Nama Lengkap"
                                        value={mlFormData.name}
                                        onChange={e => setMlFormData({ ...mlFormData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Kelas</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                            placeholder="Contoh: XII RPL 1"
                                            value={mlFormData.class}
                                            onChange={e => setMlFormData({ ...mlFormData, class: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Tim</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                            placeholder="Nama Squad"
                                            value={mlFormData.teamName}
                                            onChange={e => setMlFormData({ ...mlFormData, teamName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                        placeholder="08xxxxxxxxxx"
                                        value={mlFormData.phone}
                                        onChange={e => setMlFormData({ ...mlFormData, phone: e.target.value })}
                                    />
                                </div>
                                <button type="submit" disabled={isSubmittingML} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                                    {isSubmittingML ? 'Mengirim...' : 'Kirim Pendaftaran'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <div className="w-screen h-100 bg-blue-950 text-white rounded-br-[3rem] px-6 pt-18 relative z-10 shadow-lg overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3 }}
                    variants={stagger}
                    className="max-w-4xl mx-auto relative z-20"
                >
                    <motion.h6 variants={fadeInUp} className="text-blue-300 font-semibold tracking-widest mb-2">EVENT</motion.h6>
                    <motion.h1 variants={fadeInUp} className="text-4xl font-black mb-4">SPORTIF 18</motion.h1>
                    <motion.p variants={fadeInUp} className="text-md text-blue-100 max-w-xl leading-relaxed mb-8">
                        Kegiatan SPORTIF 18 adalah kegiatan sport dan e-sport yang bertujuan untuk meningkatkan semangat kebersamaan, kekompakan, dan keaktifan siswa.
                    </motion.p>

                    {/* Countdown - Clean & Modern */}
                    <motion.div variants={countdownContainer} className="flex items-center gap-4">
                        <div className="flex gap-3">
                            {[
                                { label: 'Hari', value: timeLeft.days },
                                { label: 'Jam', value: timeLeft.hours },
                                { label: 'Menit', value: timeLeft.minutes },
                                { label: 'Detik', value: timeLeft.seconds }
                            ].map((item, index) => (
                                <motion.div key={index} variants={countdownItemVariant} className="text-center">
                                    <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-800 rounded-xl p-3 min-w-[60px] md:min-w-[70px]">
                                        <span className="text-xl md:text-2xl font-bold block font-mono">{String(item.value).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-[10px] text-blue-300 uppercase tracking-wider mt-1 block">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div variants={countdownItemVariant} className="h-px w-12 bg-blue-800 hidden md:block"></motion.div>
                        <motion.p variants={countdownItemVariant} className="text-sm text-blue-200 hidden md:block font-light italic">
                            Menuju Opening Ceremony <br /> 16 Desember 2025
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Decorative Elements - Animated */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-10 right-10 w-32 h-32 bg-blue-800 rounded-full blur-3xl"
                ></motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute bottom-10 left-10 w-24 h-24 bg-blue-600 rounded-full blur-2xl"
                ></motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Realtime Clock & Date - Clean & Minimalist */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="flex items-center gap-3 mb-6 text-sm text-gray-500 font-medium"
                >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{formatDate(currentTime)}</span>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <span>{formatTime(currentTime)}</span>
                </motion.div>

                {/* Date and Gallery Section - Clean & Modern */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3 }}
                    variants={stagger}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-5 border-b border-gray-200 pb-12"
                >
                    <motion.div variants={fadeInUp}>
                        <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Waktu Pelaksanaan</span>
                        <h2 className="text-3xl font-black text-blue-950 mt-2">16 - 19 Des 2025</h2>
                        <p className="text-gray-500 mt-2 max-w-md text-sm leading-relaxed">
                            Lihat Ringkasan dan dokumentasi harian dari kegiatan Sportif 18.
                        </p>
                        <button
                            onClick={() => setIsLeaderboardModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-sm font-bold rounded-xl shadow-lg shadow-yellow-200/50 hover:shadow-yellow-300/50 transition-all flex items-center gap-2 group"
                        >
                            <span>🏆</span> Lihat Leaderboard
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" className="fill-current group-hover:translate-x-1 transition-transform"><path d="m560-280-56-56 144-144H200v-80h448L504-704l56-56 240 240-240 240Z" /></svg>
                        </button>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="w-full md:w-auto">
                        <span className="text-gray-400 font-bold tracking-widest text-xs uppercase block mb-3">Lihat Dokumentasi</span>
                        <div className="flex flex-wrap gap-2">
                            {['Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day, index) => {
                                const eventDates = [16, 17, 18, 19]; // Dates for each day
                                const eventDate = eventDates[index];
                                const isPastOrToday = currentMonth === 11 && today >= eventDate;
                                const isActive = activeDays.includes(day);

                                return isPastOrToday ? (
                                    <motion.button
                                        key={day}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedDay({ index, name: day })}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all duration-300 ${isActive
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                            }`}
                                    >
                                        {day}
                                    </motion.button>
                                ) : (
                                    <button
                                        key={day}
                                        disabled
                                        className="px-3 py-1.5 rounded-md text-xs font-bold border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-2xl font-bold text-blue-950 mb-6"
                >
                    Menu Utama
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                    {/* Card: Pendaftaran */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        variants={fadeInLeft}
                        whileHover={{ y: -5 }}
                        onClick={() => setIsRegistrationModalOpen(true)}
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-blue-600 group-hover:fill-white transition-colors duration-300">
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm160-160h240v-80H360v80Zm0-160h240v-80H360v80Zm0-160h240v-80H360v80ZM720-640v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Pendaftaran Lomba</h3>
                        <p className="text-gray-500 text-sm mb-4">Daftarkan tim atau dirimu untuk mengikuti berbagai cabang lomba yang tersedia.</p>
                        <span className="text-blue-600 text-sm font-semibold group-hover:underline">Daftar Sekarang &rarr;</span>
                    </motion.div>

                    {/* Card: Peraturan */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        variants={fadeInBottom}
                        whileHover={{ y: -5 }}
                        onClick={() => setIsRulesModalOpen(true)}
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-blue-600 group-hover:fill-white transition-colors duration-300">
                                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Peraturan Lomba</h3>
                        <p className="text-gray-500 text-sm mb-4">Baca dan pahami peraturan teknis untuk setiap cabang lomba agar kompetisi berjalan lancar.</p>
                        <span className="text-blue-600 text-sm font-semibold group-hover:underline">Lihat Peraturan &rarr;</span>
                    </motion.div>

                    {/* Card: Leaderboard */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        variants={fadeInRight}
                        whileHover={{ y: -5 }}
                        onClick={() => setIsLeaderboardModalOpen(true)}
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-blue-600 group-hover:fill-white transition-colors duration-300">
                                <path d="M120-120v-320h160v320H120Zm240 0v-640h160v640H360Zm240 0v-480h160v480H600Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Leaderboard</h3>
                        <p className="text-gray-500 text-sm mb-4">Pantau perolehan poin dan juara dari setiap kelas secara real-time.</p>
                        <span className="text-blue-600 text-sm font-semibold group-hover:underline">Lihat Klasemen &rarr;</span>
                    </motion.div>

                </div>

                {/* Competition List Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                >
                    <CompetitionList competitions={competitions} />
                </motion.div>

                {/* General Rules Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.1 }}
                    variants={fadeInUp}
                    className="mt-16 mb-12"
                >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

                        <h2 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current">
                                    <path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-320-40q17 0 29.5-12.5T282-442q0-17-12.5-29.5T240-484q-17 0-29.5 12.5T198-442q0 17 12.5 29.5T240-400Zm320-160q17 0 29.5-12.5T602-602q0-17-12.5-29.5T560-644q-17 0-29.5 12.5T518-602q0 17 12.5 29.5T560-560Zm-320-40q17 0 29.5-12.5T282-642q0-17-12.5-29.5T240-684q-17 0-29.5 12.5T198-642q0 17 12.5 29.5T240-600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Z" />
                                </svg>
                            </span>
                            Peraturan Umum
                        </h2>

                        <div className="space-y-4 text-gray-600 relative z-10">
                            {[
                                "Siswa hadir ke sekolah jam 06.30",
                                "Berkumpul di lapangan jam 07.00",
                                {
                                    text: "Siswa mengenakan pakaian:",
                                    subitems: [
                                        "Selasa (OlahRaga)",
                                        "Rabu (Baju kelas jika punya / Training sopan)",
                                        "Kamis (Training sopan)",
                                        "Jumat (OlahRaga)",
                                    ],
                                    note: "NOTE: tidak diperbolehkan memakai sepatu berwarna putih, wajib berdominan hitam (kecuali pemain boleh, tetapi harus dibekal)"
                                },
                                "Siswa wajib mengikuti instruksi panitia sportif",
                                "Siswa diwajibkan berpartisipasi aktif dalam kegiatan sportif, baik sebagai peserta maupun pendukung",
                                "Siswa diharapkan menjunjung tinggi sportivitas dalam setiap pertandingan dan menghindari perilaku curang atau kasar.",
                                "Siswa diharapkan untuk menjaga kebersihan dan tidak ada yang membuang sampah sembarangan",
                                "Siswa pulang sekolah seperti biasa jam 15.00"
                            ].map((rule, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <div className="text-sm leading-relaxed">
                                        {typeof rule === 'string' ? (
                                            rule
                                        ) : (
                                            <div>
                                                <p className="font-semibold text-gray-700">{rule.text}</p>
                                                <ul className="mt-2 space-y-1 ml-1 border-l-2 border-blue-100 pl-3">
                                                    {rule.subitems.map((sub, sIdx) => (
                                                        <li key={sIdx} className="text-gray-500">• {sub}</li>
                                                    ))}
                                                </ul>
                                                <p className="mt-2 text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 inline-block w-full">
                                                    {rule.note}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>

            <Footer />
        </div >
    );
}

export default Sportif18;
