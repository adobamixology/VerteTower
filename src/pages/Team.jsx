// import React from 'react'

// // Import team member images (you'll need to add these to your assets folder)
// // For now, I'll use placeholder images - replace with actual images
// import teamMember1 from '../assets/team/gina-headshot.jpg'
// import teamMember2 from '../assets/team/jenny-headshot.jpg'
// import teamMember3 from '../assets/team/edward-headshot.png'
// import teamMember4 from '../assets/team/charis-headshot.jpg'
// import teamMember5 from '../assets/team/kwame-headshot.jpg'
// import teamMember6 from '../assets/team/papelty-headshot.jpg'


// export default function Team() {
//   const teamMembers = [
//     {
//       name: "Georgina Boamah",
//       role: "Founder & CEO",
//       bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
//       image: teamMember1, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/kwamemensah",
//         facebook: "https://facebook.com/kwamemensah",
//         instagram: "https://instagram.com/kwamemensah"
//       }
//     },
//     {
//       name: "Jennifer O. Danquah",
//       role: "Co-Founder & CFO",
//       bio: "IoT and automation expert specializing in agricultural technology. Former tech lead at major agri-tech company.",
//       image: teamMember2, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/amaserwaa",
//         facebook: "https://facebook.com/amaserwaa",
//         instagram: "https://instagram.com/amaserwaa"
//       }
//     },
//     {
//       name: "Edward Addo Boakye",
//       role: "Designer & Developer",
//       bio: "Farm management specialist with expertise in hydroponic systems. 10+ years in agricultural operations.",
//       image: teamMember3, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/kofianokye",
//         facebook: "https://facebook.com/kofianokye",
//         instagram: "https://instagram.com/kofianokye"
//       }
//     },
//     {
//       name: "Charis Borquaye",
//       role: "Business Development Officer",
//       bio: "Plant biologist focused on optimizing growth in controlled environments. Masters in Plant Biotechnology.",
//       image: teamMember4, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/esiboateng",
//         facebook: "https://facebook.com/esiboateng",
//         instagram: "https://instagram.com/esiboateng"
//       }
//     },
//     {
//       name: "Kwame Amoah Mintah",
//       role: "Data Analyst",
//       bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
//       image: teamMember5, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/kwamemensah",
//         facebook: "https://facebook.com/kwamemensah",
//         instagram: "https://instagram.com/kwamemensah"
//       }
//     },
//     {
//       name: "Papelty Adobea Sam",
//       role: "Marketing Assistant",
//       bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
//       image: teamMember6, // Replace with actual image path
//       social: {
//         linkedin: "https://linkedin.com/in/kwamemensah",
//         facebook: "https://facebook.com/kwamemensah",
//         instagram: "https://instagram.com/kwamemensah"
//       }
//     }
//   ]

//   // Social media icon component
//   const SocialIcons = ({ social }) => (
//     <div className="flex justify-center space-x-4 mt-4">
//       <a 
//         href={social.linkedin} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="text-gray-400 hover:text-blue-600 transition duration-300 transform hover:scale-110"
//         aria-label="LinkedIn"
//       >
//         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//         </svg>
//       </a>
//       <a 
//         href={social.facebook} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="text-gray-400 hover:text-blue-800 transition duration-300 transform hover:scale-110"
//         aria-label="Facebook"
//       >
//         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//         </svg>
//       </a>
//       <a 
//         href={social.instagram} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="text-gray-400 hover:text-pink-600 transition duration-300 transform hover:scale-110"
//         aria-label="Instagram"
//       >
//         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
//         </svg>
//       </a>
//     </div>
//   )

//   // Fallback component for missing images
//   const ImageWithFallback = ({ src, alt, name }) => {
//     const [imageError, setImageError] = React.useState(false)
    
//     if (imageError) {
//       return (
//         <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
//           {name.split(' ').map(n => n[0]).join('')}
//         </div>
//       )
//     }
    
//     return (
//       <img
//         src={src}
//         alt={alt}
//         className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
//         onError={() => setImageError(true)}
//       />
//     )
//   }

//   return (
//     <div className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold text-green-900 mb-4">Meet Our Team</h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Passionate individuals driving innovation in sustainable agriculture and hydroponic technology
//           </p>
//         </div>

