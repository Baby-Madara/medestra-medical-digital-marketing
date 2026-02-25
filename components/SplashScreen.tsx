import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
    // Medestra's professional 4-color palette in the requested order
    const colors = [
        '#00AEEF', // Medestra Blue (Left)
        '#EF4136', // Medestra Red
        '#FFD037', // Medestra Yellow
        '#8DC63F'  // Medestra Green (Right)
    ];

    const dotVariants = {
        initial: {
            scale: 0,
            opacity: 0,
            x: -20
        },
        animate: {
            scale: [1, 1.3, 1],
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeOut"
            }
        }
    };

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.2, // Left to Right stagger
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
            dir="ltr" // Force LTR for the loading dots order to match "Left to Right" request
        >
            <div className="flex flex-col items-center gap-8">
                {/* Animated Dots Container - Left to Right */}
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    className="flex gap-5"
                >
                    {colors.map((color, index) => (
                        <motion.div
                            key={index}
                            variants={dotVariants}
                            className="w-5 h-5 rounded-full"
                            style={{
                                backgroundColor: color,
                                boxShadow: `0 4px 12px ${color}33`
                            }}
                        />
                    ))}
                </motion.div>

                {/* Modern Minimal Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-sm font-light tracking-[0.4em] text-gray-400 lowercase italic font-sans">
                        Welcome
                    </span>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
