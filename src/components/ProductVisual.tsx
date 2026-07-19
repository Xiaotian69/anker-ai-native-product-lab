export const ProductVisual = () => (
  <svg
    className="product-visual"
    viewBox="0 0 720 660"
    role="img"
    aria-labelledby="product-visual-title product-visual-desc"
  >
    <title id="product-visual-title">Aero 10K 航旅移动电源原创概念图</title>
    <desc id="product-visual-desc">圆角深色移动电源，带低功耗屏、温感色环、伸缩线与包带夹扣。</desc>
    <defs>
      <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#243b53" />
        <stop offset="0.5" stopColor="#0c1726" />
        <stop offset="1" stopColor="#03080e" />
      </linearGradient>
      <linearGradient id="edge" x1="0" x2="1">
        <stop stopColor="#5af0cb" />
        <stop offset="0.55" stopColor="#35baf4" />
        <stop offset="1" stopColor="#b9fb42" />
      </linearGradient>
      <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="30" stdDeviation="28" floodColor="#010811" floodOpacity="0.75" />
      </filter>
    </defs>
    <ellipse cx="360" cy="588" rx="230" ry="44" fill="#020914" opacity=".8" />
    <g transform="translate(152 70) rotate(-5 210 250)" filter="url(#shadow)">
      <rect x="5" y="5" width="420" height="500" rx="70" fill="url(#body)" stroke="#4e6e88" strokeWidth="2" />
      <rect x="28" y="28" width="374" height="444" rx="52" fill="none" stroke="#ffffff" strokeOpacity=".08" />
      <path d="M75 26 H350" stroke="url(#edge)" strokeWidth="8" strokeLinecap="round" />
      <rect x="82" y="92" width="266" height="178" rx="28" fill="#08121f" stroke="#35546d" />
      <text x="112" y="127" fill="#78a4bd" fontFamily="system-ui" fontSize="15" letterSpacing="2">TRAVEL STATUS</text>
      <text x="112" y="185" fill="#ffffff" fontFamily="system-ui" fontSize="52" fontWeight="700">72%</text>
      <text x="258" y="185" fill="#58edc8" fontFamily="system-ui" fontSize="18">NORMAL</text>
      <line x1="112" y1="205" x2="318" y2="205" stroke="#29445a" />
      <text x="112" y="238" fill="#b7cbd7" fontFamily="system-ui" fontSize="17">36 Wh</text>
      <text x="210" y="238" fill="#b7cbd7" fontFamily="system-ui" fontSize="17">31°C</text>
      <text x="292" y="238" fill="#b7cbd7" fontFamily="system-ui" fontSize="17">45W</text>
      <circle cx="215" cy="328" r="39" fill="none" stroke="#18374a" strokeWidth="12" />
      <circle cx="215" cy="328" r="39" fill="none" stroke="url(#edge)" strokeWidth="12" strokeDasharray="190 60" strokeLinecap="round" />
      <circle cx="215" cy="328" r="16" fill="#0f2534" stroke="#5af0cb" />
      <text x="215" y="402" fill="#6f8798" fontFamily="system-ui" fontSize="14" textAnchor="middle" letterSpacing="2">THERMAL SIGNAL</text>
      <rect x="94" y="438" width="90" height="18" rx="9" fill="#03080d" stroke="#577488" />
      <rect x="247" y="436" width="76" height="22" rx="11" fill="#03080d" stroke="#577488" />
      <text x="139" y="486" fill="#8299a8" fontFamily="system-ui" fontSize="12" textAnchor="middle">RETRACT C</text>
      <text x="285" y="486" fill="#8299a8" fontFamily="system-ui" fontSize="12" textAnchor="middle">USB-C</text>
    </g>
    <path d="M530 166 C645 140 665 250 593 291 C550 316 548 372 622 397" fill="none" stroke="#4adcbf" strokeWidth="12" strokeLinecap="round" />
    <rect x="600" y="380" width="74" height="38" rx="12" fill="#122b3a" stroke="#56ecc8" transform="rotate(8 637 399)" />
    <g className="annotation-line">
      <path d="M88 185 H150" /><circle cx="86" cy="185" r="4" />
      <text x="22" y="178">低功耗状态屏</text><text x="22" y="198">电量 · Wh · 温度</text>
      <path d="M104 400 H193" /><circle cx="102" cy="400" r="4" />
      <text x="20" y="393">分级温感环</text><text x="20" y="413">无需持续读数</text>
      <path d="M510 500 H643" /><circle cx="645" cy="500" r="4" />
      <text x="520" y="526">个人包带夹扣</text><text x="520" y="546">可拆结构验证件</text>
    </g>
  </svg>
)
