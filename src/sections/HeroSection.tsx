import { Heart, Sparkles, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F6C7C3 0%, #FFF0F5 50%, #F9B1B1 100%)',
      }}
    >
      {/* Floating Heart Decorations */}
      <motion.div
        className="absolute left-[6vw] top-[10vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="relative">
          <Heart className="w-16 h-16 text-valentine-red fill-valentine-red animate-heart-float" />
          <Heart className="absolute -top-4 left-8 w-10 h-10 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-float" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute top-8 -left-4 w-8 h-8 text-valentine-coral fill-valentine-coral animate-heart-float" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[6vw] top-[12vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative">
          <Heart className="w-14 h-14 text-valentine-red fill-valentine-red animate-heart-float" style={{ animationDelay: '0.3s' }} />
          <Heart className="absolute top-6 right-6 w-12 h-12 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-float" style={{ animationDelay: '0.8s' }} />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[8vw] bottom-[10vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="relative">
          <Heart className="w-20 h-20 text-valentine-red fill-valentine-red animate-heart-float" style={{ animationDelay: '0.2s' }} />
          <Heart className="absolute bottom-4 left-10 w-10 h-10 text-valentine-coral fill-valentine-coral animate-heart-float" style={{ animationDelay: '0.7s' }} />
          <Heart className="absolute -bottom-2 left-2 w-8 h-8 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-float" style={{ animationDelay: '1.2s' }} />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[8vw] bottom-[12vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="relative">
          <Heart className="w-16 h-16 text-valentine-red fill-valentine-red animate-heart-float" style={{ animationDelay: '0.4s' }} />
          <Heart className="absolute bottom-8 right-8 w-12 h-12 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-float" style={{ animationDelay: '0.9s' }} />
        </div>
      </motion.div>

      {/* Floating Envelope */}
      <motion.div
        className="absolute right-[18vw] top-[22vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="bg-white/80 p-3 rounded-2xl shadow-soft animate-gentle-bob">
          <Sparkles className="w-8 h-8 text-valentine-red" />
        </div>
      </motion.div>

      {/* Floating Music Note */}
      <motion.div
        className="absolute left-[20vw] top-[30vh]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="bg-white/60 p-2 rounded-xl shadow-soft animate-gentle-bob" style={{ animationDelay: '0.5s' }}>
          <Music className="w-6 h-6 text-valentine-hot-pink" />
        </div>
      </motion.div>

      {/* Main Hero Card */}
      <motion.div
        className="relative z-10 glass-card-strong p-8 md:p-12 max-w-lg w-[90vw] text-center"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute -top-4 -left-4">
          <Heart className="w-10 h-10 text-valentine-red fill-valentine-red animate-heart-pulse" />
        </div>
        <div className="absolute -bottom-3 -right-3">
          <Heart className="w-8 h-8 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <motion.h1
          className="font-pacifico text-5xl md:text-6xl lg:text-7xl text-valentine-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          For Mendal
          <span className="inline-block ml-2 animate-heart-pulse">❤️</span>
        </motion.h1>

        <motion.p
          className="font-nunito text-lg md:text-xl text-valentine-text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A tiny scroll, a lot of love.
        </motion.p>

        <motion.button
          onClick={onStart}
          className="btn-coral text-lg font-semibold px-10 py-4 rounded-full btn-hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start the journey
          <Sparkles className="inline-block ml-2 w-5 h-5" />
        </motion.button>

        <motion.p
          className="mt-6 text-sm text-valentine-text-muted/70 font-nunito"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Turn sound on for the full blush ✨
        </motion.p>
      </motion.div>

      {/* Background decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-valentine-coral/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-valentine-hot-pink/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '-4s' }} />
    </section>
  );
}
