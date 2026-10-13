
export function FluidBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none w-full h-full overflow-hidden z-0">
      <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 960" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="forestSwirlGrad" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(54, 78, 67, 0.24)"></stop>
            <stop offset="50%" stopColor="rgba(24, 58, 50, 0.18)"></stop>
            <stop offset="100%" stopColor="rgba(54, 78, 67, 0.22)"></stop>
          </linearGradient>
          <linearGradient id="terraSwirlGrad" x1="0%" x2="100%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(217, 108, 75, 0.24)"></stop>
            <stop offset="60%" stopColor="rgba(217, 108, 75, 0.16)"></stop>
            <stop offset="100%" stopColor="rgba(217, 108, 75, 0.22)"></stop>
          </linearGradient>
        </defs>
        
        <g className="swirl-group-forest">
          <path d="M-80,120 C180,-40 380,260 620,180 C860,100 1020,380 1280,220 C1460,100 1560,340 1620,260" stroke="rgba(54, 78, 67, 0.22)" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M120,40 C280,120 440,320 320,440 C200,560 60,380 180,240 C260,140 520,280 780,160" stroke="rgba(24, 58, 50, 0.16)" strokeLinecap="round" strokeWidth="1.75"></path>
          <path d="M-120,680 C160,540 340,940 700,740 C980,580 1140,920 1420,780 C1540,720 1620,860 1700,800" stroke="rgba(54, 78, 67, 0.22)" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M420,-60 C580,260 360,560 680,680 C920,780 1120,540 1340,660 C1520,760 1600,620 1680,720" stroke="rgba(24, 58, 50, 0.16)" strokeLinecap="round" strokeWidth="1.5"></path>
        </g>
        
        <g className="swirl-group-terracotta">
          <path d="M-60,420 C220,300 360,660 720,480 C1040,320 1180,620 1520,440 C1620,380 1680,520 1720,460" stroke="rgba(217, 108, 75, 0.22)" strokeLinecap="round" strokeWidth="1.75"></path>
          <path d="M40,920 C220,780 440,620 620,780 C800,940 1020,820 1240,680 C1460,540 1560,760 1660,640" stroke="rgba(217, 108, 75, 0.15)" strokeLinecap="round" strokeWidth="1.5"></path>
          <path d="M260,-40 C420,180 680,120 840,320 C960,480 820,640 1000,740 C1180,840 1440,720 1600,920" stroke="rgba(217, 108, 75, 0.20)" strokeDasharray="12 8" strokeLinecap="round" strokeWidth="1.5"></path>
        </g>
        
        <g className="swirl-group-sage">
          <path d="M-100,280 C180,480 520,180 860,380 C1200,580 1380,260 1640,480" stroke="rgba(169, 189, 170, 0.32)" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M180,1020 C360,780 620,960 940,820 C1260,680 1380,980 1620,860" stroke="rgba(169, 189, 170, 0.30)" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M-40,80 C320,240 680,-20 1040,140 C1320,260 1500,40 1660,180" stroke="rgba(169, 189, 170, 0.28)" strokeLinecap="round" strokeWidth="1.75"></path>
        </g>
        
        <g className="swirl-spiral-node-1">
          <path d="M320,240 C340,210 370,220 380,245 C395,280 360,315 320,315 C265,315 220,270 220,210 C220,130 290,70 375,70 C480,70 560,155 560,265" stroke="rgba(54, 78, 67, 0.20)" strokeLinecap="round" strokeWidth="1.5"></path>
          <path d="M320,240 C310,255 295,250 290,235 C280,215 300,195 320,195 C350,195 375,220 375,250" stroke="rgba(217, 108, 75, 0.18)" strokeLinecap="round" strokeWidth="1.25"></path>
        </g>
        <g className="swirl-spiral-node-2">
          <path d="M1140,720 C1160,690 1195,700 1205,725 C1220,760 1185,795 1145,795 C1090,795 1045,750 1045,690 C1045,610 1115,550 1200,550 C1305,550 1385,635 1385,745" stroke="rgba(54, 78, 67, 0.18)" strokeLinecap="round" strokeWidth="1.5"></path>
          <path d="M1140,720 C1125,735 1110,730 1105,715 C1095,695 1115,675 1135,675 C1165,675 1190,700 1190,730" stroke="rgba(217, 108, 75, 0.18)" strokeLinecap="round" strokeWidth="1.25"></path>
        </g>
        <g className="swirl-loop-node">
          <path d="M540,480 C680,360 820,580 960,460 C1080,360 1180,500 1300,420" stroke="rgba(169, 189, 170, 0.30)" strokeLinecap="round" strokeWidth="1.75"></path>
          <path d="M480,540 C620,420 760,640 900,520 C1020,420 1120,560 1240,480" stroke="rgba(217, 108, 75, 0.15)" strokeLinecap="round" strokeWidth="1.35"></path>
        </g>
      </svg>
    </div>
  );
}
