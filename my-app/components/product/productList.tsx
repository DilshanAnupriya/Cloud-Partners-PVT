"use client"
import React, { useState } from 'react'
import { CheckCircle, ArrowRight, Users, Headphones, Cloud, Database, Mail, FileText, DollarSign, UserCheck, BarChart3, MessageSquare, Phone, Globe, Briefcase, Settings, Lock } from 'lucide-react'
import Link from "next/link";

export function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredService, setHoveredService] = useState(null)

  const zohoServices = [
    {
      name: "Zoho CRM",
      description: "Complete customer relationship management solution to streamline sales processes",
      icon: "/product/Logos/zoho-logo2.webp",
      iconType: "image",
      category: "sales",
      features: ["Lead Management", "Sales Pipeline", "Customer Analytics", "Mobile CRM"]
    },
    {
      name: "Zoho Books",
      description: "Comprehensive accounting software for small to medium businesses",
      icon: "/product/Logos/BooksLogo.png",
      iconType: "component",
      category: "finance",
      features: ["Invoice Management", "Expense Tracking", "Tax Compliance", "Financial Reports"]
    },
    {
      name: "Zoho Mail",
      description: "Professional email hosting with advanced security and collaboration tools",
      icon: "/product/Logos/MailLogo.png",
      iconType: "component",
      category: "communication",
      features: ["Custom Domain Email", "Calendar Integration", "Document Sharing", "Mobile Access"]
    },
    {
      name: "Zoho Desk",
      description: "Multi-channel customer support platform for exceptional service delivery",
      icon: "/product/Logos/deskLogo.png",
      iconType: "component",
      category: "support",
      features: ["Ticket Management", "Knowledge Base", "Live Chat", "Performance Analytics"]
    },
    {
      name: "Zoho Analytics",
      description: "Business intelligence and data analytics platform for informed decision making",
      icon: "/product/Logos/zoho-Analytics2.png",
      iconType: "component",
      category: "analytics",
      features: ["Data Visualization", "Custom Reports", "AI-Powered Insights", "Real-time Dashboards"]
    },
    {
      name: "Zoho Campaigns",
      description: "Email marketing automation platform for engaging customer communications",
      icon: "/product/Logos/campain.png",
      iconType: "component",
      category: "marketing",
      features: ["Email Templates", "Automation Workflows", "A/B Testing", "Campaign Analytics"]
    },
    {
      name: "Zoho One",
      description: "Complete suite of integrated business applications for unified operations",
      icon: "/product/Logos/one2.png",
      iconType: "component",
      category: "suite",
      features: ["45+ Applications", "Single Sign-On", "Unified Interface", "Data Integration"]
    },
    {
      name: "Zoho Inventory",
      description: "Multi-channel inventory management system for seamless operations",
      icon: "/product/Logos/inventoryLogo.png",
      iconType: "component",
      category: "operations",
      features: ["Stock Management", "Order Fulfillment", "Warehouse Management", "Multi-location Support"]
    },
    {
      name: "Zoho People",
      description: "Human resource management system for modern workforce management",
      icon: "/product/Logos/people.png",
      iconType: "component",
      category: "hr",
      features: ["Employee Records", "Attendance Tracking", "Performance Management", "Self-Service Portal"]
    },
    {
      name: "Zoho Invoice",
      description: "Professional invoicing solution for freelancers and small businesses",
      icon: "/product/Logos/invoice.webp",
      iconType: "component",
      category: "finance",
      features: ["Custom Templates", "Payment Tracking", "Expense Management", "Time Tracking"]
    },
    {
      name: "Zoho Projects",
      description: "Comprehensive project management platform for team collaboration",
      icon: "/product/Logos/project2.png",
      iconType: "component",
      category: "operations",
      features: ["Task Management", "Team Collaboration", "Time Tracking", "Project Analytics"]
    },
    {
      name: "Zoho Creator",
      description: "Low-code application development platform for custom business solutions",
      icon: "/product/Logos/creator.png",
      iconType: "component",
      category: "development",
      features: ["Drag-Drop Builder", "Custom Workflows", "Database Integration", "Mobile Apps"]
    },
    {
      name: "Google Workspace",
      description: "Low-code application development platform for custom business solutions",
      icon: "/product/Logos/googleworkspace.png",
      iconType: "component",
      category: "google",
      features: ["Drag-Drop Builder", "Custom Workflows", "Database Integration", "Mobile Apps"]
    },
    {
      name: "Google Mail",
      description: "Low-code application development platform for custom business solutions",
      icon: "/product/Logos/mail.png",
      iconType: "component",
      category: "google",
      features: ["Drag-Drop Builder", "Custom Workflows", "Database Integration", "Mobile Apps"]
    }
  ]

  const categories = [
    {id: 'all', name: 'All Services', count: zohoServices.length},
    {id: 'sales', name: 'Sales & CRM', count: zohoServices.filter(s => s.category === 'sales').length},
    {id: 'finance', name: 'Finance', count: zohoServices.filter(s => s.category === 'finance').length},
    {
      id: 'communication',
      name: 'Communication',
      count: zohoServices.filter(s => s.category === 'communication').length
    },
    {id: 'marketing', name: 'Marketing', count: zohoServices.filter(s => s.category === 'marketing').length},
    {id: 'operations', name: 'Operations', count: zohoServices.filter(s => s.category === 'operations').length},
    {id: 'hr', name: 'Human Resources', count: zohoServices.filter(s => s.category === 'hr').length},
    {id: 'google', name: 'Google Products', count: zohoServices.filter(s => s.category === 'google').length}
  ]

  const filteredServices = activeCategory === 'all'
      ? zohoServices
      : zohoServices.filter(service => service.category === activeCategory)



  return (
      <div className="min-h-screen bg-gray-200 text-gray-900">
        {/* Hero Section */}

        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-20">
          <div className="text-center mb-26">
            <h2 className="text-6xl font-bold mb-4 text-gray-900">Our Zoho Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive support across the entire Zoho ecosystem to power your business growth
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                        activeCategory === category.id
                            ? 'bg-blue-600 text-white shadow-lg scale-105 border-blue-600'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-200 hover:border-blue-300'
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
                    className={`bg-white rounded-xl p-6 transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 group shadow-md hover:shadow-xl ${
                        hoveredService === index ? 'shadow-2xl shadow-blue-100 border-blue-300' : 'border-gray-100'
                    }`}
                >
                  <div className="flex items-center mb-4 ">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <img
                      alt={service.name}
                      src={service.icon}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 ml-5 ">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"/>
                          {feature}
                        </div>
                    ))}
                  </div>
                  <button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"/>
                  </button>
                </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-[#0B1423] rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our Zoho expertise can streamline your operations and accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Phone className="w-5 h-5 inline mr-2"/>
                Contact Us Now
              </button>
              </Link>
              <Link href="/about">
              <button
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                <Globe className="w-5 h-5 inline mr-2"/>
                About Us
              </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
  )
}