import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  const handleNotifyClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dashboard" style={styles.section} className="light-section">
      <div className="section-bg section-bg-dashboard"></div>
      <div className="glow" style={{ top: '25%', left: '15%', animationDelay: '-2s' }}></div>
      <div className="glow" style={{ bottom: '20%', right: '15%', animationDelay: '-4s' }}></div>

      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header} className="dashboard-header section-header">
          <p style={styles.kicker}>THE HORIZON</p>
          <h2 style={styles.title}>
            Global Export & <span style={{ color: 'var(--accent-gold)' }}>Dominance</span>
          </h2>
          <div style={styles.divider}></div>
        </div>

        {/* Coming Soon Feature Console */}
        <div style={styles.comingSoonCard} className="glass coming-soon-glass-card">
          {/* Badge */}
          <div style={styles.badgeWrapper}>
            <span style={styles.comingSoonBadge} className="pulsing-badge">
              <span style={styles.pulseDot}></span>
              COMING SOON
            </span>
          </div>

          <div style={styles.iconHeroBox}>
            <div style={styles.globeRing} className="globe-ambient-ring">
              <Globe size={46} color="var(--accent-gold)" strokeWidth={1.5} />
            </div>
          </div>

          <h3 style={styles.headline}>
            International Trade Intelligence & Live Port Manifests
          </h3>

          <p style={styles.description}>
            We are currently engineering our unified global trade dashboard — connecting real-time APEDA vessel tracking, Southeast Asian and Middle Eastern customs manifests, and Solvent Extractors&apos; Association (SEA) export quota metrics.
          </p>

          {/* Metric Teaser Capsules */}
          <div style={styles.teasersGrid} className="coming-soon-teasers">
            <div style={styles.teaserItem} className="glass">
              <span style={styles.teaserMetric}>35%+</span>
              <span style={styles.teaserTitle}>Indian DORB Volume</span>
              <span style={styles.teaserSub}>SEA Top Exporter Benchmark</span>
            </div>

            <div style={styles.teaserItem} className="glass">
              <span style={styles.teaserMetric}>12+ Ports</span>
              <span style={styles.teaserTitle}>Global Destinations</span>
              <span style={styles.teaserSub}>Direct Carrier Logistics</span>
            </div>

            <div style={styles.teaserItem} className="glass">
              <span style={styles.teaserMetric}>Live API</span>
              <span style={styles.teaserTitle}>Customs Manifests</span>
              <span style={styles.teaserSub}>Digital Certificate Tracking</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={styles.ctaBox}>
            <button
              onClick={handleNotifyClick}
              style={styles.ctaBtn}
              className="btn-primary"
            >
              <span>Connect with Corporate Desk</span>
              <ArrowUpRight size={16} />
            </button>
            <span style={styles.ctaNote}>
              Direct export inquiries handled via <a href="mailto:info@hemrajgroup.co.in" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>info@hemrajgroup.co.in</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '7rem 0',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    maxWidth: '1050px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },
  header: {
    textAlign: 'center',
    marginBottom: '3.5rem'
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
    margin: '1.25rem auto 0'
  },
  comingSoonCard: {
    borderRadius: '32px',
    padding: '4rem 3rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid var(--border-light)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.05)',
    background: 'var(--bg-glass)'
  },
  badgeWrapper: {
    marginBottom: '1.5rem'
  },
  comingSoonBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.55rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--accent-gold-text, #875F1E)',
    backgroundColor: 'var(--accent-gold-light)',
    border: '1px solid rgba(197, 160, 89, 0.35)',
    padding: '0.45rem 1.25rem',
    borderRadius: '999px'
  },
  pulseDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold)',
    display: 'inline-block'
  },
  iconHeroBox: {
    marginBottom: '1.75rem'
  },
  globeRing: {
    width: '92px',
    height: '92px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--accent-gold-light)',
    border: '1px solid rgba(197, 160, 89, 0.3)',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(197, 160, 89, 0.15)'
  },
  headline: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
    fontWeight: '500',
    color: 'var(--text-primary)',
    maxWidth: '680px',
    lineHeight: 1.25,
    marginBottom: '1.25rem'
  },
  description: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
    color: 'var(--text-secondary)',
    maxWidth: '640px',
    lineHeight: 1.7,
    marginBottom: '2.5rem'
  },
  teasersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '820px',
    marginBottom: '2.75rem'
  },
  teaserItem: {
    padding: '1.6rem 1.2rem',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid var(--border-light)',
    backgroundColor: 'rgba(250, 248, 245, 0.5)'
  },
  teaserMetric: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.85rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    lineHeight: 1,
    marginBottom: '0.4rem'
  },
  teaserTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.2rem'
  },
  teaserSub: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    color: 'var(--text-secondary)'
  },
  ctaBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.9rem'
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.85rem 2rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.04em'
  },
  ctaNote: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  }
};
