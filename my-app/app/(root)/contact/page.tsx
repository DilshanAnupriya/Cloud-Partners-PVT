"use client";
import React, { useState } from 'react';

function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for reaching out! Our experts will contact you within 24 hours.');
    setForm({ name: '', email: '', company: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  const services = [
    'Zoho Implementation & Consulting',
    'Google Workspace Setup & Migration',
    'Business Process Automation',
    'CRM Optimization',
    'Custom Integration Solutions',
    'Training & Support',
    'Other'
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
      paddingTop: '100px',
      paddingBottom: '60px',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
        gap: window.innerWidth < 1024 ? '40px' : '80px',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Side - Information */}
        <div style={{ 
          color: 'white',
          flex: '1',
          minWidth: window.innerWidth < 1024 ? '100%' : '500px',
          maxWidth: window.innerWidth < 1024 ? '100%' : '600px'
        }}>
          <h1 style={{ 
            fontSize: window.innerWidth < 768 ? '2rem' : window.innerWidth < 1024 ? '2.5rem' : '3.2rem', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Let's Transform Your Business Together
          </h1>
          
          <p style={{ 
            fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem', 
            marginBottom: '32px', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            As certified Zoho and Google partners, we help industry experts streamline their operations with cutting-edge business solutions.
          </p>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem', 
              marginBottom: '20px' 
            }}>
              Our Expertise
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px' 
            }}>
              {['Zoho Partner', 'Google Partner', 'Business Automation', 'CRM Solutions', 'Integration Expert'].map((tag, index) => (
                <span key={index} style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: window.innerWidth < 768 ? '6px 12px' : '8px 16px',
                  borderRadius: '25px',
                  fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem', 
              marginBottom: '20px' 
            }}>
              Why Choose Us?
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Certified experts in Zoho and Google ecosystems',
                'Tailored solutions for industry professionals',
                'Proven track record with enterprise clients',
                '24/7 dedicated support and maintenance'
              ].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '12px', 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  fontSize: window.innerWidth < 768 ? '0.95rem' : '1.1rem'
                }}>
                  <span style={{ 
                    marginRight: '12px', 
                    color: '#10b981', 
                    fontSize: '1.2rem',
                    marginTop: '2px'
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Zoho Partner
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Google Partner
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: window.innerWidth < 768 ? '30px 20px' : '40px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          flex: '1',
          minWidth: window.innerWidth < 1024 ? '100%' : '450px',
          maxWidth: window.innerWidth < 1024 ? '100%' : '550px',
          alignSelf: window.innerWidth < 1024 ? 'stretch' : 'flex-start'
        }}>
          <h2 style={{ 
            fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem', 
            marginBottom: '8px',
            color: '#1f2937',
            fontWeight: 'bold'
          }}>
            Get Expert Consultation
          </h2>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '32px',
            fontSize: window.innerWidth < 768 ? '1rem' : '1.1rem'
          }}>
            Schedule a free consultation with our certified specialists
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
              gap: '20px', 
              marginBottom: '20px' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
              gap: '20px', 
              marginBottom: '20px' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>
                Service Needed
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  backgroundColor: '#f9fafb',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = '#fff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              >
                <option value="">Select a service...</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>
                Project Details *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your business needs and current challenges..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  minHeight: '120px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  backgroundColor: '#f9fafb'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = '#fff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
                color: 'white',
                padding: '16px 32px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(30, 64, 175, 0.6)';
                }
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(30, 64, 175, 0.4)';
              }}
            >
              {isSubmitting ? 'Sending...' : 'Schedule Free Consultation →'}
            </button>

            <p style={{ 
              fontSize: '0.9rem', 
              color: '#6b7280', 
              textAlign: 'center', 
              marginTop: '16px' 
            }}>
              We typically respond within 2 hours during business hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;