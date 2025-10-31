import React from 'react'

// Import team member images (you'll need to add these to your assets folder)
// For now, I'll use placeholder images - replace with actual images
import teamMember1 from '../assets/team/gina-headshot.jpg'
import teamMember2 from '../assets/team/jenny-headshot.jpg'
import teamMember3 from '../assets/team/edward-headshot.png'
import teamMember4 from '../assets/team/charis-headshot.jpg'
import teamMember5 from '../assets/team/kwame-headshot.jpg'
import teamMember6 from '../assets/team/papelty-headshot.jpg'


export default function Team() {
  const teamMembers = [
    {
      name: "Georgina Boamah",
      role: "Founder & CEO",
      bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
      image: teamMember1, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/kwamemensah",
        facebook: "https://facebook.com/kwamemensah",
        instagram: "https://instagram.com/kwamemensah"
      }
    },
    {
      name: "Jennifer O. Danquah",
      role: "Co-Founder & CFO",
      bio: "IoT and automation expert specializing in agricultural technology. Former tech lead at major agri-tech company.",
      image: teamMember2, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/amaserwaa",
        facebook: "https://facebook.com/amaserwaa",
        instagram: "https://instagram.com/amaserwaa"
      }
    },
    {
      name: "Edward Addo Boakye",
      role: "Designer & Developer",
      bio: "Farm management specialist with expertise in hydroponic systems. 10+ years in agricultural operations.",
      image: teamMember3, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/kofianokye",
        facebook: "https://facebook.com/kofianokye",
        instagram: "https://instagram.com/kofianokye"
      }
    },
    {
      name: "Charis Borquaye",
      role: "Business Development Officer",
      bio: "Plant biologist focused on optimizing growth in controlled environments. Masters in Plant Biotechnology.",
      image: teamMember4, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/esiboateng",
        facebook: "https://facebook.com/esiboateng",
        instagram: "https://instagram.com/esiboateng"
      }
    },
    {
      name: "Kwame Amoah Mintah",
      role: "Data Analyst",
      bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
      image: teamMember5, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/kwamemensah",
        facebook: "https://facebook.com/kwamemensah",
        instagram: "https://instagram.com/kwamemensah"
      }
    },
    {
      name: "Papelty Adobea Sam",
      role: "Marketing Assistant",
      bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
      image: teamMember6, // Replace with actual image path
      social: {
        linkedin: "https://linkedin.com/in/kwamemensah",
        facebook: "https://facebook.com/kwamemensah",
        instagram: "https://instagram.com/kwamemensah"
      }
    }
  ]

  // Social media icon component
  const SocialIcons = ({ social }) => (
    <div className="flex justify-center space-x-4 mt-4">
      <a 
        href={social.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-600 transition duration-300 transform hover:scale-110"
        aria-label="LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
      <a 
        href={social.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-800 transition duration-300 transform hover:scale-110"
        aria-label="Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <a 
        href={social.instagram} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-600 transition duration-300 transform hover:scale-110"
        aria-label="Instagram"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
        </svg>
      </a>
    </div>
  )

  // Fallback component for missing images
  const ImageWithFallback = ({ src, alt, name }) => {
    const [imageError, setImageError] = React.useState(false)
    
    if (imageError) {
      return (
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      )
    }
    
    return (
      <img
        src={src}
        alt={alt}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
        onError={() => setImageError(true)}
      />
    )
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals driving innovation in sustainable agriculture and hydroponic technology
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50"
            >
              <div className="relative">
                <ImageWithFallback 
                  src={member.image} 
                  alt={member.name}
                  name={member.name}
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {member.role}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-green-900 mb-3 mt-6">{member.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
              
              <SocialIcons social={member.social} />
            </div>
          ))}
        </div>

        {/* Company Values Section */}
        <div className="bg-green-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Our Values & Mission</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Guided by principles that drive our innovation and commitment to sustainable agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Committed to environmental stewardship and creating farming solutions that protect our planet for future generations.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously pushing boundaries in agricultural technology to create smarter, more efficient farming solutions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Empowering communities through knowledge sharing, support, and creating accessible farming solutions for all.
              </p>
            </div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference in sustainable agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@vertetower.com" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
            >
              Send Your CV
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
            >
              Contact HR
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}