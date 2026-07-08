import { useEffect, useRef, useState } from 'react';

import './FeatureShowcase.css';

function FeatureShowcase() {
  const [inset, setInset] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    return () => {
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };
  }, []);

  const updateInset = (event) => {
    if (!isDragging || !trackRef.current) {
      return;
    }

    const rect = trackRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));

    setInset(percentage);
  };

  const startDragging = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    updateInset(event);
  };

  return (
    <section className="feature-shell" id="platform" aria-labelledby="platform-title">
      <div className="feature-copy">
        <span className="feature-badge">Platform</span>
        <h2 id="platform-title">Something new for the portfolio experience</h2>
        <p>
          This interactive reveal section is a good fit for highlighting a before-and-after
          visual, a product concept, or a project demo with motion. Drag the handle to compare
          both states.
        </p>
      </div>

      <div
        ref={trackRef}
        className="feature-track"
        onPointerMove={updateInset}
        onPointerLeave={() => setIsDragging(false)}
        onContextMenu={(event) => event.preventDefault()}
      >
        <img
          src="https://www.twblocks.com/_next/image?url=%2Ffeature8.png&w=3840&q=75"
          alt="Light mode feature preview"
          className="feature-image feature-image-base"
          draggable="false"
        />

        <img
          src="https://www.twblocks.com/_next/image?url=%2Fdarkmode-feature8.png&w=3840&q=75"
          alt="Dark mode feature preview"
          className="feature-image feature-image-overlay"
          style={{ clipPath: `inset(0 0 0 ${inset}%)` }}
          draggable="false"
        />

        <div className="feature-divider" style={{ left: `${inset}%` }}>
          <button
            type="button"
            className="feature-handle"
            aria-label="Drag to compare the previews"
            onPointerDown={startDragging}
            onPointerUp={() => setIsDragging(false)}
            onPointerCancel={() => setIsDragging(false)}
          >
            <span className="feature-handle-grip" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureShowcase;