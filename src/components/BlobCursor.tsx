import { useEffect, useState, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export default function BlobCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<CursorPosition[]>([]);
  const rafId = useRef<number | null>(null);
  const targetPosition = useRef<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth cursor following using RAF
    const animate = () => {
      setPosition(prev => {
        const dx = targetPosition.current.x - prev.x;
        const dy = targetPosition.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });

      // Update trail
      setTrailPositions(prev => {
        const newTrail = [targetPosition.current, ...prev.slice(0, 4)];
        return newTrail;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor blob */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-multiply transition-opacity duration-300"
        style={{
          left: position.x - 30,
          top: position.y - 30,
          width: 60,
          height: 60,
          opacity: isVisible ? 0.6 : 0,
          background: 'radial-gradient(circle, rgba(232, 106, 106, 0.5) 0%, rgba(255, 105, 180, 0.3) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          transform: `scale(${isVisible ? 1 : 0.5})`,
          transition: 'transform 0.2s ease-out, opacity 0.3s ease',
        }}
      />
      
      {/* Cursor trail */}
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: pos.x - 15 + index * 2,
            top: pos.y - 15 + index * 2,
            width: 30 - index * 4,
            height: 30 - index * 4,
            opacity: isVisible ? 0.3 - index * 0.05 : 0,
            background: 'radial-gradient(circle, rgba(255, 105, 180, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(4px)',
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}

      {/* Sparkle effects around cursor */}
      {isVisible && (
        <>
          <div
            className="fixed pointer-events-none z-[9996] animate-pulse"
            style={{
              left: position.x + 25,
              top: position.y - 25,
              fontSize: 12,
              opacity: 0.7,
            }}
          >
            ✨
          </div>
          <div
            className="fixed pointer-events-none z-[9996] animate-pulse"
            style={{
              left: position.x - 30,
              top: position.y + 20,
              fontSize: 8,
              opacity: 0.5,
              animationDelay: '0.3s',
            }}
          >
            💕
          </div>
        </>
      )}
    </>
  );
}
