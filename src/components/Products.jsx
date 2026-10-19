import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Eye, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
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
    // Only enable mouse tilt on non-touch devices with fine pointers
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
    
    // Calculate rotation angle (-8 to 8 degrees)
    const maxTilt = 8;
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

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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

  // Track horizontal scroll state for mobile indicator & arrows
  const updateScrollState = useCallback(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);

    // Calculate active card index based on scroll position
    if (trackRef.current && trackRef.current.children.length > 0) {
      const cards = Array.from(trackRef.current.children);
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveCardIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState, filteredProducts.length]);

  const scrollTrack = (direction) => {
    const el = trackContainerRef.current;
    if (!el) return;
    const amount = Math.max(260, el.clientWidth * 0.75);
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (index) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
      setActiveCardIndex(index);
    }
  };

  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    if (trackContainerRef.current) {
      trackContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // GSAP Pin + Horizontal Scroll only for desktop screens (> 900px)
    mm.add('(min-width: 901px)', () => {
      if (!containerRef.current || !trackRef.current || !trackContainerRef.current) return;

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => {
          if (!trackRef.current || !trackContainerRef.current) return '+0';
          const move = trackRef.current.scrollWidth - trackContainerRef.current.offsetWidth;
          return `+=${Math.max(0, move)}`;
        },
        scrub: 0.2, // fast response so page scroll continues to next section immediately
        pin: true,
        invalidateOnRefresh: true,
        animation: gsap.to(trackRef.current, {
          x: () => {
            if (!trackRef.current || !trackContainerRef.current) return 0;
            const move = trackRef.current.scrollWidth - trackContainerRef.current.offsetWidth;
            return -Math.max(0, move);
          },
          ease: 'none'
        })
      });

      return () => scrollTrigger.kill();
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [filteredProducts.length] });

  // Dynamic layout refresh when filters or search queries change
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      updateScrollState();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, filteredProducts.length, updateScrollState]);

  // Modal accessibility & body scroll lock
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
    <section ref={containerRef} id="products" style={styles.scrollWrapper} className="light-section" aria-labelledby="products-title">
      <div style={styles.stickyContainer} className="products-sticky-container">
        <div className="section-bg section-bg-products"></div>
        <div className="glow" style={{ top: '15%', left: '10%', animationDelay: '-1s' }}></div>
        <div className="glow" style={{ bottom: '20%', right: '10%', animationDelay: '-3s' }}></div>

        <div style={styles.splitLayout} className="products-split-layout">
          {/* Left Sidebar on desktop / Header controls on mobile */}
          <div style={styles.sidebar} className="products-sidebar">
            <p style={styles.kicker}>THE HARVEST</p>
            <h2 id="products-title" style={styles.title} className="products-section-title">
              Our Product <span style={{ color: 'var(--accent-gold)' }}>Showroom</span>
            </h2>
            <div style={styles.divider}></div>
            <p style={styles.sidebarDesc} className="products-sidebar-desc">
              Discover six decades of processing mastery locked into our premium food oils, grain products, and exports.
            </p>

            {/* Filter Tabs */}
            <div style={styles.tabs} className="category-tabs" role="group" aria-label="Filter products by category">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`category-tab-btn ${activeFilter === cat.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeFilter === cat.id ? 'var(--accent-gold)' : 'transparent',
                    color: activeFilter === cat.id ? 'var(--bg-primary)' : 'var(--text-primary)',
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
              <Search size={18} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
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
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Carousel Controls & Item Counter */}
            <div className="products-mobile-controls">
              <div className="products-mobile-count">
                <SlidersHorizontal size={13} />
                <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}</span>
              </div>
              <div className="products-mobile-nav">
                <button
                  onClick={() => scrollTrack('left')}
                  disabled={!canScrollLeft}
                  className="products-mobile-nav-btn"
                  aria-label="Previous product"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollTrack('right')}
                  disabled={!canScrollRight}
                  className="products-mobile-nav-btn"
                  aria-label="Next product"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Horizontal Scrubbing Track on desktop / Smooth Swipe on mobile */}
          <div ref={trackContainerRef} style={styles.trackContainer} className="products-track-container">
            <div ref={trackRef} style={styles.sliderTrack} className="products-slider-track">
              {filteredProducts.map((prod, idx) => (
                <TiltCard
                  key={prod.id}
                  bgImage={prod.image}
                  onClick={() => setSelectedProduct(prod)}
                  animationDelay={`${Math.min(idx * 0.06, 0.4)}s`}
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
                      {prod.desc.substring(0, 80)}...
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
                  <p style={{ margin: 0, fontWeight: 600, color: '#FAF8F5', fontSize: '1.05rem' }}>
                    No products found
                  </p>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(250, 248, 245, 0.7)' }}>
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

            {/* Mobile Pagination Dots */}
            {filteredProducts.length > 1 && (
              <div className="products-mobile-dots">
                {filteredProducts.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToCard(dotIdx)}
                    className={`products-mobile-dot ${activeCardIndex === dotIdx ? 'active' : ''}`}
                    aria-label={`Go to product ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
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
  scrollWrapper: {
    position: 'relative',
    backgroundColor: 'var(--bg-primary)',
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
    alignItems: 'center',
    zIndex: 2,
    position: 'relative'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 3
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    marginBottom: '0.2rem'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)'
  },
  divider: {
    width: '45px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)',
    margin: '0.2rem 0'
  },
  sidebarDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)'
  },
  tabs: {
    margin: '0.25rem 0'
  },
  searchBox: {
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
    alignItems: 'center'
  },
  sliderTrack: {
    display: 'flex',
    willChange: 'transform'
  },
  cardScrim: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(18, 11, 6, 0.96) 0%, rgba(18, 11, 6, 0.45) 55%, rgba(18, 11, 6, 0.15) 100%)',
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
    color: 'var(--text-secondary)'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 6, 4, 0.85)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  },
  modalContent: {
    width: '100%',
    position: 'relative'
  },
  closeBtn: {
    cursor: 'pointer'
  },
  modalGrid: {
    display: 'flex'
  },
  modalLeft: {},
  modalTitle: {
    fontFamily: 'var(--font-serif)',
    color: 'var(--text-primary)',
    lineHeight: 1.1
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    color: 'var(--text-secondary)',
    lineHeight: 1.7
  },
  modalRight: {},
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
    gap: '0.8rem',
    padding: 0,
    margin: 0
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
    backgroundColor: 'var(--accent-gold)',
    flexShrink: 0
  }
};
