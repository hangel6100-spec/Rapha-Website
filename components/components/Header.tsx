'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ============================================
// TYPE DEFINITIONS
// ============================================
interface DropdownItem {
  label: string
  href: string
}

interface NavDropdownProps {
  label: string
  items: DropdownItem[]
  isActive: boolean
  onClose: () => void
}

interface MobileDropdownProps {
  label: string
  items: DropdownItem[]
  onItemClick: () => void
}

// ============================================
// DROPDOWN DATA
// ============================================
const productItems: DropdownItem[] = [
  { label: 'Medical Devices', href: '#medical-devices' },
  { label: 'Healthcare Solutions', href: '#healthcare-solutions' },
  { label: 'Medical Supplies', href: '#medical-supplies' },
]

const aboutItems: DropdownItem[] = [
  { label: 'Company', href: '#company' },
  { label: 'Certifications', href: '#certifications' },
]

// ============================================
// DESKTOP DROPDOWN COMPONENT
// ============================================
function NavDropdown({ label, items, isActive, onClose }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  // Hover handlers with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div 
      className="relative" 
      ref={dropdownRef} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`flex items-center font-medium transition-colors ${
          isActive ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>
      
      <div 
        className={`absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 transform origin-top ${
          isOpen 
            ? 'opacity-100 visible scale-100 translate-y-0' 
            : 'opacity-0 invisible scale-95 -translate-y-2'
        }`}
      >
        <div className="py-2">
          {items.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="block px-4 py-2.5 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965] transition-colors" 
              onClick={() => {
                setIsOpen(false)
                onClose()
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// MOBILE DROPDOWN COMPONENT
// ============================================
function MobileDropdown({ label, items, onItemClick }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-3 text-gray-700 hover:text-[#1B4965] font-medium"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {label}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-4 pb-3 space-y-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-gray-600 hover:text-[#1B4965] transition-colors"
              onClick={onItemClick}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN HEADER COMPONENT
// ============================================
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Handle scroll for shadow and active section
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, closeMobileMenu])

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen, closeMobileMenu])

  // Check if link is active
  const isLinkActive = (href: string) => {
    return activeSection === href.replace('#', '')
  }

  return (
    <header 
      ref={headerRef} 
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#1B4965] focus:ring-offset-2 rounded-lg"
          >
            <div className="relative overflow-hidden rounded-full">
              <Image 
                src="/assets/logo.png" 
                alt="RaphaMed Logo" 
                width={50} 
                height={50} 
                className="rounded-full transition-transform duration-300 group-hover:scale-110" 
                priority 
              />
            </div>
            <span className="ml-3 text-2xl font-bold text-[#1B4965] group-hover:text-[#2d6a8a] transition-colors">
              RaphaMed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className={`font-medium transition-colors relative ${
                isLinkActive('#home') 
                  ? 'text-[#1B4965]' 
                  : 'text-gray-700 hover:text-[#1B4965]'
              }`}
            >
              Home
              {isLinkActive('#home') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#5FA777] rounded-full" />
              )}
            </a>
            
            <NavDropdown 
              label="Products" 
              items={productItems} 
              isActive={isLinkActive('#products')} 
              onClose={() => {}} 
            />
            
            <NavDropdown 
              label="About" 
              items={aboutItems} 
              isActive={isLinkActive('#about')} 
              onClose={() => {}} 
            />
            
            <a 
              href="#contact" 
              className={`font-medium transition-colors relative ${
                isLinkActive('#contact') 
                  ? 'text-[#1B4965]' 
                  : 'text-gray-700 hover:text-[#1B4965]'
              }`}
            >
              Contact
              {isLinkActive('#contact') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#5FA777] rounded-full" />
              )}
            </a>
            
            <button 
              className="bg-[#5FA777] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4e8f63] transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5FA777] focus:ring-offset-2"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-[#1B4965] hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B4965]" 
            onClick={toggleMobileMenu} 
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-100">
            <a 
              href="#home" 
              className="block py-3 text-gray-700 hover:text-[#1B4965] font-medium border-b border-gray-100" 
              onClick={closeMobileMenu}
            >
              Home
            </a>
            
            <MobileDropdown 
              label="Products" 
              items={productItems} 
              onItemClick={closeMobileMenu} 
            />
            
            <MobileDropdown 
              label="About" 
              items={aboutItems} 
              onItemClick={closeMobileMenu} 
            />
            
            <a 
              href="#contact" 
              className="block py-3 text-gray-700 hover:text-[#1B4965] font-medium border-b border-gray-100" 
              onClick={closeMobileMenu}
            >
              Contact
            </a>
            
            <button 
              className="w-full mt-4 bg-[#5FA777] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4e8f63] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5FA777]" 
              onClick={closeMobileMenu}
            >
              Get Quote
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
