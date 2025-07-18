import React, { useEffect, useRef } from 'react';

export default function Gallery() {
  const galleryItemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    galleryItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      galleryItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const handleItemClick = (index) => {
    const item = galleryItemsRef.current[index];
    if (item) {
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
    }
  };

  const galleryItems = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B0C10] via-[#0A2342] to-[#301934] py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00BFFF] mb-8 sm:mb-12 lg:mb-16 animate-pulse">
          Gallery.
        </h1>

        {/* Gallery Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 max-w-full">
          {galleryItems.map((item, index) => (
            <div
              key={item}
              ref={(el) => (galleryItemsRef.current[index] = el)}
              className={`
                gallery-item relative rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-500 ease-out transform hover:scale-105
                bg-gradient-to-br from-slate-800 to-slate-700
                shadow-2xl hover:shadow-blue-500/20
                opacity-0 translate-y-8
                group
                ${getItemSize(index)}
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => handleItemClick(index)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-[#301934]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Content */}
              <div className="w-full h-full flex items-center justify-center text-[#00BFFF] text-lg font-bold relative z-20">
                <span className="drop-shadow-lg">Image {item}</span>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#00BFFF]/50 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .gallery-item {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gallery-item:hover {
          transform: translateY(-10px) scale(1.02);
        }
      `}</style>
    </div>
  );
}

// Helper function to get responsive sizes for gallery items
function getItemSize(index) {
  const sizes = [
    'w-72 h-48 sm:w-80 sm:h-52 lg:w-96 lg:h-56',
    'w-60 h-60 sm:w-64 sm:h-72 lg:w-72 lg:h-80',
    'w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56',
    'w-80 h-56 sm:w-84 sm:h-60 lg:w-96 lg:h-64',
    'w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52',
    'w-68 h-52 sm:w-72 sm:h-56 lg:w-80 lg:h-60',
    'w-52 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80',
    'w-76 h-48 sm:w-80 sm:h-52 lg:w-88 lg:h-56',
    'w-48 h-56 sm:w-52 sm:h-64 lg:w-56 lg:h-72',
    'w-64 h-44 sm:w-68 sm:h-48 lg:w-72 lg:h-52',
    'w-44 h-56 sm:w-48 sm:h-64 lg:w-52 lg:h-72',
    'w-72 h-40 sm:w-76 sm:h-44 lg:w-80 lg:h-48',
    'w-56 h-52 sm:w-60 sm:h-56 lg:w-64 lg:h-60',
  ];

  const mobileSize = 'w-72 h-48 xs:w-80 xs:h-52';
  return `${mobileSize} sm:${sizes[index] || sizes[0]}`;
}
