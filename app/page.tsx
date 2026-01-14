import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
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
            <button className="bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              Explore Our Products
            </button>
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
                <h3 className="text-2xl font-bold mb-4 text-[#1B4965]">Medical Devices</h3>
                <p className="text-gray-600">State-of-the-art medical equipment for healthcare professionals.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-[#1B4965]">Healthcare Solutions</h3>
                <p className="text-gray-600">Comprehensive solutions for modern healthcare facilities.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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
            <p className="text-xl text-gray-700 mb-6">
              We are committed to providing the highest quality medical products and solutions.
            </p>
            <p className="text-lg text-gray-600">
              With years of experience in the healthcare industry, we understand the importance of reliability and excellence.
            </p>
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
            <p className="text-xl text-gray-700 mb-8">
              Ready to partner with us? Contact our team today.
            </p>
            <button className="bg-[#5FA777] hover:bg-[#4e8f63] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B4965] text-white py-8 text-center">
        <p>&copy; 2024 RaphaMed. All rights reserved.</p>
      </footer>
    </div>
  )
}
