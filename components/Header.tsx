'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Type definitions
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

// Dropdown data
const productItems: DropdownItem[] = [
  { label: 'Medical Devices', href: '#medical-devices' },
  { label: 'Healthcare Solutions', href: '#healthcare-solutions' },
  { label: 'Medical Supplies', href: '#medical-supplies' },
]

const aboutItems: DropdownItem[] = [
  { label: 'Company', href: '#company' },
  { label: 'Certifications', href: '#certifications' },
]

// Desktop Dropdown Component
function NavDropdown({ label, items, isActive, onClose }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

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
          isActive 
            ? 'text-[#1B4965]' 
            : 'text-gray-700 hover:text-[#1B4965]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 
          transition-all duration-200 transform origin-top
          ${isOpen 
            ? 'opacity-100 visible scale-100 translate-y-0' 
            : 'opacity-0 invisible scale-95 -translate-y-2'
          }`}
        role="menu"
      >
        <div className="py-2">
          {items.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="block px-4 py-2.5 text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B4965] transition-colors"
              role="menuitem"
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

// Mobile Dropdown Component
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
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

// Main Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

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
  const isLinkActive = (href: string): boolean => {
    return activeSection === href.replace('#', '')
  }

  return (
    <header
      ref={headerRef}
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 
