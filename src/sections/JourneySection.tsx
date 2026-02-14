import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface JourneySectionProps {
  onComplete: () => void;
}

export default function JourneySection({ onComplete }: JourneySectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const hasCompleted = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollProgress(progress);
      if (progress > 0.7 && !hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F6C7C3 0%, #FFF0F5 100%)',
      }}
    >
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[15%] left-[10%] w-8 h-8 text-valentine-coral/40 fill-valentine-coral/40 animate-heart-float" />
        <Heart className="absolute top-[25%] right-[15%] w-6 h-6 text-valentine-hot-pink/30 fill-valentine-hot-pink/30 animate-heart-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-[20%] left-[20%] w-10 h-10 text-valentine-red/20 fill-valentine-red/20 animate-heart-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute top-[60%] right-[8%] w-7 h-7 text-valentine-coral/35 fill-valentine-coral/35 animate-heart-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-pacifico text-5xl md:text-6xl text-valentine-text mb-6">
          The Journey Begins
        </h2>
        <p className="font-nunito text-xl text-valentine-text-muted max-w-xl mx-auto">
          The journey of our love continues... <br className="hidden md:block" />
          Collect the hearts and solve the silly quizzes.
        </p>
      </motion.div>

      {/* Token Heart Badges along the path */}
      <motion.div
        className="absolute"
        style={{ left: '50vw', top: '42vh' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
      >
        <div className="relative animate-heart-pulse">
          <div className="w-14 h-14 bg-gradient-to-br from-valentine-red to-valentine-hot-pink rounded-full flex items-center justify-center shadow-coral-lg">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <div className="absolute inset-0 w-14 h-14 bg-valentine-red/30 rounded-full blur-xl -z-10" />
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '70vw', top: '50vh' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
      >
        <div className="relative animate-heart-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-valentine-coral to-valentine-hot-pink rounded-full flex items-center justify-center shadow-coral">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-[15%] left-[5%] text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
        🌸
      </div>
      <div className="absolute top-[40%] right-[10%] text-3xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        💝
      </div>
      <div className="absolute bottom-[25%] right-[20%] text-2xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        ✨
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-sm text-valentine-text-muted font-nunito">Keep scrolling</span>
        <div className="w-20 h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-valentine-red rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
