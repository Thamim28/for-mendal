import { useRef, useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface LoveMeterSectionProps {
  onConfetti: () => void;
  onComplete: () => void;
}

export default function LoveMeterSection({ onConfetti, onComplete }: LoveMeterSectionProps) {
  const [loveValue, setLoveValue] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const hasFiredConfetti = useRef(false);

  // Generate floating hearts based on slider value
  const updateHearts = useCallback((value: number) => {
    const heartCount = Math.floor(value / 15);
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: 10 + (i * 80) / Math.max(heartCount, 1),
      y: 30 + Math.sin(i * 0.5) * 10,
    }));
    setHearts(newHearts);

    if (value > 85 && !hasFiredConfetti.current) {
      setShowResult(true);
      hasFiredConfetti.current = true;
      onConfetti();
      onComplete();
    } else if (value <= 85) {
      setShowResult(false);
    }
  }, [onConfetti, onComplete]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // Only allow increasing, not decreasing
    if (value >= loveValue) {
      setLoveValue(value);
      updateHearts(value);
    } else {
      if (sliderRef.current) {
        sliderRef.current.value = loveValue.toString();
      }
    }
  }, [loveValue, updateHearts]);

  const getLoveLabel = () => {
    if (loveValue < 25) return 'A little 💕';
    if (loveValue < 50) return 'More 💖';
    if (loveValue < 75) return 'A lot 💗';
    if (loveValue < 90) return 'So much! 💘';
    return 'To the moon 🌙💝';
  };

  const getLoveEmoji = () => {
    if (loveValue < 25) return '😊';
    if (loveValue < 50) return '🥰';
    if (loveValue < 75) return '😍';
    if (loveValue < 90) return '🤩';
    return '🚀💕';
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F6C7C3 0%, #F9B1B1 100%)',
      }}
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute w-8 h-8 text-valentine-red/30 fill-valentine-red/30 animate-heart-float"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.id * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkle Decorations */}
      <motion.div
        className="absolute top-[15%] left-[10%]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Sparkles className="w-12 h-12 text-valentine-hot-pink animate-pulse" />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] right-[12%]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Sparkles className="w-10 h-10 text-valentine-coral animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-pacifico text-4xl md:text-5xl text-valentine-text mb-4">
            How much do you love me?
          </h2>
          <p className="font-nunito text-lg text-valentine-text-muted">
            Drag the slider... but it only goes up! 😉
          </p>
        </motion.div>

        {/* Love Meter Card */}
        <motion.div
          className="glass-card-strong p-8 md:p-12"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Current Value Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-valentine-lavender px-6 py-3 rounded-full">
              <span className="text-3xl">{getLoveEmoji()}</span>
              <span className="font-pacifico text-2xl text-valentine-red">
                {getLoveLabel()}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative mb-8">
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max="100"
              value={loveValue}
              onChange={handleSliderChange}
              className="love-slider w-full"
              style={{
                background: `linear-gradient(to right, #FFF0F5 0%, #E86A6A ${loveValue}%, #FFF0F5 ${loveValue}%)`,
              }}
            />

            {/* Slider Handle Custom */}
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
              style={{ left: `calc(${loveValue}% - 22px)` }}
            >
              <div className="w-11 h-11 bg-valentine-red rounded-full border-4 border-white shadow-coral flex items-center justify-center animate-heart-pulse">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between px-2 text-sm font-nunito text-valentine-text-muted">
            <span>A little</span>
            <span>More</span>
            <span>A lot</span>
            <span>To the moon</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 h-3 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-valentine-coral via-valentine-red to-valentine-hot-pink rounded-full"
              animate={{ width: `${loveValue}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Result Message */}
          {showResult && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="inline-flex items-center gap-2 bg-valentine-red text-white px-8 py-4 rounded-full shadow-coral-lg">
                <Heart className="w-6 h-6 fill-white" />
                <span className="font-pacifico text-xl">That&apos;s the right answer!</span>
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <p className="mt-4 font-nunito text-valentine-text-muted">
                I love you to the moon and back! 🌙💕
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Hearts Around Slider */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2">
          <Heart
            className="w-6 h-6 text-valentine-coral fill-valentine-coral animate-heart-float"
            style={{ opacity: loveValue / 100 }}
          />
        </div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
          <Heart
            className="w-6 h-6 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-float"
            style={{ animationDelay: '0.5s', opacity: loveValue / 100 }}
          />
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-valentine-text-muted/60 font-nunito animate-pulse">
          Keep scrolling for more surprises... 💝
        </p>
      </div>
    </section>
  );
}