//         {/* Team Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {teamMembers.map((member, index) => (
//             <div 
//               key={index} 
//               className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50"
//             >
//               <div className="relative">
//                 <ImageWithFallback 
//                   src={member.image} 
//                   alt={member.name}
//                   name={member.name}
//                 />
//                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {member.role}
//                 </div>
//               </div>
              
//               <h3 className="text-xl font-semibold text-green-900 mb-3 mt-6">{member.name}</h3>
//               <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
              
//               <SocialIcons social={member.social} />
//             </div>
//           ))}
//         </div>

//         {/* Company Values Section */}
//         <div className="bg-green-50 rounded-3xl p-8 md:p-12">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-green-900 mb-4">Our Values & Mission</h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Guided by principles that drive our innovation and commitment to sustainable agriculture
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center p-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-green-900 mb-3">Sustainability</h3>
//               <p className="text-gray-600">
//                 Committed to environmental stewardship and creating farming solutions that protect our planet for future generations.
//               </p>
//             </div>
            
//             <div className="text-center p-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-green-900 mb-3">Innovation</h3>
//               <p className="text-gray-600">
//                 Continuously pushing boundaries in agricultural technology to create smarter, more efficient farming solutions.
//               </p>
//             </div>
            
//             <div className="text-center p-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-green-900 mb-3">Community</h3>
//               <p className="text-gray-600">
//                 Empowering communities through knowledge sharing, support, and creating accessible farming solutions for all.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Join Our Team CTA */}
//         <div className="text-center mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white">
//           <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
//           <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
//             We're always looking for passionate individuals who want to make a difference in sustainable agriculture.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a 
//               href="mailto:careers@vertetower.com" 
//               className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
//             >
//               Send Your CV
//             </a>
//             <a 
//               href="/contact" 
//               className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
//             >
//               Contact HR
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import React, { useState } from 'react'

// // Import team member images
// import teamMember1 from '../assets/team/gina-headshot.jpg'
// import teamMember2 from '../assets/team/jenny-headshot.jpg'
// import teamMember3 from '../assets/team/edward-headshot.png'
// import teamMember4 from '../assets/team/charis-headshot.jpg'
// import teamMember5 from '../assets/team/kwame-headshot.jpg'
// import teamMember6 from '../assets/team/papelty-headshot.jpg'

// export default function Team() {
//   const [activeMember, setActiveMember] = useState(null)

//   const teamMembers = [
//     {
//       name: "Georgina Boamah",
//       role: "Founder & CEO",
//       bio: "Agricultural scientist with 15+ years experience in sustainable farming. PhD in Agricultural Engineering from KNUST.",
//       image: teamMember1,
//       social: {
//         linkedin: "https://linkedin.com/in/georginaboamah",
//         facebook: "https://facebook.com/georginaboamah",
//         instagram: "https://instagram.com/georginaboamah"
//       },
//       expertise: ["Sustainable Farming", "Agricultural Engineering", "Leadership"],
//       achievements: "Led 50+ sustainable farming projects across West Africa"
//     },
//     {
//       name: "Jennifer O. Danquah",
//       role: "Co-Founder & CFO",
//       bio: "IoT and automation expert specializing in agricultural technology. Former tech lead at major agri-tech company.",
//       image: teamMember2,
//       social: {
//         linkedin: "https://linkedin.com/in/jenniferdanquah",
//         facebook: "https://facebook.com/jenniferdanquah",
//         instagram: "https://instagram.com/jenniferdanquah"
//       },
//       expertise: ["IoT Systems", "Financial Management", "Tech Innovation"],
//       achievements: "Developed award-winning automation systems for vertical farming"
//     },
//     {
//       name: "Edward Addo Boakye",
//       role: "Designer & Developer",
//       bio: "Farm management specialist with expertise in hydroponic systems. 10+ years in agricultural operations.",
//       image: teamMember3,
//       social: {
//         linkedin: "https://linkedin.com/in/edwardaddo",
//         facebook: "https://facebook.com/edwardaddo",
//         instagram: "https://instagram.com/edwardaddo"
//       },
//       expertise: ["Hydroponic Systems", "UI/UX Design", "Full-Stack Development"],
//       achievements: "Designed 100+ efficient farming layouts and digital solutions"
//     },
//     {
//       name: "Charis Borquaye",
//       role: "Business Development Officer",
//       bio: "Plant biologist focused on optimizing growth in controlled environments. Masters in Plant Biotechnology.",
//       image: teamMember4,
//       social: {
//         linkedin: "https://linkedin.com/in/charisborquaye",
//         facebook: "https://facebook.com/charisborquaye",
//         instagram: "https://instagram.com/charisborquaye"
//       },
//       expertise: ["Plant Biology", "Business Strategy", "Client Relations"],
//       achievements: "Expanded operations to 3 new countries in 2 years"
//     },
//     {
//       name: "Kwame Amoah Mintah",
//       role: "Data Analyst",
//       bio: "Data science expert with focus on agricultural analytics and predictive modeling for crop optimization.",
//       image: teamMember5,
//       social: {
//         linkedin: "https://linkedin.com/in/kwamemintah",
//         facebook: "https://facebook.com/kwamemintah",
//         instagram: "https://instagram.com/kwamemintah"
//       },
//       expertise: ["Data Analytics", "Machine Learning", "Predictive Modeling"],
//       achievements: "Improved crop yield predictions by 35% through advanced analytics"
//     },
//     {
//       name: "Papelty Adobea Sam",
//       role: "Marketing Assistant",
//       bio: "Digital marketing specialist with expertise in agricultural branding and community engagement strategies.",
//       image: teamMember6,
//       social: {
//         linkedin: "https://linkedin.com/in/papeltysam",
//         facebook: "https://facebook.com/papeltysam",
//         instagram: "https://instagram.com/papeltysam"
//       },
//       expertise: ["Digital Marketing", "Brand Strategy", "Community Engagement"],
//       achievements: "Grew social media presence by 300% in one year"
//     }
//   ]

