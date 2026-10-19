import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ active }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const containerRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Golden Paddy Fields',
      subtitle: 'Sustainable sourcing directly from regional farming communities across Punjab & Haryana.',
      image: '/assets/story_bg.jpg',
      category: 'Harvesting'
    },
    {
      id: 2,
      title: 'Milling Machinery',
      subtitle: 'Satake optical sorting machines ensuring 99.9% grain purity with zero broken kernels.',
      image: '/assets/showroom_bg.jpg',
      category: 'Processing'
    },
    {
      id: 3,
      title: 'Pearlescent Grains',
      subtitle: 'Milled to achieve standard texture, natural aroma, and essential nutrient locks.',
      image: '/assets/raw_rice.jpg',
      category: 'Quality Control'
    },
    {
      id: 4,
      title: 'Historical Legacy',
      subtitle: 'Six decades of agricultural expertise dating back to our foundation in 1958.',
      image: '/assets/story_bg.jpg',
      category: 'Heritage'
    },
    {
      id: 5,
      title: 'Liquid Gold Extracts',
      subtitle: 'Physically refined edible oils rich in natural Oryzanol and heart-healthy antioxidants.',
      image: '/assets/refined_oil.jpg',
      category: 'Extraction'
    },
    {
      id: 6,
      title: 'Modern Packaging',
      subtitle: 'Eco-friendly and moisture-controlled packaging lines ensuring global export longevity.',
      image: '/assets/showroom_bg.jpg',
      category: 'Logistics'
    }
  ];

  // Stop Pause Scrolling (Scrollytelling sticky progress through facilities)
  useGSAP(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress;
        const clamped = Math.max(0, Math.min(0.999, progress));
        const idx = Math.floor(clamped * galleryItems.length);
        setActiveIndex(idx);
      }
    });

    return () => st.kill();
  }, { scope: containerRef });

  const jumpToFacility = (idx) => {
    setActiveIndex(idx);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const progress = idx / Math.max(1, galleryItems.length - 1);
      const scrollAmount = window.scrollY + rect.top + progress * (rect.height - window.innerHeight);
      window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    } else {
      jumpToFacility(activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1);
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    } else {
      jumpToFacility(activeIndex === galleryItems.length - 1 ? 0 : activeIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxIndex !== null) {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        if (lightboxIndex !== null) {
          setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
        } else if (active) {
          jumpToFacility(activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (lightboxIndex !== null) {
          setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
        } else if (active) {
          jumpToFacility(activeIndex === galleryItems.length - 1 ? 0 : activeIndex + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, active, activeIndex]);

  const currentItem = galleryItems[activeIndex];

  return (
    <section
      ref={containerRef}
      id="gallery"
      style={styles.scrollySection}
      className={`scrolly-gallery-section light-section reveal-section ${active ? 'active' : ''}`}
    >
      {/* Sticky Single-Frame Window (Pauses in 1 frame while user scrolls through 6 facilities) */}
      <div style={styles.stickyWindow} className="gallery-sticky-window">
        <div className="section-bg section-bg-gallery"></div>
        <div className="glow" style={{ top: '10%', right: '15%', animationDelay: '-2s' }}></div>

        <div className="container single-frame-container" style={styles.container}>
          {/* Compact Single-Frame Header */}
          <div style={styles.header} className="single-frame-header">
            <div style={styles.headerTitles}>
              <p style={styles.kicker}>VISUAL JOURNEY</p>
              <h2 style={styles.title} className="gallery-title">
                Inside Our <span style={{ color: 'var(--accent-gold)' }}>Facilities</span>
              </h2>
            </div>

            <div style={styles.headerControls}>
              <div style={styles.counterBadge} className="gallery-counter-badge">
                <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
                <span style={{ opacity: 0.7 }}>
                  {String(galleryItems.length).padStart(2, '0')}
                </span>
              </div>

              <div style={styles.arrowGroup}>
                <button
                  onClick={(e) => handlePrev(e)}
                  style={styles.navBtn}
                  className="gallery-nav-btn"
                  aria-label="Previous facility photo"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => handleNext(e)}
                  style={styles.navBtn}
                  className="gallery-nav-btn"
                  aria-label="Next facility photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Central Cinematic Featured Stage */}
          <div
            style={styles.stage}
            className="gallery-featured-stage glass"
            onClick={() => setLightboxIndex(activeIndex)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setLightboxIndex(activeIndex);
            }}
            aria-label={`View fullscreen photo of ${currentItem.title}`}
          >
            {/* Active Image Background with smooth crossfade */}
            <div
              key={currentItem.id}
              style={{
                ...styles.stageImage,
                backgroundImage: `url(${currentItem.image})`
              }}
              className="gallery-stage-image"
            />

            {/* Luxury Bottom-Left Gradient for 100% Readable Text */}
            <div style={styles.stageGradient} className="gallery-stage-gradient" />

            {/* Fullscreen Expand Action Button */}
            <button
              style={styles.expandPill}
              className="gallery-expand-pill"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(activeIndex);
              }}
              aria-label="Open fullscreen photo modal"
            >
              <Maximize2 size={14} />
              <span>FULLSCREEN</span>
            </button>

            {/* Floating Stage Left/Right Arrows */}
            <button
              style={{ ...styles.stageSideBtn, left: '1rem' }}
              className="gallery-stage-side-arrow stage-arrow-left"
              onClick={(e) => handlePrev(e)}
              aria-label="Previous facility photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              style={{ ...styles.stageSideBtn, right: '1rem' }}
              className="gallery-stage-side-arrow stage-arrow-right"
              onClick={(e) => handleNext(e)}
              aria-label="Next facility photo"
            >
              <ChevronRight size={22} />
            </button>

            {/* Facility Details Overlay */}
            <div style={styles.stageContent} className="gallery-stage-content">
              <span style={styles.catBadge}>{currentItem.category}</span>
              <h3 style={styles.stageTitle} className="gallery-stage-title">
                {currentItem.title}
              </h3>
              <p style={styles.stageSubtitle} className="gallery-stage-subtitle">
                {currentItem.subtitle}
              </p>
            </div>
          </div>

          {/* Bottom Interactive Thumbnail Dock (All 6 facilities in 1 frame) */}
          <div
            style={styles.dock}
            className="gallery-thumbnail-dock"
            role="tablist"
            aria-label="Facilities quick selector dock"
          >
            {galleryItems.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => jumpToFacility(idx)}
                  style={{
                    ...styles.dockCard,
                    ...(isSelected ? styles.dockCardActive : {})
                  }}
                  className={`gallery-dock-card ${isSelected ? 'active-dock' : ''}`}
                  aria-label={`Select ${item.title}`}
                >
                  <div
                    style={{
                      ...styles.dockThumb,
                      backgroundImage: `url(${item.image})`
                    }}
                    className="gallery-dock-thumb"
                  />
                  <div style={styles.dockOverlay} className="gallery-dock-overlay">
                    <span style={styles.dockIdx}>0{idx + 1}</span>
                    <span style={styles.dockCategory}>{item.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Slideshow Modal */}
      {lightboxIndex !== null && (
        <div
          style={styles.lightboxOverlay}
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Facility image lightbox"
        >
          <button
            style={styles.closeBtn}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image lightbox"
          >
            <X size={30} />
          </button>

          <button
            style={styles.arrowLeft}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
            }}
            aria-label="Previous facility photo"
          >
            <ChevronLeft size={36} />
          </button>

          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightboxIndex].image}
              alt={galleryItems[lightboxIndex].title}
              style={styles.lightboxImg}
              className="lightbox-main-img"
            />
            <div style={styles.lightboxDetails} className="glass">
              <span style={styles.lightboxCat}>
                {galleryItems[lightboxIndex].category.toUpperCase()}
              </span>
              <h3 style={styles.lightboxTitle}>{galleryItems[lightboxIndex].title}</h3>
              <p style={styles.lightboxDesc}>{galleryItems[lightboxIndex].subtitle}</p>
            </div>
          </div>

          <button
            style={styles.arrowRight}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
            }}
            aria-label="Next facility photo"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}

