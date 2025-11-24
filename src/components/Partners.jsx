import React, { useState, useEffect } from "react";

// Local partner logos
import neipLogo from "../assets/partners/neip.png";
import innohubLogo from "../assets/partners/innohub.png";
import fidelityLogo from "../assets/partners/fidelity.png";
import koicaLogo from "../assets/partners/koica.png";
import kicLogo from "../assets/partners/kic.png";
import unicefLogo from "../assets/partners/unicef.png";
import mestLogo from "../assets/partners/mest.png";
import ugLogo from "../assets/partners/ug.jpg";
import totalenergies from "../assets/partners/total.png";

export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);

  // Local images used
  const partners = [
    { name: "NEIP", logo: neipLogo, url: "https://neip.gov.gh", category: "Government" },
    { name: "Innohub", logo: innohubLogo, url: "https://innohub.com.gh", category: "Incubator" },
    { name: "Fidelity Bank", logo: fidelityLogo, url: "https://fidelitybank.com.gh", category: "Banking" },
    { name: "KOICA", logo: koicaLogo, url: "https://koica.go.kr", category: "International Aid" },
    { name: "KIC", logo: kicLogo, url: "https://kosmosinnovationcenter.org", category: "Innovation" },
    { name: "UNICEF", logo: unicefLogo, url: "https://unicef.org/ghana", category: "UN Agency" },
    { name: "MEST Africa", logo: mestLogo, url: "https://meltwater.org", category: "Training" },
    { name: "UG Research & Innovation Directorate", logo: ugLogo, url: "https://rid.ug.edu.gh", category: "Academic" },
    { name: "Total Energies", logo: totalenergies, url: "https://totalenergies.com/", category: "Climate Innovation" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#14532D" }}>
            Our Valued Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading organizations to drive innovation and create sustainable impact.
          </p>
        </div>

        {/* Marquee */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex space-x-8 ${isPaused ? "animate-pause" : "animate-marquee"}`}>
            {partners.concat(partners).map((partner, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 h-20 bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition duration-300 fade-out"
              >
                <div className="flex items-center justify-center h-full">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>

        {/* Status */}
        <div className="flex justify-center items-center mt-6 space-x-4 text-sm">
          <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-gray-400" : "bg-green-500"}`}></span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="font-medium text-green-900 hover:text-green-700"
          >
            {isPaused ? "Resume" : "Pause"} Scroll
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-pause {
          animation-play-state: paused;
        }

        /* fade-out animation */
        .fade-out {
          animation: fade 0.5s ease-out;
        }
        @keyframes fade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
