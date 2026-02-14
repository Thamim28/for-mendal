import { useRef, useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { BoyCharacter } from '../components/ScrollingBoy';
import roseImage from '../../Images/rose.jpeg';

interface RoseDeliverySectionProps {
  onOpenLetter: () => void;
  showBoy: boolean;
}

export default function RoseDeliverySection({ onOpenLetter, showBoy }: RoseDeliverySectionProps) {
  const [showRose, setShowRose] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const t1 = setTimeout(() => setShowRose(true), 800);
      const t2 = setTimeout(() => setShowCelebration(true), 1500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #FFF0F5 0%, #F6C7C3 50%, #F9B1B1 100%)',
      }}
    >
      {/* Big Heart Outline Background */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Heart
          className="w-[80vw] max-w-[800px] h-auto text-valentine-red/10 fill-valentine-red/5 animate-heart-pulse"
          style={{ animationDuration: '4s' }}
        />
      </motion.div>

      {/* Floating Background Hearts - Spread out */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[5%] left-[5%] w-10 h-10 text-valentine-coral/30 fill-valentine-coral/30 animate-heart-float" />
        <Heart className="absolute top-[10%] right-[5%] w-8 h-8 text-valentine-hot-pink/25 fill-valentine-hot-pink/25 animate-heart-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-[10%] left-[8%] w-12 h-12 text-valentine-red/20 fill-valentine-red/20 animate-heart-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-[5%] right-[8%] w-6 h-6 text-valentine-coral/35 fill-valentine-coral/35 animate-heart-float" style={{ animationDelay: '0.7s' }} />
        <Heart className="absolute top-[40%] left-[2%] w-8 h-8 text-valentine-hot-pink/20 fill-valentine-hot-pink/20 animate-heart-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute top-[35%] right-[2%] w-10 h-10 text-valentine-red/15 fill-valentine-red/15 animate-heart-float" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Title - Centered above characters */}
      <motion.div
        className="relative z-10 text-center mb-12 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-pacifico text-4xl md:text-5xl lg:text-6xl text-valentine-text mb-4">
          This rose is for you
        </h2>
        <p className="font-nunito text-lg md:text-xl text-valentine-text-muted max-w-md mx-auto">
          Thanks for being my favorite person.
        </p>
      </motion.div>

      {/* Characters Container - Increased width and spacing */}
      <div className="relative w-full max-w-5xl h-[40vh] md:h-[50vh] flex items-center justify-center px-8">
        {/* Boy Character */}
        {showBoy && (
          <motion.div
            className="absolute"
            style={{ left: '10%', top: '50%', y: '-50%' }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            <BoyCharacter isWalking={false} hasRose={false} size="lg" />
          </motion.div>
        )}

        {/* The Rose */}
        {showRose && (
          <motion.div
            className="absolute left-[30%] md:left-1/2 -translate-x-1/2"
            style={{ top: '40%', y: '-50%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="relative">
              <div className="w-40 h-40 md:w-80 md:h-80 relative flex items-center justify-center animate-heart-pulse">
                {/* Decorative border ring */}
                <div className="absolute inset-0 rounded-full border-4 border-valentine-red/30 animate-spin-slow" />

                {/* Image Container */}
                <div className="w-32 h-32 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-coral-lg relative z-10">
                  <img
                    src={roseImage}
                    alt="Rose for you"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating hearts around image */}
                <Heart className="absolute -top-2 right-0 w-10 h-10 text-valentine-red fill-valentine-red animate-bounce" />
                <Heart className="absolute bottom-0 -left-2 w-8 h-8 text-valentine-hot-pink fill-valentine-hot-pink animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-valentine-red/40 rounded-full blur-xl -z-10" />
              <div className="absolute -top-6 -right-6 text-3xl animate-pulse">✨</div>
              <div className="absolute -bottom-4 -left-6 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
            </div>
          </motion.div>
        )}

        {/* Girl Character */}
        <motion.div
          className="absolute right-2 md:right-[10%]"
          style={{ top: '50%', y: '-50%' }}
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative animate-gentle-bob" style={{ animationDelay: '0.3s' }}>
            {/* Character Body */}
            <div className="w-14 h-16 md:w-20 md:h-24 bg-valentine-hot-pink rounded-t-full relative shadow-coral">
              {/* Face */}
              <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-valentine-text rounded-full" />
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-valentine-text rounded-full" />
              </div>
              {/* Blush */}
              <div className="absolute top-7 md:top-10 left-3 w-3 h-1.5 md:w-4 md:h-2 bg-valentine-red/30 rounded-full" />
              <div className="absolute top-7 md:top-10 right-3 w-3 h-1.5 md:w-4 md:h-2 bg-valentine-red/30 rounded-full" />
              {/* Smile */}
              <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-5 h-2.5 md:w-8 md:h-4 border-b-[3px] border-valentine-text rounded-full" />
              {/* Hair decoration - bow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-base md:text-lg">🎀</span>
              </div>
            </div>
            {/* Body */}
            <div className="w-10 h-12 md:w-14 md:h-16 bg-valentine-hot-pink/80 rounded-b-2xl mx-auto -mt-1" />
            {/* Legs */}
            <div className="flex justify-center gap-2 md:gap-3 -mt-1">
              <div className="w-2.5 h-5 md:w-3.5 md:h-7 bg-valentine-text rounded-full" />
              <div className="w-2.5 h-5 md:w-3.5 md:h-7 bg-valentine-text rounded-full" />
            </div>
            {/* Arms - reaching for rose */}
            <div className="absolute top-9 md:top-14 -left-3 md:-left-4 w-3.5 h-9 md:w-5 md:h-12 bg-valentine-hot-pink/60 rounded-full rotate-[-30deg]" />
          </div>
        </motion.div>

        {/* Heart connection line */}
        {showCelebration && (
          <motion.div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 flex gap-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Heart className="w-8 h-8 text-valentine-red fill-valentine-red animate-heart-pulse" />
            <Heart className="w-10 h-10 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-pulse" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-8 h-8 text-valentine-red fill-valentine-red animate-heart-pulse" style={{ animationDelay: '0.4s' }} />
          </motion.div>
        )}
      </div>

      {/* CTA Button */}
      {showCelebration && (
        <motion.div
          className="relative z-20 mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <button
            onClick={onOpenLetter}
            className="btn-coral text-lg font-semibold px-10 py-5 rounded-full btn-hover-lift flex items-center gap-3 group"
          >
            Open your letter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}

      {/* Celebration hearts - Spread further */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 0.4, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5, type: 'spring' }}
              style={{
                left: `${2 + (i % 10) * 11}%`,
                top: `${5 + Math.floor(i / 10) * 85}%`,
              }}
            >
              <Heart
                className="w-5 h-5 text-valentine-red/40 fill-valentine-red/40 animate-heart-float"
                style={{
                  transform: `rotate(${i * 18}deg) scale(${0.7 + Math.random() * 0.5})`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
