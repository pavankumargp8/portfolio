import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

const COLORS = ["#6366f1", "#14b8a6", "#a855f7", "#3b82f6", "#f43f5e"];
const PIXEL_SIZE = 14;
const TRAIL_LENGTH = 45;
const FADE_SPEED = 0.035;

export default function CustomCursor() {
  const [pixels, setPixels] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  const createPixel = useCallback((x, y) => {
    // Pick a random brand color for each pixel
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
    // Disable trail on touch devices (phones/tablets) to avoid visual clutter
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x, y };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop to update opacity and age of trail pixels
    const animate = () => {
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
    };
  }, [createPixel]);

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor-pixel-container">
      {pixels.map((pixel) => {
        // Calculate size based on age - older pixels are smaller
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
