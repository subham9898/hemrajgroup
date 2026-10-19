import React, { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ currentSection, isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  const leftItems = [
    { label: 'HOME', target: 'home' },
    { label: 'OUR STORY', target: 'story' },
    { label: 'PRODUCTS', target: 'products' }
  ];

  const rightItems = [
    { label: 'GALLERY', target: 'gallery' },
    { label: 'CONTACT', target: 'contact' }
  ];

  const allItems = [...leftItems, ...rightItems];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isOverDarkHero = !isScrolled && currentSection === 'home';
  const navTextColor = isOverDarkHero ? '#FAF8F5' : 'var(--text-primary)';

  if (isDesktop) {
    // Desktop Symmetric Centered Header Navbar
    return (
      <nav
        style={{
          ...styles.nav,
          ...(isScrolled ? styles.navScrolled : styles.navNormal)
        }}
        className={`navbar-dock ${isScrolled ? 'scrolled glass' : 'transparent'}`}
      >
        {/* Left Side: Home, Our Story, Gallery */}
        <div style={styles.navGroupLeft}>
          {leftItems.map((item) => {
            const isActive = currentSection === item.target;
            return (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                style={{
                  ...styles.navLink,
                  color: isActive ? 'var(--accent-gold)' : navTextColor,
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  textShadow: isOverDarkHero ? '0 1px 4px rgba(0,0,0,0.5)' : 'none'
                }}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && <span style={styles.activeIndicator} className="indicator-dot"></span>}
              </a>
            );
          })}
        </div>

        {/* Center Side: Logo and Branding */}
        <a href="#home" style={{ ...styles.navGroupCenter, textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <img src="/assets/hemraj_logo.png" alt="Hemraj Logo" style={styles.logoImg} />
          <div style={styles.brandTextContainer}>
            <span style={styles.brandText}>HEMRAJ</span>
            <span style={{ ...styles.brandSub, color: isOverDarkHero ? 'rgba(250, 248, 245, 0.75)' : 'var(--text-secondary)' }}>ESTD. 1958</span>
          </div>
        </a>

        {/* Right Side: Products, Impact, Contact */}
        <div style={styles.navGroupRight}>
          {rightItems.map((item) => {
            const isActive = currentSection === item.target;
            return (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                style={{
                  ...styles.navLink,
                  color: isActive ? 'var(--accent-gold)' : navTextColor,
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  textShadow: isOverDarkHero ? '0 1px 4px rgba(0,0,0,0.5)' : 'none'
                }}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && <span style={styles.activeIndicator} className="indicator-dot"></span>}
              </a>
            );
          })}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            style={{
              ...styles.actionBtn,
              backgroundColor: isOverDarkHero ? 'rgba(250, 248, 245, 0.12)' : 'var(--accent-gold-light)',
              borderColor: isOverDarkHero ? 'rgba(250, 248, 245, 0.2)' : 'var(--border-light)'
            }}
            className="theme-toggle-btn"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun size={17} color="var(--accent-gold)" />
            ) : (
              <Moon size={17} color={navTextColor} />
            )}
          </button>
        </div>
      </nav>
    );
  }

  // Mobile Header Navbar
  return (
    <>
      <nav
        style={{
          ...styles.mobileNav,
          ...(isScrolled ? styles.mobileNavScrolled : styles.mobileNavNormal)
        }}
        className={`navbar-dock-mobile ${isScrolled ? 'scrolled glass' : 'transparent'}`}
        aria-label="Mobile navigation"
      >
        <a href="#home" style={{ ...styles.brand, textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <img src="/assets/hemraj_logo.png" alt="Hemraj Logo" style={{ height: '30px', borderRadius: '4px' }} />
          <div style={styles.brandTextContainer}>
            <span style={{ ...styles.brandText, fontSize: '0.95rem' }}>HEMRAJ</span>
            <span style={{ ...styles.brandSub, fontSize: '0.55rem', color: isOverDarkHero ? 'rgba(250, 248, 245, 0.75)' : 'var(--text-secondary)' }}>ESTD. 1958</span>
          </div>
        </a>

        <div style={styles.actions}>
          <button
            onClick={toggleTheme}
            style={{
              ...styles.actionBtn,
              backgroundColor: isOverDarkHero ? 'rgba(250, 248, 245, 0.12)' : 'var(--accent-gold-light)',
              borderColor: isOverDarkHero ? 'rgba(250, 248, 245, 0.2)' : 'var(--border-light)'
            }}
            className="theme-toggle-btn"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun size={16} color="var(--accent-gold)" />
            ) : (
              <Moon size={16} color={navTextColor} />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={styles.mobileBtn}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} color={navTextColor} />
            ) : (
              <Menu size={20} color={navTextColor} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu} className="glass" role="dialog" aria-modal="true" aria-label="Navigation drawer">
          <ul style={styles.mobileNavList}>
            {allItems.map((item) => (
              <li key={item.target} style={styles.mobileNavItem}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.target);
                  }}
                  style={{
                    ...styles.mobileNavLink,
                    color: currentSection === item.target ? 'var(--accent-gold)' : 'var(--text-primary)',
                    fontWeight: currentSection === item.target ? '600' : '400',
                    textDecoration: 'none'
                  }}
                  aria-current={currentSection === item.target ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

const styles = {
  // Desktop header style container
  nav: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 64px)',
    maxWidth: '1240px',
    height: '68px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 3rem',
    borderRadius: '24px',
    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  navScrolled: {
    top: '12px',
    height: '60px',
    backgroundColor: 'var(--bg-glass)',
    border: '1px solid var(--border-light)',
    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)'
  },
  navNormal: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(250, 248, 245, 0.18)',
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)'
  },

  // 3-way layout sections
  navGroupLeft: {
    flex: '1 1 35%',
    display: 'flex',
    alignItems: 'center',
    gap: '2.2rem',
    justifyContent: 'flex-start'
  },
  navGroupCenter: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    cursor: 'pointer',
    justifyContent: 'center'
  },
  navGroupRight: {
    flex: '1 1 35%',
    display: 'flex',
    alignItems: 'center',
    gap: '2.2rem',
    justifyContent: 'flex-end'
  },

  // Branding
  logoImg: {
    height: '38px',
    width: 'auto',
    borderRadius: '4px',
    transition: 'transform 0.3s ease'
  },
  brandTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.15
  },
  brandText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: 'var(--accent-gold)'
  },
  brandSub: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.7rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em'
  },

  // Link components
  navLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    padding: '0.5rem 0'
  },
  activeIndicator: {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold)'
  },

  // Switch button
  actionBtn: {
    background: 'none',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'var(--accent-gold-light)',
    border: '1px solid var(--border-light)',
    transition: 'all 0.3s ease'
  },

  // Mobile view components
  mobileNav: {
    position: 'fixed',
    top: '12px',
    left: '12px',
    right: '12px',
    height: '56px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.2rem',
    borderRadius: '16px',
    transition: 'all 0.3s ease'
  },
  mobileNavNormal: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(250, 248, 245, 0.18)',
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)'
  },
  mobileNavScrolled: {
    backgroundColor: 'var(--bg-glass)',
    border: '1px solid var(--border-light)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    cursor: 'pointer'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  mobileBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mobileMenu: {
    position: 'fixed',
    top: '76px',
    left: '12px',
    right: '12px',
    zIndex: 999,
    borderRadius: '20px',
    padding: '1.5rem 2rem',
    border: '1px solid var(--border-light)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
  },
  mobileNavList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    padding: '0',
    margin: '0'
  },
  mobileNavItem: {
    width: '100%',
    textAlign: 'center'
  },
  mobileNavLink: {
    display: 'block',
    fontSize: '0.9rem',
    letterSpacing: '0.15em',
    fontFamily: 'var(--font-sans)',
    cursor: 'pointer',
    padding: '0.4rem 0',
    width: '100%'
  }
};
