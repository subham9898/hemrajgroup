import React, { useState, useRef, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, bgImage, onClick, animationDelay }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation angle (-10 to 10 degrees)
    const maxTilt = 10;
    const rY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rX = -((mouseY - height / 2) / (height / 2)) * maxTilt;
    
    setCoords({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const tiltStyle = {
    backgroundImage: `url(${bgImage})`,
    transform: isHovered
      ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale(1.025)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: isHovered ? 'none' : 'transform 0.4s ease',
    transformStyle: 'preserve-3d',
    animationDelay: animationDelay
  };

  return (
    <div
      ref={cardRef}
      className="product-slide-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ ...tiltStyle, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'rice', label: 'Premium Rice' },
    { id: 'oil', label: 'Edible Oils' },
    { id: 'dorb', label: 'DORB Extracts' },
    { id: 'byproduct', label: 'Derivatives' }
  ];

  const productsList = [
    // Rice
    {
      id: 'parboiled',
      category: 'rice',
      name: 'Steam & Parboiled Rice',
      desc: 'Eastern India\'s premium long-grain parboiled rice. Starch gelatinized during parboiling locks in natural nutrients.',
      image: '/assets/raw_rice.jpg',
      specs: ['Moisture: Under 14%', 'Purity: 99.9%', 'Broken: Max 5%', 'Admixture: Max 1%']
    },
    {
      id: 'rawrice',
      category: 'rice',
      name: 'Premium Raw Rice',
      desc: 'Sourced from the finest paddy belts of West Bengal. Light, non-sticky, and milled to achieve brilliant pearlescent whiteness.',
      image: '/assets/raw_rice.jpg',
      specs: ['Moisture: Max 13.5%', 'Chalky Grains: Max 3%', 'Purity: 99.9%', 'Foreign Matter: Nil']
    },
    {
      id: 'puffed',
      category: 'rice',
      name: 'Hemraj Puffed Rice (Muri)',
      desc: 'Double-expanded, crispy puffed rice. Available in our iconic premium brands: Rocket, Gold, Platinum, and Star.',
      image: '/assets/raw_rice.jpg',
      specs: ['100% Sand-free processing', 'Zero artificial colors', 'High crunch retention', 'Puffed at exact heat levels']
    },
    // Oils
    {
      id: 'gold-oil',
      category: 'oil',
      name: 'Hemraj Gold Rice Bran Oil',
      desc: 'Physically refined cooking oil. Retains up to 12,000 ppm of Oryzanol, making it the ultimate cholesterol-friendly cooking choice.',
      image: '/assets/refined_oil.jpg',
      specs: ['Free fatty acid: Max 0.1%', 'Oryzanol: ~12,000 ppm', 'Trans-fat: 0%', 'Physical steam refined']
    },
    {
      id: 'mustard-oil',
      category: 'oil',
      name: 'Hemraj Kachi Ghani Mustard Oil',
      desc: 'Cold-pressed using wooden mortars (ghani). Retains the natural pungency, strong aroma, and essential monounsaturated fats.',
      image: '/assets/refined_oil.jpg',
      specs: ['100% chemical-free', 'High Allyl Isothiocyanate', 'Rich in MUFA / PUFA', 'Deep golden hue']
    },
    {
      id: 'soya-oil',
      category: 'oil',
      name: 'Hemraj Soya Oil',
      desc: 'Refined Soybean oil. A neutral, high smoke-point oil rich in Omega-3 fatty acids, ideal for frying, baking, and cooking.',
      image: '/assets/refined_oil.jpg',
      specs: ['Smoke point: 232°C', 'Moisture: Max 0.05%', 'Rich in polyunsaturated fats', 'Odourless & clear']
    },
    // DORB
    {
      id: 'super-hemgem',
      category: 'dorb',
      name: 'Super Hemgem (DORB)',
      desc: 'Our highest grade De-oiled Rice Bran extraction. An exceptional high-protein, nutrient-dense ingredient for cattle and poultry feeds.',
      image: '/assets/hero_field.jpg',
      specs: ['Protein: Min 16%', 'Fiber: Max 12%', 'Sand/Silica: Max 1.5%', 'Moisture: Max 11%']
    },
    {
      id: 'dorb-g1',
      category: 'dorb',
      name: 'DORB Grade I',
      desc: 'Export-grade de-oiled extraction. Manufactured under strict solvent extraction parameters to guarantee low sand and high digestibility.',
      image: '/assets/hero_field.jpg',
      specs: ['Protein: Min 15%', 'Fiber: Max 14%', 'Sand/Silica: Max 2.5%', 'Moisture: Max 11.5%']
    },
    {
      id: 'hemgem',
      category: 'dorb',
      name: 'Hemgem Standard (DORB)',
      desc: 'Standard quality de-oiled rice bran. Perfect for domestic feed manufacturers looking for reliable bulk protein inputs.',
      image: '/assets/hero_field.jpg',
      specs: ['Protein: Min 14%', 'Fiber: Max 16%', 'Sand/Silica: Max 4%', 'Moisture: Max 12%']
    },
    // Byproducts
    {
      id: 'wax',
      category: 'byproduct',
      name: 'Refined Rice Bran Wax',
      desc: 'A high-melting natural wax extracted during dewaxing of oil. Extensively used in cosmetics, food glaze, and industrial polishes.',
      image: '/assets/refined_oil.jpg',
      specs: ['Melting point: 77°C - 82°C', 'Acid Value: Max 10', 'Saponification Value: 75-95', 'Natural origin']
    },
    {
      id: 'lecithin',
      category: 'byproduct',
      name: 'Rice Bran Lecithin',
      desc: 'A premium plant-based emulsifier rich in essential phospholipids, serving as a natural substitute for soy lecithin.',
      image: '/assets/refined_oil.jpg',
      specs: ['Acetone insolubles: Min 60%', 'Moisture: Max 1.0%', 'Acid value: Max 30', 'Viscosity: Flowable liquid']
    },
    {
      id: 'fatty-acid',
      category: 'byproduct',
      name: 'Rice Bran Fatty Acid',
      desc: 'Byproduct of physical refining containing concentrated free fatty acids, widely processed for manufacturing soap and cleaning agents.',
      image: '/assets/refined_oil.jpg',
      specs: ['Total Fatty Matter: Min 95%', 'Moisture: Max 1%', 'Acid Value: ~190', 'Used in soap/industrial industries']
    }
  ];

  const filteredProducts = productsList.filter((prod) => {
    const matchesFilter = activeFilter === 'all' || prod.category === activeFilter;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useGSAP(() => {
    // Only horizontal pin on desktop (> 900px)
    if (window.innerWidth <= 900) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => {
        if (!trackRef.current || !trackRef.current.parentElement) return '+0';
        const move = trackRef.current.scrollWidth - trackRef.current.parentElement.offsetWidth;
        return `+=${Math.max(0, move)}`;
      },
      scrub: 0.2, // fast response so page scroll continues to next section immediately
      pin: true,
      invalidateOnRefresh: true,
      animation: gsap.to(trackRef.current, {
        x: () => {
          if (!trackRef.current || !trackRef.current.parentElement) return 0;
          const move = trackRef.current.scrollWidth - trackRef.current.parentElement.offsetWidth;
          return -Math.max(0, move);
        },
        ease: 'none'
      })
    });

    return () => scrollTrigger.kill();
  }, []); // Mount once!

  // Dynamic layout refresh when filters or search queries change
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, filteredProducts.length]);

  return (
    <section ref={containerRef} id="products" style={styles.scrollWrapper} className="dark-section">
      <div style={styles.stickyContainer} className="products-sticky-container">
        <div className="section-bg section-bg-products"></div>
        <div className="glow" style={{ top: '15%', left: '10%', animationDelay: '-1s' }}></div>
        <div className="glow" style={{ bottom: '20%', right: '10%', animationDelay: '-3s' }}></div>

        <div style={styles.splitLayout} className="products-split-layout">
          {/* Left Sidebar - Stays fixed on scroll */}
          <div style={styles.sidebar} className="products-sidebar">
            <p style={styles.kicker}>THE HARVEST</p>
            <h2 style={styles.title}>
              Our Product <span style={{ color: 'var(--accent-gold)' }}>Showroom</span>
            </h2>
            <div style={styles.divider}></div>
            <p style={styles.sidebarDesc}>
              Discover six decades of processing mastery locked into our premium food oils, grain products, and exports.
            </p>

            {/* Filter Tabs */}
            <div style={styles.tabs} className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`category-tab-btn ${activeFilter === cat.id ? 'active' : ''}`}
                  style={{
                    ...styles.tabBtn,
                    backgroundColor: activeFilter === cat.id ? 'var(--accent-gold)' : 'transparent',
                    color: activeFilter === cat.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                    borderColor: activeFilter === cat.id ? 'var(--accent-gold)' : 'var(--border-light)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={styles.searchBox} className="glass">
              <Search size={18} color="var(--text-secondary)" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Right Panel - Horizontal Scrubbing Track */}
          <div style={styles.trackContainer} className="products-track-container">
            <div ref={trackRef} style={styles.sliderTrack} className="products-slider-track">
              {filteredProducts.map((prod, idx) => (
                <TiltCard
                  key={prod.id}
                  bgImage={prod.image}
                  onClick={() => setSelectedProduct(prod)}
                  animationDelay={`${idx * 0.08}s`}
                >
                  <div style={styles.cardScrim} className="cardScrim"></div>
                  <div style={styles.cardContent}>
                    <span style={styles.cardCategory}>{prod.category.toUpperCase()}</span>
                    <h3 style={styles.cardName}>{prod.name}</h3>
                    <p style={styles.cardDesc}>{prod.desc.substring(0, 75)}...</p>
                    
                    <span style={styles.viewLink}>
                      <Eye size={12} />
                      SPECS SHEET
                    </span>
                  </div>
                </TiltCard>
              ))}

              {filteredProducts.length === 0 && (
                <div style={styles.noResults}>
                  No products match your current search queries or filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} className="glass" onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>×</button>
            <div style={styles.modalGrid} className="modal-inner-grid">
              <div style={styles.modalLeft}>
                <span style={styles.modalCatBadge}>{selectedProduct.category.toUpperCase()}</span>
                <h3 style={styles.modalTitle}>{selectedProduct.name}</h3>
                <p style={styles.modalDesc}>{selectedProduct.desc}</p>
              </div>
              <div style={styles.modalRight}>
                <h4 style={styles.specsTitle}>TECHNICAL SPECIFICATIONS</h4>
                <ul style={styles.specsList}>
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} style={styles.specItem}>
                      <span style={styles.specDot}></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  scrollWrapper: {
    position: 'relative',
    backgroundColor: 'var(--bg-secondary)',
    overflow: 'hidden'
  },
  stickyContainer: {
    height: '100vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  splitLayout: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '0 4rem',
    alignItems: 'center',
    gap: '3rem',
    zIndex: 2,
    position: 'relative'
  },
  sidebar: {
    flex: '0 0 340px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1.2rem'
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
    fontSize: '2.8rem',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)'
  },
  divider: {
    width: '45px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)'
  },
  sidebarDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)'
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.6rem',
    margin: '0.5rem 0'
  },
  tabBtn: {
    padding: '0.5rem 1.2rem',
    border: '1px solid',
    borderRadius: '20px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem 1.2rem',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    width: '100%'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    width: '100%'
  },
  trackContainer: {
    flex: '1 1 auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  sliderTrack: {
    display: 'flex',
    gap: '2.5rem',
    padding: '2rem 0',
    willChange: 'transform'
  },
  cardScrim: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(18, 11, 6, 0.95) 0%, rgba(18, 11, 6, 0.35) 60%, rgba(18, 11, 6, 0.15) 100%)',
    zIndex: 1,
    transition: 'opacity 0.4s ease'
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '2.2rem 2rem',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    transform: 'translateZ(30px)' // Tilt effect depth pop
  },
  cardCategory: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    letterSpacing: '0.15em'
  },
  cardName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.45rem',
    color: '#FAF8F5',
    lineHeight: 1.2
  },
  cardDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    color: 'rgba(250, 248, 245, 0.7)',
    lineHeight: 1.5
  },
  viewLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.7rem',
    color: 'var(--accent-gold)',
    fontWeight: '700',
    letterSpacing: '0.15em',
    marginTop: '0.5rem'
  },
  noResults: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    padding: '3rem'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 6, 4, 0.85)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    padding: '2rem'
  },
  modalContent: {
    width: '100%',
    maxWidth: '820px',
    borderRadius: '32px',
    border: '1px solid var(--border-light)',
    padding: '4rem 3.5rem',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4)'
  },
  closeBtn: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'none',
    border: 'none',
    fontSize: '2.2rem',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    lineHeight: 0.5
  },
  modalGrid: {
    display: 'flex',
    gap: '4rem',
    alignItems: 'flex-start'
  },
  modalLeft: {
    flex: '1 1 55%'
  },
  modalCatBadge: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    letterSpacing: '0.2em',
    display: 'block',
    marginBottom: '0.6rem'
  },
  modalTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    color: 'var(--text-primary)',
    lineHeight: 1.1,
    marginBottom: '1.5rem'
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.7
  },
  modalRight: {
    flex: '1 1 45%',
    backgroundColor: 'rgba(197, 160, 89, 0.05)',
    border: '1px solid rgba(197, 160, 89, 0.15)',
    borderRadius: '24px',
    padding: '2.2rem'
  },
  specsTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '0.15em',
    marginBottom: '1.2rem'
  },
  specsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  specDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold)'
  }
};
