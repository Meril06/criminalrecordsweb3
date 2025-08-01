// src/pages/Home.jsx
import { useEffect, useRef, useState } from 'react';

// Matrix background effect as a React component
function MatrixBackground() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function draw() {
      ctx.fillStyle = 'rgba(10,20,30,0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.shadowColor = '#00ff99';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#00fff7';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.shadowBlur = 0;
    }
    let interval = setInterval(draw, 50);
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      id="matrix-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.32,
        filter: 'blur(0.5px)'
      }}
    />
  );
}

// Scanlines overlay
function Scanlines() {
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 2,
      opacity: 0.10,
      backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #00fff7 2.5px, transparent 3.5px)',
      animation: 'scanlines-move 2s linear infinite',
    }} />
  );
}

// Particle overlay
function Particles() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? '#00fff7' : '#00ff99',
    }));
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
    }
    let interval = setInterval(draw, 40);
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.18,
      }}
    />
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export default function Home() {
  // Floating card parallax
  const [cardStyle, setCardStyle] = useState({});
  const cardRef = useRef();
  useEffect(() => {
    function handleMouseMove(e) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setCardStyle({
        transform: `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.01)`
      });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden bg-[#0a192f]">
      <MatrixBackground />
      <Particles />
      <Scanlines />
      <div
        ref={cardRef}
        className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl p-10 sm:p-14 max-w-2xl w-full text-center border border-cyan-900/30 shadow-lg ring-1 ring-cyan-900/10"
        style={{ ...cardStyle, boxShadow: '0 4px 24px 0 #0ea5e944, 0 1.5px 8px 0 #0ea5e955' }}
      >
        <div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow tracking-tight text-cyan-200"
            style={{ textShadow: '0 1px 6px #0ea5e9aa' }}
          >
            Criminal Records dApp
          </h1>
          <p
            className="text-gray-200 text-lg sm:text-xl mb-10 font-medium"
            style={{ textShadow: '0 1px 2px #0ea5e955' }}
          >
            Transparent. Secure. Decentralized.<br />Powered by Blockchain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/police"
              className="px-7 py-3 rounded-xl bg-blue-600 shadow text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-all border border-blue-700/30 hover:bg-blue-700 hover:shadow-md hover:scale-105"
              aria-label="Police Dashboard"
              style={{ textShadow: '0 1px 2px #0ea5e9' }}
            >
              Police Dashboard
            </a>
            <a
              href="/public"
              className="px-7 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white font-bold text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all hover:bg-gray-900 hover:border-blue-700 hover:shadow-md hover:scale-105"
              aria-label="Public Portal"
              style={{ textShadow: '0 1px 2px #0ea5e9' }}
            >
              Public Portal
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scanlines-move {
          0% { background-position-y: 0; }
          100% { background-position-y: 8px; }
        }
      `}</style>
    </div>
  );
}
