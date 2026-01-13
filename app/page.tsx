import './globals.css'
import Header from '@/components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--clean-white)]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1B4965] to-[#2a5f7d] text-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Leading Provider of Professional Medical Devices
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
                Trusted healthcare solutions across Canada
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="btn-primary bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
                  View Products
                </button>
                <button className="btn-secondary bg-white text-[#1B4965] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:transform hover:-translate-y-1 hover:shadow-xl hover:bg-gray-50">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-[#1B4965]">
              Why Choose RaphaMed?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#1B4965] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Quality Assured</h3>
                <p className="text-gray-600 text-center">
                  All products meet the highest Canadian healthcare standards and certifications
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#5FA777] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Fast Delivery</h3>
                <p className="text-gray-600 text-center">
                  Rapid distribution network ensuring timely delivery across Canada
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Expert Support</h3>
                <p className="text-gray-600 text-center">
                  Dedicated team providing exceptional customer service and technical support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1B4965] text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-gray-100">
              Contact us today to learn more about our medical device solutions
            </p>
            <button className="btn-primary bg-[#5FA777] hover:bg-[#4e8f63] text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
              Get in Touch
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
