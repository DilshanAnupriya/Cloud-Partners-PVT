"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Phone, Globe, Loader2, AlertCircle, X, GitCompare } from 'lucide-react'
import Link from "next/link"

export function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeVendor, setActiveVendor] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })
  const [compareMode, setCompareMode] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [comparisonData, setComparisonData] = useState(null)
  const [showComparison, setShowComparison] = useState(false)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/products'

  // Fetch products from API
  const fetchProducts = async (category = 'all', vendor = '', page = 1) => {
    setLoading(true)
    setError(null)

    try {
      let url = `${API_BASE_URL}/products?page=${page}&size=12&sortBy=createdAt&order=desc&isActive=true`

      if (category !== 'all') {
        url += `&category=${encodeURIComponent(category)}`
      }

      if (vendor) {
        url += `&vendor=${encodeURIComponent(vendor)}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()

      setProducts(data.products || [])
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        count: data.count
      })
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Compare products
  const compareProducts = async () => {
    if (selectedProducts.length < 2) {
      alert('Please select at least 2 products to compare')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: selectedProducts })
      })

      if (!response.ok) {
        throw new Error('Failed to compare products')
      }

      const data = await response.json()
      setComparisonData(data.products)
      setShowComparison(true)
    } catch (err) {
      alert(err.message)
      console.error('Error comparing products:', err)
    }
  }

  // Toggle product selection for comparison
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        if (prev.length >= 5) {
          alert('Maximum 5 products can be compared')
          return prev
        }
        return [...prev, productId]
      }
    })
  }

  // Initial load
  useEffect(() => {
    fetchProducts(activeCategory, activeVendor, 1)
  }, [activeCategory, activeVendor])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Sales & CRM', name: 'Sales & CRM' },
    { id: 'Finance', name: 'Finance' },
    { id: 'Communication', name: 'Communication' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Project Management', name: 'Project Management' },
    { id: 'HR Management', name: 'HR Management' },
    { id: 'Google', name: 'Google Products' },
    { id: 'Analytics', name: 'Analytics' },
    { id: 'Cloud Storage', name: 'Cloud Storage' }
  ]

  const vendors = [
    { id: '', name: 'All Vendors' },
    { id: 'Zoho', name: 'Zoho' },
    { id: 'Google', name: 'Google' },
    { id: 'Salesforce', name: 'Salesforce' },
    { id: 'Other', name: 'Other' }
  ]

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setPagination({ ...pagination, currentPage: 1 })
  }

  const handleVendorChange = (vendorId) => {
    setActiveVendor(vendorId)
    setPagination({ ...pagination, currentPage: 1 })
  }

  const handlePageChange = (newPage) => {
    fetchProducts(activeCategory, activeVendor, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
      <div className="min-h-screen bg-gray-200 text-gray-900">
        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 text-gray-900">Our Products & Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions across leading platforms to power your business growth
            </p>
          </div>

          {/* Compare Mode Toggle */}
          <div className="flex justify-center mb-6">
            <button
                onClick={() => {
                  setCompareMode(!compareMode)
                  if (compareMode) {
                    setSelectedProducts([])
                  }
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border flex items-center gap-2 ${
                    compareMode
                        ? 'bg-green-600 text-white shadow-lg border-green-600'
                        : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border-gray-200 hover:border-green-300'
                }`}
            >
              <GitCompare className="w-5 h-5" />
              {compareMode ? 'Exit Compare Mode' : 'Compare Products'}
            </button>
          </div>

          {/* Compare Bar */}
          {compareMode && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-2xl z-50 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">
                  Selected: {selectedProducts.length}/5
                </span>
                    <div className="flex gap-2">
                      {selectedProducts.map(id => {
                        const product = products.find(p => p._id === id)
                        return product ? (
                            <div key={id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              {product.name}
                              <button onClick={() => toggleProductSelection(id)}>
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                        ) : null
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedProducts([])}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Clear All
                    </button>
                    <button
                        onClick={compareProducts}
                        disabled={selectedProducts.length < 2}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Compare Now
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Vendor Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {vendors.map((vendor) => (
                <button
                    key={vendor.id}
                    onClick={() => handleVendorChange(vendor.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                        activeVendor === vendor.id
                            ? 'bg-purple-600 text-white shadow-lg scale-105 border-purple-600'
                            : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-gray-200 hover:border-purple-300'
                    }`}
                >
                  {vendor.name}
                </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                        activeCategory === category.id
                            ? 'bg-blue-600 text-white shadow-lg scale-105 border-blue-600'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-200 hover:border-blue-300'
                    }`}
                >
                  {category.name}
                </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
          )}

          {/* Error State */}
          {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900">Error Loading Products</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
              <>
                {products.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <>
                      <div className="mb-6 text-center text-gray-600">
                        Showing {products.length} of {pagination.count} products
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className={`bg-white rounded-xl p-6 transition-all duration-300 hover:scale-105 border-2 group shadow-md hover:shadow-xl relative ${
                                    selectedProducts.includes(product._id)
                                        ? 'border-green-500 ring-2 ring-green-300'
                                        : 'border-gray-100 hover:border-blue-200'
                                }`}
                            >
                              {compareMode && (
                                  <div className="absolute top-4 right-4 z-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product._id)}
                                        onChange={() => toggleProductSelection(product._id)}
                                        className="w-6 h-6 cursor-pointer accent-green-600"
                                    />
                                  </div>
                              )}

                              <div className="flex items-center mb-4">
                                <div className="w-20 h-20 flex items-center justify-center relative">
                                  {product.logo ? (
                                      <Image
                                          alt={product.name}
                                          src={product.logo}
                                          width={80}
                                          height={80}
                                          className="object-contain"
                                      />
                                  ) : (
                                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                                        {product.name.charAt(0)}
                                      </div>
                                  )}
                                </div>
                                <div className="ml-5 flex-1">
                                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {product.vendor}
                          </span>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-6 line-clamp-3">
                                {product.shortDescription || product.description}
                              </p>

                              <div className="space-y-2 mb-6">
                                {product.features && product.features.slice(0, 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-gray-700">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                      {feature.title || feature}
                                    </div>
                                ))}
                              </div>

                              {!compareMode && (
                                  <Link
                                      href={product.website || `/products/${product.slug}`}
                                      target={product.website ? "_blank" : "_self"}
                                      rel={product.website ? "noopener noreferrer" : ""}
                                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
                                  >
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                  </Link>
                              )}
                            </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {pagination.totalPages > 1 && (
                          <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Previous
                            </button>

                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-4 py-2 rounded-lg ${
                                        pagination.currentPage === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                  {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Next
                            </button>
                          </div>
                      )}
                    </>
                )}
              </>
          )}
        </div>

        {/* Comparison Modal */}
        {showComparison && comparisonData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
                <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Product Comparison</h2>
                  <button
                      onClick={() => setShowComparison(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${comparisonData.length}, minmax(250px, 1fr))` }}>
                    {comparisonData.map((product) => (
                        <div key={product._id} className="border rounded-lg p-4">
                          <div className="text-center mb-4">
                            {product.logo ? (
                                <Image
                                    alt={product.name}
                                    src={product.logo}
                                    width={80}
                                    height={80}
                                    className="object-contain mx-auto mb-2"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2">
                                  {product.name.charAt(0)}
                                </div>
                            )}
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {product.vendor}
                      </span>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
                              <p className="text-sm text-gray-600">{product.category}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
                              <ul className="space-y-1">
                                {product.features && product.features.slice(0, 5).map((feature, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                      <span>{feature.title || feature}</span>
                                    </li>
                                ))}
                              </ul>
                            </div>

                            {product.website && (
                                <a
                                    href={product.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                                >
                                  Visit Website
                                </a>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-[#0B1423] rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our expertise can streamline your operations and accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Phone className="w-5 h-5 inline mr-2" />
                  Contact Us Now
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  <Globe className="w-5 h-5 inline mr-2" />
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}