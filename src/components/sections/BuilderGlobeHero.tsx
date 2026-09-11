import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Lightbulb, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenSubmitIdea: () => void;
  onOpenJoinModal: () => void;
}

export const BuilderGlobeHero: React.FC<HeroProps> = ({
  onOpenSubmitIdea,
  onOpenJoinModal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = Math.min(580, window.innerHeight * 0.65));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(580, window.innerHeight * 0.65);
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 140;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
    }> = [];

    const radius = Math.min(width, height) * 0.3;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const px = radius * Math.sin(phi) * Math.cos(theta);
      const py = radius * Math.sin(phi) * Math.sin(theta);
      const pz = radius * Math.cos(phi);

      particles.push({
        x: px,
        y: py,
        z: pz,
        baseX: px,
        baseY: py,
        baseZ: pz,
        size: Math.random() * 1.5 + 0.8,
      });
    }

    let angleY = 0;
    let angleX = 0.15;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      angleY += 0.0025;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      ctx.strokeStyle = 'rgba(255, 224, 0, 0.05)';
      ctx.lineWidth = 0.8;

      const projected: Array<{ x: number; y: number; z: number; scale: number }> = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseX * sinY + p.baseZ * cosY;

        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = p.baseY * sinX + z1 * cosX;

        const fov = 400;
        const scale = fov / (fov + z2 + radius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({ x: projX, y: projY, z: z2, scale });

        const alpha = Math.max(0.15, (z2 + radius) / (2 * radius));
        ctx.fillStyle = `rgba(255, 224, 0, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < projected.length; i += 3) {
        for (let j = i + 1; j < projected.length; j += 4) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="builder-hero-section">
      <div className="ambient-light-rays" />
      <div className="dashed-bg-grid" />

      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="builder-globe-canvas" />
      </div>

      <div className="hero-content-inner content-width">
        <div className="hero-kicker-pill">
          <Sparkles size={13} className="hero-sparkle-icon" />
          <span>Youth-Driven Technology, Creator &amp; Startup Ecosystem</span>
        </div>

        <h1 className="hero-title">
          Where the Next Generation <br />
          <span className="gradient-text">Connects, Creates &amp; Leads.</span>
        </h1>

        <p className="hero-subtitle">
          Gentricks is a technology, builder, creator, and startup ecosystem uniting young innovators to take ideas from concept to production.
        </p>

        <div className="hero-cta-group">
          <button
            type="button"
            className="button button-yellow btn-text-slide"
            onClick={onOpenJoinModal}
          >
            <span>Join Gentricks Ecosystem</span>
            <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            className="button button-ghost"
            onClick={onOpenSubmitIdea}
          >
            <Lightbulb size={16} />
            <span>Submit an Idea</span>
          </button>
        </div>
      </div>
    </section>
  );
};
