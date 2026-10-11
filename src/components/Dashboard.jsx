import React, { useEffect, useState } from 'react';
import { Globe, Users, TrendingUp, Award } from 'lucide-react';

export default function Dashboard({ active }) {
  const [percent, setPercent] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (active) {
      setAnimate(true);
      // Animate circular progress dial to 35%
      let start = 0;
      const end = 35;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setPercent(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [active]);

  // SVG parameters for circular path
  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // We want to fill the circumference proportional to the percentage (out of 100)
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <section id="dashboard" style={styles.section} className="dark-section">
      <div className="section-bg section-bg-dashboard"></div>
      <div className="container">
        {/* Section Header */}
        <div style={styles.header}>
          <p style={styles.kicker}>THE HORIZON</p>
          <h2 style={styles.title}>
            Global Export & <span style={{ color: 'var(--accent-gold)' }}>Dominance</span>
          </h2>
          <div style={styles.divider}></div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Circular Dial Column */}
          <div style={styles.dialCard} className="glass">
            <h3 id="export-dial-title" style={styles.dialTitle}>Indian DORB Export Share</h3>
            
            <div style={styles.svgContainer}>
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                style={styles.svg}
                role="meter"
                aria-valuenow={percent}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-labelledby="export-dial-title"
              >
                <title>35% Indian DORB Export Share</title>
                {/* Track circle */}
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke="var(--border-light)"
                  strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke="var(--accent-gold)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 110 110)"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>
              
              {/* Center Counter */}
              <div style={styles.dialLabelBox}>
                <span style={styles.dialNumber}>{percent}%</span>
                <span style={styles.dialSubLabel}>Market Share</span>
              </div>
            </div>

            <p style={styles.dialCaption}>
              Controlled jointly by <strong>Hemraj Industries</strong> and M/s <strong>Radhashyam Industries</strong>, representing the top two exporting companies recognized by SEA (Solvent Extractors&apos; Association of India).
            </p>
          </div>

          {/* Key Statistics Grid */}
          <div style={styles.statsPanel}>
            <div className="stats-grid">
              
              {/* Stat 1 */}
              <div className="stat-card glass">
                <div style={styles.statIconBox}>
                  <Award size={20} color="var(--accent-gold)" />
                </div>
                <h4 style={styles.statVal}>10+ Years</h4>
                <p style={styles.statLabel}>SEA Top Exporter Award Recipient</p>
              </div>

              {/* Stat 2 */}
              <div className="stat-card glass">
                <div style={styles.statIconBox}>
                  <TrendingUp size={20} color="var(--accent-gold)" />
                </div>
                <h4 style={styles.statVal}>800+ Tons</h4>
                <p style={styles.statLabel}>Combined Daily Processing Capacity</p>
              </div>

              {/* Stat 3 */}
              <div className="stat-card glass">
                <div style={styles.statIconBox}>
                  <Users size={20} color="var(--accent-gold)" />
                </div>
                <h4 style={styles.statVal}>15,000+</h4>
                <p style={styles.statLabel}>Farmer Families Sourced Directly</p>
              </div>

              {/* Stat 4 */}
              <div className="stat-card glass">
                <div style={styles.statIconBox}>
                  <Globe size={20} color="var(--accent-gold)" />
                </div>
                <h4 style={styles.statVal}>12+ Countries</h4>
                <p style={styles.statLabel}>APEDA Accredited Global Destinations</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem'
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent-gold)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)'
  },
  divider: {
    width: '60px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)',
    margin: '1.5rem auto 0'
  },
  dialCard: {
    flex: '0 0 380px',
    borderRadius: '28px',
    padding: '3rem 2.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid var(--border-light)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.02)'
  },
  dialTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    fontWeight: '400',
    color: 'var(--text-primary)',
    marginBottom: '2rem'
  },
  svgContainer: {
    position: 'relative',
    width: '220px',
    height: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  svg: {
    transform: 'scale(1)'
  },
  dialLabelBox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  dialNumber: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3.2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    lineHeight: 1
  },
  dialSubLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    marginTop: '4px'
  },
  dialCaption: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)'
  },
  statsPanel: {
    flex: '1 1 0',
    width: '100%'
  },
  statIconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.2rem'
  },
  statVal: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.3rem',
    lineHeight: 1
  },
  statLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.4
  }
};
