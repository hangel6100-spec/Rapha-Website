'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/assets/cropped_circle_image (1).png" 
              alt="RaphaMed Logo" 
              width={50} 
              height={50}
              className="rounded-full"
            />
            <span className="ml-3 text-2xl font-bold text-[#1B4965]">RaphaMed</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-[#1B4965] font-medium transition-colors">
              Home
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#1B4965] font-medium transition-colors flex items-center">
                Products
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#medical-devices" className="block px-4 py-2 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965]">Medical Devices</a>
                <a href="#healthcare-solutions" className="block px-4 py-2 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965]">Healthcare Solutions</a>
                <a href="#medical-supplies" className="block px-4 py-2 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965]">Medical Supplies</a>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#1B4965] font-medium transition-colors flex items-center">
                About
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#company" className="block px-4 py-2 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965]">Company</a>
                <a href="#certifications" className="block px-4 py-2 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965]">Certifications</a>
              </div>
            </div>
            <a href="#contact" className="text-gray-700 hover:text-[#1B4965] font-medium transition-colors">
              Contact
            </a>
            <button className="bg-[#5FA777] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4e8f63] transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <a href="#home" className="block text-gray-700 hover:text-[#1B4965] font-medium">
              Home
            </a>
            <a href="#products" className="block text-gray-700 hover:text-[#1B4965] font-medium">
              Products
            </a>
            <a href="#about" className="block text-gray-700 hover:text-[#1B4965] font-medium">
              About
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-[#1B4965] font-medium">
              Contact
            </a>
            <button className="w-full bg-[#5FA777] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4e8f63] transition-colors">
              Get Quote
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
