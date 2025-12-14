'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminSportif18() {
    const [data, setData] = useState({ routes: {}, competitions: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('competitions');
    const [editingComp, setEditingComp] = useState(null); // null = list mode, object = edit mode, {} = new mode
    const [registrations, setRegistrations] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/sportif18');
            if (!res.ok) throw new Error('Failed to fetch data');
            const jsonData = await res.json();
            setData(jsonData);

            // Fetch Registrations
            const regRes = await fetch('/api/admin/registrations');
            if (regRes.ok) {
                const regData = await regRes.json();
                setRegistrations(regData);
            }
        } catch (error) {
            console.error(error);
            showToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (newData) => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/sportif18', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData || data),
            });
            if (!res.ok) throw new Error('Failed to save data');
            showToast('Changes saved successfully!', 'success');
            if (newData) setData(newData);
        } catch (error) {
            console.error(error);
            showToast('Failed to save changes', 'error');
        } finally {
            setSaving(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // --- Competition Logic ---
    const handleSaveCompetition = (comp) => {
        let newCompetitions;
        if (comp.id) {
            // Edit existing
            newCompetitions = data.competitions.map(c => c.id === comp.id ? comp : c);
        } else {
            // Add new
            const newId = Math.max(...data.competitions.map(c => c.id), 0) + 1;
            newCompetitions = [...data.competitions, { ...comp, id: newId }];
        }

        const newData = { ...data, competitions: newCompetitions };
        setData(newData);
        saveData(newData);
        setEditingComp(null);
    };

    const handleDeleteCompetition = (id) => {
        if (!confirm('Are you sure you want to delete this competition?')) return;
        const newCompetitions = data.competitions.filter(c => c.id !== id);
        const newData = { ...data, competitions: newCompetitions };
        setData(newData);
        saveData(newData);
    };

    // --- Route Logic ---
    const handleRouteChange = (day, value) => {
        setData(prev => ({
            ...prev,
            routes: { ...prev.routes, [day]: value }
        }));
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-blue-600">Loading Admin Route...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-950 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-blue-900">
                    <h1 className="text-2xl font-black tracking-tighter">ADMIN PANEL</h1>
                    <p className="text-blue-400 text-xs mt-1">Sportif 18 Management</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('competitions')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'competitions' ? 'bg-blue-600 shadow-lg shadow-blue-900/50' : 'hover:bg-blue-900/50 text-blue-300'}`}
                    >
                        <span>🏆</span> Competitions
                    </button>
                    <button
                        onClick={() => setActiveTab('routes')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'routes' ? 'bg-blue-600 shadow-lg shadow-blue-900/50' : 'hover:bg-blue-900/50 text-blue-300'}`}
                    >
                        <span>🔗</span> Route Links
                    </button>
                    <button
                        onClick={() => setActiveTab('registrations')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'registrations' ? 'bg-blue-600 shadow-lg shadow-blue-900/50' : 'hover:bg-blue-900/50 text-blue-300'}`}
                    >
                        <span>📝</span> Registrations
                    </button>
                    <Link href="/sportif18" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/50 text-blue-300 mt-auto">
                        <span>👀</span> View Live Site
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto mb-20 overflow-x-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-blue-950 text-white p-4 flex justify-between items-center sticky top-0 z-20">
                    <h1 className="font-bold">Sportif 18 Admin</h1>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveTab('competitions')} className={`p-2 rounded ${activeTab === 'competitions' ? 'bg-blue-600' : 'bg-blue-900'}`}>🏆</button>
                        <button onClick={() => setActiveTab('routes')} className={`p-2 rounded ${activeTab === 'routes' ? 'bg-blue-600' : 'bg-blue-900'}`}>🔗</button>
                        <button onClick={() => setActiveTab('registrations')} className={`p-2 rounded ${activeTab === 'registrations' ? 'bg-blue-600' : 'bg-blue-900'}`}>📝</button>
                    </div>
                </header>

                <div className="p-6 max-w-5xl mx-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {activeTab === 'competitions' && 'Manage Competitions'}
                                {activeTab === 'routes' && 'Manage Route Links'}
                                {activeTab === 'registrations' && 'Registration Data'}
                            </h2>
                            <p className="text-gray-500">Manage content for the Sportif 18 landing page.</p>
                        </div>
                        {activeTab === 'competitions' && !editingComp && (
                            <button
                                onClick={() => setEditingComp({ title: '', icon: '', color: 'border-blue-500', cps: [], rules: [] })}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-95 flex items-center gap-1.5"
                            >
                                <span className="text-base">+</span> Add Competition
                            </button>
                        )}
                        {activeTab === 'routes' && (
                            <button
                                onClick={() => saveData()}
                                disabled={saving}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </header>

                    <AnimatePresence mode="wait">
                        {activeTab === 'competitions' && (
                            editingComp ? (
                                <CompetitionEditor
                                    key="editor"
                                    initialData={editingComp}
                                    onSave={handleSaveCompetition}
                                    onCancel={() => setEditingComp(null)}
                                />
                            ) : (
                                <motion.div
                                    key="competitions"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {data.competitions.map(comp => (
                                        <div key={comp.id} className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${comp.color || 'border-gray-200'} hover:shadow-md transition-shadow group relative`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 text-2xl flex items-center justify-center">{comp.icon}</div>
                                                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => setEditingComp(comp)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">✏️</button>
                                                    <button onClick={() => handleDeleteCompetition(comp.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{comp.title}</h3>
                                            <div className="flex gap-2 text-xs text-gray-500">
                                                <span className="bg-gray-100 px-2 py-1 rounded">{comp.cps.length} CPs</span>
                                                <span className="bg-gray-100 px-2 py-1 rounded">{comp.rules.length} Rules</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )
                        )}

                        {activeTab === 'routes' && (
                            <motion.div
                                key="routes"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Day Navigation Links</h3>
                                <div className="space-y-6">
                                    {Object.entries(data.routes).map(([day, url]) => (
                                        <div key={day} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                                            <label className="capitalize font-semibold text-gray-600 md:text-right">{day}</label>
                                            <div className="md:col-span-3">
                                                <input
                                                    type="text"
                                                    value={url}
                                                    onChange={(e) => handleRouteChange(day, e.target.value)}
                                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                                    placeholder="/path/to/route"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">Target URL when user clicks on {day}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'registrations' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Incoming Registrations</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Competition</th>
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Class</th>
                                                <th className="px-4 py-3">Team Name</th>
                                                <th className="px-4 py-3">Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {registrations.map((reg) => (
                                                <tr key={reg.id} className="group hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(reg.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-4 py-3 font-bold text-blue-600">{reg.competition?.title}</td>
                                                    <td className="px-4 py-3 text-gray-800 font-medium">{reg.name}</td>
                                                    <td className="px-4 py-3 text-gray-600">{reg.class}</td>
                                                    <td className="px-4 py-3 text-gray-600">{reg.teamName}</td>
                                                    <td className="px-4 py-3 font-mono text-gray-500">{reg.phone}</td>
                                                </tr>
                                            ))}
                                            {registrations.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-400 italic">No registrations yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main >

            {/* Toast Notification */}
            < AnimatePresence >
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl text-white font-medium z-50 flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'}`}
                    >
                        <span>{toast.type === 'error' ? '⚠️' : '✅'}</span>
                        {toast.message}
                    </motion.div>
                )
                }
            </AnimatePresence >
        </div >
    );
}

// Helper Component for Double Bracket Side (Left/Right)
function RenderDoubleBracketSide({ title, side, rounds, onAddRound, onRemoveRound, onUpdateRound, onAddMatch, onRemoveMatch, onUpdateMatch }) {
    const bgColor = side === 'left' ? 'bg-blue-50' : 'bg-red-50';
    const borderColor = side === 'left' ? 'border-blue-200' : 'border-red-200';
    const buttonColor = side === 'left' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700';

    return (
        <div className="space-y-4">
            <div className={`${bgColor} ${borderColor} border-2 p-3 rounded-xl flex justify-between items-center`}>
                <h4 className="font-bold text-gray-800">{title}</h4>
                <button onClick={onAddRound} className={`${buttonColor} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm transition-all`}>+ ADD ROUND</button>
            </div>

            {rounds.map((round, rIdx) => (
                <div key={rIdx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                        <input
                            type="text"
                            value={round.round}
                            onChange={(e) => onUpdateRound(rIdx, e.target.value)}
                            className="flex-1 text-sm font-bold text-gray-700 bg-transparent outline-none focus:text-blue-600"
                            placeholder="Round Name"
                        />
                        <div className="flex gap-1">
                            <button onClick={() => onAddMatch(rIdx)} className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded hover:bg-green-100">+ M</button>
                            <button onClick={() => onRemoveRound(rIdx)} className="text-[9px] text-gray-400 hover:text-red-500 px-2">DEL</button>
                        </div>
                    </div>
                    <div className="p-2 space-y-2">
                        {round.matches.map((match, mIdx) => (
                            <div key={mIdx} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50 hover:bg-white transition-all relative group">
                                <button onClick={() => onRemoveMatch(rIdx, mIdx)} className="absolute -top-1 -right-1 bg-white text-red-400 rounded-full w-5 h-5 text-xs shadow-sm border border-gray-200 flex items-center justify-center hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">×</button>

                                {/* Team 1 */}
                                <div className="flex gap-1 mb-1.5 items-center">
                                    <span className="text-[9px] font-bold text-gray-400 w-3">A</span>
                                    <input
                                        type="text"
                                        value={match.team1}
                                        onChange={(e) => onUpdateMatch(rIdx, mIdx, 'team1', e.target.value)}
                                        className="flex-1 text-xs border border-gray-200 rounded px-1.5 py-0.5 focus:border-blue-500 outline-none"
                                        placeholder="Team 1"
                                    />
                                    <select
                                        value={match.result1 || ''}
                                        onChange={(e) => onUpdateMatch(rIdx, mIdx, 'result1', e.target.value)}
                                        className="w-12 text-[9px] border border-gray-200 rounded px-0.5 py-0.5 focus:border-blue-500 outline-none font-bold"
                                    >
                                        <option value="">-</option>
                                        <option value="win">W</option>
                                        <option value="lose">L</option>
                                    </select>
                                </div>

                                {/* Team 2 */}
                                <div className="flex gap-1 items-center">
                                    <span className="text-[9px] font-bold text-gray-400 w-3">B</span>
                                    <input
                                        type="text"
                                        value={match.team2}
                                        onChange={(e) => onUpdateMatch(rIdx, mIdx, 'team2', e.target.value)}
                                        className="flex-1 text-xs border border-gray-200 rounded px-1.5 py-0.5 focus:border-blue-500 outline-none"
                                        placeholder="Team 2"
                                    />
                                    <select
                                        value={match.result2 || ''}
                                        onChange={(e) => onUpdateMatch(rIdx, mIdx, 'result2', e.target.value)}
                                        className="w-12 text-[9px] border border-gray-200 rounded px-0.5 py-0.5 focus:border-blue-500 outline-none font-bold"
                                    >
                                        <option value="">-</option>
                                        <option value="win">W</option>
                                        <option value="lose">L</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        {round.matches.length === 0 && <p className="text-[10px] text-gray-400 italic text-center py-1">No matches yet</p>}
                    </div>
                </div>
            ))}

            {rounds.length === 0 && <div className="text-center py-6 text-gray-400 text-sm">No rounds. Click "+ ADD ROUND"</div>}
        </div>
    );
}

function CompetitionEditor({ initialData, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        ...initialData,
        leaderboard: initialData.leaderboard || [],
        bracket: initialData.bracket || [],
        bracketLeft: initialData.bracketLeft || [],
        bracketRight: initialData.bracketRight || [],
        grandFinal: initialData.grandFinal || { matches: [{ team1: 'Winner A', team2: 'Winner B', score1: null, score2: null }] },
        schedule: initialData.schedule || [],
        bracketType: initialData.bracketType || 'single' // single, double
    });
    const [editorTab, setEditorTab] = useState('general'); // general, leaderboard, bracket, schedule

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Generic array handler for simple objects
    const handleArrayItemChange = (arrayName, index, field, value) => {
        const newArray = [...formData[arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        setFormData(prev => ({ ...prev, [arrayName]: newArray }));
    };

    // --- Leaderboard Handlers ---
    const addLeaderboardItem = () => {
        setFormData(prev => ({
            ...prev,
            leaderboard: [...prev.leaderboard, { rank: prev.leaderboard.length + 1, team: '', wins: 0, losses: 0, notes: '' }]
        }));
    };
    const removeLeaderboardItem = (idx) => {
        setFormData(prev => ({
            ...prev,
            leaderboard: prev.leaderboard.filter((_, i) => i !== idx)
        }));
    };

    // --- Schedule Handlers ---
    const addScheduleItem = () => {
        setFormData(prev => ({
            ...prev,
            schedule: [...prev.schedule, { day: 'Selasa, 16 Des', time: '00:00', match: '', status: 'Upcoming' }]
        }));
    };
    const removeScheduleItem = (idx) => {
        setFormData(prev => ({
            ...prev,
            schedule: prev.schedule.filter((_, i) => i !== idx)
        }));
    };

    // --- Bracket Handlers (Single Bracket) ---
    const addBracketRound = () => {
        setFormData(prev => ({
            ...prev,
            bracket: [...prev.bracket, { round: `Round ${prev.bracket.length + 1}`, matches: [] }]
        }));
    };
    const removeBracketRound = (rIdx) => {
        setFormData(prev => ({
            ...prev,
            bracket: prev.bracket.filter((_, i) => i !== rIdx)
        }));
    };
    const updateBracketRound = (rIdx, val) => {
        const newBracket = [...formData.bracket];
        newBracket[rIdx].round = val;
        setFormData(prev => ({ ...prev, bracket: newBracket }));
    };
    const addBracketMatch = (rIdx) => {
        const newBracket = [...formData.bracket];
        newBracket[rIdx].matches.push({ team1: 'TBA', team2: 'TBA', score1: null, score2: null });
        setFormData(prev => ({ ...prev, bracket: newBracket }));
    };
    const removeBracketMatch = (rIdx, mIdx) => {
        const newBracket = [...formData.bracket];
        newBracket[rIdx].matches = newBracket[rIdx].matches.filter((_, i) => i !== mIdx);
        setFormData(prev => ({ ...prev, bracket: newBracket }));
    };
    const updateBracketMatch = (rIdx, mIdx, field, val) => {
        const newBracket = [...formData.bracket];
        newBracket[rIdx].matches[mIdx] = { ...newBracket[rIdx].matches[mIdx], [field]: val };
        setFormData(prev => ({ ...prev, bracket: newBracket }));
    };

    // --- Double Bracket Handlers (Left/Right/Grand Final) ---
    const addDoubleBracketRound = (side) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        setFormData(prev => ({
            ...prev,
            [key]: [...prev[key], { round: `Round ${prev[key].length + 1}`, matches: [] }]
        }));
    };
    const removeDoubleBracketRound = (side, rIdx) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== rIdx)
        }));
    };
    const updateDoubleBracketRound = (side, rIdx, val) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        const newBracket = [...formData[key]];
        newBracket[rIdx].round = val;
        setFormData(prev => ({ ...prev, [key]: newBracket }));
    };
    const addDoubleBracketMatch = (side, rIdx) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        const newBracket = [...formData[key]];
        newBracket[rIdx].matches.push({ team1: 'TBA', team2: 'TBA', score1: null, score2: null });
        setFormData(prev => ({ ...prev, [key]: newBracket }));
    };
    const removeDoubleBracketMatch = (side, rIdx, mIdx) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        const newBracket = [...formData[key]];
        newBracket[rIdx].matches = newBracket[rIdx].matches.filter((_, i) => i !== mIdx);
        setFormData(prev => ({ ...prev, [key]: newBracket }));
    };
    const updateDoubleBracketMatch = (side, rIdx, mIdx, field, val) => {
        const key = side === 'left' ? 'bracketLeft' : 'bracketRight';
        const newBracket = [...formData[key]];
        newBracket[rIdx].matches[mIdx] = { ...newBracket[rIdx].matches[mIdx], [field]: val };
        setFormData(prev => ({ ...prev, [key]: newBracket }));
    };
    const addGrandFinalMatch = () => {
        setFormData(prev => ({
            ...prev,
            grandFinal: {
                matches: [...prev.grandFinal.matches, { team1: 'TBA', team2: 'TBA', score1: null, score2: null }]
            }
        }));
    };
    const removeGrandFinalMatch = (mIdx) => {
        if (formData.grandFinal.matches.length <= 1) return; // Prevent removing last match
        setFormData(prev => ({
            ...prev,
            grandFinal: {
                matches: prev.grandFinal.matches.filter((_, i) => i !== mIdx)
            }
        }));
    };
    const updateGrandFinalMatch = (mIdx, field, val) => {
        const newMatches = [...formData.grandFinal.matches];
        newMatches[mIdx] = { ...newMatches[mIdx], [field]: val };
        setFormData(prev => ({ ...prev, grandFinal: { matches: newMatches } }));
    };


    // General Handlers (CPs & Rules)
    const handleArrayChange = (field, index, subField, value) => {
        const newArray = [...formData[field]];
        if (typeof newArray[index] === 'object') {
            newArray[index] = { ...newArray[index], [subField]: value };
        } else {
            newArray[index] = value;
        }
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };
    const addItem = (field, emptyValue) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], emptyValue] }));
    };
    const removeItem = (field, index) => {
        setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto flex flex-col h-[85vh]"
        >
            {/* Header with Tabs */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Competition' : 'New Competition'}</h3>
                <div className="flex gap-2">
                    {['general', 'leaderboard', 'bracket', 'schedule'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setEditorTab(tab)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${editorTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">

                {/* GENERAL TAB */}
                {editorTab === 'general' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-8">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 font-semibold" placeholder="e.g. Futsal" />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Icon</label>
                                <input type="text" name="icon" value={formData.icon} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 text-center" placeholder="⚽" />
                            </div>
                            <div className="col-span-12">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Theme Color</label>
                                <select name="color" value={formData.color} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white">
                                    <option value="border-blue-500">🔵 Blue</option>
                                    <option value="border-purple-500">🟣 Purple</option>
                                    <option value="border-yellow-500">🟡 Yellow</option>
                                    <option value="border-orange-500">🟠 Orange</option>
                                    <option value="border-red-500">🔴 Red</option>
                                    <option value="border-green-500">🟢 Green</option>
                                    <option value="border-pink-500">🌸 Pink</option>
                                </select>
                            </div>
                        </div>

                        {/* CPs Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-gray-700">Contact Persons</label>
                                <button type="button" onClick={() => addItem('cps', { name: '', phone: '' })} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">+ ADD CP</button>
                            </div>
                            <div className="space-y-2">
                                {formData.cps.map((cp, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={cp.name || ''}
                                            onChange={(e) => handleArrayChange('cps', idx, 'name', e.target.value)}
                                            placeholder="Name"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={cp.phone || ''}
                                            onChange={(e) => handleArrayChange('cps', idx, 'phone', e.target.value)}
                                            placeholder="Phone"
                                            className="w-40 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none font-mono"
                                        />
                                        <button type="button" onClick={() => removeItem('cps', idx)} className="text-gray-300 hover:text-red-500 px-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rules Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-gray-700">Rules</label>
                                <button type="button" onClick={() => addItem('rules', '')} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">+ ADD RULE</button>
                            </div>
                            <div className="space-y-2">
                                {formData.rules.map((rule, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <span className="text-gray-400 font-mono text-xs py-2 w-5 text-center mt-0.5">{idx + 1}.</span>
                                        <textarea
                                            value={rule || ''}
                                            onChange={(e) => handleArrayChange('rules', idx, null, e.target.value)}
                                            placeholder="Rule description..."
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none min-h-[60px]"
                                            rows="2"
                                        />
                                        <button type="button" onClick={() => removeItem('rules', idx)} className="text-gray-300 hover:text-red-500 px-1 mt-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* LEADERBOARD TAB */}
                {editorTab === 'leaderboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">Manage standings for standard competitions.</p>
                            <button onClick={addLeaderboardItem} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700">+ ADD ENTRY</button>
                        </div>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 w-16">Rank</th>
                                        <th className="px-4 py-3">Team</th>
                                        <th className="px-4 py-3 w-20">Wins</th>
                                        <th className="px-4 py-3 w-20">Losses</th>
                                        <th className="px-4 py-3">Notes</th>
                                        <th className="px-4 py-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {formData.leaderboard.map((item, idx) => (
                                        <tr key={idx} className="group hover:bg-gray-50/50">
                                            <td className="p-2 pl-4">
                                                <input type="number" value={item.rank} onChange={(e) => handleArrayItemChange('leaderboard', idx, 'rank', e.target.value)} className="w-12 text-center border border-gray-200 rounded p-1 focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.team} onChange={(e) => handleArrayItemChange('leaderboard', idx, 'team', e.target.value)} className="w-full border border-gray-200 rounded p-1 focus:border-blue-500 outline-none" placeholder="Team Name" />
                                            </td>
                                            <td className="p-2">
                                                <input type="number" value={item.wins || 0} onChange={(e) => handleArrayItemChange('leaderboard', idx, 'wins', parseInt(e.target.value) || 0)} className="w-full text-center border border-gray-200 rounded p-1 focus:border-blue-500 outline-none font-mono" placeholder="0" />
                                            </td>
                                            <td className="p-2">
                                                <input type="number" value={item.losses || 0} onChange={(e) => handleArrayItemChange('leaderboard', idx, 'losses', parseInt(e.target.value) || 0)} className="w-full text-center border border-gray-200 rounded p-1 focus:border-blue-500 outline-none font-mono" placeholder="0" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.notes} onChange={(e) => handleArrayItemChange('leaderboard', idx, 'notes', e.target.value)} className="w-full border border-gray-200 rounded p-1 focus:border-blue-500 outline-none" placeholder="e.g. Gold" />
                                            </td>
                                            <td className="p-2 pr-4 text-right">
                                                <button onClick={() => removeLeaderboardItem(idx)} className="text-gray-300 hover:text-red-500">×</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {formData.leaderboard.length === 0 && (
                                        <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400 italic">No leaderboard entries.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SCHEDULE TAB */}
                {editorTab === 'schedule' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">Manage match schedule.</p>
                            <button onClick={addScheduleItem} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700">+ ADD MATCH</button>
                        </div>
                        <div className="space-y-3">
                            {formData.schedule.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="flex flex-col gap-1 w-32">
                                        <input type="text" value={item.day} onChange={(e) => handleArrayItemChange('schedule', idx, 'day', e.target.value)} className="text-xs border border-gray-200 rounded p-1" placeholder="Day (e.g. Senin)" />
                                        <input type="text" value={item.time} onChange={(e) => handleArrayItemChange('schedule', idx, 'time', e.target.value)} className="text-xs border border-gray-200 rounded p-1 font-mono text-center" placeholder="00:00" />
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" value={item.match} onChange={(e) => handleArrayItemChange('schedule', idx, 'match', e.target.value)} className="w-full font-bold text-gray-800 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none text-sm pb-1 mb-1" placeholder="Match Title (e.g. A vs B)" />
                                        <select value={item.status} onChange={(e) => handleArrayItemChange('schedule', idx, 'status', e.target.value)} className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-500">
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Live">Live</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Delayed">Delayed</option>
                                        </select>
                                    </div>
                                    <button onClick={() => removeScheduleItem(idx)} className="text-gray-300 hover:text-red-500 p-2">🗑️</button>
                                </div>
                            ))}
                            {formData.schedule.length === 0 && <div className="text-center text-gray-400 py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">No scheduled matches.</div>}
                        </div>
                    </div>
                )}

                {/* BRACKET TAB */}
                {editorTab === 'bracket' && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50 p-4 rounded-xl border border-blue-100 gap-4">
                            <div>
                                <p className="text-sm text-blue-800 font-medium">Tournament Bracket Management</p>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="bracketType"
                                            value="single"
                                            checked={formData.bracketType === 'single'}
                                            onChange={handleChange}
                                            className="accent-blue-600"
                                        /> Single Bracket
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="bracketType"
                                            value="double"
                                            checked={formData.bracketType === 'double'}
                                            onChange={handleChange}
                                            className="accent-blue-600"
                                        /> Double Bracket
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* SINGLE BRACKET MODE */}
                        {formData.bracketType === 'single' && (
                            <>
                                <button onClick={addBracketRound} className="w-full bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-all">+ ADD ROUND</button>
                                {formData.bracket.map((round, rIdx) => (
                                    <div key={rIdx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                            <input
                                                type="text"
                                                value={round.round}
                                                onChange={(e) => updateBracketRound(rIdx, e.target.value)}
                                                className="font-bold text-gray-700 bg-transparent outline-none focus:text-blue-600 focus:underline"
                                                placeholder="Round Name"
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={() => addBracketMatch(rIdx)} className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded hover:bg-green-100">+ MATCH</button>
                                                <button onClick={() => removeBracketRound(rIdx)} className="text-gray-400 hover:text-red-500 px-2">DELETE ROUND</button>
                                            </div>
                                        </div>
                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {round.matches.map((match, mIdx) => (
                                                <div key={mIdx} className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all relative group">
                                                    <button onClick={() => removeBracketMatch(rIdx, mIdx)} className="absolute -top-2 -right-2 bg-white text-red-400 rounded-full w-6 h-6 shadow-sm border border-gray-200 flex items-center justify-center hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">×</button>

                                                    {/* Team 1 */}
                                                    <div className="flex gap-2 mb-2 items-center">
                                                        <span className="text-[10px] font-bold text-gray-400 w-4">A</span>
                                                        <input
                                                            type="text"
                                                            value={match.team1}
                                                            onChange={(e) => updateBracketMatch(rIdx, mIdx, 'team1', e.target.value)}
                                                            className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:border-blue-500 outline-none"
                                                            placeholder="Team 1"
                                                        />
                                                        <select
                                                            value={match.result1 || ''}
                                                            onChange={(e) => updateBracketMatch(rIdx, mIdx, 'result1', e.target.value)}
                                                            className="w-16 text-xs border border-gray-200 rounded px-1 py-1 focus:border-blue-500 outline-none font-bold"
                                                        >
                                                            <option value="">-</option>
                                                            <option value="win">WIN</option>
                                                            <option value="lose">LOSE</option>
                                                        </select>
                                                    </div>

                                                    {/* Team 2 */}
                                                    <div className="flex gap-2 items-center">
                                                        <span className="text-[10px] font-bold text-gray-400 w-4">B</span>
                                                        <input
                                                            type="text"
                                                            value={match.team2}
                                                            onChange={(e) => updateBracketMatch(rIdx, mIdx, 'team2', e.target.value)}
                                                            className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:border-blue-500 outline-none"
                                                            placeholder="Team 2"
                                                        />
                                                        <select
                                                            value={match.result2 || ''}
                                                            onChange={(e) => updateBracketMatch(rIdx, mIdx, 'result2', e.target.value)}
                                                            className="w-16 text-xs border border-gray-200 rounded px-1 py-1 focus:border-blue-500 outline-none font-bold"
                                                        >
                                                            <option value="">-</option>
                                                            <option value="win">WIN</option>
                                                            <option value="lose">LOSE</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                            {round.matches.length === 0 && <p className="text-xs text-gray-400 italic text-center col-span-2 py-2">No matches in this round.</p>}
                                        </div>
                                    </div>
                                ))}
                                {formData.bracket.length === 0 && <div className="text-center py-10 text-gray-400">No rounds defined. Click "+ ADD ROUND" to start.</div>}
                            </>
                        )}

                        {/* DOUBLE BRACKET MODE */}
                        {formData.bracketType === 'double' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* LEFT BRACKET */}
                                <RenderDoubleBracketSide
                                    title="🔵 Bracket Kiri (Left)"
                                    side="left"
                                    rounds={formData.bracketLeft}
                                    onAddRound={() => addDoubleBracketRound('left')}
                                    onRemoveRound={(rIdx) => removeDoubleBracketRound('left', rIdx)}
                                    onUpdateRound={(rIdx, val) => updateDoubleBracketRound('left', rIdx, val)}
                                    onAddMatch={(rIdx) => addDoubleBracketMatch('left', rIdx)}
                                    onRemoveMatch={(rIdx, mIdx) => removeDoubleBracketMatch('left', rIdx, mIdx)}
                                    onUpdateMatch={(rIdx, mIdx, field, val) => updateDoubleBracketMatch('left', rIdx, mIdx, field, val)}
                                />

                                {/* RIGHT BRACKET */}
                                <RenderDoubleBracketSide
                                    title="🔴 Bracket Kanan (Right)"
                                    side="right"
                                    rounds={formData.bracketRight}
                                    onAddRound={() => addDoubleBracketRound('right')}
                                    onRemoveRound={(rIdx) => removeDoubleBracketRound('right', rIdx)}
                                    onUpdateRound={(rIdx, val) => updateDoubleBracketRound('right', rIdx, val)}
                                    onAddMatch={(rIdx) => addDoubleBracketMatch('right', rIdx)}
                                    onRemoveMatch={(rIdx, mIdx) => removeDoubleBracketMatch('right', rIdx, mIdx)}
                                    onUpdateMatch={(rIdx, mIdx, field, val) => updateDoubleBracketMatch('right', rIdx, mIdx, field, val)}
                                />

                                {/* GRAND FINAL - Spans both columns */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-lg">
                                        <div className="bg-yellow-100 p-3 border-b border-yellow-200 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">🏆</span>
                                                <span className="font-black text-yellow-800 uppercase tracking-wider">Grand Final</span>
                                                <span className="text-[10px] bg-yellow-200 text-yellow-700 px-2 py-0.5 rounded-full font-bold">TIDAK BISA DIHAPUS</span>
                                            </div>
                                            <button onClick={addGrandFinalMatch} className="text-[10px] font-bold text-yellow-700 bg-yellow-200 px-3 py-1 rounded hover:bg-yellow-300">+ ADD MATCH</button>
                                        </div>
                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {formData.grandFinal.matches.map((match, mIdx) => (
                                                <div key={mIdx} className="border-2 border-yellow-200 rounded-xl p-4 bg-white hover:shadow-md transition-all relative group">
                                                    {formData.grandFinal.matches.length > 1 && (
                                                        <button onClick={() => removeGrandFinalMatch(mIdx)} className="absolute -top-2 -right-2 bg-white text-red-400 rounded-full w-6 h-6 shadow-sm border border-gray-200 flex items-center justify-center hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                                    )}

                                                    {/* Team 1 */}
                                                    <div className="flex gap-2 mb-2 items-center">
                                                        <span className="text-[10px] font-bold text-yellow-600 w-4">A</span>
                                                        <input
                                                            type="text"
                                                            value={match.team1}
                                                            onChange={(e) => updateGrandFinalMatch(mIdx, 'team1', e.target.value)}
                                                            className="flex-1 text-sm border border-yellow-300 rounded px-2 py-1 focus:border-yellow-500 outline-none font-semibold"
                                                            placeholder="Winner Left"
                                                        />
                                                        <select
                                                            value={match.result1 || ''}
                                                            onChange={(e) => updateGrandFinalMatch(mIdx, 'result1', e.target.value)}
                                                            className="w-16 text-xs border border-yellow-300 rounded px-1 py-1 focus:border-yellow-500 outline-none font-bold"
                                                        >
                                                            <option value="">-</option>
                                                            <option value="win">WIN</option>
                                                            <option value="lose">LOSE</option>
                                                        </select>
                                                    </div>

                                                    {/* Team 2 */}
                                                    <div className="flex gap-2 items-center">
                                                        <span className="text-[10px] font-bold text-yellow-600 w-4">B</span>
                                                        <input
                                                            type="text"
                                                            value={match.team2}
                                                            onChange={(e) => updateGrandFinalMatch(mIdx, 'team2', e.target.value)}
                                                            className="flex-1 text-sm border border-yellow-300 rounded px-2 py-1 focus:border-yellow-500 outline-none font-semibold"
                                                            placeholder="Winner Right"
                                                        />
                                                        <select
                                                            value={match.result2 || ''}
                                                            onChange={(e) => updateGrandFinalMatch(mIdx, 'result2', e.target.value)}
                                                            className="w-16 text-xs border border-yellow-300 rounded px-1 py-1 focus:border-yellow-500 outline-none font-bold"
                                                        >
                                                            <option value="">-</option>
                                                            <option value="win">WIN</option>
                                                            <option value="lose">LOSE</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4 border-t mt-4 bg-white z-10">
                <button onClick={() => {
                    setFormData(initialData); // Reset
                    if (confirm("Reset all changes?")) onCancel();
                }} className="text-sm text-red-400 hover:text-red-600 font-medium px-4">Reset & Cancel</button>

                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-6 py-2 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
                    <button onClick={() => onSave(formData)} className="px-8 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">Save Changes</button>
                </div>
            </div>
        </motion.div>
    );
}
