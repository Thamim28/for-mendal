import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useMemo } from 'react';

interface ScrollingBoyProps {
    hideAtFinale: boolean;
}

// Section labels and their approximate scroll progress ranges
const SECTIONS = [
    { label: '💌', name: 'Start', progress: 0 },
    { label: '🚶', name: 'Journey', progress: 0.12 },
    { label: '👨‍🍳', name: 'Quiz 1', progress: 0.25 },
    { label: '💕', name: 'Love Meter', progress: 0.38 },
    { label: '🍕', name: 'Quiz 2', progress: 0.50 },
    { label: '✨', name: 'Tokens', progress: 0.62 },
    { label: '🌹', name: 'Finale', progress: 0.80 },
    { label: '💝', name: 'Letter', progress: 0.95 },
];

// The boy character as a reusable component
export function BoyCharacter({ isWalking = false, hasRose = true, size = 'md' }: {
    isWalking?: boolean;
    hasRose?: boolean;
    size?: 'sm' | 'md' | 'lg';
}) {
    const sizeClasses = {
        sm: { body: 'w-10 h-12', torso: 'w-8 h-9', leg: 'w-2 h-4', arm: 'w-3 h-7', eye: 'w-1.5 h-1.5', smile: 'w-4 h-2 top-7' },
        md: { body: 'w-14 h-16', torso: 'w-10 h-12', leg: 'w-2.5 h-5', arm: 'w-3.5 h-9', eye: 'w-2 h-2', smile: 'w-5 h-2.5 top-8' },
        lg: { body: 'w-14 h-16 md:w-20 md:h-24', torso: 'w-10 h-12 md:w-14 md:h-16', leg: 'w-2.5 h-5 md:w-3.5 md:h-7', arm: 'w-3.5 h-9 md:w-5 md:h-12', eye: 'w-2 h-2 md:w-2.5 md:h-2.5', smile: 'w-5 h-2.5 top-8 md:w-8 md:h-4 md:top-12' },
    };
    const s = sizeClasses[size];

    return (
        <div className={`relative ${isWalking ? 'animate-gentle-bob' : ''}`}>
            {/* Head + Face */}
            <div className={`${s.body} bg-valentine-red rounded-t-full relative shadow-coral`}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className={`${s.eye} bg-valentine-text rounded-full`} />
                    <div className={`${s.eye} bg-valentine-text rounded-full`} />
                </div>
                <div className="absolute top-5 left-1.5 w-2.5 h-1 bg-valentine-hot-pink/30 rounded-full" />
                <div className="absolute top-5 right-1.5 w-2.5 h-1 bg-valentine-hot-pink/30 rounded-full" />
                <div className={`absolute ${s.smile} left-1/2 -translate-x-1/2 border-b-2 border-valentine-text rounded-full`} />
            </div>
            {/* Body */}
            <div className={`${s.torso} bg-valentine-red/80 rounded-b-2xl mx-auto -mt-0.5`} />
            {/* Legs */}
            <div className="flex justify-center gap-1.5 -mt-0.5">
                <div className={`${s.leg} bg-valentine-text rounded-full origin-top`}
                    style={{ animation: isWalking ? 'legSwing 0.5s ease-in-out infinite alternate' : 'none' }} />
                <div className={`${s.leg} bg-valentine-text rounded-full origin-top`}
                    style={{ animation: isWalking ? 'legSwing 0.5s ease-in-out infinite alternate-reverse' : 'none' }} />
            </div>
            {/* Arms */}
            <div className={`absolute top-8 -left-2 ${s.arm} bg-valentine-red/60 rounded-full rotate-[-15deg]`} />
            <div className={`absolute top-8 -right-2 ${s.arm} bg-valentine-red/60 rounded-full rotate-[15deg]`}>
                {hasRose && <div className="absolute -top-3 -right-0.5 text-sm animate-pulse">🌹</div>}
            </div>
            {/* Floating heart */}
            {isWalking && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <Heart className="w-3 h-3 text-valentine-red fill-valentine-red animate-heart-float" style={{ animationDuration: '1.5s' }} />
                </div>
            )}
            <style>{`
        @keyframes legSwing { 0% { transform: rotate(-8deg); } 100% { transform: rotate(8deg); } }
      `}</style>
        </div>
    );
}

export default function ScrollingBoy({ hideAtFinale }: ScrollingBoyProps) {
    const { scrollYProgress } = useScroll();
    const [currentProgress, setCurrentProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setCurrentProgress(latest);
    });

    // Boy moves down the timeline track from top to bottom  
    const boyTopPercent = useTransform(scrollYProgress,
        [0, 0.12, 0.25, 0.38, 0.50, 0.62, 0.80, 0.95],
        [2, 14, 26, 38, 50, 62, 76, 90]
    );

    const isWalking = currentProgress > 0.05 && currentProgress < 0.78;

    // Track the completed line height
    const lineHeight = useMemo(() => {
        return Math.min(currentProgress * 100, 95);
    }, [currentProgress]);

    const boyTop = useTransform(boyTopPercent, (v) => `${v}%`);

    return (
        <div className="fixed left-0 top-0 bottom-0 z-40 w-16 md:w-20 pointer-events-none">
            {/* Timeline Track Background */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[5%] bottom-[5%] w-1 bg-valentine-coral/20 rounded-full" />

            {/* Completed portion of the track */}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-[5%] w-1.5 bg-gradient-to-b from-valentine-red to-valentine-hot-pink rounded-full transition-all duration-300"
                style={{ height: `${lineHeight * 0.9}%` }}
            />

            {/* Section dot markers */}
            {SECTIONS.map((section, i) => (
                <div
                    key={section.name}
                    className="absolute left-1/2 -translate-x-1/2 flex items-center"
                    style={{ top: `${5 + i * 12.5}%` }}
                >
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-500
            ${currentProgress >= section.progress
                            ? 'bg-valentine-red border-valentine-red text-white shadow-coral'
                            : 'bg-white/80 border-valentine-coral/40 text-valentine-text-muted'
                        }`}
                    >
                        {section.label}
                    </div>
                </div>
            ))}

            {/* The Boy Character - moves along the timeline */}
            {!hideAtFinale && (
                <motion.div
                    className="absolute left-1/2 -translate-x-[40%]"
                    style={{
                        top: boyTop,
                    }}
                >
                    <BoyCharacter isWalking={isWalking} hasRose={true} size="sm" />
                </motion.div>
            )}
        </div>
    );
}
