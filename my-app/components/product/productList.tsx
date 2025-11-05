"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Phone, Globe, Loader2, AlertCircle, X, GitCompare, Filter, Sparkles } from 'lucide-react'
import Link from "next/link"

// TypeScript interfaces
interface Product {
  _id: string;
  name: string;
  vendor: string;
  category: string;
  description: string;
  shortDescription?: string;
  logo?: string;
  website?: string;
  slug: string;
  features?: Array<{ title: string } | string>;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  count: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/products'

export function ProductList() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeVendor, setActiveVendor] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })
  const [compareMode, setCompareMode] = useState<boolean>(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [comparisonData, setComparisonData] = useState<Product[] | null>(null)
  const [showComparison, setShowComparison] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Fetch products from API
  const fetchProducts = useCallback(async (category: string = 'all', vendor: string = '', page: number = 1) => {
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
      setError((err as Error).message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Compare products
  const compareProducts = useCallback(async () => {
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
      alert((err as Error).message)
      console.error('Error comparing products:', err)
    }
  }, [selectedProducts])

  // Toggle product selection for comparison
  const toggleProductSelection = (productId: string) => {
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
  }, [activeCategory, activeVendor, fetchProducts])

  const categories = [
    { id: 'all', name: 'All Products', icon: '' },
    { id: 'Sales & CRM', name: 'Sales & CRM', icon: '' },
    { id: 'Finance', name: 'Finance', icon: '' },
    { id: 'Communication', name: 'Communication', icon: '' },
    { id: 'Marketing', name: 'Marketing', icon: '' },
    { id: 'Project Management', name: 'Project Management', icon: '' },
    { id: 'HR Management', name: 'HR Management', icon: '' },
    { id: 'Google', name: 'Google Products', icon: '' },
    { id: 'Analytics', name: 'Analytics', icon: '' },
    { id: 'Cloud Storage', name: 'Cloud Storage', icon: '️' }
  ]

  const vendors = [
    { id: '', name: 'All Vendors', color: 'from-gray-600 to-gray-700' },
    { id: 'Zoho', name: 'Zoho', color: 'from-red-500 to-orange-500' },
    { id: 'Google', name: 'Google', color: 'from-blue-500 to-green-500' },
    { id: 'Salesforce', name: 'Salesforce', color: 'from-cyan-500 to-blue-600' },
    { id: 'Other', name: 'Other', color: 'from-purple-500 to-pink-500' }
  ]

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    setPagination(p => ({ ...p, currentPage: 1 }))
  }, [])

  const handleVendorChange = useCallback((vendorId: string) => {
    setActiveVendor(vendorId)
    setPagination(p => ({ ...p, currentPage: 1 }))
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    fetchProducts(activeCategory, activeVendor, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeCategory, activeVendor, fetchProducts])

  return (
      <div className="min-h-screen bg-blue-50 text-gray-900">
        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section with Modern Design */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Premium Solutions
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-black bg-clip-text text-transparent">
              Our Products & Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions across leading platforms to power your business growth
            </p>
          </div>

          {/* Modern Filter & Compare Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-3 backdrop-blur-lg border border-gray-100">
              {/* Top Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
                <div className="flex items-center gap-3">
                  <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  >
                    <Filter className="w-5 h-5" />
                    Filters
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {activeCategory !== 'all' || activeVendor ? '•' : ''}
                    </span>
                  </button>

                  {(activeCategory !== 'all' || activeVendor) && (
                      <button
                          onClick={() => {
                            setActiveCategory('all')
                            setActiveVendor('')
                          }}
                          className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Clear Filters
                      </button>
                  )}
                </div>

                <button
                    onClick={() => {
                      setCompareMode(!compareMode)
                      if (compareMode) {
                        setSelectedProducts([])
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${
                        compareMode
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  <GitCompare className="w-5 h-5" />
                  {compareMode ? 'Exit Compare' : 'Compare Products'}
                </button>
              </div>

              {/* Filter Content */}
              {showFilters && (
                  <div className="space-y-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Vendor Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        Select Vendor
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {vendors.map((vendor) => (
                            <button
                                key={vendor.id}
                                onClick={() => handleVendorChange(vendor.id)}
                                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                                    activeVendor === vendor.id
                                        ? `bg-gradient-to-r ${vendor.color} text-white shadow-lg scale-105`
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                }`}
                            >
                              {vendor.name}
                            </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                        Select Category
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`p-4 rounded-xl font-medium transition-all duration-300 text-left ${
                                    activeCategory === category.id
                                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105 border border-gray-200'
                                }`}
                            >
                              <div className="text-2xl mb-1">{category.icon}</div>
                              <div className="text-sm font-semibold">{category.name}</div>
                            </button>
                        ))}
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Compare Bar */}
          {compareMode && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-green-500 shadow-2xl z-50 p-4 backdrop-blur-lg bg-white/95">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-gray-900">
                        Selected: <span className="text-green-600">{selectedProducts.length}</span>/5
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map(id => {
                        const product = products.find(p => p._id === id)
                        return product ? (
                            <div key={id} className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-green-200">
                              <span className="font-medium">{product.name}</span>
                              <button onClick={() => toggleProductSelection(id)} className="hover:bg-green-200 rounded-full p-0.5 transition-colors">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                        ) : null
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setSelectedProducts([])}
                        className="flex-1 sm:flex-none px-4 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-all"
                    >
                      Clear All
                    </button>
                    <button
                        onClick={compareProducts}
                        disabled={selectedProducts.length < 2}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg transition-all"
                    >
                      Compare Now
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Loading State */}
          {loading && (
              <div className="flex flex-col justify-center items-center py-20">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
          )}

          {/* Error State */}
          {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 flex items-start shadow-lg">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-1">Error Loading Products</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
              <>
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-gray-600 text-lg font-medium">No products found matching your criteria.</p>
                      <button
                          onClick={() => {
                            setActiveCategory('all')
                            setActiveVendor('')
                          }}
                          className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        Clear filters and try again
                      </button>
                    </div>
                ) : (
                    <>
                      <div className="mb-6 text-center">
                        <span className="text-gray-600 bg-white px-6 py-2 rounded-full shadow-md border border-gray-100 inline-block">
                          Showing <span className="font-bold text-blue-600">{products.length}</span> of <span className="font-bold text-purple-600">{pagination.count}</span> products
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className={`bg-white rounded-2xl p-6 transition-all duration-300 hover:scale-105 border-2 group shadow-lg hover:shadow-2xl relative overflow-hidden ${
                                    selectedProducts.includes(product._id)
                                        ? 'border-green-500 ring-4 ring-green-200 shadow-green-200'
                                        : 'border-gray-100 hover:border-blue-300'
                                }`}
                            >
                              {/* Background gradient effect */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-0"></div>

                              {compareMode && (
                                  <div className="absolute top-4 right-4 z-10">
                                    <div className="relative">
                                      <input
                                          type="checkbox"
                                          checked={selectedProducts.includes(product._id)}
                                          onChange={() => toggleProductSelection(product._id)}
                                          className="w-6 h-6 cursor-pointer accent-green-600 rounded-lg"
                                      />
                                      {selectedProducts.includes(product._id) && (
                                          <div className="absolute inset-0 bg-green-500 rounded animate-ping opacity-75"></div>
                                      )}
                                    </div>
                                  </div>
                              )}

                              <div className="flex items-center mb-4 relative z-10">
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
                                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {product.name.charAt(0)}
                                      </div>
                                  )}
                                </div>
                                <div className="ml-5 flex-1">
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                                  <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                    {product.vendor}
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-6 line-clamp-3 relative z-10 text-sm leading-relaxed">
                                {product.shortDescription || product.description}
                              </p>

                              <div className="space-y-2 mb-6 relative z-10">
                                {product.features && product.features.slice(0, 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-gray-700">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                      <span className="line-clamp-1">{typeof feature === 'string' ? feature : feature.title}</span>
                                    </div>
                                ))}
                              </div>

                              {!compareMode && (
                                  <Link
                                      href={product.website || `/products/${product.slug}`}
                                      target={product.website ? "_blank" : "_self"}
                                      rel={product.website ? "noopener noreferrer" : ""}
                                      className="w-full bg-black  text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl relative z-10"
                                  >
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                  </Link>
                              )}
                            </div>
                        ))}
                      </div>

                      {/* Modern Pagination */}
                      {pagination.totalPages > 1 && (
                          <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className="px-5 py-3 rounded-xl border-2 border-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 transition-all duration-300 font-medium shadow-md"
                            >
                              Previous
                            </button>

                            <div className="flex gap-2">
                              {[...Array(pagination.totalPages)].map((_, i) => (
                                  <button
                                      key={i + 1}
                                      onClick={() => handlePageChange(i + 1)}
                                      className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                                          pagination.currentPage === i + 1
                                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                                              : 'bg-white border-2 border-gray-200 hover:border-blue-400 text-gray-700 hover:bg-blue-50'
                                      }`}
                                  >
                                    {i + 1}
                                  </button>
                              ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="px-5 py-3 rounded-xl border-2 border-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 transition-all duration-300 font-medium shadow-md"
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

        {/* Enhanced Comparison Modal */}
        {showComparison && comparisonData && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-3xl z-10">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Product Comparison</h2>
                    <p className="text-blue-100 text-sm">Side-by-side analysis of selected products</p>
                  </div>
                  <button
                      onClick={() => setShowComparison(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid gap-6 overflow-x-auto pb-4" style={{ gridTemplateColumns: `repeat(${comparisonData.length}, minmax(280px, 1fr))` }}>
                    {comparisonData.map((product, index) => (
                        <div key={product._id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
                          <div className="text-center mb-6">
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">
                              Product {index + 1}
                            </div>
                            {product.logo ? (
                                <Image
                                    alt={product.name}
                                    src={product.logo}
                                    width={100}
                                    height={100}
                                    className="object-contain mx-auto mb-3"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3 shadow-lg">
                                  {product.name.charAt(0)}
                                </div>
                            )}
                            <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
                            <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold">
                              {product.vendor}
                            </span>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-xl p-4 border border-gray-100">
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                Category
                              </h4>
                              <p className="text-sm text-gray-600 font-medium">{product.category}</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-100">
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Key Features
                              </h4>
                              <ul className="space-y-2">
                                {product.features && product.features.slice(0, 5).map((feature, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                      <span>{typeof feature === 'string' ? feature : feature.title}</span>
                                    </li>
                                ))}
                              </ul>
                            </div>

                            {product.website && (
                                <a
                                    href={product.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
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

        {/* Enhanced CTA Section */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative bg-slate-700 rounded-3xl p-12 text-center shadow-2xl overflow-hidden">
            {/* Animated background effects */}
           
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                Let&apos;s Get Started
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise can streamline your operations and accelerate your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Us Now
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border-1 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <Globe className="w-5 h-5" />
                    About Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}