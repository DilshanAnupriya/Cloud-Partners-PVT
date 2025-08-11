"use client";
import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

// Extend window type for Zoho
declare global {
  interface Window {
    ZOHO?: {
      CRM?: {
        WebForm?: {
          submit: (formId: string, data: Record<string, string>) => Promise<any>;
        };
      };
    };
  }
}

function ContactUs() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [zohoLoaded, setZohoLoaded] = useState<boolean>(false);

  // Zoho configuration extracted from your script
  const ZOHO_CONFIG = {
    formId: '5680325000008110003',
    scriptUrl: 'https://crm.zoho.com/crm/WebFormServeServlet?rid=ca258f25f75cdbb2f8f8b346a80de9dd3b70e5dddd7d2cef051f449319b11d04b8fbd5740e39c8b17da7ef042ec71f67gid29614bf53216cad2a779d0633e3deb59bb5eeab20a30ad02e59753ad834b6206&script=$sYG',
    actionUrl: 'https://crm.zoho.com/crm/WebToLeadForm'
  };

  // Load Zoho script safely
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadZohoScript = () => {
      const existingScript = document.getElementById('formScript5680325000008110003');
      if (existingScript) {
        setZohoLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'formScript5680325000008110003';
      script.src = ZOHO_CONFIG.scriptUrl;
      script.async = true;
      
      script.onload = () => {
        setZohoLoaded(true);
        console.log('Zoho script loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load Zoho script');
        setZohoLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadZohoScript();
    
    return () => {
      const script = document.getElementById('formScript5680325000008110003');
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Method 1: Try using Zoho's embedded form API if available
      if (window.ZOHO?.CRM?.WebForm) {
        const formData = {
          'Last Name': form.name,
          'Email': form.email,
          'Company': form.company || '',
          'Mobile': form.phone || '',
          'Description': `Service Needed: ${form.service || 'Not specified'}\n\nProject Details:\n${form.message}`,
          'Lead Status': 'Attempted to Contact'
        };
        
        await window.ZOHO.CRM.WebForm.submit(ZOHO_CONFIG.formId, formData);
        setSubmitStatus('success');
      } 
      // Method 2: Fallback to direct form submission
      else {
        const iframe = document.createElement('iframe');
        iframe.name = 'zoho-submit-frame';
        iframe.style.display = 'none';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        document.body.appendChild(iframe);
        
        const hiddenForm = document.createElement('form');
        hiddenForm.action = ZOHO_CONFIG.actionUrl;
        hiddenForm.method = 'POST';
        hiddenForm.target = 'zoho-submit-frame';
        hiddenForm.style.display = 'none';
        
        const formFields = {
          'xnQsjsdp': 'ca258f25f75cdbb2f8f8b346a80de9dd3b70e5dddd7d2cef051f449319b11d04b8fbd5740e39c8b17da7ef042ec71f67',
          'zc_gad': '',
          'xmIwtLD': '29614bf53216cad2a779d0633e3deb59bb5eeab20a30ad02e59753ad834b6206',
          'actionType': 'TGVhZHM=',
          'returnURL': 'https://cloudpartners.biz',
          'Last Name': form.name,
          'Email': form.email,
          'Company': form.company || '',
          'Mobile': form.phone || '',
          'Description': `Service Needed: ${form.service || 'Not specified'}\n\nProject Details:\n${form.message}`,
          'Lead Status': 'Attempted to Contact'
        };
        
        Object.entries(formFields).forEach(([name, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          hiddenForm.appendChild(input);
        });
        
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
        
        setTimeout(() => {
          if (document.body.contains(hiddenForm)) {
            document.body.removeChild(hiddenForm);
          }
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 3000);
        
        setSubmitStatus('success');
      }
      
      setForm({ name: '', email: '', company: '', phone: '', service: '', message: '' });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.name.trim() !== '' && form.email.trim() !== '' && form.message.trim() !== '';

  const services = [
    'Zoho Implementation & Consulting',
    'Google Workspace Setup & Migration',
    'Business Process Automation',
    'CRM Optimization',
    'Custom Integration Solutions',
    'Training & Support',
    'Other'
  ];

  const getScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';

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
        flexDirection: isDesktop ? 'row' : 'column',
        gap: isDesktop ? '80px' : '40px',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Side - Information */}
        <div style={{ 
          color: 'white',
          flex: '1',
          minWidth: isDesktop ? '500px' : '100%',
          maxWidth: isDesktop ? '600px' : '100%'
        }}>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3.2rem', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Let's Transform Your Business Together
          </h1>
          
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.2rem', 
            marginBottom: '32px', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            As certified Zoho and Google partners, we help industry experts streamline their operations with cutting-edge business solutions.
          </p>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
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
                  padding: isMobile ? '6px 12px' : '8px 16px',
                  borderRadius: '25px',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
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
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
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
                  fontSize: isMobile ? '0.95rem' : '1.1rem'
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
          padding: isMobile ? '30px 20px' : '40px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          flex: '1',
          minWidth: isDesktop ? '450px' : '100%',
          maxWidth: isDesktop ? '550px' : '100%',
          alignSelf: isDesktop ? 'flex-start' : 'stretch'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.5rem' : '2rem', 
            marginBottom: '8px',
            color: '#1f2937',
            fontWeight: 'bold'
          }}>
            Get Expert Consultation
          </h2>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '32px',
            fontSize: isMobile ? '1rem' : '1.1rem'
          }}>
            Schedule a free consultation with our certified specialists
          </p>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div style={{
              background: '#d1fae5',
              border: '1px solid #10b981',
              color: '#065f46',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              ✓ Thank you! Your message has been sent to Zoho CRM successfully. We'll contact you within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              background: '#fecaca',
              border: '1px solid #ef4444',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              ✗ There was an error sending your message. Please try again.
            </div>
          )}

          <div onSubmit={handleSubmit}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
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
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
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
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
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
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
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
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
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
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = '#fff';
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
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
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = '#fff';
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
            </div>

            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              style={{
                width: '100%',
                background: (isSubmitting || !isFormValid) ? '#9ca3af' : 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
                color: 'white',
                padding: '16px 32px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: (isSubmitting || !isFormValid) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)'
              }}
              onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isSubmitting && isFormValid) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 64, 175, 0.6)';
                }
              }}
              onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 64, 175, 0.4)';
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
              <br />
              <span style={{ 
                fontSize: '0.8rem', 
                fontStyle: 'italic',
                color: zohoLoaded ? '#10b981' : '#f59e0b'
              }}>
                Zoho Integration: {zohoLoaded ? '✓ Connected' : '⏳ Loading...'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;