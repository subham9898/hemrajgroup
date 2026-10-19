import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero({ active }) {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setReveal(true), 300);
      return () => clearTimeout(timer);
    } else {
      setReveal(false);
    }
  }, [active]);

  const handleExploreClick = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={styles.heroSection} className="dark-section">
      {/* Background Media */}
      <div style={styles.mediaContainer}>
        <div style={styles.imageOverlay}></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/story_bg.jpg"
          style={styles.backgroundVideo}
        >
          <source src="/assets/hemraj-hero.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="/assets/story_bg.jpg"
            alt="Golden grain field"
            style={styles.backgroundImage}
          />
        </video>
        {/* Ambient Dark Scrim */}
        <div style={styles.scrim}></div>
      </div>

      {/* Dynamic Floating Glow Element */}
      <div className="glow" style={{ top: '20%', left: '15%' }}></div>
      <div className="glow" style={{ bottom: '20%', right: '15%', animationDelay: '-4s' }}></div>

      {/* Content overlays */}
      <div style={styles.content}>
        <div className="reveal-mask">
          <p
            style={{
              ...styles.eyebrow,
              transform: reveal ? 'translateY(0)' : 'translateY(105%)',
              transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            A LEGACY OF TRUST — SINCE 1958
          </p>
        </div>

        <div className="reveal-mask" style={{ margin: '1rem 0' }}>
          <h1
            style={{
              ...styles.title,
              transform: reveal ? 'translateY(0)' : 'translateY(105%)',
              transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.1s'
            }}
          >
            Grown from the Soil.<br />
            <span style={{ color: 'var(--accent-gold)' }}>Refined for the World.</span>
          </h1>
        </div>

        <div className="reveal-mask" style={{ marginBottom: '2.5rem' }}>
          <p
            style={{
              ...styles.sub,
              transform: reveal ? 'translateY(0)' : 'translateY(105%)',
              transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.2s'
            }}
          >
            For over six decades, Hemraj Group has stood at the crossroads of heritage and technology—milling the premium grains and refining the oils that nourish millions.
          </p>
        </div>

        <div
          style={{
            ...styles.buttonContainer,
            opacity: reveal ? 1 : 0,
            transform: reveal ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1) 0.4s',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <a
            href="#products"
            className="btn-primary"
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Product Catalog
          </a>
          <button
            onClick={handleExploreClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'transparent',
              color: '#FAF8F5',
              border: '1px solid rgba(250, 248, 245, 0.3)',
              borderRadius: '0',
              padding: '0.9rem 1.8rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.3s ease'
            }}
          >
            Our Heritage
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={styles.scrollIndicator}>
        <span style={styles.scrollLabel}>SCROLL DOWN</span>
        <div style={styles.scrollLineContainer}>
          <div style={styles.scrollLine}></div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    height: '100vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#120B06' // Deep dark brown default background
  },
  mediaContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 1
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 1
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(18,11,6,0.3) 50%, rgba(18,11,6,0.55) 100%)',
    zIndex: 1
  },
  scrim: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle, rgba(0,0,0,0) 70%, rgba(18,11,6,0.2) 100%)',
    zIndex: 1
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1000px',
    padding: '0 2rem',
    textAlign: 'center',
    color: '#FAF8F5'
  },
  eyebrow: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)',
    fontWeight: '600',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
    display: 'inline-block',
    padding: '0.2rem 0',
    marginBottom: '0.5rem',
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.95)'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)',
    fontWeight: '400',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 5px rgba(0, 0, 0, 0.9)'
  },
  sub: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
    fontWeight: '300',
    color: 'rgba(250, 248, 245, 0.9)',
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: 1.35,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    opacity: 0.7
  },
  scrollLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.25em',
    color: 'rgba(250, 248, 245, 0.6)'
  },
  scrollLineContainer: {
    width: '1px',
    height: '40px',
    backgroundColor: 'rgba(250, 248, 245, 0.2)',
    overflow: 'hidden',
    position: 'relative'
  },
  scrollLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--accent-gold)',
    animation: 'scrollDownLine 2s infinite cubic-bezier(0.85, 0, 0.15, 1)'
  }
};
