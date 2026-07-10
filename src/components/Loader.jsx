import React, { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [label, setLabel] = useState('Sourcing');

  useEffect(() => {
    // Labels array to rotate through
    const labels = ['Sourcing', 'Milling', 'Refining', 'Testing', 'Exporting'];
    
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Small delay for closing curtain transition
          return 100;
        }
        
        // Select label based on percentage
        const labelIdx = Math.min(Math.floor(prev / 20), labels.length - 1);
        setLabel(labels[labelIdx]);
        
        // Dynamic step increments (faster at start, slows near the end)
        const step = prev < 60 ? 4 : prev < 90 ? 2 : 1;
        return prev + step;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={styles.loader}>
      {/* Growing Wheat SVG background */}
      <div style={styles.wheatContainer}>
        <svg viewBox="0 0 100 100" style={styles.wheatSvg}>
          {/* Stem 1 (Left) */}
          <path
            d="M 30,100 Q 35,60 30,20"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="0.8"
            opacity="0.3"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100 - count,
              transition: 'stroke-dashoffset 0.1s ease',
              animation: 'sway 6s infinite ease-in-out'
            }}
          />
          {/* Stem 2 (Center - Dominant) */}
          <path
            d="M 50,100 Q 48,50 50,10"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="1.2"
            opacity="0.5"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100 - count,
              transition: 'stroke-dashoffset 0.1s ease',
              animation: 'sway 8s infinite ease-in-out'
            }}
          />
          {/* Stem 3 (Right) */}
          <path
            d="M 70,100 Q 65,70 70,30"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="0.8"
            opacity="0.3"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100 - count,
              transition: 'stroke-dashoffset 0.1s ease',
              animation: 'sway 7s infinite ease-in-out'
            }}
          />
          
          {/* Grains growing along center stem */}
          {count > 30 && (
            <>
              {/* Left grains */}
              <path d="M 47,45 Q 40,43 45,41" fill="var(--accent-gold)" opacity={(count - 30) / 70} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 48,35 Q 41,33 46,31" fill="var(--accent-gold)" opacity={(count - 40) / 60} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 49,25 Q 42,23 47,21" fill="var(--accent-gold)" opacity={(count - 50) / 50} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 49.5,15 Q 44,13 48.5,11" fill="var(--accent-gold)" opacity={(count - 60) / 40} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              
              {/* Right grains */}
              <path d="M 53,42 Q 60,40 55,38" fill="var(--accent-gold)" opacity={(count - 35) / 65} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 52,32 Q 59,30 54,28" fill="var(--accent-gold)" opacity={(count - 45) / 55} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 51,22 Q 58,20 53,18" fill="var(--accent-gold)" opacity={(count - 55) / 45} style={{ animation: 'sway 8s infinite ease-in-out' }} />
              <path d="M 50.5,12 Q 56,10 52,8" fill="var(--accent-gold)" opacity={(count - 65) / 35} style={{ animation: 'sway 8s infinite ease-in-out' }} />
            </>
          )}
        </svg>
      </div>

      {/* Progress metrics */}
      <div style={styles.content}>
        <div style={styles.counter}>
          <span style={styles.countNum}>{count}</span>
          <span style={styles.percentSymbol}>%</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${count}%` }}></div>
        </div>
        <span style={styles.label}>{label}</span>
      </div>

      {/* Slide-out curtains for custom transition */}
      {count >= 100 && (
        <>
          <div style={{ ...styles.curtain, ...styles.curtainTop }}></div>
          <div style={{ ...styles.curtain, ...styles.curtainBottom }}></div>
        </>
      )}
    </div>
  );
}

const styles = {
  loader: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    backgroundColor: '#120B06',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  wheatContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  wheatSvg: {
    width: 'auto',
    height: '100%',
    maxWidth: '400px'
  },
  content: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
    pointerEvents: 'none'
  },
  counter: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(4rem, 10vw, 8rem)',
    color: '#FAF8F5',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'flex-start'
  },
  countNum: {
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 300
  },
  percentSymbol: {
    fontSize: '0.3em',
    opacity: 0.5,
    marginTop: '0.2em',
    marginLeft: '0.1em'
  },
  progressBar: {
    width: '180px',
    height: '1px',
    backgroundColor: 'rgba(250, 248, 245, 0.15)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-hover))',
    transition: 'width 0.1s linear'
  },
  label: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(250, 248, 245, 0.6)'
  },
  curtain: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'var(--bg-primary)',
    zIndex: 3,
    transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)'
  },
  curtainTop: {
    top: 0,
    transform: 'translateY(0)',
    animation: 'slideUpCurtain 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards'
  },
  curtainBottom: {
    bottom: 0,
    transform: 'translateY(0)',
    animation: 'slideDownCurtain 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards'
  }
};
