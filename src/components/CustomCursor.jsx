import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

const COLORS = ["#6366f1", "#14b8a6", "#a855f7", "#3b82f6", "#f43f5e"];
const PIXEL_SIZE = 14;
const TRAIL_LENGTH = 45;
const FADE_SPEED = 0.035;

export default function CustomCursor() {
  const [pixels, setPixels] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();
  const leadRef = useRef(null);

  const createPixel = useCallback((x, y) => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 1,
      age: 0,
      color: randomColor
    };
  }, []);

  useEffect(() => {
    // Disable trail on touch devices (phones/tablets)
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;

      const dx = currentX - lastPositionRef.current.x;
      const dy = currentY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(currentX, currentY);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x: currentX, y: currentY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic hover detection for interactive elements (X close buttons, tabs, links)
    const updateHoverTargets = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], .drawer-close-btn, .section-card, .timeline-node, .skill-tag, .milestone-row, .bento-card, .glass-dock-item, .circular-gallery, .theme-toggle-btn'
      );

      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setIsHovered(true));
        target.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    updateHoverTargets();
    const hoverInterval = setInterval(updateHoverTargets, 1500);

    // Animation frame updates the permanent pointer position and fades old pixels
    const animate = () => {
      // Update lead pointer position
      if (leadRef.current) {
        leadRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(hoverInterval);
    };
  }, [createPixel]);

  if (isTouchDevice) return null;

  return (
    <div className={`custom-cursor-pixel-container ${isHovered ? 'cursor-hovered' : ''}`}>
      {/* Permanent visual cursor pointer block (never fades, aids targeting and clicking) */}
      <div ref={leadRef} className="custom-cursor-lead" />

      {pixels.map((pixel) => {
        const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 50);
        const currentSize = PIXEL_SIZE * sizeMultiplier;

        return (
          <div
            key={pixel.id}
            className="custom-cursor-pixel"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              opacity: pixel.opacity,
              backgroundColor: pixel.color,
              transition: 'width 0.08s ease-out, height 0.08s ease-out',
            }}
          />
        );
      })}
    </div>
  );
}
