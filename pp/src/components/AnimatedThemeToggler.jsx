import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './AnimatedThemeToggler.css';

export function AnimatedThemeToggler({ className = '', onThemeChange }) {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    // Initialize theme state from document HTML tag class
    const isLight = document.documentElement.classList.contains('light');
    setThemeState(isLight ? 'light' : 'dark');
  }, []);

  const handleToggle = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Calculate click coordinates for the circular screen transition
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    document.documentElement.style.setProperty('--click-x', `${x}px`);
    document.documentElement.style.setProperty('--click-y', `${y}px`);

    const updateDOM = () => {
      if (nextTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      setThemeState(nextTheme);
      if (onThemeChange) {
        onThemeChange(nextTheme);
      }
    };

    // Fallback if browser doesn't support View Transitions API
    if (!document.startViewTransition) {
      updateDOM();
      return;
    }

    document.startViewTransition(() => {
      updateDOM();
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggle-btn ${className}`}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-icon-wrapper">
        {theme === 'dark' ? (
          <Sun className="theme-icon sun" />
        ) : (
          <Moon className="theme-icon moon" />
        )}
      </div>
    </button>
  );
}

export default AnimatedThemeToggler;
