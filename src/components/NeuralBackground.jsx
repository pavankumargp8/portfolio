import React, { useEffect, useRef } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

export default function NeuralBackground({
  className,
  color = '#8b9cff',
  trailOpacity = 0.09,
  particleCount = 180,
  speed = 0.36,
  backgroundColor = '#020617',
  connectDistance = 96,
  mouseInfluence = 140,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let pointerInside = false;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = 140 + Math.random() * 180;
        this.radius = 0.9 + Math.random() * 1.7;
      }

      update() {
        const flow = Math.sin(this.x * 0.0035) + Math.cos(this.y * 0.0035);
        const angle = flow * Math.PI;

        this.vx += Math.cos(angle) * 0.15 * speed;
        this.vy += Math.sin(angle) * 0.15 * speed;

        if (pointerInside) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            const push = force * force * 0.9;
            this.vx -= dx * 0.0022 * push;
            this.vy -= dy * 0.0022 * push;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.age += 1;

        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }

      draw(ctx) {
        const normalizedAge = this.age / this.life;
        const alpha = Math.max(0.08, 1 - Math.abs(normalizedAge - 0.5) * 2);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
      }
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.imageSmoothingEnabled = false;

      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const drawConnections = () => {
      context.globalAlpha = 1;
      context.lineWidth = 1;

      for (let i = 0; i < particles.length; i += 1) {
        const current = particles[i];

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = current.x - other.x;
          const dy = current.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectDistance) {
            continue;
          }

          const alpha = (1 - distance / connectDistance) * 0.12;
          context.strokeStyle = color;
          context.globalAlpha = alpha;
          context.beginPath();
          context.moveTo(current.x, current.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    };

    const animate = () => {
      context.globalAlpha = 1;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = trailOpacity;
      context.fillStyle = 'rgba(2, 6, 23, 1)';
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;

      drawConnections();

      for (const particle of particles) {
        particle.update();
        particle.draw(context);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      pointerInside = true;
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [backgroundColor, color, connectDistance, mouseInfluence, particleCount, speed, trailOpacity]);

  return (
    <div
      ref={containerRef}
      className={classNames('relative h-full w-full overflow-hidden', className)}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 18%, rgba(139, 156, 255, 0.24), transparent 26%), radial-gradient(circle at 78% 24%, rgba(34, 211, 238, 0.14), transparent 24%), radial-gradient(circle at 48% 76%, rgba(59, 130, 246, 0.12), transparent 28%), linear-gradient(135deg, rgba(15, 23, 42, 0.12), rgba(2, 6, 23, 0.02))',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}