//   // Enhanced Social Icons Component
//   const SocialIcons = ({ social, variant = "default" }) => {
//     const sizeClass = variant === "large" ? "w-6 h-6" : "w-5 h-5"
//     const containerClass = variant === "large" ? "space-x-6" : "space-x-4"
    
//     return (
//       <div className={`flex justify-center ${containerClass} mt-4`}>
//         <a 
//           href={social.linkedin} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-[#0077B5] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
//           aria-label="LinkedIn"
//         >
//           <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
//             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//           </svg>
//         </a>
//         <a 
//           href={social.facebook} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-[#1877F2] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
//           aria-label="Facebook"
//         >
//           <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
//             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//           </svg>
//         </a>
//         <a 
//           href={social.instagram} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-[#E4405F] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
//           aria-label="Instagram"
//         >
//           <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
//           </svg>
//         </a>
//       </div>
//     )
//   }

//   // Enhanced Image Component with loading state
//   const ProfessionalImage = ({ src, alt, name }) => {
//     const [imageError, setImageError] = useState(false)
//     const [imageLoaded, setImageLoaded] = useState(false)

//     if (imageError) {
//       return (
//         <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-xl">
//           {name.split(' ').map(n => n[0]).join('')}
//         </div>
//       )
//     }
    
//     return (
//       <div className="relative mx-auto mb-4">
//         <div className={`w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-95'}`}>
//           <img
//             src={src}
//             alt={alt}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//             onError={() => setImageError(true)}
//             onLoad={() => setImageLoaded(true)}
//           />
//         </div>
//         <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-green-400 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
//       </div>
//     )
//   }

//   // Team Member Modal
//   const TeamMemberModal = ({ member, onClose }) => {
//     if (!member) return null

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
//         <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
//           <div className="relative p-8">
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//             >
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             <div className="text-center mb-8">
//               <ProfessionalImage src={member.image} alt={member.name} name={member.name} />
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
//               <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
//                 {member.role}
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
//                 <p className="text-gray-600 leading-relaxed">{member.bio}</p>
//               </div>

//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
//                 <p className="text-gray-600 leading-relaxed">{member.achievements}</p>
//               </div>

//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {member.expertise.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Connect with {member.name.split(' ')[0]}</h4>
//                 <SocialIcons social={member.social} variant="large" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Enhanced Header */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
//             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//             </svg>
//             Meet the Innovators
//           </div>
//           <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//             Our Leadership Team
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Driven by passion and expertise, our team combines decades of experience in agriculture, 
//             technology, and sustainability to revolutionize farming for future generations.
//           </p>
//         </div>

