import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GlassDock.css';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function GlassDock({ items, className, dockClassName }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const handleMouseEnter = (index) => {
    if (hoveredIndex !== null && index !== hoveredIndex) {
      setDirection(index > hoveredIndex ? 1 : -1);
    }
    setHoveredIndex(index);
  };

  const getTooltipPosition = (index) => {
    // Item size is 40px + gap-4 (16px) = 56px.
    // Container left padding is 24px (px-6).
    // Tooltip is 100px wide. Centering offset = (40 - 100) / 2 = -30px.
    // Total x position = padding + index * 56 + offset = 24 + index * 56 - 30 = index * 56 - 6px.
    return index * 56 - 6;
  };

  return (
    <div className={cn('glass-dock-wrapper', className)}>
      <div
        className={cn("glass-dock", dockClassName)}
        onMouseLeave={() => {
          setHoveredIndex(null);
          setDirection(0);
        }}
      >
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -60,
                x: getTooltipPosition(hoveredIndex),
              }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="glass-dock-tooltip-container"
            >
              <div className="glass-dock-tooltip">
                <div className="tooltip-text-wrapper">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={items[hoveredIndex].title}
                      custom={direction}
                      initial={{
                        x: direction > 0 ? 20 : -20,
                        opacity: 0,
                        filter: 'blur(3px)',
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        x: direction > 0 ? -20 : 20,
                        opacity: 0,
                        filter: 'blur(3px)',
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                      className="tooltip-text"
                    >
                      {items[hoveredIndex].title}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((el, index) => {
          const Icon = el.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={el.title}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={el.onClick}
              className={cn("glass-dock-item", isHovered ? "active" : "")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  el.onClick();
                }
              }}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="icon-wrapper"
              >
                <Icon className="dock-icon" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
