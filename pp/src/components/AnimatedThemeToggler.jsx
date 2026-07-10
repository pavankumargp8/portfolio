import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './AnimatedThemeToggler.css';

export function AnimatedThemeToggler({ className = '', onThemeChange }) {
  const [theme, setThemeState] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Fallback to system preference (OS color scheme)
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  });

  useEffect(() => {
    // Sync the class on root HTML element
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

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
      localStorage.setItem('theme', nextTheme); // Persist choice
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
