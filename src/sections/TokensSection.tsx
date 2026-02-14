import { useRef, useState, useCallback } from 'react';
import { Heart, Star } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import thamimImage from '../../Images/thamim.jpeg';

interface Token {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

interface TokensSectionProps {
  onComplete: () => void;
}

export default function TokensSection({ onComplete }: TokensSectionProps) {
  const [tokens, setTokens] = useState<Token[]>([
    { id: 1, x: 15, y: 20, collected: false },
    { id: 2, x: 85, y: 25, collected: false },
    { id: 3, x: 30, y: 60, collected: false },
    { id: 4, x: 70, y: 70, collected: false },
    { id: 5, x: 50, y: 40, collected: false },
  ]);
  const [collectedCount, setCollectedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const collectToken = useCallback((id: number) => {
    setTokens(prev =>
      prev.map(token =>
        token.id === id ? { ...token, collected: true } : token
      )
    );
    setCollectedCount(prev => {
      const newCount = prev + 1;
      if (newCount === tokens.length) {
        onComplete();
      }
      return newCount;
    });
  }, [tokens.length, onComplete]);

  const allCollected = collectedCount === tokens.length;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24"
      style={{
        background: 'linear-gradient(180deg, #F6C7C3 0%, #FFF0F5 100%)',
      }}
    >
      {/* Background Stars - Spread throughout */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-[10%] left-[10%] w-6 h-6 text-valentine-coral/40 fill-valentine-coral/40 animate-pulse" />
        <Star className="absolute top-[20%] right-[10%] w-5 h-5 text-valentine-hot-pink/30 fill-valentine-hot-pink/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Star className="absolute bottom-[15%] left-[15%] w-7 h-7 text-valentine-red/25 fill-valentine-red/25 animate-pulse" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-[40%] right-[5%] w-5 h-5 text-valentine-coral/35 fill-valentine-coral/35 animate-pulse" style={{ animationDelay: '0.7s' }} />
        <Star className="absolute bottom-[30%] right-[15%] w-6 h-6 text-valentine-hot-pink/20 fill-valentine-hot-pink/20 animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* Title - Natural flow */}
      <motion.div
        className="relative z-10 text-center mb-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-pacifico text-4xl md:text-5xl lg:text-6xl text-valentine-text mb-4">
          Collect the love tokens
        </h2>
        <p className="font-nunito text-lg md:text-xl text-valentine-text-muted max-w-md mx-auto">
          Tap them. Or just watch them come home.
        </p>
      </motion.div>

      {/* Progress Counter - Natural flow */}
      <motion.div
        className="relative z-10 mb-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <div className="bg-white/90 px-8 py-4 rounded-full shadow-soft flex items-center gap-4 backdrop-blur-sm border border-valentine-coral/10">
          <Heart className={`w-8 h-8 ${allCollected ? 'text-valentine-red fill-valentine-red' : 'text-valentine-coral'} transition-all duration-500 animate-heart-pulse`} />
          <span className="font-nunito font-bold text-xl text-valentine-text">
            {collectedCount} / {tokens.length} collected
          </span>
        </div>
      </motion.div>

      {/* Tokens Container - Relative area for tokens to live in */}
      <div className="relative w-full max-w-6xl h-[40vh] md:h-[50vh] flex items-center justify-center">
        {tokens.map((token, index) => (
          !token.collected && (
            <motion.button
              key={token.id}
              onClick={() => collectToken(token.id)}
              className="absolute hover:z-20 group"
              style={{
                left: `${token.x}%`,
                top: `${token.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative animate-gentle-bob" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-valentine-red to-valentine-hot-pink rounded-full flex items-center justify-center shadow-coral-lg cursor-pointer group-hover:shadow-valentine">
                  <Heart className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-valentine-red/30 rounded-full blur-xl -z-10 opacity-60" />

                {/* Sparkle effects around tokens */}
                <div className="absolute -top-2 -right-2 text-xl animate-pulse">✨</div>
              </div>
            </motion.button>
          )
        ))}

        {/* Inline Completion Reward */}
        <AnimatePresence>
          {allCollected && (
            <motion.div
              className="relative z-20 -mt-20"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            >
              <motion.div
                className="relative bg-white/10 p-2 rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-w-[280px] w-full"
              >
                {/* Floating Hearts Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-valentine-red"
                      initial={{
                        opacity: 0,
                        y: 100,
                        x: Math.random() * 300 - 150,
                        scale: 0.5
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: -300,
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    >
                      <Heart className="w-6 h-6 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={thamimImage}
                    alt="Special Reward"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info / Celebration - Absolute but centered */}
      <div className="relative mt-12 flex flex-col items-center gap-4 transition-all duration-500 z-30">
        {isInView && !allCollected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm md:text-base text-valentine-text-muted/60 font-nunito flex items-center gap-2"
          >
            Click the hearts or wait for them to find you... 💫
          </motion.p>
        )}

        {allCollected && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="bg-gradient-to-r from-valentine-red to-valentine-hot-pink text-white px-10 py-5 rounded-full shadow-coral-lg flex items-center gap-4 mb-4">
              <Heart className="w-6 h-6 fill-white animate-heart-pulse" />
              <span className="font-pacifico text-2xl">All love collected!</span>
              <Heart className="w-6 h-6 fill-white animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-valentine-text-muted font-nunito text-lg animate-bounce">
              Ready for the grand finale... 🌹
            </p>
          </motion.div>
        )}
      </div>

      {/* Decorative floating elements spread out */}
      <div className="absolute top-[30%] left-[8%] text-3xl animate-bounce" style={{ animationDuration: '3s' }}>
        ✨
      </div>
      <div className="absolute bottom-[25%] right-[10%] text-2xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        💫
      </div>


    </section>
  );
}
