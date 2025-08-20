"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, RotateCcw, CheckCircle, Users, Code, Settings, ArrowRight } from 'lucide-react';

// Define interfaces for type safety
interface FormData {
  fullName: string;
  company: string;
  email: string;
  mobile: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    mobile: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) return true;
    const atPos = email.indexOf('@');
    const dotPos = email.lastIndexOf('.');
    return atPos >= 1 && dotPos >= atPos + 2 && dotPos + 2 < email.length;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      // Zoho form configuration
      submitData.append('xnQsjsdp', '2f77eaee447e6685c0861c282abcfc8c097b66ce6bb90d10c2a25ffacb98b827');
      submitData.append('zc_gad', '');
      submitData.append('xmIwtLD', 'dc355dee839df63f54aabe9b986d0cc93f5efb8ef4f8749c4d93726638beb8058a64f81d4206f69fc0c832c714996cab');
      submitData.append('actionType', 'TGVhZHM=');
      submitData.append('returnURL', 'https://www.cloudpartners.com/thank-you');
      submitData.append('ldeskuid', '');
      submitData.append('LDTuvid', '');
      submitData.append('aG9uZXlwb3Q', '');

      // Form fields
      submitData.append('Last Name', formData.fullName);
      submitData.append('Company', formData.company);
      submitData.append('Email', formData.email);
      submitData.append('Mobile', formData.mobile);
      submitData.append('Description', formData.description);

      const response = await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setSuccessMessage('Thank you for reaching out! Our Zoho specialists will review your inquiry and respond within 24 hours with tailored solutions.');
        setShowSuccess(true);
        setIsSubmitting(false);

        // Reset form
        setFormData({
          fullName: '',
          company: '',
          email: '',
          mobile: '',
          description: ''
        });

        // Hide success message after 8 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 8000);
      } else {
        throw new Error('Form submission failed.');
      }
    } catch {
      alert('We apologize for the inconvenience. Please try again or contact our support team directly for immediate assistance.');
      setIsSubmitting(false);
    }
  };

  const handleReset = (): void => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      mobile: '',
      description: ''
    });
    setErrors({});
  };

  return (
      <div className="min-h-screen bg-gray-200">
        {/* Success Message */}
        {showSuccess && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-green-200 rounded-xl shadow-2xl p-5 flex items-start max-w-lg animate-in slide-in-from-top-4 duration-500">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-green-900 font-semibold text-sm mb-1">Message Sent Successfully</h4>
                <p className="text-green-700 text-sm leading-relaxed">{successMessage}</p>
              </div>
            </div>
        )}

        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Contact Our Zoho Experts
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Partner with our certified Zoho development team to transform your business processes with custom solutions,
                integrations, and enterprise-grade implementations.
              </p>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Contact Header */}
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">Get Professional Support</h2>
                  <p className="text-blue-100">Connect with our Zoho development specialists</p>
                </div>

                {/* Contact Details */}
                <div className="p-8 space-y-8">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Inquiries</h3>
                      <p className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer">hello@cloudpartners.com</p>
                      <p className="text-gray-500 text-sm mt-1">For new projects and partnerships</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Direct Line</h3>
                      <p className="text-green-600 font-medium hover:text-green-700 cursor-pointer">078 866 0055</p>
                      <p className="text-gray-500 text-sm mt-1">Speak with our technical team</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1"></h3>
                      <p className="text-gray-600">400 Sri Sangaraja Mawatha</p>
                      <p className="text-gray-600">Level 04</p>
                      <p className="text-gray-600">Colombo 12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-1">Start Your Zoho Journey</h2>
                  <p className="text-blue-100">Tell us about your business requirements and let our experts craft the perfect solution.</p>
                </div>

                <div className="p-8">
                  <div className="space-y-8">
                    {/* Full Name - Required */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-3">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          maxLength={80}
                          className={`w-full px-2 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 ${
                              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                          }`}
                          placeholder="Enter your full name"
                          aria-required="true"
                      />
                      {errors.fullName && (
                          <p className="mt-3 text-sm text-red-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            {errors.fullName}
                          </p>
                      )}
                    </div>

                    {/* Company and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-800 mb-3">
                          Company / Organization
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            maxLength={200}
                            className="w-full px-2 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-300 text-gray-900 placeholder-gray-400"
                            placeholder="Your company name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
                          Business Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            maxLength={100}
                            autoComplete="off"
                            className={`w-full px-2 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 ${
                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="your.email@company.com"
                        />
                        {errors.email && (
                            <p className="mt-3 text-sm text-red-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                              {errors.email}
                            </p>
                        )}
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-semibold text-gray-800 mb-3">
                        Phone Number
                      </label>
                      <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          maxLength={30}
                          className="w-full px-2 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-300 text-gray-900 placeholder-gray-400"
                          placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Project Requirements */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-3">
                        Project Requirements & Business Needs
                      </label>
                      <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-2 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-300 resize-vertical text-gray-900 placeholder-gray-400"
                          placeholder=""
                      />
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          Be specific about your industry, company size, and technical requirements for the best consultation.
                        </p>
                        <p className="text-xs text-gray-400">
                          {formData.description.length}/2000
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-1 sm:flex-none sm:px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                      >
                        {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing Request...
                            </>
                        ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                              <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                      </button>

                      <button
                          type="button"
                          onClick={handleReset}
                          className="flex-1 sm:flex-none sm:px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Clear Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Overview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Development</h3>
              <p className="text-gray-600 leading-relaxed">Bespoke Zoho applications, workflows, and integrations tailored to your unique business processes and industry requirements.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Implementation</h3>
              <p className="text-gray-600 leading-relaxed">Full-scale Zoho ecosystem deployment with data migration, user training, and seamless integration with existing systems.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600 leading-relaxed">Dedicated technical support, system optimization, updates, and strategic consulting to maximize your Zoho investment.</p>
            </div>
          </div>

          {/* Client Trust Section */}
          <div className="mt-20 bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              From Fortune 500 companies to innovative startups, we&apos;ve helped organizations across healthcare,
              finance, manufacturing, and technology sectors optimize their operations with Zoho & Google solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">500+</div>
                <div className="text-sm text-blue-200">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300">50+</div>
                <div className="text-sm text-blue-200">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300">24/7</div>
                <div className="text-sm text-blue-200">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-300">99.9%</div>
                <div className="text-sm text-blue-200">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Contact;