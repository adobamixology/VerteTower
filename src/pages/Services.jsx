import React from 'react'

export default function Services() {
  const services = [
    {
      title: "Smart Hydroponic Towers",
      description: "Advanced vertical farming systems with integrated IoT monitoring for optimal plant growth.",
      icon: "🌱",
      features: ["IoT Sensors", "Automated Nutrient Delivery", "Real-time Monitoring"]
    },
    {
      title: "Farm Setup & Installation",
      description: "Complete turnkey solutions for setting up your hydroponic farm from ground up.",
      icon: "🏗️",
      features: ["Site Assessment", "System Installation", "Training & Support"]
    },
    {
      title: "Monitoring & Analytics",
      description: "Real-time data tracking and analytics to optimize your farm's performance.",
      icon: "📊",
      features: ["Live Dashboard", "Growth Analytics", "Yield Prediction"]
    },
    {
      title: "Training & Education",
      description: "Comprehensive training programs for farmers and agricultural enthusiasts.",
      icon: "🎓",
      features: ["Hands-on Workshops", "Online Courses", "Technical Support"]
    },
    {
      title: "Maintenance Services",
      description: "Regular maintenance and support to keep your systems running smoothly.",
      icon: "🔧",
      features: ["Scheduled Maintenance", "24/7 Support", "Parts Replacement"]
    },
    {
      title: "Consulting",
      description: "Expert consulting services for commercial hydroponic farm planning.",
      icon: "💼",
      features: ["Feasibility Studies", "Business Planning", "Market Analysis"]
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for modern hydroponic farming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 border border-green-100">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}