//         {/* Enhanced Team Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
//           {teamMembers.map((member, index) => (
//             <div 
//               key={index} 
//               className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-green-100 overflow-hidden"
//               onMouseEnter={() => setActiveMember(index)}
//               onMouseLeave={() => setActiveMember(null)}
//             >
//               {/* Background Gradient Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
//               <div className="relative z-10">
//                 <ProfessionalImage src={member.image} alt={member.name} name={member.name} />
                
//                 <div className="text-center">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
//                     {member.name}
//                   </h3>
                  
//                   <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4 transform group-hover:scale-105 transition-transform duration-300">
//                     {member.role}
//                   </div>
                  
//                   <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
//                     {member.bio}
//                   </p>
                  
//                   <div className="flex flex-wrap justify-center gap-2 mb-6">
//                     {member.expertise.slice(0, 2).map((skill, skillIndex) => (
//                       <span
//                         key={skillIndex}
//                         className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {member.expertise.length > 2 && (
//                       <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
//                         +{member.expertise.length - 2} more
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex justify-center space-x-4">
//                     <button
//                       onClick={() => setActiveMember(member)}
//                       className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center"
//                     >
//                       View Profile
//                       <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                       </svg>
//                     </button>
//                   </div>

//                   <SocialIcons social={member.social} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Enhanced Values Section */}
//         <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-20 transform hover:shadow-2xl transition-all duration-500">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
//             <p className="text-green-100 text-xl max-w-3xl mx-auto leading-relaxed">
//               These principles guide every decision we make and every innovation we pursue in our mission to transform agriculture.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 ),
//                 title: "Sustainability First",
//                 description: "We prioritize environmental stewardship in every solution, ensuring our farming methods protect and regenerate natural ecosystems for future generations."
//               },
//               {
//                 icon: (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 ),
//                 title: "Innovation Driven",
//                 description: "Continuous research and development drive our mission to create smarter, more efficient agricultural technologies that push industry boundaries."
//               },
//               {
//                 icon: (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 ),
//                 title: "Community Empowerment",
//                 description: "We believe in sharing knowledge and creating accessible solutions that empower communities to achieve food sovereignty and economic resilience."
//               }
//             ].map((value, index) => (
//               <div key={index} className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
//                 <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-30 transition-all duration-300">
//                   <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {value.icon}
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
//                 <p className="text-green-100 leading-relaxed">
//                   {value.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Enhanced CTA Section */}
//         <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
//           <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
//             We're always looking for passionate individuals who want to make a meaningful impact 
//             in sustainable agriculture and food security.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <a 
//               href="mailto:careers@vertetower.com" 
//               className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center group"
//             >
//               <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Send Your CV
//             </a>
//             <a 
//               href="/contact" 
//               className="border-2 border-green-600 text-green-600 px-10 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center group"
//             >
//               <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               Contact HR Team
//             </a>
//           </div>
//           <p className="text-gray-500 mt-8 text-sm">
//             Follow us on social media for updates and career opportunities
//           </p>
//         </div>
//       </div>

//       {/* Team Member Modal */}
//       <TeamMemberModal 
//         member={activeMember} 
//         onClose={() => setActiveMember(null)} 
//       />

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.4s ease-out;
//         }
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   )
// }


import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Import team member images
import teamMember1 from '../assets/team/gina-headshot.jpg'
import teamMember2 from '../assets/team/jenny-headshot.jpg'
import teamMember3 from '../assets/team/edward-headshot.png'
import teamMember4 from '../assets/team/charis-headshot.jpg'
import teamMember5 from '../assets/team/kwame-headshot.jpg'
import teamMember6 from '../assets/team/nanaama-headshot.jpg'
import teamMember7 from '../assets/team/rafia-headshot.jpg'


