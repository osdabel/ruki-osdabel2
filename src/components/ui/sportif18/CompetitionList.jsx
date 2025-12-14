import React from 'react';
import { motion } from 'framer-motion';

const CompetitionCard = ({ title, icon, color, cps }) => (
    <div className={`bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${color} group cursor-default h-full`}>
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gray-50 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                {icon}
            </div>
            <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
        </div>

        <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact Person</p>
            {cps.map((cp, index) => (
                <a
                    key={index}
                    href={`https://wa.me/${cp.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-green-50 border border-transparent hover:border-green-200 group/cp transition-all duration-200"
                >
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700 group-hover/cp:text-green-700 transition-colors">{cp.name}</span>
                        <span className="text-[10px] text-gray-400 group-hover/cp:text-green-600 font-mono">+{cp.phone}</span>
                    </div>
                    <div className="text-gray-300 group-hover/cp:text-green-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" className="fill-current">
                            <path d="M760-480q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480q0 61 25.5 116t69.5 96l-39 142 145-38q39 23 83 35.5t96 12.5q117 0 198.5-81.5T760-480Zm-60 0q0 92-64 156t-156 64q-47 0-90-19l-102 27 27-99q-22-41-22-92 0-92 64-156t156-64q92 0 156 64t64 156ZM352-596q-6-13-12-13-5 0-10 1t-10 3q-13 6-22 17t-9 32q0 4 1 8t3 8q16 83 76 143t143 76q4 2 8 3t8 1q21 0 32-9t17-22q2-5 3-10t1-10q0-6-13-12l-56-27q-5-3-11-2t-10 5l-23 28q-4 5-10 5-3 0-6-1-17-7-39-29t-29-39q-1-3-1-6 0-6 5-10l28-23q4-4 5-10t-2-11l-27-56Z" />
                        </svg>
                    </div>
                </a>
            ))}
        </div>
    </div>
);

const CompetitionList = ({ competitions }) => {
    // If no data provided, show skeleton or empty state, or fallback? 
    // For now we assume data is passed or we render nothing/loading elsewhere.
    if (!competitions) return <div className="text-center text-gray-400 py-10">Loading competitions...</div>;

    const cardVariants = {
        hiddenLeft: { opacity: 0, x: -50 },
        hiddenRight: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-950">Daftar Lomba</h2>
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{competitions.length} Lomba</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitions.map((comp, index) => (
                    <motion.div
                        key={comp.id}
                        initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <CompetitionCard
                            title={comp.title}
                            icon={comp.icon}
                            color={comp.color}
                            cps={comp.cps}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CompetitionList;
