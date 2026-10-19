import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Milestone, Award, Globe, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 900 : false);
  const containerRef = useRef(null);
  const yearsRef = useRef(null);
  const lineRef = useRef(null);
  const bgLayersRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const milestones = [
    {
      year: '1958',
      title: 'Humble Beginnings',
      desc: 'Founded as a modest paddy processing mill in West Bengal, partnering directly with local regional farmers to establish agricultural trust.',
      image: '/assets/story_bg.jpg',
      icon: <Calendar size={24} color="var(--accent-gold)" />
    },
    {
      year: '1982',
      title: 'Industrial Scaling',
      desc: 'Expanded milling capacities and established our first automated processing plants in Midnapore to satisfy regional rice demand.',
      image: '/assets/process_bg.jpg',
      icon: <Milestone size={24} color="var(--accent-gold)" />
    },
    {
      year: '2004',
      title: 'Edible Oil Pioneer',
      desc: 'Pioneered physical refining of Rice Bran Oil in Eastern India, retaining healthy Oryzanol without chemical additives.',
      image: '/assets/refined_oil.jpg',
      icon: <Award size={24} color="var(--accent-gold)" />
    },
    {
      year: '2012',
      title: 'Global Export Leader',
      desc: 'Began exporting De-oiled Rice Bran (DORB) globally, gaining over 35% Indian export share for animal feed inputs.',
      image: '/assets/process_bg.jpg',
      icon: <Globe size={24} color="var(--accent-gold)" />
    },
    {
      year: '2016 - 2026',
      title: 'Modern Technological Legacy',
      desc: 'Integrating automated Satake machinery, sustainable solar power arrays, and expanding our iconic retail puffed rice brands.',
      image: '/assets/contact_bg.jpg',
      icon: <Shield size={24} color="var(--accent-gold)" />
    }
  ];

  const jumpToMilestone = (idx) => {
    setActiveStep(idx);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nodeProgress = idx / Math.max(1, milestones.length - 1);
      const scrollAmount = window.scrollY + rect.top + nodeProgress * (rect.height - window.innerHeight);
      window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    // Track scroll triggers for active steps and progress calculation
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const clampedProgress = Math.max(0, Math.min(0.99, progress));
        setScrollProgress(clampedProgress);

        const stepIndex = Math.floor(clampedProgress * milestones.length);
        setActiveStep(stepIndex);
      }
    });

    // Native scrub tween for the golden timeline track line
    const tween = gsap.to(lineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });

    // Zoom current active background image slightly
    bgLayersRef.current.forEach((layer, idx) => {
      if (layer) {
        gsap.killTweensOf(layer);
        if (activeStep === idx) {
          gsap.to(layer, {
            scale: 1.15,
            duration: 2.5,
            ease: 'power2.out'
          });
        } else {
          gsap.to(layer, {
            scale: 1.05,
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      }
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [activeStep, milestones.length]);

  return (
    <div
      ref={containerRef}
      style={{
        ...styles.scrollContainer,
        height: isMobile ? '220vh' : '250vh'
      }}
      id="story"
      className="light-section"
    >
      {/* Sticky Window Layer */}
      <div style={styles.stickyWindow} className="sticky-window-timeline">
        
        {/* Fullscreen Background Images with Cross-Fade & GSAP Zoom */}
        {milestones.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (bgLayersRef.current[idx] = el)}
            style={{
              ...styles.bgLayer,
              backgroundImage: `url(${item.image})`,
              opacity: activeStep === idx ? 1 : 0,
              zIndex: activeStep === idx ? 1 : 0
            }}
          />
        ))}

        {/* Ambient Overlays (Scrim + Gold Royale Lighting) */}
        <div style={styles.scrim}></div>
        <div style={{
          ...styles.royaleGlow,
          background: `radial-gradient(circle at 35% 50%, ${
            activeStep === 0 ? 'rgba(197, 160, 89, 0.12)' :
            activeStep === 1 ? 'rgba(170, 130, 80, 0.12)' :
            activeStep === 2 ? 'rgba(80, 170, 120, 0.12)' :
            activeStep === 3 ? 'rgba(80, 120, 170, 0.12)' :
            'rgba(210, 180, 100, 0.15)'
          } 0%, rgba(15, 9, 5, 0) 65%)`
        }}></div>

        {/* Story Content Console Overlay */}
        <div style={styles.contentOverlay} className="timeline-content-overlay">
          <div className="container scrolly-container-royale" style={styles.flexContainer}>
            
            {/* Left Section: Slot Machine Year Selector */}
            <div style={styles.yearSlotWrapper} className="year-slot-wrapper-royale">
              <div style={styles.yearSlotClip}>
                <div
                  ref={yearsRef}
                  style={{
                    ...styles.yearsContainer,
                    transform: `translate3d(0, ${(1 - activeStep) * 80}px, 0)`
                  }}
                >
                  {milestones.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.yearItem,
                        color: activeStep === idx ? 'var(--accent-gold)' : 'rgba(250, 248, 245, 0.22)',
                        transform: activeStep === idx ? 'scale(1.2)' : 'scale(0.85)',
                        filter: activeStep === idx ? 'blur(0px)' : 'blur(1.5px)'
                      }}
                    >
                      {item.year.split(' ')[0]} {/* Grab first word of year */}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Section: Vertical Glowing Progress Track */}
            <div style={styles.trackWrapper} className="track-wrapper-royale">
              <div style={styles.trackLineBg}>
                <div
                  ref={lineRef}
                  style={styles.trackLineFill}
                />
              </div>
              
              {/* Nodes at fixed heights along the track */}
              {milestones.map((item, idx) => {
                const nodeProgress = idx / Math.max(1, milestones.length - 1);
                const isPassed = scrollProgress >= nodeProgress;
                const isActive = activeStep === idx;
                const scrollToMilestone = () => {
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const scrollAmount = window.scrollY + rect.top + nodeProgress * (rect.height - window.innerHeight);
                    window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
                  }
                };
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={scrollToMilestone}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToMilestone();
                      }
                    }}
                    aria-label={`Jump to ${item.year}: ${item.title}`}
                    aria-current={isActive ? 'step' : undefined}
                    style={{
                      ...styles.node,
                      top: `${nodeProgress * 100}%`,
                      backgroundColor: isPassed ? 'var(--accent-gold)' : 'rgba(250, 248, 245, 0.12)',
                      boxShadow: isActive 
                        ? '0 0 25px var(--accent-gold), 0 0 10px var(--accent-gold)' 
                        : isPassed 
                          ? '0 0 10px rgba(197, 160, 89, 0.3)' 
                          : 'none',
                      transform: isActive ? 'translate3d(-50%, -50%, 0) scale(1.4)' : 'translate3d(-50%, -50%, 0) scale(1)',
                      border: 'none',
                      padding: 0
                    }}
                  >
                    {isActive && <div style={styles.ripplePulse} className="node-ripple" />}
                  </button>
                );
              })}
            </div>

            {/* Right Section: Content Glass Card */}
            <div style={styles.rightContentWrapper} className="right-content-wrapper-royale">
              <div style={styles.floatingCard} className="glass scrolly-card royale-card">
                <span style={styles.kicker}>THE HERITAGE LEGACY</span>

                {/* Mobile Year Pill Strip */}
                <div className="mobile-milestone-strip">
                  {milestones.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => jumpToMilestone(idx)}
                      className={`mobile-year-pill ${activeStep === idx ? 'active' : ''}`}
                      aria-label={`Jump to ${item.year}`}
                    >
                      {item.year.split(' ')[0]}
                    </button>
                  ))}
                </div>
                
                {/* Animated Inner Content based on activeStep */}
                <div key={activeStep} className="scrolly-card-inner">
                  <div style={styles.cardHeader}>
                    <div style={styles.iconCircle}>
                      {milestones[activeStep].icon}
                    </div>
                    <h3 style={styles.slideYear}>{milestones[activeStep].year}</h3>
                  </div>
                  
                  <h4 style={styles.slideTitle}>{milestones[activeStep].title}</h4>
                  <p style={styles.slideDesc}>{milestones[activeStep].desc}</p>
                </div>

                {/* Micro Progress Dots */}
                <div style={styles.progressContainer}>
                  {milestones.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => jumpToMilestone(idx)}
                      aria-label={`Switch to ${item.year}: ${item.title}`}
                      style={{
                        ...styles.dot,
                        backgroundColor: activeStep === idx ? 'var(--accent-gold)' : 'rgba(250, 248, 245, 0.25)',
                        transform: activeStep === idx ? 'scale(1.4)' : 'scale(1)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  scrollContainer: {
    height: '250vh', // Spacious scrollytelling depth
    position: 'relative',
    backgroundColor: '#0A0604' // Dark obsidian brown
  },
  stickyWindow: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    width: '100%',
    overflow: 'hidden'
  },
  bgLayer: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
    pointerEvents: 'none',
    transform: 'scale(1.05)',
    willChange: 'transform, opacity'
  },
  scrim: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(10, 6, 4, 0.95) 0%, rgba(10, 6, 4, 0.6) 50%, rgba(10, 6, 4, 0.9) 100%)',
    zIndex: 1
  },
  royaleGlow: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    transition: 'background 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
    pointerEvents: 'none'
  },
  contentOverlay: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '3rem'
  },
  yearSlotWrapper: {
    flex: '0 0 160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  yearSlotClip: {
    height: '240px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  yearsContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    willChange: 'transform'
  },
  yearItem: {
    height: '80px',
    fontSize: '2.6rem',
    fontWeight: '700',
    fontFamily: 'var(--font-serif)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s ease',
    letterSpacing: '0.04em'
  },
  trackWrapper: {
    flex: '0 0 40px',
    height: '350px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  trackLineBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: 'rgba(250, 248, 245, 0.12)'
  },
  trackLineFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--accent-gold)',
    transformOrigin: 'top',
    transform: 'scaleY(0)',
    willChange: 'transform'
  },
  node: {
    position: 'absolute',
    left: '50%',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 3,
    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
    willChange: 'transform, background-color, box-shadow'
  },
  ripplePulse: {
    position: 'absolute',
    inset: '-6px',
    borderRadius: '50%',
    border: '2px solid var(--accent-gold)',
    pointerEvents: 'none'
  },
  rightContentWrapper: {
    flex: '1 1 auto',
    maxWidth: '520px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  floatingCard: {
    width: '100%',
    borderRadius: '32px',
    padding: '3.5rem 3rem',
    backgroundColor: 'rgba(18, 11, 6, 0.78)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(197, 160, 89, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(250, 248, 245, 0.1)'
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--accent-gold)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    marginBottom: '1rem'
  },
  iconCircle: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: 'rgba(197, 160, 89, 0.12)',
    border: '1px solid rgba(197, 160, 89, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  slideYear: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    lineHeight: 1
  },
  slideTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    fontWeight: '400',
    color: '#FAF8F5',
    marginBottom: '0.8rem',
    lineHeight: 1.2
  },
  slideDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'rgba(250, 248, 245, 0.75)'
  },
  progressContainer: {
    display: 'flex',
    gap: '0.8rem',
    marginTop: '1rem'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'all 0.3s ease'
  }
};
