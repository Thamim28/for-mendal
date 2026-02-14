import { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  active: boolean;
  type?: 'burst' | 'fireworks' | 'hearts';
}

export default function ConfettiEffect({ active, type = 'burst' }: ConfettiEffectProps) {
  const prevActive = useRef(false);

  const fireHearts = useCallback(() => {
    const heartShape = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.4,
      decay: 0.94,
      startVelocity: 20,
      shapes: [heartShape],
      colors: ['#E86A6A', '#FF69B4', '#F6C7C3', '#F9B1B1', '#FFB6C1'],
      scalar: 2,
    };

    confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.5 } });
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.5 } });

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.5, y: 0.3 } });
    }, 200);
  }, []);

  const fireBurst = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#E86A6A', '#FF69B4', '#F6C7C3', '#FFF0F5', '#F9B1B1', '#FFB6C1', '#ff0000'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        ...opts,
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const fireFireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 200,
      colors: ['#E86A6A', '#FF69B4', '#F6C7C3', '#FFF0F5', '#F9B1B1', '#FFB6C1'],
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.2 },
      });
    }, 250);
  }, []);

  useEffect(() => {
    // Only fire when active changes from false to true
    if (active && !prevActive.current) {
      switch (type) {
        case 'hearts':
          fireHearts();
          break;
        case 'fireworks':
          fireFireworks();
          break;
        case 'burst':
        default:
          fireBurst();
          break;
      }
    }
    prevActive.current = active;
  }, [active, type, fireBurst, fireFireworks, fireHearts]);

  // canvas-confetti manages its own canvas, no render needed
  return null;
}
