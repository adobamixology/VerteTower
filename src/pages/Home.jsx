import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// Import your hero images
import hero1 from '../assets/hero/hero1.jpg'
import hero3 from '../assets/hero/hero3.jpg'
import hero2 from '../assets/hero/hero2.jpg'
import hero5 from '../assets/hero/hero5.jpg'
import hero6 from '../assets/hero/hero6.jpg'
import hero4 from '../assets/hero/hero4.jpg'
import hero7 from '../assets/hero/hero7.jpg'
import hero8 from '../assets/hero/hero8.jpg'
import hero9 from '../assets/hero/hero9.jpg'
import hero10 from '../assets/hero/hero10.jpg'
import hero11 from '../assets/hero/hero11.jpg'
import hero12 from '../assets/hero/hero12.jpg'


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)

  // Hero images data (12 slides) - includes Ghana/West Africa imagery
  const heroImages = [
    { src: hero1, alt: 'Modern hydroponic farm with vertical towers', title: 'Smart Vertical Farming', description: 'Advanced hydroponic systems for maximum yield' },
    { src: hero6, alt: 'Fresh green lettuce growing in hydroponic system', title: 'Fresh & Sustainable', description: 'Grow pesticide-free produce year-round' },
    { src: hero7, alt: 'High-tech farm monitoring system', title: 'IoT Monitoring', description: 'Real-time data for optimal plant growth' },
    { src: hero3, alt: 'Professional team working in hydroponic farm', title: 'Expert Team', description: 'Dedicated professionals ensuring your success' },
    { src: hero4, alt: 'Water-efficient farming technology', title: 'Eco-Friendly', description: '90% less water than traditional farming' },
    { src: hero2, alt: 'Urban farming installation', title: 'Urban Solutions', description: 'Perfect for cities and limited spaces' },
    // West Africa/Ghana themed images (royalty-free Unsplash links)
    { src: hero9, alt: 'Ghana coastline aerial', title: 'Ghana-Grown Innovation', description: 'Building resilient food systems in West Africa' },
    { src: hero11, alt: 'Green landscape West Africa', title: 'Climate-Smart Agriculture', description: 'Sustainable yields under changing climates' },
    { src: hero5, alt: 'Hands holding seedlings', title: 'Roots In Community', description: 'Empowering farmers with modern tools' },
    { src: hero12, alt: 'Irrigation water closeup', title: 'Water Wise Farming', description: 'Do more with less water' },
    { src: hero8, alt: 'Fresh produce display', title: 'Farm-To-Market', description: 'Quality produce, locally grown' },
    { src: hero10, alt: 'African map art', title: 'Growing Across West Africa', description: 'Scalable deployments for regions and cities' }
  ]

  // Continuous zoom animation
  useEffect(() => {
    let animationFrameId
    let startTime
    const zoomDuration = 8000 // 8 seconds per slide
    const startScale = 1.0
    const endScale = 1.3 // 30% zoom

    const animateZoom = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / zoomDuration, 1)
      
      // Easing function for smooth zoom
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease out
      const currentScale = startScale + (endScale - startScale) * easeProgress
      
      setZoomScale(currentScale)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateZoom)
      }
    }

    // Reset and start zoom animation when slide changes
    setZoomScale(startScale)
    startTime = null
    animationFrameId = requestAnimationFrame(animateZoom)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [currentSlide])

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      setIsTransitioning(false)
    }, 600)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
      setIsTransitioning(false)
    }, 600)
  }

  const goToSlide = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 600)
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Thank you for subscribing to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // WhatsApp contact number
  const whatsappNumber = '233245992385'
  const whatsappMessage = 'Hello, Kindly proceed to view Verte Tower Products Catalogue.'

  return (
    <div className="bg-white">
      {/* Animated WhatsApp Icon */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          aria-label="Contact us on WhatsApp"
        >
          {/* WhatsApp Icon */}
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.424"/>
          </svg>
          
          {/* Pulse animation effect */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
        </a>
        
        {/* Tooltip */}
        <div className="absolute right-16 bottom-1/2 transform translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp!
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
        </div>
      </div>

      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Images */}
        <div className="relative h-full w-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
            >
              {/* Background Image with Continuous Zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${image.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  transform: index === currentSlide ? `scale(${zoomScale})` : 'scale(1)',
                  transition: index === currentSlide ? 'transform 100ms linear' : 'none'
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center text-white z-10">
                <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-700 delay-300 z-10 relative ${
                  index === currentSlide 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {image.title}
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto">
                    {image.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/products" 
                      className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-lg z-20 relative"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      Explore Products
                    </Link>
                    <Link 
                      to="/register" 
                      className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 text-lg z-20 relative"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-30 z-10">
          <div 
            className="h-full bg-green-500 transition-all duration-5000 ease-linear"
            style={{ 
              width: isTransitioning ? '100%' : '0%',
              transition: isTransitioning ? 'width 5s linear' : 'none'
            }}
            key={currentSlide}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 right-8 animate-bounce z-10">
          <div className="text-white text-center">
            <span className="text-sm block mb-2">Scroll</span>
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Rest of your sections remain exactly the same */}
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Why Choose Verte Tower?</h2>
            <p className="text-gray-600 text-lg">Innovative solutions for modern farming challenges</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Water Efficient</h3>
              <p className="text-gray-600">Uses 90% less water than traditional farming methods</p>
            </div>
            
            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Year-Round Production</h3>
              <p className="text-gray-600">Grow fresh produce regardless of season or weather conditions</p>
            </div>
            
            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Space Saving</h3>
              <p className="text-gray-600">Vertical design maximizes yield in minimal footprint</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Have Questions?</h2>
            <p className="text-gray-600 text-lg">Get in touch with our experts for personalized advice</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-4">Quick Contact</h3>
                <p className="text-gray-600 mb-6">
                  Not sure where to start? Our team is here to guide you through the process and help you choose the right solution for your needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+233 245 992 385</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@vertetower.com</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and farming tips.</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Hydroponic Journey?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of successful farmers who have transformed their agricultural practices with Verte Tower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
            >
              Get Free Consultation
            </Link>
            <a 
              href="tel:+233245992385" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}