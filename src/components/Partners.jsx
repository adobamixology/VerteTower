import React, { useState, useEffect } from "react";

export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);
  
  const partners = [
    {
      name: "National Entrepreneurship & Innovation Programme (NEIP)",
      logo: "https://neip.gov.gh/images/footer-logo.png",
      url: "https://neip.gov.gh",
      category: "Government"
    },
    {
      name: "Innohub",
      logo: "https://www.innohub.com.gh/img/logoW.png",
      url: "https://www.innohub.com.gh",
      category: "Incubator"
    },
    {
      name: "Fidelity Bank Ghana",
      logo: "https://www.fidelitybank.com.gh/themes/fidelity/images/logo.svg",
      url: "https://www.fidelitybank.com.gh",
      category: "Banking"
    },
    {
      name: "TotalEnergies Ghana",
      logo: "https://seeklogo.com/vector-logo/405344/totalenergies.svg",
      url: "https://totalenergies.gh",
      category: "Energy"
    },
    {
      name: "UNICEF",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_of_UNICEF_%28cropped%29.svg",
      url: "https://www.unicef.org/ghana",
      category: "UN Agency"
    },
    {
      name: "MEST Africa",
      logo: "https://meltwater.org/wp-content/uploads/2024/01/MEST-Logo_landscape_03-e1704132329210.png",
      url: "https://meltwater.org",
      category: "Training"
    },
    {
      name: "KOICA Ghana",
      logo: "https://www.koica.go.kr/koica_en/images/ci_img01.png",
      url: "https://www.koica.go.kr",
      category: "International Aid"
    },
    {
      name: "UG Research & Innovation Directorate",
      logo: "https://rid.ug.edu.gh/sites/default/files/ORID_LOGO%5B1%5D.jpg",
      url: "https://rid.ug.edu.gh",
      category: "Academic"
    },
    {
      name: "Ghana Climate Innovation Centre",
      logo: "https://gcic.gov.gh/wp-content/uploads/2023/07/GCIC-Logo-Full-Colour-RGB-1.png",
      url: "https://gcic.gov.gh",
      category: "Climate Innovation"
    },
    {
      name: "Kosmos Innovation Center",
      logo: "https://kosmosinnovationcenter.org/wp-content/uploads/2021/06/KIC-Logo-Color.png",
      url: "https://kosmosinnovationcenter.org",
      category: "Innovation"
    }
  ];

  // Group partners by category for filtered view
  const categories = [...new Set(partners.map(partner => partner.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPartners = activeCategory === "All" 
    ? partners 
    : partners.filter(partner => partner.category === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#14532D' }}>
            Our Valued Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading organizations to drive innovation and create sustainable impact in agriculture and technology.
          </p>
        </div>

        {/* Category Filter
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "All"
                ? "text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-700"
            }`}
            style={{ backgroundColor: activeCategory === "All" ? '#14532D' : 'transparent' }}
          >
            All Partners
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-700"
              }`}
              style={{ backgroundColor: activeCategory === category ? '#14532D' : 'transparent' }}
            >
              {category}
            </button>
          ))}
        </div>

        

        {/* Animated Marquee Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#14532D' }}>
              Trusted By Industry Leaders
            </h3>
            <p className="text-gray-600">Our growing network of partners</p>
          </div>

          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`flex space-x-8 ${isPaused ? 'animate-pause' : 'animate-marquee'}`}>
              {partners.concat(partners).map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48 h-20 bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-green-500'}`}></div>
              <span>{isPaused ? 'Paused' : 'Scrolling'}</span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-sm font-medium hover:text-green-700 transition-colors duration-200"
              style={{ color: '#14532D' }}
            >
              {isPaused ? 'Resume' : 'Pause'} scroll
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-green-50 rounded-2xl p-8 border border-green-200">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#14532D' }}>
            Want to become a partner?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our network of innovative organizations working together to transform agriculture through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg font-semibold text-white hover:shadow-md transition-all duration-200 shadow-sm"
              style={{ backgroundColor: '#14532D' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0f4a24'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#14532D'}
            >
              Get in Touch
            </a>
            <a
              href="/partnerships"
              className="border px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
              style={{ borderColor: '#14532D', color: '#14532D' }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#14532D';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#14532D';
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: fit-content;
        }
        .animate-pause {
          animation-play-state: paused;
        }
        
        /* Improve logo rendering */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}