export default function Team() {
  const [activeMember, setActiveMember] = useState(null)

  const teamMembers = [
    {
      id: 1,
      name: "Georgina Boamah",
      role: "Chief Executive Officer",
      bio: "With 7+ years’ experience in sustainable community development and entrepreneurship and a background in Biochemistry, Georgina combines science and innovation to drive social impact and empower communities.",
      image: teamMember1,
      social: {
        linkedin: "https://www.linkedin.com/in/yaa-kwartemaa-boamah/",
        facebook: "https://facebook.com/georginaboamah",
        instagram: "https://instagram.com/georginaboamah"
      },
      expertise: ["Climate-Smart Agriculture","Sustainable Development", "Entreprenuraship & Leadership", "Biomedical Research","Social Innovation","Community Empowerment"],
      achievements: "Founded Verte Tower, advancing climate-smart urban and peri-urban agriculture. Contributed to biomedical research on COVID-19, malaria, and soil-transmitted helminths. Led and supported community empowerment projects promoting sustainability and inclusive growth.",
    },
    {
      id: 2,
      name: "Jennifer O. Danquah",
      role: "Chief Finance & Sustainability Officer",
      bio: "Sustainability Advocate | Environmental Scientist | Finance Professional | Co-founder | Changemaker. Jennifer believes that “Sustainability is not just a buzzword—it’s a necessity.” With a background in Environmental Science and professional experience in Finance, she thrives at the intersection of business and sustainability, developing solutions that drive both profitability and positive impact.Passionate about innovation and long-term change, Jennifer channels her expertise into initiatives that promote responsible growth and environmental stewardship. As a co-founder, leader, and volunteer, she is deeply committed to collective action and empowering others to build a more sustainable future.",
      image: teamMember2,
      social: {
        linkedin: "https://www.linkedin.com/in/odanquahjennifer/",
        facebook: "https://facebook.com/jenniferdanquah",
        instagram: "https://instagram.com/jenniferdanquah"
      },
      expertise: ["Sustainability & Environmental Management", "Sustainable Finance","Leadership & Collaboration","Innovation & Impact Strategy","Community Engagement & Advocacy"],
      achievements: "Co-founded initiatives promoting sustainable business practices and environmental awareness. Bridged finance and sustainability to support green innovation and responsible investments. Led and participated in community and volunteer projects focused on environmental impact. Advocated for sustainable development goals (SDGs) through education and collaboration."
    },
    {
      id: 3,
      name: "Charis Borquaye",
      role: "Business Development Officer",
      bio: "Investment Professional | Private Equity | Development Finance | Impact Investing | Financial Modeling | Equity Investments | Valuation. Charis is an investment professional passionate about fueling the growth of private companies across Africa through private equity, development finance, and impact investing. With over three years of experience in investment banking and four years as an equity investor, she brings strong expertise in financial modeling, valuation, due diligence, and business analysis. Driven by a commitment to closing the financing gap for African enterprises, Charis focuses on unlocking opportunities in underserved markets, supporting entrepreneurs, and driving sustainable economic growth. Her approach blends analytical precision with strategic insight to deliver both financial returns and social impact.",
      image: teamMember4,
      social: {
        linkedin: "https://www.linkedin.com/in/charisborquaye/",
        facebook: "https://facebook.com/charisborquaye",
        instagram: "https://instagram.com/charisborquaye"
      },
      expertise: ["Private Equity & Impact Investing","Financial Modeling & Valuation","Development Finance","Investment Analysis & Due Diligence", "Business Strategy & Portfolio Management", "Negotiation & Stakeholder Engagement"],
      achievements: "Structured and managed equity investment deals supporting SMEs across Africa. Led financial modeling and company valuation for investment opportunities. Conducted due diligence and market research to inform strategic investment decisions. Partnered with investors and development agencies to advance impact-driven financing initiatives."
    },
    {
      id: 6,
      name: "Nana Ama Serwaa Osei",
      role: "Nutritionist and Food Scientist",
      bio: "MSc. Bioethics Candidate | Registered Nutritionist | Nutrition Content Strategist | Research Assistant | Digital Marketer. Nana Ama is a passionate advocate for SDGs 2, 3, 4 & 5, STEM, and youth and women empowerment. With a background in Nutrition and Food Science, she began her journey improving health through better diets, later expanding her focus to the ethical dimensions of health and nutrition. As an aspiring bioethicist, she explores how ethics can guide research, policy, and public health practices, particularly in Africa where issues of access, fairness, and cultural respect are most profound.",
      image: teamMember6,
      social: {
        linkedin: "https://www.linkedin.com/in/nana-ama-serwaa-osei-r-nutr-b9519918b/",
        facebook: "https://facebook.com/nanaamaosei",
        instagram: "https://instagram.com/nanaamaosei"
      },
      expertise: ["Nutrition & Food Science", "Bioethics & Public Health Ethics", "Research & Policy Analysis", "Content Strategy & Digital Marketing", "Advocacy & Community Engagement","Women and Youth Empowerment"],
      achievements: "Conducted research and policy analysis in nutrition and public health ethics. Created impactful nutrition and health content to promote awareness and behavior change.Advocated for ethical and equitable health systems through education and outreach. Collaborated on initiatives advancing women’s empowerment and STEM education."
    },
    {
      id: 4,
      name: "Edward Addo Boakye",
      role: "Designer & Web Developer",
      bio: "Edward is a highly detail-oriented and results-driven MERN Stack Developer with a strong passion for creating robust, scalable, and secure web applications that address real-world challenges. He possesses hands-on experience in Node.js, Express.js, MongoDB, NestJS, and Prisma, specializing in the development of RESTful APIs, database management, and the integration of third-party services to support modern, high-performing applications. He has a solid foundation in data structures, authentication systems, and performance optimization, and adheres to clean coding principles to deliver maintainable and efficient software solutions. Proficient with industry-standard tools such as Postman and Git, Edward ensures seamless development workflows, reliable deployments, and effective collaboration across teams. Driven by continuous learning and innovation, he remains committed to leveraging technology to build impactful, user-centered solutions that enhance productivity and create measurable value.",
      image: teamMember3,
      social: {
        linkedin: "https://www.linkedin.com/in/edward-addo-boakye1101/",
        facebook: "https://facebook.com/edwardaddo",
        instagram: "https://instagram.com/edwardaddo"
      },
      expertise: ["Backend Development (Node.js, Express.js, NestJS, Prisma)", "MERN Stack Development", "Database Design & Management (MongoDB)", "RESTful API Development", "IT Support & Troubleshooting","Graphic Design & UI Enhancement","Version Control (Git, GitHub)", "Testing & Debugging (Postman,Thunder Client),", "Deployment using Netlify, Vercel, etc"],
      achievements: "Built and deployed RESTful APIs using Node.js, Express.js, and MongoDB. Integrated third-party services and APIs to enhance system functionality. Optimized backend performance and implemented secure authentication systems. Provided IT support and technical troubleshooting across multiple platforms. Designed visual assets and UI elements using creative tools such as Adobe Photoshop, Illustrator, Canva, and Figma to improve user experience."
    },
    {
      id: 5,
      name: "Kwame Amoah Mintah",
      role: "Data Analyst",
      bio: "Political Research & Data Analyst | Data Engineer Associate | Microsoft Excel | Power BI | SQL | Python. Kwame is an early-career data professional with a background in Political Science and a growing specialization in data analysis and engineering. He is passionate about leveraging research and data to understand and improve the systems that shape societies. Driven by curiosity and a commitment to evidence-based decision-making, he focuses on applying data to policy evaluation, social impact research, and political behavior analysis. Currently enrolled in the Blossom Academy Data Analysis Program, he is building advanced skills in data analytics, statistical tools, and data storytelling—strengthening his ability to turn complex datasets into meaningful insights that drive informed action.",
      image: teamMember5,
      social: {
        linkedin: "https://www.linkedin.com/in/kwame-amoah-mintah/",
        facebook: "https://facebook.com/kwamemintah",
        instagram: "https://instagram.com/kwamemintah"
      },
      expertise: ["Data Analysis & Visualization","Research & Policy Evaluation","SQL & Python Programming","Power BI & Excel Analytics","Data Storytelling","Political and Social Data Research"],
      achievements: "Conducted research and data-driven studies on political and social systems. Developed data dashboards and reports using Microsoft Excel and Power BI. Applied SQL and Python for data management, cleaning, and analysis."
    },
    {
      id: 7,
      name: "Rafia Kanyity Imoro-Kipo",
      role: "Marketing & Administrative Assistant",
      bio: "Research Assistant | Climate Change Advocate | Community Engagement & Collaboration | Public Speaker | Business-Oriented Professional. Rafia is an Environmental and Sustainability enthusiast passionate about research, advocacy, and environmental stewardship. She is dedicated to promoting awareness and driving action on key issues such as climate change, conservation, and sustainable development. With a strong commitment to collaboration and innovation, she seeks to inspire others to protect natural resources and contribute to a healthier planet.",
      image: teamMember7,
      social: {
        linkedin: "https://www.linkedin.com/in/rafia-imoro-kipo/",
        facebook: "https://web.facebook.com/rafia.imoro.2025",
        instagram: "https://www.instagram.com/ms__raf/"
      },
      expertise: ["Environmental Research & Sustainability","Climate Change Advocacy","Community Engagement & Collaboration","Public Speaking & Awareness Campaigns","Business & Project Management"],
      achievements: "Improved crop yield predictions by 35% through advanced analytics"
    },
  ]

  // Enhanced Social Icons Component
  const SocialIcons = ({ social, variant = "default" }) => {
    if (!social) return null
    
    const sizeClass = variant === "large" ? "w-6 h-6" : "w-5 h-5"
    const containerClass = variant === "large" ? "space-x-6" : "space-x-4"
    
    return (
      <div className={`flex justify-center ${containerClass} mt-4`}>
        {social.linkedin && (
          <a 
            href={social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0077B5] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
        {social.facebook && (
          <a 
            href={social.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1877F2] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            aria-label="Facebook"
          >
            <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        )}
        {social.instagram && (
          <a 
            href={social.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#E4405F] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            aria-label="Instagram"
          >
            <svg className={sizeClass} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
            </svg>
          </a>
        )}
      </div>
    )
  }

  // Enhanced Image Component with loading state
  const ProfessionalImage = ({ src, alt, name }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    if (imageError) {
      return (
        <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-xl">
          {name?.split(' ').map(n => n[0]).join('') || '?'}
        </div>
      )
    }
    
    return (
      <div className="relative mx-auto mb-4 flex justify-center">
        <div className={`w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-95'}`}>
          <img
            src={src}
            alt={alt || 'Team member'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-green-400 to-green-700 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    )
  }

  // Team Member Modal - FIXED VERSION
  const TeamMemberModal = ({ member, onClose }) => {
    if (!member) return null

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-8">
              <ProfessionalImage 
                src={member.image} 
                alt={member.name} 
                name={member.name} 
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name || 'Team Member'}</h3>
              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
                {member.role || 'Team Role'}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio || 'No biography available.'}
                </p>
              </div>

              {member.achievements && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <p className="text-gray-600 leading-relaxed">{member.achievements}</p>
                </div>
              )}

              {member.expertise && member.expertise.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Connect with {member.name?.split(' ')[0] || 'Team Member'}
                </h4>
                <SocialIcons social={member.social} variant="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Meet the Innovators
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent">Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Driven by passion and expertise, our team combines decades of experience in agriculture, 
            technology, and sustainability to revolutionize farming for future generations.
          </p>
        </div>

        {/* Enhanced Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-green-100 overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <ProfessionalImage 
                  src={member.image} 
                  alt={member.name} 
                  name={member.name} 
                />
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-800 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4 transform group-hover:scale-105 transition-transform duration-300">
                    {member.role}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          +{member.expertise.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setActiveMember(member)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      View Profile
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                  <SocialIcons social={member.social} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Values Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white mb-20 transform hover:shadow-2xl transition-all duration-500">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-green-100 text-xl max-w-3xl mx-auto leading-relaxed">
              These principles guide every decision we make and every innovation we pursue in our mission to transform agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: "Sustainability First",
                description: "We prioritize environmental stewardship in every solution, ensuring our farming methods protect and regenerate natural ecosystems for future generations."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: "Innovation Driven",
                description: "Continuous research and development drive our mission to create smarter, more efficient agricultural technologies that push industry boundaries."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
                title: "Community Empowerment",
                description: "We believe in sharing knowledge and creating accessible solutions that empower communities to achieve food sovereignty and economic resilience."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-30 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-green-100 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <h2 className="text-4xl font-bold text-green-900 mb-6">Join Our Mission</h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            We're always looking for passionate individuals who want to make a meaningful impact 
            in sustainable agriculture and food security.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
  href="mailto:info@vertetower.com"
  className="flex items-center text-white bg-green-600 hover:bg-green-700 font-medium px-4 py-2 rounded-lg transition-all duration-300 group"
>
  <svg
    className="w-5 h-5 mr-3 group-hover:animate-bounce"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
  Send Your CV
</a>
            <Link 
              to="/contact" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-green-600 text-green-600 px-10 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center group"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Contact HR Team
            </Link>
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            Follow us on social media for updates and career opportunities
          </p>
        </div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal 
        member={activeMember} 
        onClose={() => setActiveMember(null)} 
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}