"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

const greetings = [
  "Hello, World!",
  "Welcome to my corner",
  "Let's build something",
  "Exploring ideas",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

export default function CreativeCorner() {
  const [greeting, setGreeting] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const colors = ['#0066FF', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 3 + 2,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x <= particle.radius || particle.x >= canvas.width - particle.radius) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y <= particle.radius || particle.y >= canvas.height - particle.radius) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections (percolation)
        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${1 - distance / 80})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const interval = setInterval(animate, 1000 / 60);

    return () => clearInterval(interval);
  }, [showCanvas]);

  return (
    <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[var(--nb-primary)]" />
        <span className="text-[var(--nb-text)] font-bold text-sm uppercase tracking-wider">Creative Corner</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        {showCanvas ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'var(--nb-bg)' }}
          />
        ) : (
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-3 transition-all duration-500 leading-tight">
              {greetings[greeting]}
            </div>
            <p className="text-[var(--nb-text-muted)] text-sm">
              CS, Logic, and Games
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowCanvas(!showCanvas)}
        className="w-full border-2 border-[var(--nb-border)] py-2 text-[var(--nb-text)] font-semibold hover:bg-[var(--nb-primary)] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all text-sm"
      >
        {showCanvas ? "Hide Canvas" : "Show Canvas"}
      </button>
    </div>
  );
}

