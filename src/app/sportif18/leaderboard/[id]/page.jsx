'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LeaderboardDetail({ params }) {
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Add cache busting to prevent stale data
                const res = await fetch('/api/admin/sportif18', {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    const comp = data.competitions.find(c => c.id === parseInt(params.id));
                    setCompetition(comp);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Auto-refresh every 10 seconds to get latest data
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
                Loading Leaderboard...
            </div>
        );
    }

    if (!competition) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Lomba Tidak Ditemukan</h2>
                <Link href="/sportif18" className="text-blue-600 hover:text-blue-800 font-medium">
                    &larr; Kembali ke Menu Utama
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans mb-20">
            {/* Header */}
            <div className={`w-full bg-white border-b ${competition.color} border-b-4 px-6 py-6 shadow-sm sticky top-0 z-20`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/sportif18" className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                <span>{competition.icon}</span>
                                {competition.title}
                            </h1>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leaderboard & Standings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Bracket View (for Tournament System) */}
                    {(competition.bracket || competition.bracketLeft) ? (
                        <div className="space-y-8">
                            {/* Bracket Visualization */}
                            <div>
                                <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🏆</span> Bagan Pertandingan
                                </h3>

                                {competition.bracketType === 'double' && competition.bracketLeft ? (
                                    <div className="overflow-x-auto pb-8 pt-4">
                                        <div className="flex flex-row gap-6 w-max mx-auto items-center px-4">
                                            {/* Left Side */}
                                            <div className="flex gap-6">
                                                {competition.bracketLeft.map((round, rIdx) => (
                                                    <div key={rIdx} className="w-[260px] flex flex-col gap-4">
                                                        <div className="bg-blue-100/50 text-blue-700 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-100 shadow-sm">
                                                            {round.round}
                                                        </div>
                                                        <div className="flex flex-col justify-around h-full gap-4">
                                                            {round.matches.map((match, mIdx) => (
                                                                <div key={mIdx} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm relative group hover:shadow-md transition-shadow">
                                                                    <div className={`flex justify-between items-center mb-2 pb-2 border-b border-gray-50 ${match.result1 === 'win' ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                        <span className="text-sm truncate">{match.team1}</span>
                                                                        {match.result1 && <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${match.result1 === 'win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{match.result1 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                                    </div>
                                                                    <div className={`flex justify-between items-center ${match.result2 === 'win' ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                        <span className="text-sm truncate">{match.team2}</span>
                                                                        {match.result2 && <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${match.result2 === 'win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{match.result2 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Center Final */}
                                            <div className="flex-none z-10 flex flex-col justify-center w-[300px]">
                                                <div className="bg-yellow-100 text-yellow-800 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-yellow-200 mb-6 shadow-sm">
                                                    Grand Final
                                                </div>
                                                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-400 rounded-2xl p-6 shadow-xl relative transform scale-110 mx-2">
                                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-[10px] font-black shadow-lg uppercase tracking-widest ring-4 ring-white">CHAMPION</div>
                                                    {competition.grandFinal.matches.map((match, mIdx) => (
                                                        <div key={mIdx}>
                                                            <div className={`flex justify-between items-center mb-4 pb-4 border-b border-yellow-100 ${match.result1 === 'win' ? 'font-bold text-gray-900 text-xl' : 'text-gray-500'}`}>
                                                                <span className="truncate">{match.team1}</span>
                                                                {match.result1 && <span className={`px-3 py-1 rounded-lg text-xs font-black ${match.result1 === 'win' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{match.result1 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                            </div>
                                                            <div className={`flex justify-between items-center ${match.result2 === 'win' ? 'font-bold text-gray-900 text-xl' : 'text-gray-500'}`}>
                                                                <span className="truncate">{match.team2}</span>
                                                                {match.result2 && <span className={`px-3 py-1 rounded-lg text-xs font-black ${match.result2 === 'win' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{match.result2 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="absolute -bottom-10 left-0 w-full text-center">
                                                        <span className="text-[10px] text-yellow-600/50 font-medium">Grand Final Match</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side */}
                                            <div className="flex gap-6">
                                                {competition.bracketRight.slice().reverse().map((round, rIdx) => (
                                                    <div key={rIdx} className="w-[260px] flex flex-col gap-4">
                                                        <div className="bg-red-100/50 text-red-700 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-red-100 shadow-sm">
                                                            {round.round}
                                                        </div>
                                                        <div className="flex flex-col justify-around h-full gap-4">
                                                            {round.matches.map((match, mIdx) => (
                                                                <div key={mIdx} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm relative group hover:shadow-md transition-shadow">
                                                                    <div className={`flex justify-between items-center mb-2 pb-2 border-b border-gray-50 ${match.result1 === 'win' ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                        {match.result1 && <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${match.result1 === 'win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{match.result1 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                                        <span className="text-sm truncate text-right flex-1">{match.team1}</span>
                                                                    </div>
                                                                    <div className={`flex justify-between items-center ${match.result2 === 'win' ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                        {match.result2 && <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${match.result2 === 'win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{match.result2 === 'win' ? 'WIN' : 'LOSE'}</span>}
                                                                        <span className="text-sm truncate text-right flex-1">{match.team2}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto pb-6">
                                        <div className="flex gap-6 min-w-full md:w-max mx-auto justify-start md:justify-center px-4">
                                            {competition.bracket.map((round, rIdx) => (
                                                <div key={rIdx} className="min-w-[260px] md:min-w-0 md:w-full flex flex-col gap-4 snap-center">
                                                    <div className="bg-blue-100/50 text-blue-700 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-100 sticky top-0">
                                                        {round.round}
                                                    </div>
                                                    <div className="flex flex-col justify-around h-full gap-4">
                                                        {round.matches.map((match, mIdx) => (
                                                            <div key={mIdx} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative group hover:shadow-md transition-shadow">
                                                                {/* Team 1 */}
                                                                <div className={`flex justify-between items-center mb-2 pb-2 border-b border-gray-50 ${match.score1 > match.score2 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[10px] border border-gray-200">A</div>
                                                                        <span className="text-sm">{match.team1}</span>
                                                                    </div>
                                                                    {match.score1 !== null && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{match.score1}</span>}
                                                                </div>
                                                                {/* Team 2 */}
                                                                <div className={`flex justify-between items-center ${match.score2 > match.score1 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[10px] border border-gray-200">B</div>
                                                                        <span className="text-sm">{match.team2}</span>
                                                                    </div>
                                                                    {match.score2 !== null && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{match.score2}</span>}
                                                                </div>
                                                                {/* Status Indicator */}
                                                                {match.score1 === null && (
                                                                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full border-2 border-white"></div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Schedule List */}
                            {competition.schedule && (
                                <div>
                                    <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="text-xl">📅</span> Jadwal Pertandingan
                                    </h3>
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="divide-y divide-gray-50">
                                            {competition.schedule.map((game, gIdx) => (
                                                <div key={gIdx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/30 transition-colors border-b border-gray-50 last:border-0 relative group">
                                                    <div className="flex items-start gap-4 w-full">
                                                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-2 min-w-[60px] h-[60px] shrink-0 border border-gray-100">
                                                            <span className="text-xs font-bold text-gray-500">{game.time}</span>
                                                            <span className="text-[10px] text-gray-400">WIB</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-gray-800 text-sm mb-1 break-words leading-snug">{game.match}</h4>
                                                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${game.status === 'Live' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' :
                                                                    game.status === 'Completed' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                                    }`}>
                                                                    {game.status}
                                                                </span>
                                                                <span className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12" className="fill-gray-300"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
                                                                    {game.day}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:block">
                                                        <button className="text-gray-300 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-full">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="M480-320 280-520l56-56 104 104v-320h80v320l104-104 56 56-200 200Z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder for Podium (Empty for now) */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border border-gray-200 border-dashed">
                                <span className="text-4xl mb-2 block grayscale opacity-50">🏆</span>
                                <h4 className="font-bold text-gray-400">Juara Belum Ditentukan</h4>
                                <p className="text-xs text-gray-400 mt-1">Podium akan muncul setelah babak Final selesai.</p>
                            </div>
                        </div>
                    ) : (
                        // Standard Leaderboard View (Podium + Table)
                        <>
                            {/* Top 3 Podium (If data exists and rank is numeric) */}
                            {competition.leaderboard && competition.leaderboard.length >= 3 && (
                                <div className="flex justify-center items-end gap-3 mb-10 h-40">
                                    {/* 2nd Place */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <div className="text-center mb-2">
                                            <span className="text-xs font-bold text-gray-500 line-clamp-1">{competition.leaderboard[1].team}</span>
                                            <span className="text-[10px] text-gray-400">{competition.leaderboard[1].wins || 0}W - {competition.leaderboard[1].losses || 0}L</span>
                                        </div>
                                        <div className="w-full h-24 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg flex items-end justify-center pb-2 shadow-inner relative">
                                            <span className="text-3xl font-black text-white/50 absolute bottom-0">2</span>
                                            <div className="w-8 h-8 rounded-full bg-gray-400 text-white font-bold flex items-center justify-center border-2 border-white shadow-lg -mt-4 absolute -top-4">2</div>
                                        </div>
                                    </div>

                                    {/* 1st Place */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <div className="text-center mb-2">
                                            <span className="text-xs font-bold text-yellow-600 line-clamp-1">{competition.leaderboard[0].team}</span>
                                            <span className="text-[10px] text-yellow-500 font-bold">{competition.leaderboard[0].wins || 0}W - {competition.leaderboard[0].losses || 0}L</span>
                                        </div>
                                        <div className="w-full h-32 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg flex items-end justify-center pb-2 shadow-lg shadow-yellow-200 relative">
                                            <span className="text-4xl font-black text-white/50 absolute bottom-0">1</span>
                                            <div className="w-10 h-10 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center border-2 border-white shadow-lg -mt-5 absolute -top-5 text-xl">1</div>
                                            <div className="absolute -top-12 text-2xl">👑</div>
                                        </div>
                                    </div>

                                    {/* 3rd Place */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <div className="text-center mb-2">
                                            <span className="text-xs font-bold text-orange-700 line-clamp-1">{competition.leaderboard[2].team}</span>
                                            <span className="text-[10px] text-orange-500">{competition.leaderboard[2].wins || 0}W - {competition.leaderboard[2].losses || 0}L</span>
                                        </div>
                                        <div className="w-full h-16 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-lg flex items-end justify-center pb-2 shadow-inner relative">
                                            <span className="text-3xl font-black text-white/50 absolute bottom-0">3</span>
                                            <div className="w-8 h-8 rounded-full bg-orange-400 text-white font-bold flex items-center justify-center border-2 border-white shadow-lg -mt-4 absolute -top-4">3</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Full List */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">Klasemen Lengkap</h3>
                                    <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-200">
                                        Total: {competition.leaderboard?.length || 0} Tim
                                    </span>
                                </div>
                                {competition.leaderboard && competition.leaderboard.length > 0 ? (
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                            <tr>
                                                <th className="px-4 py-3 w-12 text-center">#</th>
                                                <th className="px-4 py-3">Tim / Peserta</th>
                                                <th className="px-4 py-3 text-right">W - L</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {competition.leaderboard.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-4 py-3 text-center">
                                                        {idx < 3 ? (
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto
                                                        ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'}
                                                     `}>
                                                                {item.rank}
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 font-medium text-sm">{item.rank}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="font-bold text-gray-800 text-sm">{item.team}</div>
                                                        {item.notes && <div className="text-[10px] text-gray-400 mt-0.5">{item.notes}</div>}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <span className="font-mono font-bold text-blue-600 text-sm">{item.wins || 0}W - {item.losses || 0}L</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-400">
                                        <div className="text-4xl mb-2">📉</div>
                                        <p className="text-sm">Belum ada data klasemen untuk lomba ini.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
