import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

// MatrixBackground: leaves as in your code, only optimizing for semantics
function MatrixBackground() {
  useEffect(() => {
    const canvas = document.getElementById("matrix-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

    function draw() {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(10,20,30,0.2)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#06b6d4';       
      ctx.shadowColor = '#06b6d4';     
      ctx.shadowBlur = 8;             

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.13;
      }

      ctx.shadowBlur = 0; // Reset shadow
      animationId = requestAnimationFrame(draw);
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
        opacity: 0.4,
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
    <div className="min-h-screen w-screen bg-black overflow-y-auto scroll-smooth">
      <MatrixBackground />

      {/* Floating Glowing Particles (CYAN) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      >
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400 blur-2xl"
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
        aria-label="Main Navigation"
      >
        <div className="flex items-center space-x-3">
  <img
    src="/generated-image.png"     // Use your actual file name; leave "/" for public folder
    alt="CR-DApp logo"
    className="w-10 h-10 rounded-full border-2 border-cyan-400"
  />
  <span className="text-2xl font-bold text-white tracking-wide">
    CR-DApp
  </span>
</div>

        <div className="flex space-x-6">
          <a
            href="/"
            className="text-cyan-200 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-cyan-200 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            About
          </a>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-200 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            GitHub
          </a>
        </div>
      </motion.nav>

      {/* Hero Section with GLASS CARD */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          className="backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border-2 border-cyan-500/25 hover:border-cyan-500/50 bg-black/10 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Criminal Records DApp
          </motion.h1>
          <motion.p
            className="mb-10 text-lg md:text-2xl text-cyan-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A secure, transparent system for storing and accessing criminal records using Web3.
          </motion.p>
          <motion.div
            className="space-x-6 flex flex-wrap justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {/* Police Dashboard Button - vibrant cyan glow */}
            <a
              href="/police"
              className="
                px-8 py-4
                bg-gradient-to-r from-cyan-600 to-cyan-500
                text-white rounded-lg shadow-lg font-semibold
                inline-flex items-center space-x-2
                transition duration-300 ease-in-out
                hover:scale-105
                hover:from-cyan-400 hover:to-cyan-550
                hover:text-white
                hover:shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3eeb3]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black
              "
              aria-label="Open Police Dashboard"
            >
              <span>Police Dashboard</span>
            </a>
            {/* Public Portal Button - subtle grey, not cyan */}
            <a
              href="/public"
              className="
                px-8 py-4
                bg-gradient-to-r from-gray-700 to-gray-800
                text-gray-300 rounded-lg shadow-md font-semibold
                inline-flex items-center space-x-2 border border-gray-600
                transition duration-300 ease-in-out
                hover:scale-105
                hover:bg-gray-600 hover:border-gray-400
                hover:text-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black
              "
              aria-label="Open Public Portal"
            >
              <span>Public Portal</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">About</h2>
          <p className="text-lg text-cyan-200 leading-relaxed">
            This project leverages blockchain and decentralized storage to ensure
            criminal records are tamper-proof, transparent, and accessible only to
            authorized parties. Built with React, Tailwind CSS, and Framer Motion
            for a modern and dynamic user experience.
          </p>
        </motion.div>
      </div>

      {/* Footer (scrollable) */}
      <footer className="relative z-10 text-center text-cyan-200 py-8 text-sm opacity-80 border-t border-blue-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Criminal Records DApp
        </motion.div>
      </footer>
    </div>
  );
}

export default Landing;
