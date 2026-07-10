import React, { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [navExpanded, setNavExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer to trace which section is active
  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'story', 'products', 'gallery', 'dashboard', 'contact'];
    const observers = [];

    sections.forEach((secId) => {
      const element = document.getElementById(secId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Safeguard: if at scroll position 0, only 'home' can be active
            if (window.scrollY === 0) {
              setCurrentSection('home');
              const homeEl = document.getElementById('home');
              if (homeEl) {
                homeEl.classList.add('active');
                const homeRevealLines = homeEl.querySelectorAll('.reveal-line');
                homeRevealLines.forEach((line) => line.classList.add('active'));
              }
              return;
            }

            setCurrentSection(secId);
            
            // Add scroll-reveal trigger active class
            entry.target.classList.add('active');
            
            // Find nested reveal-line elements and trigger their line animation
            const revealLines = entry.target.querySelectorAll('.reveal-line');
            revealLines.forEach((line) => line.classList.add('active'));
          }
        },
        {
          root: null,
          rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies center window
          threshold: 0
        }
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => observer.unobserve(element));
    };
  }, [isLoading]);

  // Initialize Lenis Smooth Scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Track overall scroll progress for viewport framing border
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          {/* Editorial Viewport Frame Borders */}
          <div className="editorial-frame">
            <div className="frame-border frame-top"></div>
            <div className="frame-border frame-bottom">
              <div className="frame-progress" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <div className="frame-border frame-left"></div>
            <div className="frame-border frame-right"></div>
          </div>

          {/* Main Floating Glassmorphic Nav */}
          <Navbar
            currentSection={currentSection}
          />

          {/* Chapters of Storytelling */}
          <Hero active={currentSection === 'home'} />
          
          <Timeline active={currentSection === 'story'} />
          
          <Products active={currentSection === 'products'} />
          
          <Gallery active={currentSection === 'gallery'} />
          
          <Dashboard active={currentSection === 'dashboard'} />
          
          <Contact active={currentSection === 'contact'} />

          {/* Premium Footer */}
          <footer style={styles.footer}>
            <div className="container" style={styles.footerContainer}>
              <div style={styles.footerLeft}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <img src="/assets/hemraj_logo.png" alt="Hemraj Group Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
                  <span style={styles.footerLogo}>HEMRAJ GROUP</span>
                </div>
                <span style={styles.footerCopyright}>© {new Date().getFullYear()} Hemraj Industries Pvt. Ltd. All rights reserved.</span>
              </div>
              <div style={styles.footerRight}>
                <a href="#home" className="footer-link" style={styles.footerLink}>Home</a>
                <a href="#story" className="footer-link" style={styles.footerLink}>Our Story</a>
                <a href="#products" className="footer-link" style={styles.footerLink}>Products</a>
                <a href="#contact" className="footer-link" style={styles.footerLink}>Contact</a>
              </div>
            </div>
          </footer>
        </>
      )}
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
