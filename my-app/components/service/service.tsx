"use client"
import React, { useState } from 'react'
import { ChevronRight, CheckCircle, ArrowRight, Users, Zap, Shield, Headphones, Cloud, Database, Mail, Calendar, FileText, DollarSign, UserCheck, BarChart3, MessageSquare, Phone, Globe, ShoppingCart, Briefcase, Settings, Lock } from 'lucide-react'

export default function Service() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredService, setHoveredService] = useState(null)

  const zohoServices = [
    {
      name: "Zoho CRM",
      description: "Complete customer relationship management solution to streamline sales processes",
      icon: <Users className="w-8 h-8" />,
      category: "sales",
      features: ["Lead Management", "Sales Pipeline", "Customer Analytics", "Mobile CRM"]
    },
    {
      name: "Zoho Books",
      description: "Comprehensive accounting software for small to medium businesses",
      icon: <FileText className="w-8 h-8" />,
      category: "finance",
      features: ["Invoice Management", "Expense Tracking", "Tax Compliance", "Financial Reports"]
    },
    {
      name: "Zoho Mail",
      description: "Professional email hosting with advanced security and collaboration tools",
      icon: <Mail className="w-8 h-8" />,
      category: "communication",
      features: ["Custom Domain Email", "Calendar Integration", "Document Sharing", "Mobile Access"]
    },
    {
      name: "Zoho Desk",
      description: "Multi-channel customer support platform for exceptional service delivery",
      icon: <Headphones className="w-8 h-8" />,
      category: "support",
      features: ["Ticket Management", "Knowledge Base", "Live Chat", "Performance Analytics"]
    },
    {
      name: "Zoho Analytics",
      description: "Business intelligence and data analytics platform for informed decision making",
      icon: <BarChart3 className="w-8 h-8" />,
      category: "analytics",
      features: ["Data Visualization", "Custom Reports", "AI-Powered Insights", "Real-time Dashboards"]
    },
    {
      name: "Zoho Campaigns",
      description: "Email marketing automation platform for engaging customer communications",
      icon: <MessageSquare className="w-8 h-8" />,
      category: "marketing",
      features: ["Email Templates", "Automation Workflows", "A/B Testing", "Campaign Analytics"]
    },
    {
      name: "Zoho One",
      description: "Complete suite of integrated business applications for unified operations",
      icon: <Cloud className="w-8 h-8" />,
      category: "suite",
      features: ["45+ Applications", "Single Sign-On", "Unified Interface", "Data Integration"]
    },
    {
      name: "Zoho Inventory",
      description: "Multi-channel inventory management system for seamless operations",
      icon: <Database className="w-8 h-8" />,
      category: "operations",
      features: ["Stock Management", "Order Fulfillment", "Warehouse Management", "Multi-location Support"]
    },
    {
      name: "Zoho People",
      description: "Human resource management system for modern workforce management",
      icon: <UserCheck className="w-8 h-8" />,
      category: "hr",
      features: ["Employee Records", "Attendance Tracking", "Performance Management", "Self-Service Portal"]
    },
    {
      name: "Zoho Invoice",
      description: "Professional invoicing solution for freelancers and small businesses",
      icon: <DollarSign className="w-8 h-8" />,
      category: "finance",
      features: ["Custom Templates", "Payment Tracking", "Expense Management", "Time Tracking"]
    },
    {
      name: "Zoho Projects",
      description: "Comprehensive project management platform for team collaboration",
      icon: <Briefcase className="w-8 h-8" />,
      category: "operations",
      features: ["Task Management", "Team Collaboration", "Time Tracking", "Project Analytics"]
    },
    {
      name: "Zoho Creator",
      description: "Low-code application development platform for custom business solutions",
      icon: <Settings className="w-8 h-8" />,
      category: "development",
      features: ["Drag-Drop Builder", "Custom Workflows", "Database Integration", "Mobile Apps"]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', count: zohoServices.length },
    { id: 'sales', name: 'Sales & CRM', count: zohoServices.filter(s => s.category === 'sales').length },
    { id: 'finance', name: 'Finance', count: zohoServices.filter(s => s.category === 'finance').length },
    { id: 'communication', name: 'Communication', count: zohoServices.filter(s => s.category === 'communication').length },
    { id: 'marketing', name: 'Marketing', count: zohoServices.filter(s => s.category === 'marketing').length },
    { id: 'operations', name: 'Operations', count: zohoServices.filter(s => s.category === 'operations').length },
    { id: 'hr', name: 'Human Resources', count: zohoServices.filter(s => s.category === 'hr').length }
  ]

  const filteredServices = activeCategory === 'all' 
    ? zohoServices 
    : zohoServices.filter(service => service.category === activeCategory)

  const whyChooseUs = [
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: "Certified Expertise",
      description: "Our team consists of certified Zoho consultants with years of experience"
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-400" />,
      title: "Rapid Implementation",
      description: "Quick deployment and setup to get your business running efficiently"
    },
    {
      icon: <Headphones className="w-12 h-12 text-blue-400" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance services"
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-400" />,
      title: "Data Security",
      description: "Enterprise-grade security measures to protect your business data"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-8">
              <Cloud className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium">Complete Zoho Platform Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              CloudPartners Services
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with comprehensive Zoho platform support. We provide end-to-end solutions 
              for implementation, customization, and ongoing support across all Zoho applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Today
              </button>
              <button className="border border-gray-600 hover:border-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-500/10">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Zoho Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive support across the entire Zoho ecosystem to power your business growth
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.name}
              //onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500/50 group ${
                hoveredService === index ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg mr-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                  {React.cloneElement(service.icon, { 
                    className: "w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" 
                  })}
                </div>
                <h3 className="text-xl font-bold">{service.name}</h3>
              </div>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CloudPartners?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We bring expertise, reliability, and innovation to every Zoho implementation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="p-6 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our Zoho expertise can streamline your operations and accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Phone className="w-5 h-5 inline mr-2" />
              Contact Us Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              <Globe className="w-5 h-5 inline mr-2" />
              View Our Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CloudPartners Pvt Ltd
            </h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for complete Zoho platform solutions
            </p>
            <div className="flex justify-center space-x-6">
              <span className="text-gray-500">© 2025 CloudPartners Pvt Ltd. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}