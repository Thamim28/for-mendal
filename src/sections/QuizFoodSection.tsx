import { useRef, useState } from 'react';
import { Heart, Pizza, RotateCcw } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface QuizFoodSectionProps {
  onConfetti: () => void;
  onComplete: () => void;
}

export default function QuizFoodSection({ onConfetti, onComplete }: QuizFoodSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'pizza' | 'you' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const handleAnswer = (answer: 'pizza' | 'you') => {
    setSelectedAnswer(answer);
    if (answer === 'you') {
      onConfetti();
    }
    onComplete();
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F9B1B1 0%, #F6C7C3 100%)',
      }}
    >
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[12%] left-[10%] w-10 h-10 text-valentine-coral/30 fill-valentine-coral/30 animate-heart-float" />
        <Heart className="absolute top-[22%] right-[10%] w-8 h-8 text-valentine-hot-pink/25 fill-valentine-hot-pink/25 animate-heart-float" style={{ animationDelay: '0.6s' }} />
        <Heart className="absolute bottom-[18%] left-[18%] w-12 h-12 text-valentine-red/20 fill-valentine-red/20 animate-heart-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-[22%] right-[15%] w-6 h-6 text-valentine-coral/35 fill-valentine-coral/35 animate-heart-float" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Pizza Icon Decoration */}
      <motion.div
        className="absolute top-[15%] left-[12%]"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white/70 p-4 rounded-2xl shadow-soft animate-gentle-bob">
          <Pizza className="w-10 h-10 text-valentine-red" />
        </div>
      </motion.div>

      {/* Floating Food Emojis */}
      <motion.div
        className="absolute top-[20%] right-[18%] text-4xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <span className="animate-gentle-bob inline-block">🍕</span>
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] left-[8%] text-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: 'spring' }}
      >
        <span className="animate-gentle-bob inline-block" style={{ animationDelay: '0.5s' }}>🍝</span>
      </motion.div>

      {/* Quiz Card */}
      <motion.div
        className="relative z-10 glass-card-strong p-8 md:p-12 max-w-lg w-[90vw]"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative hearts on card */}
        <div className="absolute -top-5 -right-5">
          <Heart className="w-12 h-12 text-valentine-red fill-valentine-red animate-heart-pulse" />
        </div>
        <div className="absolute -bottom-4 -left-4">
          <Heart className="w-10 h-10 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="absolute top-4 right-4 p-2 text-valentine-text-muted hover:text-valentine-red transition-colors duration-300 rounded-full hover:bg-white/50"
          aria-label="Retry Quiz"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        {/* Question */}
        <motion.h3
          className="font-pacifico text-3xl md:text-4xl text-valentine-text text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          What&apos;s my favorite food?
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
              onClick={() => handleAnswer('pizza')}
              className="btn-outline text-xl font-semibold px-10 py-5 rounded-full btn-hover-lift flex items-center justify-center gap-2"
            >
              <Pizza className="w-6 h-6" />
              Pizza
            </button>

            <button
              onClick={() => handleAnswer('you')}
              className="btn-coral text-xl font-semibold px-10 py-5 rounded-full btn-hover-lift flex items-center justify-center gap-2"
            >
              <Heart className="w-6 h-6 fill-white" />
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
              {selectedAnswer === 'you' ? (
                <div className="inline-flex items-center gap-2 bg-valentine-red text-white px-6 py-3 rounded-full shadow-coral">
                  <Heart className="w-6 h-6 fill-white" />
                  <span className="font-nunito font-semibold">Smooth!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full">
                  <Pizza className="w-6 h-6" />
                  <span className="font-nunito font-semibold">Valid choice!</span>
                </div>
              )}
            </div>
            <p className="font-nunito text-lg text-valentine-text-muted">
              {selectedAnswer === 'you'
                ? "And true. You're the main course. 😘"
                : "Valid. But you're the main course. 🍕💕"}
            </p>
            <p className="mt-6 text-sm text-valentine-text-muted/60 animate-pulse">
              Almost there... keep scrolling! 🌹
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-valentine-text-muted/50">
        <Heart className="w-4 h-4 animate-heart-pulse fill-valentine-red" />
        <span className="text-sm font-nunito">Checkpoint 2 of 2</span>
        <Heart className="w-4 h-4 animate-heart-pulse fill-valentine-red" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
}
