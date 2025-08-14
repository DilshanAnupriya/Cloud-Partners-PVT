"use client";
import React, { useState, useEffect } from 'react';

function ContactUs() {
  const [zohoLoaded, setZohoLoaded] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Zoho configuration
  const ZOHO_CONFIG = {
    formId: '5680325000008110003',
    scriptUrl: 'https://crm.zoho.com/crm/WebFormServeServlet?rid=ca258f25f75cdbb2f8f8b346a80de9dd3b70e5dddd7d2cef051f449319b11d04b8fbd5740e39c8b17da7ef042ec71f67gid29614bf53216cad2a779d0633e3deb59bb5eeab20a30ad02e59753ad834b6206&script=$sYG',
  };

  // Load Zoho script
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

  // Handle screen size for responsive design
  const getScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  useEffect(() => {
    setScreenSize(getScreenSize());
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#1e1b4b] pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          {/* Left Side - Information */}
          <div className="text-white flex-1 min-w-0 lg:min-w-[500px] max-w-full lg:max-w-[600px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Let's Transform Your Business
            </h1>
            <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
              As certified Zoho and Google partners, we streamline operations with tailored business solutions.
            </p>

            <div className="mb-10">
              <h3 className="text-xl md:text-2xl mb-5">Our Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {['Zoho Partner', 'Google Partner', 'Business Automation', 'CRM Solutions', 'Integration Expert'].map((tag, index) => (
                    <span
                        key={index}
                        className="bg-white/15 px-3 py-1.5 rounded-full text-sm md:text-base backdrop-blur-md border border-white/10"
                    >
                  {tag}
                </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl md:text-2xl mb-5">Why Choose Us?</h3>
              <ul className="list-none p-0">
                {[
                  'Certified Zoho and Google experts',
                  'Custom solutions for your industry',
                  'Proven success with enterprise clients',
                  '24/7 dedicated support',
                ].map((item, index) => (
                    <li key={index} className="mb-3 flex items-start text-sm md:text-base">
                      <span className="mr-3 text-emerald-500 text-xl mt-1">✓</span>
                      {item}
                    </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-5 flex-wrap">
              <div className="bg-white/10 px-5 py-3 rounded-lg text-sm font-semibold backdrop-blur-md border border-white/20">
                Zoho Partner
              </div>
              <div className="bg-white/10 px-5 py-3 rounded-lg text-sm font-semibold backdrop-blur-md border border-white/20">
                Google Partner
              </div>
            </div>
          </div>

          {/* Right Side - Zoho Web Form */}
          <div className="bg-white/95 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-2xl border border-white/20 flex-1 min-w-0 lg:min-w-[450px] max-w-full lg:max-w-[550px] lg:self-start">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Free Consultation</h2>
            <p className="text-gray-500 mb-8 text-base md:text-lg">
              Connect with our certified specialists today
            </p>

            {/* Zoho Form Container */}
            <div id="zohoFormContainer">
              {zohoLoaded ? (
                  <div id="crmWebToEntityForm" className="w-full">
                    {/* Zoho form will be injected here by the script */}
                    <style jsx>{`
                      #crmWebToEntityForm input[type="text"],
                      #crmWebToEntityForm input[type="email"],
                      #crmWebToEntityForm input[type="tel"],
                      #crmWebToEntityForm select,
                      #crmWebToEntityForm textarea {
                        width: 100%;
                        padding: 14px;
                        border: 2px solid #e5e7eb;
                        border-radius: 10px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                        background-color: #f9fafb;
                      }
                      #crmWebToEntityForm input:focus,
                      #crmWebToEntityForm select:focus,
                      #crmWebToEntityForm textarea:focus {
                        border-color: #3b82f6;
                        background-color: #fff;
                        outline: none;
                      }
                      #crmWebToEntityForm textarea {
                        resize: vertical;
                        min-height: 120px;
                        font-family: inherit;
                      }
                      #crmWebToEntityForm input[type="submit"] {
                        width: 100%;
                        background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
                        color: white;
                        padding: 16px 32px;
                        border: none;
                        border-radius: 10px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(30, 64, 175, 0.4);
                      }
                      #crmWebToEntityForm input[type="submit"]:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(30, 64, 175, 0.6);
                      }
                      #crmWebToEntityForm input[type="submit"]:disabled {
                        background: #9ca3af;
                        cursor: not-allowed;
                        transform: none;
                        box-shadow: none;
                      }
                      #crmWebToEntityForm label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #374151;
                        font-size: 0.9rem;
                      }
                      #crmWebToEntityForm .form-row {
                        margin-bottom: 20px;
                      }
                      @media (min-width: 768px) {
                        #crmWebToEntityForm .form-row {
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          gap: 20px;
                        }
                        #crmWebToEntityForm .full-width {
                          grid-column: span 2;
                        }
                      }
                    `}</style>
                  </div>
              ) : (
                  <div className="text-center text-yellow-600 text-sm">
                    ⏳ Loading Zoho Form...
                  </div>
              )}
            </div>

            <p className="text-center text-gray-500 mt-4 text-sm">
              We respond within 2 hours during business hours
              <br />
              <span className={`text-xs italic ${zohoLoaded ? 'text-emerald-500' : 'text-yellow-500'}`}>
              Zoho Integration: {zohoLoaded ? '✓ Connected' : '⏳ Loading...'}
            </span>
            </p>
          </div>
        </div>
      </div>
  );
}

export default ContactUs;