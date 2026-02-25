import React from 'react';
import { motion } from 'framer-motion';

const GlobalBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#f1f2f4]">
            {/* Subtle Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/50 via-slate-50/50 to-white/50"></div>

            {/* Optimized Immersive Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.4] select-none pointer-events-none">
                <img
                    src="./mesestra.png"
                    alt=""
                    className="w-[100%] max-w-6xl object-contain filter blur-[50px] scale-110"
                    style={{ willChange: 'filter' }}
                />
            </div>

            {/* Hardware Accelerated Depth Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        translate3d: ['0px, 0px, 0', '40px, -20px, 0', '-20px, 40px, 0', '0px, 0px, 0'],
                    }}
                    transition={{
                        duration: 30, // Slower is smoother
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/30 rounded-full blur-[80px]"
                    style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
                />
                <motion.div
                    animate={{
                        translate3d: ['0px, 0px, 0', '-30px, 30px, 0', '30px, -30px, 0', '0px, 0px, 0'],
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-white/20 rounded-full blur-[100px]"
                    style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
                />
            </div>

            {/* Static Grid - no animation for speed */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(#334155 0.5px, transparent 0.5px)`, backgroundSize: '80px 80px' }}></div>
        </div>
    );
};

export default GlobalBackground;
