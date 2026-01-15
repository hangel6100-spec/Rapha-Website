'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [cartCount, setCartCount] = useState(0)

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

  const addToCart = () => {
    setCartCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1B4965] text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center group">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/assets/logo.png" alt="RaphaMed" className="w-full h-full object-cover" />
              </div>
              <span className="ml-3 text-2xl font-bold text-[#1B4965]">RaphaMed</span>
            </a>

            <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
              <a href="#home" className={`font-medium transition-colors ${isLinkActive('home') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'}`}>
                Home
              </a>
              <a href="#products" className={`font-medium transition-colors ${isLinkActive('products') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'}`}>
                Products
              </a>
              <a href="#about" className={`font-medium transition-colors ${isLinkActive('about') ? 'text-[#1B4965]' : 'text-gray-700 hover:text-[#1B4965]'}`}>
                About
              </a>
              <a href="#contact" className="bg-[#5FA777] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4e8f63] transition-all">
                Request Information
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-[#1B4965]" aria-label="Search products">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>

              <button className="p-2 text-gray-700 hover:text-[#1B4965] relative" aria-label="Shopping cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#5FA777] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button className="px-3 py-1.5 text-sm font-medium bg-[#1B4965] text-white">EN</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100">FR</button>
              </div>
            </div>

            <button className="md:hidden p-2 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-2 pt-4">
                <a href="#home" className="py-2 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="#products" className="py-2 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
                <a href="#about" className="py-2 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="#contact" className="py-2 text-gray-700 hover:text-[#1B4965]" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                <button className="mt-4 bg-[#5FA777] text-white px-6 py-3 rounded-lg font-semibold text-left">Request Information</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B4965] to-[#2d6a8a] overflow-hidden">
          <div className="absolute inset-0 opacity-20"></div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Professional Health & Wellness Solutions You Can Trust
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Delivering dependable, ethical, and high-quality wellness solutions designed to protect and support communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="inline-block bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Explore Products
              </a>
              <a href="#contact" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1B4965] px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section id="products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B4965] mb-4">Medical & PPE Products</h2>
              <p className="text-xl text-gray-600">Medical-grade products meeting ASTM and Canadian healthcare standards.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#1B4965] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Nitrile Gloves</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B4965] mb-2">Medical Nitrile Gloves – ASTM Level 3</h3>
                  <p className="text-2xl font-bold text-[#5FA777] mb-4">$14.99</p>
                  <button onClick={addToCart} className="w-full bg-[#5FA777] hover:bg-[#4e8f63] text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Add to Cart
                  </button>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#1B4965] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Syringes</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B4965] mb-2">Sterile Syringes</h3>
                  <p className="text-2xl font-bold text-[#5FA777] mb-4">$19.99</p>
                  <button onClick={addToCart} className="w-full bg-[#5FA777] hover:bg-[#4e8f63] text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Add to Cart
                  </button>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#1B4965] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Gauze</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B4965] mb-2">Sterile Gauze Pads</h3>
                  <p className="text-2xl font-bold text-[#5FA777] mb-4">$9.99</p>
                  <button onClick={addToCart} className="w-full bg-[#5FA777] hover:bg-[#4e8f63] text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Add to Cart
                  </button>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#1B4965] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Masks</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B4965] mb-2">ASTM Level 3 Medical Masks</h3>
                  <p className="text-2xl font-bold text-[#5FA777] mb-4">$24.99</p>
                  <button onClick={addToCart} className="w-full bg-[#5FA777] hover:bg-[#4e8f63] text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Add to Cart
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1B4965] mb-12">Loved by Our Customers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <article className="bg-gray-50 p-8 rounded-lg">
                <div className="text-[#5FA777] text-2xl mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="text-gray-700 mb-4 italic">"These supplements have transformed my daily wellness routine. I feel more energized and focused."</p>
                <div>
                  <p className="font-bold text-[#1B4965]">Sarah M.</p>
                  <p className="text-sm text-gray-600">Verified Buyer</p>
                </div>
              </article>

              <article className="bg-gray-50 p-8 rounded-lg">
                <div className="text-[#5FA777] text-2xl mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="text-gray-700 mb-4 italic">"Professional quality products at great prices. Fast shipping and excellent customer service."</p>
                <div>
                  <p className="font-bold text-[#1B4965]">Dr. James L.</p>
                  <p className="text-sm text-gray-600">Healthcare Professional</p>
                </div>
              </article>

              <article className="bg-gray-50 p-8 rounded-lg">
                <div className="text-[#5FA777] text-2xl mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="text-gray-700 mb-4 italic">"Reliable medical supplies for our clinic. RaphaMed is our trusted partner."</p>
                <div>
                  <p className="font-bold text-[#1B4965]">Medical Clinic Team</p>
                  <p className="text-sm text-gray-600">Toronto, ON</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B4965] mb-8">About RaphaMed</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Professional health and wellness solutions supporting clinics, practitioners, and communities across Canada.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are committed to providing the highest quality medical products and solutions to healthcare professionals worldwide. With years of experience in the healthcare industry, we understand the importance of reliability, innovation, and excellence.
            </p>
          </div>
        </section>

        <footer id="contact" className="bg-[#1B4965] text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">RaphaMed</h3>
                <p className="text-gray-300 mb-6">Professional health and wellness solutions supporting clinics, practitioners, and communities.</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Join Our Newsletter</h4>
                <form className="flex gap-2">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" aria-label="Email address" />
                  <button type="submit" className="bg-[#5FA777] hover:bg-[#4e8f63] px-6 py-3 rounded-lg font-semibold transition-all">
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-2">Weekly wellness tips. Unsubscribe anytime.</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              <p>&copy; 2024 RaphaMed Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
