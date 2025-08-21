import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

export default function Sponsers() {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  
  // Scroll progress for the sponsors section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Get responsive slides per view
  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3; // Large desktop
      if (window.innerWidth >= 1024) return 2.5; // Desktop
      if (window.innerWidth >= 768) return 2;  // Tablet
      if (window.innerWidth >= 640) return 1.5; // Small tablet
      return 1; // Mobile
    }
    return 3;
  };

  // Check if mobile
  const checkIsMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  const sponsorsData = [
    {
      name: "Razorpay",
      bgColor: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)",
      image: "/sponser/razorpay.png",
      description:
        "Leading payment gateway solution empowering businesses with seamless transactions.",
      website: "https://razorpay.com",
      accent: "#31C4BF",
    },
    {
      name: "Oracle",
      bgColor: "linear-gradient(135deg, #164e63 0%, #0891b2 50%, #06b6d4 100%)",
      image: "/sponser/oracale.png",
      description:
        "Global technology leader providing cloud computing and database solutions.",
      website: "https://oracle.com",
      accent: "#67e8f9",
    },
    {
      name: "JP Morgan Chase & Co.",
      bgColor: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
      image: "/sponser/jpmorgan.png",
      description:
        "Leading global financial services firm driving innovation in banking.",
      website: "https://jpmorganchase.com",
      accent: "#22d3ee",
    },
    {
      name: "Newton School",
      bgColor: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
      image: "/sponser/nslogo.png",
      description:
        "Transforming careers through practical, industry-relevant tech education.",
      website: "https://newtonschool.co",
      accent: "#60a5fa",
    },
    {
      name: "Microsoft",
      bgColor: "linear-gradient(135deg, #155e75 0%, #0891b2 50%, #22d3ee 100%)",
      image: "/sponser/Microsoft-Logo.png",
      description:
        "Empowering every person and organization on the planet to achieve more.",
      website: "https://www.microsoft.com/en-in",
      accent: "#67e8f9",
    },
    {
      name: "Sabre",
      bgColor: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)",
      image: "/sponser/Sabre_Corporation_logo.png",
      description: "Technology solutions that take travel to the next level.",
      website: "https://www.sabre.com/",
      accent: "#31C4BF",
    },
  ];

  // Create enough duplicates for smooth infinite scrolling
  const infiniteSponsors = [...sponsorsData, ...sponsorsData, ...sponsorsData]; // 18 cards total

  // Transform scroll progress to smooth carousel movement (desktop only)
  const getScrollDistance = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return "-100vw"; // Fast for large desktop
      if (window.innerWidth >= 1024) return "-120vw"; // Fast for desktop
      if (window.innerWidth >= 768) return "-150vw"; // Fast for tablet
      return "-80vw"; // Slower for mobile - decreased from -200vw
    }
    return "-150vw";
  };

  // Smooth transform using vw units like teams section
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", getScrollDistance()]);

  // Mobile navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sponsorsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sponsorsData.length) % sponsorsData.length);
  };

  // Auto-advance for mobile (optional - can be controlled)
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsorsData.length);
    }, 4000); // Auto-advance every 4 seconds on mobile

    return () => clearInterval(interval);
  }, [isMobile]);

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
      setIsMobile(checkIsMobile());
    };
    
    // Set initial values
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modern Sponsor Card Component with Framer Motion
  const SponsorCard = ({ sponsor, index }) => (
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{ background: sponsor.bgColor }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-24 sm:h-32 mb-3 sm:mb-4">
            <motion.img
              src={sponsor.image}
              alt={sponsor.name}
              className="max-h-16 max-w-24 sm:max-h-20 sm:max-w-32 object-contain filter brightness-110"
              loading="lazy"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {sponsor.name}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm text-center leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {sponsor.description}
          </p>

          {/* Website Link */}
          <div className="flex justify-center">
            <motion.a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Visit Website
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Hover Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );

  return (
    <div 
      id="sponsors"
      ref={sectionRef}
    >
      <div className="bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f] min-h-[120vh] sm:min-h-[130vh] lg:min-h-[150vh] relative overflow-hidden">
        {/* Unified background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Animated decorative elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg" />
          </motion.div>
        ))}

        {/* Header Section */}
        <div 
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Our Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#31C4BF] to-[#3b82f6] mt-1 sm:mt-2">
                Sponsors
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Proud partners who drive
              <span className="text-[#31C4BF] font-medium"> innovation</span>,
              <span className="text-[#3b82f6] font-medium"> technology</span>, and
              <span className="text-[#22d3ee] font-medium"> growth</span> with us.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/20 to-gray-800/20 backdrop-blur-sm border border-white/5">
              
              {/* Desktop: Scroll-triggered infinite carousel */}
              {!isMobile && (
                <motion.div
                  className="flex"
                  style={{ 
                    x,
                    width: "300%" // 3x width for seamless loop
                  }}
                >
                  {infiniteSponsors.map((sponsor, index) => (
                    <div
                      key={`${sponsor.name}-${index}`}
                      className="flex-shrink-0 px-2 py-4 sm:px-4 sm:py-6"
                      style={{ 
                        width: `${100 / slidesPerView / 3}%` // Proper width calculation for 3 sets
                      }}
                    >
                      <SponsorCard
                        sponsor={sponsor}
                        index={index}
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Mobile: Button-controlled carousel */}
              {isMobile && (
                <div className="relative">
                  <motion.div
                    className="flex transition-transform duration-500 ease-out"
                    animate={{
                      x: `-${currentSlide * 100}%`
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipeThreshold = 50;
                      if (offset.x > swipeThreshold) {
                        prevSlide();
                      } else if (offset.x < -swipeThreshold) {
                        nextSlide();
                      }
                    }}
                  >
                    {sponsorsData.map((sponsor, index) => (
                      <div
                        key={`mobile-${sponsor.name}-${index}`}
                        className="flex-shrink-0 w-full px-4 py-6"
                      >
                        <SponsorCard
                          sponsor={sponsor}
                          index={index}
                        />
                      </div>
                    ))}
                  </motion.div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300"
                    aria-label="Previous sponsor"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300"
                    aria-label="Next sponsor"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Mobile Dots Indicator */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {sponsorsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-cyan-400 w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to sponsor ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}