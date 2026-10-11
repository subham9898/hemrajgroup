import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Briefcase } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    // Simulate successful form submit
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" style={styles.section} className="dark-section">
      <div className="section-bg section-bg-contact"></div>
      <div className="container">
        {/* Section Header */}
        <div style={styles.header}>
          <p style={styles.kicker}>CONNECT</p>
          <h2 style={styles.title}>
            Get in Touch with <span style={{ color: 'var(--accent-gold)' }}>Our Hub</span>
          </h2>
          <div style={styles.divider}></div>
        </div>

        {/* Info & Form layout */}
        <div className="contact-layout" style={styles.layout}>
          
          {/* Left Column: Office Details */}
          <div style={styles.infoCol}>
            <div style={styles.infoGroup}>
              <h3 style={styles.infoTitle}>Registered Corporate Office</h3>
              
              <div style={styles.infoRow}>
                <div style={styles.iconBox}>
                  <MapPin size={18} color="var(--accent-gold)" />
                </div>
                <div style={styles.infoText}>
                  <p style={styles.infoLabel}>ADDRESS</p>
                  <p style={styles.infoVal}>46B, Rafi Ahmed Kidwai Road (1st Floor), Kolkata – 700016, West Bengal, India</p>
                </div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.iconBox}>
                  <Phone size={18} color="var(--accent-gold)" />
                </div>
                <div style={styles.infoText}>
                  <p style={styles.infoLabel}>CALL US</p>
                  <p style={styles.infoVal}>
                    <a href="tel:+913322298038" style={{ color: 'inherit', textDecoration: 'none' }}>+91 33 2229 8038</a>
                    <br />
                    <a href="tel:+913340649316" style={{ color: 'inherit', textDecoration: 'none' }}>+91 33 4064 9316</a>
                  </p>
                </div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.iconBox}>
                  <Mail size={18} color="var(--accent-gold)" />
                </div>
                <div style={styles.infoText}>
                  <p style={styles.infoLabel}>EMAIL INQUIRIES</p>
                  <p style={styles.infoVal}>
                    <a href="mailto:info@hemrajgroup.co.in" style={{ color: 'inherit', textDecoration: 'none' }}>info@hemrajgroup.co.in</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Careers callout */}
            <div style={styles.careersBox} className="glass">
              <div style={styles.careersHeader}>
                <Briefcase size={20} color="var(--accent-gold)" />
                <h4 style={styles.careersTitle}>Work with Us</h4>
              </div>
              <p style={styles.careersDesc}>
                We are constantly looking for talented millers, operations engineers, and export specialists. Direct resume submissions can be routed to:
              </p>
              <a href="mailto:career@hemrajgroup.co.in" style={styles.careerMailLink}>
                career@hemrajgroup.co.in
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={styles.formCol} className="glass">
            <h3 style={styles.formTitle}>Send an Inquiry</h3>
            <p style={styles.formSub}>Fill out the fields below and our corporate desk will get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  aria-required="true"
                />
                <label htmlFor="contact-name" className="form-label">Full Name *</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  aria-required="true"
                />
                <label htmlFor="contact-email" className="form-label">Email Address *</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  placeholder=" "
                  value={form.subject}
                  onChange={handleChange}
                  className="form-input"
                />
                <label htmlFor="contact-subject" className="form-label">Subject</label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="contact-message"
                  placeholder=" "
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ resize: 'none' }}
                  required
                  aria-required="true"
                ></textarea>
                <label htmlFor="contact-message" className="form-label">Message / Inquiry *</label>
              </div>

              <div style={styles.btnRow}>
                <button type="submit" className="btn-primary" aria-label="Submit inquiry">
                  Submit Inquiry
                  <Send size={14} />
                </button>
              </div>

              {/* Status alerts */}
              {status === 'success' && (
                <div style={styles.statusSuccess} role="status" aria-live="polite">
                  Thank you! Your message was received. Our corporate desk will contact you at {form.email || 'your email'} shortly. You can also reach us directly at <a href="mailto:info@hemrajgroup.co.in" style={{ color: '#2e7d32', fontWeight: 600 }}>info@hemrajgroup.co.in</a>.
                </div>
              )}
              {status === 'error' && (
                <div style={styles.statusError} role="alert" aria-live="assertive">
                  Please fill out all required fields marked with (*). Ensure a valid email address is provided.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--bg-secondary)',
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem'
  },
  kicker: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent-gold)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
    fontWeight: '400',
    lineHeight: 1.1,
    color: 'var(--text-primary)'
  },
  divider: {
    width: '60px',
    height: '2px',
    backgroundColor: 'var(--accent-gold)',
    margin: '1.5rem auto 0'
  },
  infoCol: {
    flex: '1 1 45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '2.5rem'
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.8rem'
  },
  infoTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.6rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem'
  },
  infoRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-gold-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  infoLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--accent-gold)'
  },
  infoVal: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    color: 'var(--text-primary)'
  },
  careersBox: {
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid var(--border-light)'
  },
  careersHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '0.8rem'
  },
  careersTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.25rem',
    fontWeight: '600'
  },
  careersDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: 'var(--text-secondary)',
    marginBottom: '1rem'
  },
  careerMailLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--accent-gold)',
    textDecoration: 'none'
  },
  formCol: {
    flex: '1 1 55%',
    borderRadius: '28px',
    padding: '3.5rem 3rem',
    border: '1px solid var(--border-light)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.02)'
  },
  formTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    fontWeight: '400',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem'
  },
  formSub: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    marginBottom: '2.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  btnRow: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  statusSuccess: {
    marginTop: '1.5rem',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(46, 125, 50, 0.12)',
    color: '#2e7d32',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.4
  },
  statusError: {
    marginTop: '1.5rem',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(211, 47, 47, 0.12)',
    color: '#d32f2f',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.4
  }
};
