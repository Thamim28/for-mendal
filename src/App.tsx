import { useState, useRef, useCallback, useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import JourneySection from './sections/JourneySection';
import QuizCookSection from './sections/QuizCookSection';
import LoveMeterSection from './sections/LoveMeterSection';
import QuizFoodSection from './sections/QuizFoodSection';
import TokensSection from './sections/TokensSection';
import RoseDeliverySection from './sections/RoseDeliverySection';
import LetterGallerySection from './sections/LetterGallerySection';
import BlobCursor from './components/BlobCursor';
import ConfettiEffect from './components/ConfettiEffect';
import ScrollingBoy from './components/ScrollingBoy';
import { Volume2, VolumeX } from 'lucide-react';
import './App.css';

import bgMusic from '../Images/bg music.mpeg';

// Section IDs for scroll-lock management
const LOCKABLE_SECTIONS = ['hero', 'journey', 'quiz-cook', 'love-meter', 'quiz-food', 'tokens', 'rose-delivery', 'letter-gallery'] as const;
type SectionId = typeof LOCKABLE_SECTIONS[number];

function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiType, setConfettiType] = useState<'burst' | 'fireworks' | 'hearts'>('burst');
  const [isPlaying, setIsPlaying] = useState(false);
  const [boyAtRose, setBoyAtRose] = useState(false);
  const roseRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Scroll-lock: track which sections are "completed" (allow scrolling past)
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set());
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    'hero': null,
    'journey': null,
    'quiz-cook': null,
    'love-meter': null,
    'quiz-food': null,
    'tokens': null,
    'rose-delivery': null,
    'letter-gallery': null,
  });

  const markCompleted = useCallback((sectionId: SectionId) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });
  }, []);

  // Scroll-lock effect: prevent scrolling past sections that aren't completed
  // Also detect when rose section comes into view
  useEffect(() => {
    const handleScroll = () => {
      // Detect rose section in view — transfer boy from timeline to scene
      if (roseRef.current) {
        const roseRect = roseRef.current.getBoundingClientRect();
        if (roseRect.top < window.innerHeight * 0.5 && roseRect.bottom > 0) {
          setBoyAtRose(true);
        }
      }

      // Find the first incomplete interactive section
      const interactiveSections: SectionId[] = ['quiz-cook', 'love-meter', 'quiz-food'];

      for (const sectionId of interactiveSections) {
        if (completedSections.has(sectionId)) continue;

        const el = sectionRefs.current[sectionId];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedSections]);

  const registerRef = useCallback((sectionId: SectionId) => (el: HTMLElement | null) => {
    sectionRefs.current[sectionId] = el;
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => { });
        audioRef.current.muted = false;
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleStart = useCallback(() => {
    markCompleted('hero');
    scrollToSection(1);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      audioRef.current.muted = false;
    }
  }, [isPlaying, markCompleted]);

  const triggerConfetti = useCallback((type: 'burst' | 'fireworks' | 'hearts' = 'burst') => {
    setConfettiType(type);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 100);
  }, []);

  const handleFinale = useCallback(() => {
    setBoyAtRose(true);
    markCompleted('rose-delivery');
    triggerConfetti('fireworks');
    setShowGallery(true);
    // Use a small timeout to ensure the gallery is rendered before scrolling
    setTimeout(() => {
      scrollToSection(7);
    }, 100);
  }, [triggerConfetti, markCompleted]);

  // Audio State Persistence
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Restore state from localStorage
    const savedTime = localStorage.getItem('audioTime');
    const wasPlaying = localStorage.getItem('audioPlaying') !== 'false'; // Default to true

    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }

    // Always attempt to play on mount if it was playing or default
    if (wasPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            audio.muted = false;
          })
          .catch(() => {
            // Silently fail if autoplay is prevented
            setIsPlaying(false);
          });
      }
    }

    // Save time periodically
    const handleTimeUpdate = () => {
      localStorage.setItem('audioTime', audio.currentTime.toString());
    };

    // Save playing state
    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem('audioPlaying', 'true');
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem('audioPlaying', 'false');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Global interaction listener for fallback
    const handleInteraction = () => {
      if (audio.paused && localStorage.getItem('audioPlaying') !== 'false') {
        audio.play().catch(() => { });
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-valentine-pink">
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto"
        src={bgMusic} />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Blob Cursor Effect */}
      <BlobCursor />

      {/* Confetti Effect */}
      <ConfettiEffect active={confettiActive} type={confettiType} />

      {/* Left-side Vertical Timeline with Boy */}
      <ScrollingBoy hideAtFinale={boyAtRose} />

      {/* Persistent Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex justify-between items-center pointer-events-none">
        <div className="font-pacifico text-xl text-valentine-text opacity-80 md:ml-20 ml-12">
          For Mendal
        </div>
        <button
          className="pointer-events-auto p-3 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-300 shadow-soft backdrop-blur-sm"
          onClick={toggleMusic}
          aria-label="Toggle sound"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-valentine-red" />
          ) : (
            <VolumeX className="w-5 h-5 text-valentine-text-muted" />
          )}
        </button>
      </header>

      {/* Main Content — Padded for mobile responsiveness */}
      <main className="relative md:px-20 px-4">
        <HeroSection onStart={handleStart} />

        <div ref={registerRef('journey')}>
          <JourneySection onComplete={() => markCompleted('journey')} />
        </div>

        <div ref={registerRef('quiz-cook')}>
          <QuizCookSection
            onConfetti={() => triggerConfetti('burst')}
            onComplete={() => markCompleted('quiz-cook')}
          />
        </div>

        <div ref={registerRef('love-meter')}>
          <LoveMeterSection
            onConfetti={() => triggerConfetti('hearts')}
            onComplete={() => markCompleted('love-meter')}
          />
        </div>

        <div ref={registerRef('quiz-food')}>
          <QuizFoodSection
            onConfetti={() => triggerConfetti('burst')}
            onComplete={() => markCompleted('quiz-food')}
          />
        </div>

        <div ref={registerRef('tokens')}>
          <TokensSection onComplete={() => markCompleted('tokens')} />
        </div>

        <div ref={(el) => { registerRef('rose-delivery')(el); roseRef.current = el; }}>
          <RoseDeliverySection
            onOpenLetter={handleFinale}
            showBoy={boyAtRose}
          />
        </div>

        {showGallery && (
          <div ref={registerRef('letter-gallery')}>
            <LetterGallerySection onReplay={() => {
              setBoyAtRose(false);
              setShowGallery(false);
              setCompletedSections(new Set());
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
