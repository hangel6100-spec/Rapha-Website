'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      const sections = ['home', 'products', 'about', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLinkActive = (section: string) => activeSection === section

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header 
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-12 h-12 bg-[#1B4965] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-[#1B4965]">
                RaphaMed
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#home" 
                className={`font-medium transition-colors ${
                  isLinkActive('home') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'
                }`}
              >
                Home
              </a>
              <a 
                href="#products" 
                className={`font-medium transition-colors ${
                  isLinkActive('products') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'
                }`}
              >
                Products
              </a>
              <a 
                href="#about" 
                className={`font-medium transition-colors ${
                  isLinkActive('about') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'
                }`}
              >
                About
              </a>
              <a 
                href="#contact" 
                className={`font-medium transition-colors ${
                  isLinkActive('contact') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'
                }`}
              >
                Contact
              </a>
              <button className="bg-[#5FA777] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4e8f63] transition-all">
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-[#1B4965]" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <a href="#home" className="block py-3 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
              <a href="#products" className="block py-3 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </a>
              <a href="#about" className="block py-3 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </a>
              <a href="#contact" className="block py-3 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </a>
              <button className="w-full mt-4 bg-[#5FA777] text-white px-6 py-3 rounded-lg font-semibold">
                Get Quote
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* Home Section */}
        <section 
          id="home" 
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B4965] to-[#2d6a8a]"
        >
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to RaphaMed
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your trusted partner in medical solutions
            </p>
            <a 
              href="#products"
              className="inline-block bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Explore Our Products
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section 
          id="products" 
          className="min-h-screen flex items-center justify-center bg-gray-50 py-20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1B4965]">
              Our Products
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#5FA777] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1B4965]">Medical Devices</h3>
                <p className="text-gray-600">State-of-the-art medical equipment for healthcare professionals.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#5FA777] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1B4965]">Healthcare Solutions</h3>
                <p className="text-gray-600">Comprehensive solutions for modern healthcare facilities.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#5FA777] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1B4965]">Medical Supplies</h3>
                <p className="text-gray-600">Quality supplies for all your medical needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className="min-h-screen flex items-center justify-center bg-white py-20"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1B4965]">
              About RaphaMed
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              We are committed to providing the highest quality medical products and solutions 
              to healthcare professionals worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience in the healthcare industry, we understand the importance 
              of reliability, innovation, and excellence in every product we deliver.
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-[#5FA777] mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#5FA777] mb-2">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#5FA777] mb-2">1000+</div>
                <div className="text-gray-600">Products</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="min-h-screen flex items-center justify-center bg-gray-50 py-20"
        >
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1B4965]">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Ready to partner with us? Contact our team today and discover how we can help.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#5FA777] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">info@raphamed.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#5FA777] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#5FA777] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">123 Medical Plaza, Healthcare City</span>
                </div>
              </div>
              <button className="mt-8 w-full bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Send Message
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1B4965] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RaphaMed</h3>
              <p className="text-gray-300">Your trusted partner in medical solutions.</p>
            </div>
            <div>
              
