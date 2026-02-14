import { useRef, useState, useEffect } from 'react';
import { ImageCursorTrail } from "../components/ui/image-cursor-trail";
import { Heart, RotateCcw, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface LetterGallerySectionProps {
  onReplay: () => void;
}

import moment1 from '../../Images/moment1.jpeg';
import moment2 from '../../Images/moment2.jpeg';
import moment3 from '../../Images/moment3.jpeg';
import moment4 from '../../Images/moment4.jpeg';
import moment5 from '../../Images/moment5.jpeg';
import moment6 from '../../Images/moment6.jpeg';

// Photos with Unsplash images
const PHOTOS = [
  { id: 1, caption: 'Our first spark ✨', img: moment1 },
  { id: 2, caption: 'Growing closer everyday 🌹', img: moment2 },
  { id: 3, caption: 'Adventures with you 🌍', img: moment3 },
  { id: 4, caption: 'Sweetest memories 🍭', img: moment4 },
  { id: 5, caption: 'My safe place 🏡', img: moment5 },
  { id: 6, caption: 'Forever and always ❤️', img: moment6 },
];

export default function LetterGallerySection({ onReplay }: LetterGallerySectionProps) {
  const [letterRevealed, setLetterRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setLetterRevealed(true), 500);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F9B1B1 0%, #F6C7C3 50%, #FFF0F5 100%)',
      }}
    >
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[5%] left-[8%] w-8 h-8 text-valentine-coral/25 fill-valentine-coral/25 animate-heart-float" />
        <Heart className="absolute top-[10%] right-[10%] w-6 h-6 text-valentine-hot-pink/20 fill-valentine-hot-pink/20 animate-heart-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-[10%] left-[12%] w-10 h-10 text-valentine-red/15 fill-valentine-red/15 animate-heart-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-[15%] right-[8%] w-7 h-7 text-valentine-coral/20 fill-valentine-coral/20 animate-heart-float" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Letter Card */}
        <motion.div
          className="letter-card mb-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 left-8">
            <Heart className="w-12 h-12 text-valentine-red fill-valentine-red animate-heart-pulse" />
          </div>
          <div className="absolute -bottom-4 right-8">
            <Heart className="w-10 h-10 text-valentine-hot-pink fill-valentine-hot-pink animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Letter Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-valentine-lavender px-6 py-2 rounded-full mb-4">
              <Quote className="w-5 h-5 text-valentine-red" />
              <span className="font-nunito font-semibold text-valentine-text">A little letter</span>
              <Quote className="w-5 h-5 text-valentine-red" />
            </div>
          </div>

          {/* Letter Content */}
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={letterRevealed ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-nunito text-lg md:text-xl text-valentine-text leading-relaxed mb-6">
              <span className="font-pacifico text-2xl text-valentine-red">Mendal</span> — You make my
              <span className="text-valentine-hot-pink font-semibold"> world brighter</span> just by being in it.
              <span className="text-valentine-hot-pink font-semibold"> Your smile</span> is my favorite comfort and your voice is my peace.
            </p>
            <p className="font-nunito text-lg md:text-xl text-valentine-text leading-relaxed mb-6">
              I’m so grateful to have you in my life.
              No matter what happens, I’ll always care for you<span className="text-valentine-red font-semibold"> deeply. 💕</span>
            </p>
            <p className="font-pacifico text-2xl md:text-3xl text-valentine-red mt-8">
              Happy Valentine&apos;s Day! 💕
            </p>

            {/* Signature */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="font-nunito text-valentine-text-muted">—</span>
              <Heart className="w-5 h-5 text-valentine-red fill-valentine-red" />
              <span className="font-pacifico text-xl text-valentine-text">Me</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="font-pacifico text-3xl md:text-4xl text-valentine-text text-center mb-8">
            Our Moments Together
          </h3>

          {/* Polaroid Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PHOTOS.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="polaroid"
                initial={{ opacity: 0, y: 30, rotate: (index % 3 - 1) * 3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: (index % 3 - 1) * 3 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -8,
                  rotate: 0,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Photo */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <img
                    src={photo.img}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Caption */}
                <p className="font-nunito text-sm text-valentine-text-muted text-center">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            onClick={onReplay}
            className="btn-coral text-lg font-semibold px-10 py-5 rounded-full btn-hover-lift inline-flex items-center gap-3 group mb-6"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-[-360deg] transition-transform duration-700" />
            Replay the journey
          </button>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 text-valentine-text-muted/60">
            <Heart className="w-4 h-4 text-valentine-red fill-valentine-red animate-heart-pulse" />
            <span className="font-nunito text-sm">Made with love for Mendal</span>
            <Heart className="w-4 h-4 text-valentine-red fill-valentine-red animate-heart-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>

      {/* Bottom image cursor trail */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <ImageCursorTrail
          items={[
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format",
          ]}
          maxNumberOfImages={5}
          distance={25}
          imgClass="sm:w-40 w-28 sm:h-48 h-36"
          className="max-w-4xl mx-auto rounded-3xl"
        />
      </div>
    </section>
  );
}
