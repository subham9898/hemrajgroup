import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, bgImage, onClick, animationDelay }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const handler = (e) => setCanHover(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const maxTilt = 7;
    const rY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rX = -((mouseY - height / 2) / (height / 2)) * maxTilt;
    
    setCoords({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    if (canHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (canHover) {
      setIsHovered(false);
      setCoords({ x: 0, y: 0 });
    }
  };

  const tiltStyle = {
    backgroundImage: `url(${bgImage})`,
    transform: canHover && isHovered
      ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale(1.025)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
    transformStyle: canHover ? 'preserve-3d' : 'flat',
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
      style={{ ...tiltStyle, willChange: canHover ? 'transform' : 'auto' }}
    >
      {children}
    </div>
  );
}

export default function Products({ active }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const trackContainerRef = useRef(null);

  const productsList = [
    // Rice
    {
      id: 'parboiled',
      category: 'rice',
      name: 'Steam & Parboiled Rice',
      desc: 'Eastern India\'s premium long-grain parboiled rice. Starch gelatinized during parboiling locks in natural nutrients.',
      image: '/assets/process_bg.jpg',
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
      image: '/assets/showroom_bg.jpg',
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
      image: '/assets/story_bg.jpg',
      specs: ['Protein: Min 16%', 'Fiber: Max 12%', 'Sand/Silica: Max 1.5%', 'Moisture: Max 11%']
    },
    {
      id: 'dorb-g1',
      category: 'dorb',
      name: 'DORB Grade I',
      desc: 'Export-grade de-oiled extraction. Manufactured under strict solvent extraction parameters to guarantee low sand and high digestibility.',
      image: '/assets/process_bg.jpg',
      specs: ['Protein: Min 15%', 'Fiber: Max 14%', 'Sand/Silica: Max 2.5%', 'Moisture: Max 11.5%']
    },
    {
      id: 'hemgem',
      category: 'dorb',
      name: 'Hemgem Standard (DORB)',
      desc: 'Standard quality de-oiled rice bran. Perfect for domestic feed manufacturers looking for reliable bulk protein inputs.',
      image: '/assets/story_bg.jpg',
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

  const categories = [
    { id: 'all', label: 'All Products', count: productsList.length },
    { id: 'rice', label: 'Premium Rice', count: productsList.filter(p => p.category === 'rice').length },
    { id: 'oil', label: 'Edible Oils', count: productsList.filter(p => p.category === 'oil').length },
    { id: 'dorb', label: 'DORB Extracts', count: productsList.filter(p => p.category === 'dorb').length },
    { id: 'byproduct', label: 'Derivatives', count: productsList.filter(p => p.category === 'byproduct').length }
  ];

  const filteredProducts = productsList.filter((prod) => {
    const matchesFilter = activeFilter === 'all' || prod.category === activeFilter;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stop Pause Scrolling (Scrollytelling Sticky scrub through products)
  useGSAP(() => {
    if (!containerRef.current || !trackRef.current || !trackContainerRef.current) return;

    const calcMaxMove = () => {
      const track = trackRef.current;
      const container = trackContainerRef.current;
      if (!track || !container) return 0;
      return Math.max(0, track.scrollWidth - container.offsetWidth);
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxMove = calcMaxMove();
        
        if (trackRef.current) {
          if (maxMove > 0) {
            gsap.set(trackRef.current, { x: -progress * maxMove });
          } else {
            gsap.set(trackRef.current, { x: 0 });
          }
        }

        const total = filteredProducts.length;
        if (total > 0) {
          const clamped = Math.max(0, Math.min(total - 1, Math.floor(progress * total)));
          setActiveCardIndex(clamped);
        }
      }
    });

    return () => st.kill();
  }, { scope: containerRef, dependencies: [filteredProducts.length, activeFilter, searchQuery] });

  // Jump to specific card by scrolling the scrollytelling container
  const jumpToCard = (idx) => {
    setActiveCardIndex(idx);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const total = Math.max(1, filteredProducts.length - 1);
      const progress = idx / total;
      const scrollAmount = window.scrollY + rect.top + progress * (rect.height - window.innerHeight);
      window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: 0 });
    }
    setActiveCardIndex(0);
    // Smooth reset scroll position if user has scrolled inside section
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < -50) {
        window.scrollTo({ top: window.scrollY + rect.top, behavior: 'smooth' });
      }
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // Keyboard navigation & modal Escape handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <section
      ref={containerRef}
      id="products"
      style={styles.scrollySection}
      className={`scrolly-products-section light-section reveal-section ${active ? 'active' : ''}`}
      aria-labelledby="products-title"
    >
      {/* Sticky Single-Frame Window (Pauses in 1 frame while user scrolls through products) */}
      <div style={styles.stickyWindow} className="products-sticky-window">
        <div className="section-bg section-bg-products"></div>
        <div className="glow" style={{ top: '15%', left: '10%', animationDelay: '-1s' }}></div>
        <div className="glow" style={{ bottom: '20%', right: '10%', animationDelay: '-3s' }}></div>

        <div className="container products-frame-container" style={styles.container}>
          <div style={styles.splitLayout} className="products-split-layout">
            {/* Controls Sidebar on Desktop / Compact Header on Mobile */}
            <div style={styles.sidebar} className="products-sidebar">
              <div className="products-header-top">
                <p style={styles.kicker}>THE HARVEST</p>
                <h2 id="products-title" style={styles.title} className="products-section-title">
                  Our Product <span style={{ color: 'var(--accent-gold)' }}>Showroom</span>
                </h2>
                <div style={styles.divider} className="products-divider"></div>
                <p style={styles.sidebarDesc} className="products-sidebar-desc">
                  Discover six decades of processing mastery locked into our premium food oils, grain products, and exports.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div style={styles.tabs} className="category-tabs" role="group" aria-label="Filter products by category">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange(cat.id)}
                    className={`category-tab-btn ${activeFilter === cat.id ? 'active' : ''}`}
                    style={{
                      backgroundColor: activeFilter === cat.id ? 'var(--accent-gold)' : 'transparent',
                      color: activeFilter === cat.id ? '#120B06' : 'var(--text-primary)',
                      borderColor: activeFilter === cat.id ? 'var(--accent-gold)' : 'var(--border-light)'
                    }}
                    aria-pressed={activeFilter === cat.id}
                  >
                    <span>{cat.label}</span>
                    <span className="tab-count-badge">{cat.count}</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={styles.searchBox} className="glass products-search-box">
                <Search size={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                <input
                  id="catalog-search"
                  name="search"
                  type="text"
                  placeholder="Search products or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  className="products-search-input"
                  aria-label="Search product catalog"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="products-search-clear"
                    aria-label="Clear search query"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Counter and Navigation Controls */}
              <div className="products-controls-bar" style={styles.controlsBar}>
                <div style={styles.counterBadge} className="products-counter-badge">
                  <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>
                    {String(filteredProducts.length > 0 ? activeCardIndex + 1 : 0).padStart(2, '0')}
                  </span>
                  <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
                  <span style={{ opacity: 0.7 }}>
                    {String(filteredProducts.length).padStart(2, '0')}
                  </span>
                </div>

                <div style={styles.navButtons} className="products-nav-buttons">
                  <button
                    onClick={() => jumpToCard(Math.max(0, activeCardIndex - 1))}
                    disabled={activeCardIndex === 0}
                    style={styles.navBtn}
                    className="products-nav-arrow"
                    aria-label="Previous product"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => jumpToCard(Math.min(filteredProducts.length - 1, activeCardIndex + 1))}
                    disabled={activeCardIndex >= filteredProducts.length - 1}
                    style={styles.navBtn}
                    className="products-nav-arrow"
                    aria-label="Next product"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Track Container */}
            <div
              ref={trackContainerRef}
              style={styles.trackContainer}
              className="products-track-container"
            >
              <div ref={trackRef} style={styles.sliderTrack} className="products-slider-track">
                {filteredProducts.map((prod, idx) => (
                  <TiltCard
                    key={prod.id}
                    bgImage={prod.image}
                    onClick={() => setSelectedProduct(prod)}
                    animationDelay={`${Math.min(idx * 0.05, 0.3)}s`}
                  >
                    <div style={styles.cardScrim} className="cardScrim"></div>
                    <div style={styles.cardContent} className="products-card-content">
                      <span style={styles.cardCategory} className="products-card-badge">
                        {prod.category.toUpperCase()}
                      </span>
                      <h3 style={styles.cardName} className="products-card-name">
                        {prod.name}
                      </h3>
                      <p style={styles.cardDesc} className="products-card-desc">
                        {prod.desc.substring(0, 75)}...
                      </p>
                      
                      <span style={styles.viewLink} className="product-card-action">
                        <Eye size={13} />
                        SPECS SHEET
                      </span>
                    </div>
                  </TiltCard>
                ))}

                {filteredProducts.length === 0 && (
                  <div style={styles.noResults} className="products-empty-state glass">
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                      No products found
                    </p>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      No matches for &ldquo;{searchQuery}&rdquo; in this category.
                    </span>
                    <button
                      onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                      className="reset-filters-btn"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          {filteredProducts.length > 1 && (
            <div className="products-mobile-dots">
              {filteredProducts.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => jumpToCard(dotIdx)}
                  className={`products-mobile-dot ${activeCardIndex === dotIdx ? 'active' : ''}`}
                  aria-label={`Go to product ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          style={styles.modalOverlay}
          className="products-modal-overlay"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          <div
            style={styles.modalContent}
            className="glass products-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.closeBtn}
              className="products-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product specifications"
            >
              <X size={20} />
            </button>
            <div style={styles.modalGrid} className="modal-inner-grid">
              <div style={styles.modalLeft} className="products-modal-left">
                <div
                  className="modal-banner-image"
                  style={{ backgroundImage: `url(${selectedProduct.image})` }}
                >
                  <span className="modal-banner-badge">
                    {selectedProduct.category.toUpperCase()}
                  </span>
                </div>
                <h3 id="modal-product-title" style={styles.modalTitle} className="products-modal-title">
                  {selectedProduct.name}
                </h3>
                <p style={styles.modalDesc} className="products-modal-desc">
                  {selectedProduct.desc}
                </p>
              </div>
              <div style={styles.modalRight} className="products-modal-right">
                <h4 style={styles.specsTitle}>TECHNICAL SPECIFICATIONS</h4>
                <ul style={styles.specsList} className="products-specs-list">
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} style={styles.specItem} className="products-spec-item">
                      <span style={styles.specDot}></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="modal-done-btn"
                >
                  Close Specifications
                </button>
              </div>
            </div>
          </div>
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
    justifyContent: 'center',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '1380px',
    margin: '0 auto',
    zIndex: 2,
    position: 'relative'
  },
  splitLayout: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    gap: 'clamp(1.5rem, 3vw, 3rem)',
    zIndex: 2,
    position: 'relative',
    minHeight: 0
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'clamp(280px, 24vw, 340px)',
    flexShrink: 0,
    gap: 'clamp(0.4rem, 1.2vh, 0.9rem)',
    zIndex: 3
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.22em',
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    margin: '0 0 0.15rem 0'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.7rem, 3.2vh, 2.4rem)',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)',
    margin: 0
  },
  divider: {
    width: '45px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)',
    margin: '0.35rem 0'
  },
  sidebarDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: 'var(--text-secondary)',
    margin: 0
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    margin: '0.2rem 0'
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.85rem',
    borderRadius: '12px',
    border: '1px solid var(--border-light)'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    width: '100%'
  },
  controlsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '0.2rem'
  },
  counterBadge: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0.8rem',
    borderRadius: '100px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-light)'
  },
  navButtons: {
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
  trackContainer: {
    flex: '1 1 auto',
    height: '100%',
    maxHeight: '100%',
    minHeight: 0,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  sliderTrack: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    width: 'max-content',
    padding: '0.5rem 0.25rem',
    willChange: 'transform'
  },
  cardScrim: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(12, 8, 5, 0.95) 0%, rgba(12, 8, 5, 0.45) 55%, rgba(12, 8, 5, 0.1) 100%)',
    zIndex: 1,
    transition: 'opacity 0.4s ease'
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    padding: '1.4rem 1.25rem',
    transform: 'translateZ(30px)'
  },
  cardCategory: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.68rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  },
  cardName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.35rem',
    color: '#FAF8F5',
    lineHeight: 1.2,
    margin: 0
  },
  cardDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.78rem',
    color: 'rgba(250, 248, 245, 0.75)',
    lineHeight: 1.45,
    margin: 0
  },
  viewLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.68rem',
    color: 'var(--accent-gold)',
    fontWeight: '700',
    letterSpacing: '0.12em',
    marginTop: '0.35rem',
    textTransform: 'uppercase'
  },
  noResults: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    padding: '2rem 3rem',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 6, 4, 0.9)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    padding: '1.5rem'
  },
  modalContent: {
    width: '100%',
    maxWidth: '850px',
    position: 'relative',
    borderRadius: '24px',
    padding: '2.5rem',
    backgroundColor: 'var(--bg-glass)',
    border: '1px solid var(--border-light)'
  },
  closeBtn: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    opacity: 0.8,
    transition: 'opacity 0.2s'
  },
  modalGrid: {
    display: 'flex',
    gap: '2.5rem'
  },
  modalLeft: {
    flex: '1 1 50%'
  },
  modalTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    color: 'var(--text-primary)',
    lineHeight: 1.15,
    margin: '0.8rem 0 0.5rem 0'
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0
  },
  modalRight: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  specsTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '0.15em',
    marginBottom: '1rem',
    textTransform: 'uppercase'
  },
  specsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: 0,
    margin: '0 0 1.5rem 0'
  },
  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  specDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold)',
    flexShrink: 0
  }
};
