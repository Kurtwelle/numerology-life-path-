'use client';

import { useState, useRef } from 'react';

const lifePathDescriptions: Record<number, { title: string; description: string; color: string }> = {
  1: {
    title: "The Leader",
    description: "Independent, ambitious, and pioneering. You're a natural-born leader with strong determination.",
    color: "from-red-500 to-orange-500"
  },
  2: {
    title: "The Peacemaker",
    description: "Diplomatic, sensitive, and cooperative. You excel at bringing harmony and balance to relationships.",
    color: "from-blue-400 to-cyan-400"
  },
  3: {
    title: "The Creative",
    description: "Expressive, optimistic, and artistic. You bring joy and creativity to everything you do.",
    color: "from-yellow-400 to-amber-500"
  },
  4: {
    title: "The Builder",
    description: "Practical, disciplined, and hardworking. You create solid foundations and lasting structures.",
    color: "from-green-600 to-emerald-600"
  },
  5: {
    title: "The Freedom Seeker",
    description: "Adventurous, versatile, and dynamic. You thrive on change and new experiences.",
    color: "from-purple-500 to-pink-500"
  },
  6: {
    title: "The Nurturer",
    description: "Caring, responsible, and protective. You're devoted to family and community service.",
    color: "from-rose-400 to-pink-400"
  },
  7: {
    title: "The Seeker",
    description: "Analytical, spiritual, and introspective. You seek truth and deeper understanding.",
    color: "from-indigo-500 to-purple-600"
  },
  8: {
    title: "The Powerhouse",
    description: "Ambitious, authoritative, and material-focused. You're driven to achieve success and abundance.",
    color: "from-amber-600 to-orange-600"
  },
  9: {
    title: "The Humanitarian",
    description: "Compassionate, idealistic, and generous. You're here to serve humanity and make the world better.",
    color: "from-teal-500 to-cyan-600"
  },
  11: {
    title: "The Illuminator (Master Number)",
    description: "Intuitive, inspirational, and visionary. You're here to enlighten and uplift others.",
    color: "from-violet-500 to-fuchsia-500"
  },
  22: {
    title: "The Master Builder",
    description: "Powerful, practical visionary. You can turn dreams into reality on a grand scale.",
    color: "from-sky-500 to-blue-600"
  },
  33: {
    title: "The Master Teacher",
    description: "Selfless, nurturing, and spiritually evolved. You're here to uplift humanity through love and service.",
    color: "from-emerald-400 to-green-500"
  }
};

export default function LifePathNFT() {
  const [birthDate, setBirthDate] = useState('');
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateLifePath = (date: string) => {
    const digits = date.replace(/\D/g, '');
    
    const reduceToSingleDigit = (num: number): number => {
      // Check for master numbers
      if (num === 11 || num === 22 || num === 33) return num;
      if (num < 10) return num;
      
      const sum = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
      return reduceToSingleDigit(sum);
    };

    const sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return reduceToSingleDigit(sum);
  };

  const handleCalculate = () => {
    if (!birthDate) return;
    
    const lifePath = calculateLifePath(birthDate);
    setLifePathNumber(lifePath);
    setShowResult(true);
  };

  const generateNFT = () => {
    if (!lifePathNumber || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const info = lifePathDescriptions[lifePathNumber];
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 800);
    const colors = info.color.match(/from-(\S+)\s+to-(\S+)/);
    if (colors) {
      gradient.addColorStop(0, getColorHex(colors[1]));
      gradient.addColorStop(1, getColorHex(colors[2]));
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);

    // Add mystical pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12;
      ctx.beginPath();
      ctx.moveTo(400, 400);
      ctx.lineTo(400 + Math.cos(angle) * 350, 400 + Math.sin(angle) * 350);
      ctx.stroke();
    }

    // Draw circle
    ctx.beginPath();
    ctx.arc(400, 400, 250, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw life path number
    ctx.fillStyle = 'white';
    ctx.font = 'bold 180px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lifePathNumber.toString(), 400, 380);

    // Draw title
    ctx.font = 'bold 48px Arial';
    ctx.fillText(info.title, 400, 520);

    // Draw "Life Path NFT" at bottom
    ctx.font = '32px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Life Path NFT', 400, 720);
  };

  const getColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'red-500': '#ef4444',
      'orange-500': '#f97316',
      'blue-400': '#60a5fa',
      'cyan-400': '#22d3ee',
      'yellow-400': '#facc15',
      'amber-500': '#f59e0b',
      'green-600': '#16a34a',
      'emerald-600': '#059669',
      'purple-500': '#a855f7',
      'pink-500': '#ec4899',
      'rose-400': '#fb7185',
      'pink-400': '#f472b6',
      'indigo-500': '#6366f1',
      'purple-600': '#9333ea',
      'amber-600': '#d97706',
      'orange-600': '#ea580c',
      'teal-500': '#14b8a6',
      'cyan-600': '#0891b2',
      'violet-500': '#8b5cf6',
      'fuchsia-500': '#d946ef',
      'sky-500': '#0ea5e9',
      'blue-600': '#2563eb',
      'emerald-400': '#34d399',
      'green-500': '#22c55e'
    };
    return colorMap[colorName] || '#6366f1';
  };

  const downloadNFT = () => {
    generateNFT();
    setTimeout(() => {
      if (!canvasRef.current) return;
      const link = document.createElement('a');
      link.download = `life-path-${lifePathNumber}-nft.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }, 100);
  };

  const reset = () => {
    setBirthDate('');
    setLifePathNumber(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white overflow-auto">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Life Path NFT
          </h1>
          <p className="text-lg text-purple-200">
            Discover your numerology life path and mint your unique NFT
          </p>
        </div>

        {!showResult ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <label className="block text-xl font-semibold mb-4">
              Enter Your Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-xl bg-white/20 border-2 border-white/30 focus:border-cyan-400 focus:outline-none transition-all text-white placeholder-white/50"
              max={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={handleCalculate}
              disabled={!birthDate}
              className="w-full mt-6 px-8 py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              Calculate Life Path
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`bg-gradient-to-br ${lifePathDescriptions[lifePathNumber!].color} rounded-3xl p-8 shadow-2xl border-4 border-white/30`}>
              <div className="text-center">
                <div className="text-8xl font-bold mb-4">{lifePathNumber}</div>
                <h2 className="text-3xl font-bold mb-4">
                  {lifePathDescriptions[lifePathNumber!].title}
                </h2>
                <p className="text-xl leading-relaxed">
                  {lifePathDescriptions[lifePathNumber!].description}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-center">Save Your NFT</h3>
              <div className="flex flex-col gap-4">
                <button
                  onClick={downloadNFT}
                  className="w-full px-8 py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all transform hover:scale-105 active:scale-95"
                >
                  💾 Download NFT Image
                </button>
                <button
                  onClick={reset}
                  className="w-full px-8 py-4 text-xl font-bold rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                >
                  Calculate Another
                </button>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

