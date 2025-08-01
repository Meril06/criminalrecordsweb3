import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

function MatrixBackground() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fontSize = 18;
    let drops = [];
    let animationId;

    function setupCanvas() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }

    const chars =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function draw() {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(10,20,30,0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
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
      setTimeout(() => {
        animationId = requestAnimationFrame(draw);
      }, 50); // slow speed
    }

    setupCanvas();
    draw();
    window.addEventListener('resize', setupCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setupCanvas);
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
        opacity: 0.5,
        filter: 'blur(0.3px)',
      }}
    />
  );
}

function Landing() {
  const particles = useMemo(
    () =>
      [...Array(30)].map(() => ({
        width: Math.random() * 40 + 20,
        height: Math.random() * 40 + 20,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.2 + Math.random() * 0.3,
        y: Math.random() * 40 - 20,
        x: Math.random() * 40 - 20,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 min-h-screen w-screen overflow-hidden flex flex-col bg-black">
      <MatrixBackground />

      {/* Floating Glowing Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      >
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400 blur-2xl"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, p.y, 0],
              x: [0, p.x, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Navbar */}
      <motion.nav
        className="relative z-20 flex justify-between items-center px-8 py-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white tracking-wide">
            CR-DApp
          </span>
        </div>
        <div className="flex space-x-6">
          <a
            href="/"
            className="text-blue-200 hover:text-white transition-colors duration-200 font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-blue-200 hover:text-white transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-white transition-colors duration-200 font-medium"
          >
            GitHub
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Criminal Records DApp
        </motion.h1>
        <motion.p
          className="mb-8 text-lg md:text-2xl text-blue-200 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A secure, transparent system for storing and accessing criminal records
          using Web3.
        </motion.p>
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="/police"
            className="px-6 py-3 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
            Police Dashboard
          </a>
          <a
            href="/public"
            className="px-6 py-3 bg-gray-700 text-white rounded shadow-lg hover:bg-gray-800 transition-all duration-300 font-semibold"
          >
            Public Portal
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-blue-200 py-3 text-sm opacity-80">
        &copy; {new Date().getFullYear()} Criminal Records DApp | Built for
        Hackathons 🚀
      </footer>

      {/* About Section */}
      <div
        id="about"
        className="relative z-10 text-center text-blue-100 py-8 px-4 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-2">About</h2>
        <p>
          This project leverages blockchain and decentralized storage to ensure
          criminal records are tamper-proof, transparent, and accessible only to
          authorized parties. Built with React, Tailwind CSS, and Framer Motion
          for a modern and dynamic user experience.
        </p>
      </div>
    </div>
  );
}

export default Landing;
