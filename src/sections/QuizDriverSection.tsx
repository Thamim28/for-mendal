import { useRef, useState, useCallback } from 'react';
import { Heart, Car, X, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface QuizDriverSectionProps {
  onConfetti: () => void;
  onComplete: () => void;
}

export default function QuizDriverSection({ onConfetti, onComplete }: QuizDriverSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'me' | 'you' | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const handleYouButtonHover = useCallback(() => {
    if (selectedAnswer || isDodging) return;
    setIsDodging(true);
    const maxX = 120;
    const maxY = 60;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    setButtonPosition({ x: newX, y: newY });
    setTimeout(() => setIsDodging(false), 500);
  }, [selectedAnswer, isDodging]);

  const handleAnswer = (answer: 'me' | 'you') => {
    setSelectedAnswer(answer);
    if (answer === 'me') {
      onConfetti();
    }
    onComplete();
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF0F5 0%, #F6C7C3 100%)',
      }}
    >
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[10%] left-[8%] w-10 h-10 text-valentine-coral/30 fill-valentine-coral/30 animate-heart-float" />
        <Heart className="absolute top-[20%] right-[12%] w-8 h-8 text-valentine-hot-pink/25 fill-valentine-hot-pink/25 animate-heart-float" style={{ animationDelay: '0.7s' }} />
        <Heart className="absolute bottom-[15%] left-[15%] w-12 h-12 text-valentine-red/20 fill-valentine-red/20 animate-heart-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute bottom-[25%] right-[8%] w-6 h-6 text-valentine-coral/35 fill-valentine-coral/35 animate-heart-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Car Icon Decoration */}
      <motion.div
        className="absolute top-[15%] right-[15%]"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white/70 p-4 rounded-2xl shadow-soft animate-gentle-bob">
          <Car className="w-10 h-10 text-valentine-red" />
        </div>
      </motion.div>

      {/* Quiz Card */}
      <motion.div
        className="relative z-10 glass-card-strong p-8 md:p-12 max-w-lg w-[90vw]"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative hearts on card */}
        <div className="absolute -top-5 -left-5">
          <Heart className="w-12 h-12 text-valentine-red fill-valentine-red animate-heart-pulse" />
        </div>
        <div className="absolute -bottom-4 -right-4">
          <Heart className="w-10 h-10 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Question */}
        <motion.h3
          className="font-pacifico text-3xl md:text-4xl text-valentine-text text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Who is the better driver?
        </motion.h3>

        {/* Answer Buttons */}
        {!selectedAnswer ? (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => handleAnswer('me')}
              className="btn-coral text-xl font-semibold px-10 py-5 rounded-full btn-hover-lift flex items-center justify-center gap-2"
            >
              <Check className="w-6 h-6" />
              Me
            </button>

            <button
              onMouseEnter={handleYouButtonHover}
              onClick={() => handleAnswer('you')}
              className={`btn-outline text-xl font-semibold px-10 py-5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${isDodging ? 'dodging' : ''}`}
              style={{
                transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                transition: isDodging ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.5s ease-out',
              }}
            >
              <X className="w-6 h-6" />
              You
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="mb-4">
              {selectedAnswer === 'me' ? (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full">
                  <Check className="w-6 h-6" />
                  <span className="font-nunito font-semibold">Correct!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-valentine-coral/30 text-valentine-text px-6 py-3 rounded-full">
                  <X className="w-6 h-6" />
                  <span className="font-nunito font-semibold">Bold choice!</span>
                </div>
              )}
            </div>
            <p className="font-nunito text-lg text-valentine-text-muted">
              {selectedAnswer === 'me'
                ? "Mendal's driving = therapy. 🚗✨"
                : "But we both know the truth... 😏"}
            </p>
            <p className="mt-6 text-sm text-valentine-text-muted/60 animate-pulse">
              Keep scrolling to continue... 💕
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-valentine-text-muted/50">
        <Heart className="w-4 h-4 animate-heart-pulse" />
        <span className="text-sm font-nunito">Checkpoint 1 of 2</span>
        <Heart className="w-4 h-4 animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
}
