import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Products from './components/Products';
import Gallery from './components/Gallery';
// import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('hemraj-theme');
    if (saved === 'dark') {
      localStorage.setItem('hemraj-theme', 'light');
      return false;
    }
    return saved === 'dark-manual';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      localStorage.setItem('hemraj-theme', 'dark-manual');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('hemraj-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ScrollTrigger to accurately trace which section is active
  useEffect(() => {
    const sections = [
      { id: 'home', selector: '#home' },
      { id: 'story', selector: '#story' },
      { id: 'products', selector: '#products' },
      { id: 'gallery', selector: '#gallery' },
      { id: 'contact', selector: '#contact' }
    ];

    const triggers = [];

    // Safeguard for very top
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * 0.4,
        onToggle: (self) => {
          if (self.isActive) {
            setCurrentSection('home');
            const homeEl = document.getElementById('home');
            if (homeEl) {
              homeEl.classList.add('active');
              const homeRevealLines = homeEl.querySelectorAll('.reveal-line');
              homeRevealLines.forEach((line) => line.classList.add('active'));
            }
          }
        }
      })
    );

    sections.forEach(({ id, selector }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              setCurrentSection(id);
              el.classList.add('active');
              const revealLines = el.querySelectorAll('.reveal-line');
              revealLines.forEach((line) => line.classList.add('active'));
            }
          }
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Initialize Lenis Smooth Scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Update ScrollTrigger coordinates on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <a href="#home" className="skip-link">Skip to main content</a>

      {/* Main Floating Glassmorphic Nav */}
      <Navbar
        currentSection={currentSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Chapters of Storytelling */}
      <main id="main">
        <Hero active={currentSection === 'home'} />
        
        <Timeline active={currentSection === 'story'} />
        
        <Products active={currentSection === 'products'} />
        
        <Gallery active={currentSection === 'gallery'} />
        
        {/* <Dashboard active={currentSection === 'dashboard'} /> */}
        
        <Contact active={currentSection === 'contact'} />
      </main>

      {/* Premium Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div style={styles.footerLeft}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <img src="/assets/hemraj_logo.png" alt="Hemraj Group Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
              <span style={styles.footerLogo}>HEMRAJ GROUP</span>
            </div>
            <span style={styles.footerCopyright}>© {new Date().getFullYear()} Hemraj Industries Pvt. Ltd. All rights reserved.</span>
            <span style={{ ...styles.footerCopyright, fontSize: '0.75rem', opacity: 0.8 }}>CIN: U15311WB1982PTC034567 · Registered with APEDA & Solvent Extractors&apos; Association</span>
          </div>
          <div style={styles.footerRight}>
            <a href="#home" className="footer-link" style={styles.footerLink}>Home</a>
            <a href="#story" className="footer-link" style={styles.footerLink}>Our Story</a>
            <a href="#products" className="footer-link" style={styles.footerLink}>Products</a>
            <a href="#gallery" className="footer-link" style={styles.footerLink}>Gallery</a>
            <a href="#contact" className="footer-link" style={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

const styles = {
  footer: {
    backgroundColor: '#0F0905', // very dark chocolate-brown
    color: 'rgba(250, 248, 245, 0.45)',
    padding: '3rem 0',
    borderTop: '1px solid rgba(250, 248, 245, 0.05)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem'
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  footerLogo: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: '#FAF8F5'
  },
  footerCopyright: {
    letterSpacing: '0.01em'
  },
  footerRight: {
    display: 'flex',
    gap: '1.5rem'
  },
  footerLink: {
    color: 'rgba(250, 248, 245, 0.65)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }
};
