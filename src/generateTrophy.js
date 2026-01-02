const fs = require("fs");

try {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

  // Cyberpunk Neon Theme SVG with Animations
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="220" viewBox="0 0 500 220">
    <defs>
      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f0c29;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#302b63;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#24243e;stop-opacity:1" />
      </linearGradient>
      <filter id="neon-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur5"/>
        <feMerge>
          <feMergeNode in="blur5"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="neon-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur5"/>
        <feMerge>
          <feMergeNode in="blur5"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
       <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur5"/>
        <feMerge>
          <feMergeNode in="blur5"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <style>
        .pulse { animation: pulse-animation 3s infinite alternate ease-in-out; }
        @keyframes pulse-animation {
          0% { opacity: 0.6; filter: brightness(1); }
          100% { opacity: 1; filter: brightness(1.3); }
        }
        .scanner-line { animation: scan 6s linear infinite; }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(250px); opacity: 0; }
        }
        text { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .stat-number { font-weight: 800; }
        .stat-label { font-weight: 400; letter-spacing: 1px; text-transform: uppercase;}
      </style>
    </defs>

    <rect rx="15" width="100%" height="100%" fill="url(#bg-gradient)" stroke="#333" stroke-width="2"/>
    
    <path d="M50,20 L450,20 M50,200 L450,200 M250,20 L250,200" stroke="#ffffff10" stroke-width="1" stroke-dasharray="5,5"/>
    
    <rect class="scanner-line" x="0" y="0" width="500" height="10" fill="cyan" opacity="0.1" />

    <text x="50%" y="35" text-anchor="middle" font-size="20" fill="#fff" font-weight="700" letter-spacing="2px" filter="url(#neon-glow-blue)">
      ⚡ GITHUB AR TROPHY ⚡
    </text>

    <g transform="translate(30, 65)">
      <rect class="pulse" x="0" y="0" width="130" height="110" rx="10" fill="#00000060" stroke="#39ff14" stroke-width="2" filter="url(#neon-glow-green)"/>
      <text x="65" y="40" text-anchor="middle" font-size="12" fill="#39ff14" class="stat-label">Active Days</text>
      <text x="65" y="85" text-anchor="middle" font-size="36" fill="#fff" class="stat-number">${data.active_days}</text>
    </g>

    <g transform="translate(175, 55)">
       <rect class="pulse" x="0" y="0" width="150" height="130" rx="12" fill="#00000080" stroke="#00f7ff" stroke-width="3" filter="url(#neon-glow-blue)"/>
      <text x="75" y="40" text-anchor="middle" font-size="14" fill="#00f7ff" class="stat-label">Total Contributions</text>
      <text x="75" y="95" text-anchor="middle" font-size="48" fill="#fff" class="stat-number">${data.total_contributions}</text>
    </g>

    <g transform="translate(340, 65)">
      <rect class="pulse" x="0" y="0" width="130" height="110" rx="10" fill="#00000060" stroke="#ff00ff" stroke-width="2" filter="url(#neon-glow-pink)"/>
      <text x="65" y="40" text-anchor="middle" font-size="12" fill="#ff00ff" class="stat-label">Public Repos</text>
      <text x="65" y="85" text-anchor="middle" font-size="36" fill="#fff" class="stat-number">${data.public_repos}</text>
    </g>

    <line x1="160" y1="120" x2="175" y2="120" stroke="#00f7ff" stroke-width="2" opacity="0.5"/>
    <line x1="325" y1="120" x2="340" y2="120" stroke="#00f7ff" stroke-width="2" opacity="0.5"/>

  </svg>`;

  fs.writeFileSync("trophy.svg", svg);
  console.log("🏆 Neon Trophy SVG updated successfully with animations!");
  
} catch (error) {
  console.error("Error generating SVG:", error);
  process.exit(1);
}

