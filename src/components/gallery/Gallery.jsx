import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

// Updated image data with varying dimensions and vertical offsets
const galleryImages = [
  { id: 1, src: 'https://placehold.co/600x800/1c2a4a/ffffff?text=Image+1', w: 600, h: 800, y: '5%' },
  { id: 2, src: 'https://placehold.co/800x600/3a506b/ffffff?text=Image+2', w: 800, h: 600, y: '-10%' },
  { id: 3, src: 'https://placehold.co/600x600/5c9ead/ffffff?text=Image+3', w: 600, h: 600, y: '15%' },
  { id: 4, src: 'https://placehold.co/800x1000/82c0cc/ffffff?text=Image+4', w: 800, h: 1000, y: '-5%' },
  { id: 5, src: 'https://placehold.co/1200x800/a8d5e2/000000?text=Image+5', w: 1200, h: 800, y: '10%' },
  { id: 6, src: 'https://placehold.co/700x900/d4eaf7/000000?text=Image+6', w: 700, h: 900, y: '-15%' },
  { id: 7, src: 'https://placehold.co/900x900/f7f7f7/000000?text=Image+7', w: 900, h: 900, y: '0%' },
  { id: 8, src: 'https://placehold.co/1000x800/1c2a4a/ffffff?text=Image+8', w: 1000, h: 800, y: '5%' },
];

export default function Gallery() {
  const component = useRef(null);
  const carousel = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const totalScroll = carousel.current.scrollWidth - window.innerWidth;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate the carousel into view from the right, then scroll it to the left
      // The first animation (slide-in) is given a shorter duration (0.15) 
      // relative to the second (scroll), making it happen over a shorter scroll distance.
      tl.from(carousel.current, { x: '100vw', duration: 0.15 })
        .to(carousel.current, { x: `-${totalScroll}px`, duration: 0.8 });

    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className="gallery-container" ref={component}>
      <div className="gallery-background">
        <h1 className="gallery-title">Gallery.</h1>
      </div>
      <div className="gallery-carousel" ref={carousel}>
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="gallery-image-wrapper"
            style={{
              '--w': `${image.w}px`,
              '--h': `${image.h}px`,
              transform: `translateY(${image.y})`,
            }}
          >
            <img src={image.src} alt={`Gallery image ${image.id}`} className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
