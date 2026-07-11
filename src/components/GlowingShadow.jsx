import React from 'react';
import './GlowingShadow.css';

export function GlowingShadow({ children, className = '', style = {}, onClick }) {
  return (
    <div 
      className={`glow-container ${className}`} 
      style={style} 
      onClick={onClick} 
      role="button" 
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          onClick();
        }
      }}
    >
      <span className="glow"></span>
      <div className="glow-content">{children}</div>
    </div>
  );
}

export default GlowingShadow;
