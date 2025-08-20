"use client"
import React, { useState } from 'react';
import {
    User,
    Briefcase,
    ArrowLeft,
    Send,
    Check,
    ArrowRight,
    Loader2
} from 'lucide-react';

export default function  JobApplicationForm ()  {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',

        // Job Information
        position: '',
        department: '',
        salary: '',
        startDate: '',
        remote: '',

        // Experience
        experience: '',
        currentRole: '',
        currentCompany: '',
        skills: '',

        // Documents
        resume: null as File | null,
        coverLetter: null as File | null,

        // Additional
        hearAbout: '',
        motivation: '',
        availability: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalSteps = 4;



    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-20 grid-rows-10 w-full h-full gap-px">
                        {Array.from({ length: 200 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 animate-pulse"
                                style={{
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center text-white z-10 max-w-2xl mx-auto px-4">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <Check className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 animate-fade-in">Application Submitted!</h1>
                    <p className="text-xl text-slate-300 mb-8 animate-fade-in">
                        Thank you for your interest in joining our team. We&apos;ll review your application and get back to you within 5-7 business days.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-20 grid-rows-10 w-full h-full gap-px">
                    {Array.from({ length: 200 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10"
                            style={{
                                animation: `gridPulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="absolute w-px h-full bg-white/20"
                        style={{ left: `${(i * 5)}%` }}
                    />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-white/20"
                        style={{ top: `${(i * 10)}%` }}
                    />
                ))}
            </div>



            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="py-6 px-4 border-b border-slate-700/50 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center text-slate-300 hover:text-white transition-colors hover:scale-105"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Careers
                        </button>
                        <h1 className="text-2xl font-bold">Job Application</h1>
                        <div className="text-slate-400">
                            Step {currentStep} of {totalSteps}
                        </div>
                    </div>
                </header>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="relative">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                        i < currentStep
                                            ? 'bg-blue-500 text-white'
                                            : i === currentStep - 1
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                                                : 'bg-slate-700 text-slate-400'
                                    }`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="max-w-4xl mx-auto px-4 pb-12 ">
                    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-2xl">

                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                                <div className="text-center mb-8">
                                    <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                                    <p className="text-slate-400">Tell us about yourself</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="City, State, Country"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            value={formData.linkedin}
                                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio/Website</label>
                                    <input
                                        type="url"
                                        value={formData.portfolio}
                                        onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Job Information */}
                        {currentStep === 2 && (
                            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                                <div className="text-center mb-8">
                                    <Briefcase className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold mb-2">Position Details</h2>
                                    <p className="text-slate-400">Which role interests you?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Position *</label>
                                        <select
                                            value={formData.position}
                                            onChange={(e) => handleInputChange('position', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                                        >
                                            <option value="">Select availability</option>
                                            <option value="immediately">Immediately</option>
                                            <option value="2weeks">2 weeks notice</option>
                                            <option value="1month">1 month</option>
                                            <option value="2months">2 months</option>
                                            <option value="3months">3+ months</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-700">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    currentStep === 1
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-105'
                                }`}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Previous
                            </button>

                            {currentStep < totalSteps ? (
                                <button
                                    onClick={nextStep}
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                        isSubmitting
                                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Styles */}
            <style jsx>{`
                @keyframes gridPulse {
                    0%, 100% {
                        background: rgba(255, 255, 255, 0.02);
                        border-color: rgba(255, 255, 255, 0.05);
                    }
                    50% {
                        background: rgba(255, 255, 255, 0.08);
                        border-color: rgba(255, 255, 255, 0.15);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                /* Custom scrollbar for textarea */
                textarea::-webkit-scrollbar {
                    width: 8px;
                }

                textarea::-webkit-scrollbar-track {
                    background: rgba(71, 85, 105, 0.3);
                    border-radius: 4px;
                }

                textarea::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.5);
                    border-radius: 4px;
                }

                textarea::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.7);
                }

                /* Custom select arrow */
                select {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 0.75rem center;
                    background-repeat: no-repeat;
                    background-size: 1.5em 1.5em;
                    padding-right: 2.5rem;
                }

                /* Smooth transitions for focus states */
                input:focus,
                select:focus,
                textarea:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                /* File upload hover effects */
                .border-dashed:hover {
                    background: rgba(59, 130, 246, 0.05);
                }

                /* Progress bar animations */
                .progress-bar {
                    transition: width 0.3s ease-in-out;
                }

                /* Button hover effects */
                button:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                /* Success animation */
                @keyframes bounce-in {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out;
                }

                /* Loading spinner */
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                /* Responsive grid adjustments */
                @media (max-width: 768px) {
                    .grid-cols-20 {
                        grid-template-columns: repeat(10, 1fr);
                    }
                }
            `}</style>
        </div>
    );
};