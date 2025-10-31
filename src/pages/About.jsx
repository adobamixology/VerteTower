import React, { useState, useEffect, useRef } from 'react'
import Partners from '../components/Partners'

export default function About() {
  const [farmsCount, setFarmsCount] = useState(0)
  const [waterSaved, setWaterSaved] = useState(0)
  const [monitoring, setMonitoring] = useState('0')
  const [sustainable, setSustainable] = useState(0)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateNumber(0, 50, 2000, setFarmsCount, () => {
            setFarmsCount(prev => prev + '+')
          })
          animateNumber(0, 90, 2000, setWaterSaved, () => {
            setWaterSaved(prev => prev + '%')
          })
          setMonitoring('24/7')
          animateNumber(0, 100, 2000, setSustainable, () => {
            setSustainable(prev => prev + '%')
          })
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  const animateNumber = (start, end, duration, setValue, onComplete) => {
    const startTime = performance.now()
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(start + (end - start) * easeOutQuart)
      
      setValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      } else {
        onComplete?.()
      }
    }
    
    requestAnimationFrame(updateValue)
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-green-900 mb-6">About Verte Tower</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Pioneering the future of sustainable agriculture through innovative hydroponic technology
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-green-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To address food insecurity by empowering smallholder farmers, peri-urban growers, and 
                  sustainability-conscious individuals through innovative, eco-friendly farming solutions.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-6">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To revolutionize agriculture in Ghana by promoting sustainable practices and enhancing 
                  food security through cutting-edge technology and community collaboration.
                </p>
              </div>
            </div>
            
            {/* Why Hydroponics Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200 h-fit">
              <h3 className="text-2xl font-semibold text-green-900 mb-6 text-center">Why Hydroponics?</h3>
              <div className="space-y-4">
                {[
                  { icon: '💧', title: '90% Less Water', desc: 'Significant water conservation compared to traditional farming' },
                  { icon: '🌱', title: 'No Soil Required', desc: 'Grow in any location, even urban environments' },
                  { icon: '⚡', title: 'Faster Growth', desc: 'Plants grow 30-50% faster than in soil' },
                  { icon: '📅', title: 'Year-Round Production', desc: 'Consistent harvests regardless of season' },
                  { icon: '📊', title: 'Higher Yields', desc: 'More produce in smaller spaces' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <span className="text-green-600 text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-green-900 text-center mb-12">Our Focus Areas</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Women Empowerment",
                description: "We're committed to empowering women in agriculture through technology training, leadership development, and access to sustainable farming tools that create economic opportunities.",
                icon: "👩‍🌾"
              },
              {
                title: "Climate Smart Technology",
                description: "We design farming systems that overcome challenges of rainfall dependence, low mechanization, and unsustainable methods plaguing conventional farming in Ghana.",
                icon: "🌍"
              },
              {
                title: "Food Security",
                description: "The VT-Grow 1 enables year-round cultivation, increasing availability, access, and affordability of fresh vegetables to combat food insecurity affecting 40% of Ghana's population.",
                icon: "🛡️"
              }
            ].map((focus, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-green-200">
                <div className="text-4xl mb-4">{focus.icon}</div>
                <h3 className="text-xl font-bold text-green-900 mb-4">{focus.title}</h3>
                <p className="text-gray-600 leading-relaxed">{focus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-12 text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-12">Our Impact in Numbers</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: farmsCount, label: 'Farms Served' },
                { value: waterSaved, label: 'Water Saved' },
                { value: monitoring, label: 'Real-time Monitoring' },
                { value: sustainable, label: 'Sustainable Practices' }
              ].map((stat, index) => (
                <div key={index} className="transform transition-all duration-500 hover:scale-110">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                    {stat.value}
                  </div>
                  <div className="text-green-100 font-medium text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Community Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technology */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Our Technology</h3>
              <p className="text-gray-600 mb-6">
                Verte Tower combines IoT sensors, data analytics, and hydroponic technology to create 
                smart farming solutions that are accessible to everyone.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '📱', text: 'Real-time mobile monitoring' },
                  { icon: '📊', text: 'Automated data analytics' },
                  { icon: '⚡', text: 'Energy-efficient systems' },
                  { icon: '🌍', text: 'Climate-resilient design' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-green-600 text-xl mr-4">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Community Focus</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We work closely with local communities to ensure our solutions are culturally appropriate, 
                economically viable, and environmentally sustainable.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-4 text-lg">Our Community Programs:</h4>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Farmer training and workshops',
                    'Youth agriculture education',
                    'Women-led farming cooperatives',
                    'School farming initiatives',
                    'Community outreach programs',
                    'Sustainable practice training'
                  ].map((program, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Partners />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Agricultural Revolution</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Be part of the movement transforming how Ghana grows its food through sustainable technology and community empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors duration-200 shadow-lg">
              Get Started
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}