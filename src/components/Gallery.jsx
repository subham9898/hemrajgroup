import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ active }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Golden Paddy Fields',
      subtitle: 'Sustainable sourcing directly from regional farming communities.',
      image: '/assets/hero_field.jpg',
      category: 'Harvesting'
    },
    {
      id: 2,
      title: 'Milling Machinery',
      subtitle: 'Satake optical sorting machines ensuring 99.9% grain purity.',
      image: '/assets/showroom_bg.jpg',
      category: 'Processing'
    },
    {
      id: 3,
      title: 'Pearlescent Grains',
      subtitle: 'Milled to achieve standard texture and nutrient locks.',
      image: '/assets/raw_rice.jpg',
      category: 'Quality Control'
    },
    {
      id: 4,
      title: 'Historical Legacy',
      subtitle: 'Six decades of agricultural expertise dating back to 1958.',
      image: '/assets/story_bg.jpg',
      category: 'Heritage'
    },
    {
      id: 5,
      title: 'Liquid Gold Extracts',
      subtitle: 'Physically refined edible oils rich in natural Oryzanol.',
      image: '/assets/refined_oil.jpg',
      category: 'Extraction'
    },
    {
      id: 6,
      title: 'Modern Packaging',
      subtitle: 'Eco-friendly and moisture-controlled packaging facilities.',
      image: '/assets/showroom_bg.jpg',
      category: 'Logistics'
    }
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" style={styles.section} className={`light-section reveal-section ${active ? 'active' : ''}`}>
      <div className="section-bg section-bg-gallery"></div>
      <div className="glow" style={{ top: '10%', right: '15%', animationDelay: '-2s' }}></div>
      
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <p style={styles.kicker}>VISUAL JOURNEY</p>
          <h2 style={styles.title}>
            Inside Our <span style={{ color: 'var(--accent-gold)' }}>Facilities</span>
          </h2>
          <div style={styles.divider}></div>
          <p style={styles.subtitleText}>
            A photographic showcase of our farms, state-of-the-art processing plants, and premium quality harvests.
          </p>
        </div>

        {/* Gallery Masonry Grid */}
        <div style={styles.grid} className="gallery-masonry-grid">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              style={styles.gridItem}
              onClick={() => setLightboxIndex(idx)}
              className="gallery-item-card glass"
            >
              <div
                style={{
                  ...styles.imageContainer,
                  backgroundImage: `url(${item.image})`
                }}
                className="gallery-image"
              >
                <div style={styles.hoverOverlay} className="gallery-hover-overlay">
                  <span style={styles.catBadge}>{item.category}</span>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemSubtitle}>{item.subtitle}</p>
                  <div style={styles.expandIcon}>
                    <Maximize2 size={16} color="var(--bg-primary)" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Slideshow Modal */}
      {lightboxIndex !== null && (
        <div style={styles.lightboxOverlay} onClick={() => setLightboxIndex(null)}>
          <button style={styles.closeBtn} onClick={() => setLightboxIndex(null)}>
            <X size={32} />
          </button>
          
          <button style={styles.arrowLeft} onClick={handlePrev}>
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
              <span style={styles.lightboxCat}>{galleryItems[lightboxIndex].category.toUpperCase()}</span>
              <h3 style={styles.lightboxTitle}>{galleryItems[lightboxIndex].title}</h3>
              <p style={styles.lightboxDesc}>{galleryItems[lightboxIndex].subtitle}</p>
            </div>
          </div>

          <button style={styles.arrowRight} onClick={handleNext}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    zIndex: 2,
    position: 'relative'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1rem',
    maxWidth: '680px',
    margin: '0 auto'
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent-gold)',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)'
  },
  divider: {
    width: '50px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)'
  },
  subtitleText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    width: '100%'
  },
  gridItem: {
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid var(--border-light)',
    cursor: 'pointer',
    aspectRatio: '4 / 3',
    position: 'relative',
    transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  hoverOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(15, 9, 5, 0.95) 0%, rgba(15, 9, 5, 0.4) 60%, rgba(15, 9, 5, 0.1) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '2rem',
    opacity: 0,
    transition: 'opacity 0.4s ease'
  },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--accent-gold)',
    color: 'var(--bg-primary)',
    padding: '0.25rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.6rem'
  },
  itemTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.35rem',
    color: '#FAF8F5',
    marginBottom: '0.3rem'
  },
  itemSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    color: 'rgba(250, 248, 245, 0.7)',
    lineHeight: 1.4
  },
  expandIcon: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(0.8)',
    opacity: 0,
    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  lightboxOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 6, 4, 0.92)',
    backdropFilter: 'blur(12px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  arrowLeft: {
    position: 'absolute',
    left: '2rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  arrowRight: {
    position: 'absolute',
    right: '2rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    zIndex: 10001
  },
  lightboxContent: {
    width: '90%',
    maxWidth: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    position: 'relative'
  },
  lightboxImg: {
    width: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
    borderRadius: '16px',
    boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
  },
  lightboxDetails: {
    width: '100%',
    maxWidth: '650px',
    padding: '2rem 2.5rem',
    borderRadius: '24px',
    border: '1px solid var(--border-light)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  lightboxCat: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    letterSpacing: '0.15em'
  },
  lightboxTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    color: 'var(--text-primary)'
  },
  lightboxDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5
  }
};