const styles = {
  scrollySection: {
    height: '250vh',
    position: 'relative',
    backgroundColor: 'var(--bg-primary)'
  },
  stickyWindow: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    maxHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(4.5rem, 7vh, 5.5rem) 1.5rem clamp(1rem, 2vh, 1.5rem)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '1360px',
    margin: '0 auto',
    gap: 'clamp(0.6rem, 1.4vh, 1rem)',
    zIndex: 2,
    position: 'relative'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    flexShrink: 0,
    gap: '1rem'
  },
  headerTitles: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.22em',
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    margin: 0
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.6rem, 3.2vh, 2.3rem)',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)',
    margin: 0
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  counterBadge: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.35rem 0.85rem',
    borderRadius: '100px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-light)'
  },
  arrowGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  navBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-glass)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease'
  },
  stage: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    borderRadius: '20px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid var(--border-light)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  stageImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  stageGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(12, 8, 5, 0.92) 0%, rgba(12, 8, 5, 0.5) 45%, rgba(12, 8, 5, 0.1) 85%)',
    pointerEvents: 'none'
  },
  expandPill: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.45rem 0.9rem',
    borderRadius: '100px',
    backgroundColor: 'rgba(18, 11, 6, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(197, 160, 89, 0.4)',
    color: '#FAF8F5',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 3
  },
  stageSideBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(18, 11, 6, 0.65)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(250, 248, 245, 0.2)',
    color: '#FAF8F5',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
    zIndex: 3
  },
  stageContent: {
    position: 'relative',
    zIndex: 2,
    padding: 'clamp(1rem, 3vh, 2.2rem)',
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--accent-gold)',
    color: '#120B06',
    padding: '0.2rem 0.7rem',
    borderRadius: '100px',
    fontSize: '0.68rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },
  stageTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.4rem, 3.2vh, 2.2rem)',
    color: '#FAF8F5',
    margin: 0,
    lineHeight: 1.15
  },
  stageSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'clamp(0.82rem, 1.5vh, 0.95rem)',
    color: 'rgba(250, 248, 245, 0.85)',
    lineHeight: 1.45,
    margin: 0
  },
  dock: {
    display: 'flex',
    gap: '0.65rem',
    height: 'clamp(62px, 10vh, 82px)',
    width: '100%',
    flexShrink: 0
  },
  dockCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: '14px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid var(--border-light)',
    cursor: 'pointer',
    padding: 0,
    backgroundColor: 'transparent',
    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  dockCardActive: {
    border: '2px solid var(--accent-gold)',
    boxShadow: '0 6px 20px rgba(197, 160, 89, 0.35)',
    transform: 'translateY(-2px)'
  },
  dockThumb: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.4s ease'
  },
  dockOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(12, 8, 5, 0.92) 0%, rgba(12, 8, 5, 0.5) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0.55rem 0.65rem',
    gap: '0.4rem'
  },
  dockIdx: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: 'var(--accent-gold)'
  },
  dockCategory: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#FAF8F5',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  lightboxOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 6, 4, 0.94)',
    backdropFilter: 'blur(14px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: '1.75rem',
    right: '1.75rem',
    background: 'none',
    border: 'none',
    color: '#FAF8F5',
    cursor: 'pointer',
    opacity: 0.8,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  arrowLeft: {
    position: 'absolute',
    left: '1.5rem',
    background: 'none',
    border: 'none',
    color: '#FAF8F5',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  arrowRight: {
    position: 'absolute',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    color: '#FAF8F5',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  lightboxContent: {
    width: '90%',
    maxWidth: '960px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25rem',
    position: 'relative'
  },
  lightboxImg: {
    width: '100%',
    maxHeight: '68vh',
    objectFit: 'contain',
    borderRadius: '16px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
  },
  lightboxDetails: {
    width: '100%',
    maxWidth: '650px',
    padding: '1.25rem 2rem',
    borderRadius: '20px',
    border: '1px solid rgba(250, 248, 245, 0.15)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
  },
  lightboxCat: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    letterSpacing: '0.15em'
  },
  lightboxTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.6rem',
    color: '#FAF8F5',
    margin: 0
  },
  lightboxDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.88rem',
    color: 'rgba(250, 248, 245, 0.8)',
    lineHeight: 1.45,
    margin: 0
  }
};
