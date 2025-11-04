import React from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
  const products = [
    {
      title: "Vertical Hydroponic Towers",
      description: "Advanced vertical farming systems designed for maximum yield in minimal space. Perfect for urban farming and commercial operations.",
      features: ["IoT-Enabled Monitoring", "Automated Nutrient System", "Space-Efficient Design", "Year-Round Production"],
      color: "from-emerald-500 to-green-600",
      badge: "Most Popular"
    },
    {
      title: "Fresh Farm Produce",
      description: "Premium quality, pesticide-free produce grown in our state-of-the-art hydroponic systems. Available year-round with guaranteed freshness.",
      features: ["100% Pesticide-Free", "Daily Harvest", "Nutrition Optimized", "Farm-to-Table Freshness"],
      color: "from-green-500 to-lime-500",
      subProducts: [
        { name: "Leafy Greens", icon: "🥬", description: "Fresh lettuce, kale, and spinach" },
        { name: "Tomatoes", icon: "🍅", description: "Vine-ripened cherry and beefsteak" },
        { name: "Chilly Peppers", icon: "🌶️", description: "Mild to medium heat varieties" },
        { name: "Habaneros", icon: "🔥", description: "Premium hot peppers" }
      ]
    },
    {
      title: "Soilless Garden Training Manuals",
      description: "Comprehensive guides and training materials to master hydroponic farming techniques. Perfect for beginners and experienced growers.",
      features: ["Step-by-Step Guides", "Video Tutorials", "Best Practices", "Troubleshooting Tips"],
      color: "from-lime-500 to-green-500",
      badge: "Expert Certified"
    },
    {
      title: "Seedlings",
      description: "High-quality, disease-free seedlings ready for transplanting. Grown in optimal conditions for maximum success rates and faster growth.",
      features: ["Disease-Free Guarantee", "Ready to Transplant", "Multiple Varieties", "95% Success Rate"],
      color: "from-green-500 to-lime-500"
    }
  ]

  const stats = [
    { 
      number: "90%", 
      label: "Water Savings",
      gradient: "from-lime-500 to-green-500"
    },
    { 
      number: "3x", 
      label: "Faster Growth",
      gradient: "from-green-500 to-lime-500"
    },
    { 
      number: "100%", 
      label: "Pesticide Free",
      gradient: "from-lime-500 to-green-500"
    },
    { 
      number: "24/7", 
      label: "Support",
      gradient: "from-green-500 to-lime-500"
    }
  ]

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-16 md:py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-300 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-green-800">Premium Hydroponic Solutions</span>
          </div>
          
          {/* Animated Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4 md:mb-6 leading-tight animate-slide-up">
            Transform Your Farming
          </h1>
          
          {/* Animated Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 px-4 animate-slide-up delay-200">
            Advanced hydroponic systems and premium produce designed for modern agriculture
          </p>

          {/* Enhanced Animated Stats - Numbers Only */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto mt-12 md:mt-16 px-2">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated Number with Gradient */}
                <div className="relative mb-3 sm:mb-4">
                  <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-500 animate-count-up`}>
                    {stat.number}
                  </div>
                </div>
                
                {/* Animated Label */}
                <div className="text-sm sm:text-base md:text-lg font-semibold text-green-700 transform group-hover:translate-y-1 transition-transform duration-300 leading-tight">
                  {stat.label}
                </div>
                
                {/* Animated Underline */}
                <div className="w-0 group-hover:w-8 sm:group-hover:w-12 h-1 bg-gradient-to-r from-green-500 to-lime-500 mx-auto mt-2 sm:mt-4 rounded-full transition-all duration-500 group-hover:delay-300"></div>
                
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 mb-3 md:mb-4">
              Our Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Innovative solutions that revolutionize modern farming with technology and sustainability
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden animate-fade-in-up mx-auto w-full max-w-md sm:max-w-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Hover Border Animation */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className="absolute inset-[2px] rounded-2xl sm:rounded-3xl bg-white"></div>
                </div>
                
                <div className="relative p-6 sm:p-8">
                  {/* Animated Badge */}
                  {product.badge && (
                    <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
                      {product.badge}
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    {/* Title with Hover Effect */}
                    <h3 className="text-xl sm:text-2xl font-bold text-green-700 group-hover:text-green-700 transition-colors duration-300 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 leading-tight">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed transform group-hover:translate-x-1 transition-transform duration-300">
                      {product.description}
                    </p>

                    {/* Features with Staggered Animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {product.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center space-x-2 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sub-products for Fresh Farm Produce */}
                    {product.subProducts && (
                      <div className="pt-4 sm:pt-6 border-t border-gray-200 transform group-hover:translate-x-1 transition-transform duration-300">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Available Varieties</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {product.subProducts.map((sub, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center space-x-2 sm:space-x-3 bg-green-50 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105"
                              style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                              <span className="text-lg sm:text-xl transform hover:scale-110 transition-transform duration-300">{sub.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{sub.name}</div>
                                <div className="text-xs text-gray-600 truncate">{sub.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Animated CTA Button */}
                    <Link
                      to="/contact"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      <span>Get Started</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-green-600 via-green-600 to-green-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-white/5 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 animate-fade-in-up px-4">
            Ready to Revolutionize Your Farming?
          </h2>
          
          {/* Animated Description */}
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 px-4">
            Join hundreds of successful farmers who have transformed their agricultural practices with Verte Tower's cutting-edge solutions.
          </p>
          
          {/* Animated Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up delay-400 px-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group bg-white text-green-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span className="text-sm sm:text-base">Start Your Journey</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <a
              href="tel:+233245992385"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span className="text-sm sm:text-base">Call Our Experts</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
          
          {/* Animated Footer Text */}
          <p className="text-green-200 text-xs sm:text-sm mt-4 md:mt-6 animate-fade-in-up delay-600 px-4">
            Get a free consultation and customized solution for your farming needs
          </p>
        </div>
      </section>

      {/* Add Custom Animations to Tailwind */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes count-up {
          from { 
            transform: scale(0.5) translateY(20px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-count-up { animation: count-up 0.8s ease-out; }
      `}</style>
    </div>
  )
}