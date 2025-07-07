import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Events.css';
import eventData from './events.json';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const component = useRef(null);
  const carousel = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(carousel.current, {
        x: () => -(carousel.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (carousel.current.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <main className="app-container" ref={component}>
      <div className="event-carousel" ref={carousel}>
        {/* Live Events as the first full-width section */}
        <div className="live-events-container">
          <div className="live-events-content">
            <h1 className="live-events-title">
              Live Events.
            </h1>
            <div className="mt-1 w-full sm:w-1/2 md:w-2/3 lg:w-3/5 border-b-2 border-dotted border-gray-500 mx-auto"></div>
            <p className="live-events-description">
              Scroll to explore our exciting events.
            </p>
          </div>
        </div>

        {/* The rest of the event cards */}
        {eventData.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-image">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="event-card-content">
              <h2 className="event-card-title">{event.title}</h2>
              <span className="event-card-date">{event.date}</span>
              <p className="event-card-description">{event.description}</p>
              <div className="event-card-buttons">
                <button className="details-button">Details</button>
                {event.tags.map((tag, idx) => (
                  <button key={idx} className="tag-button">{tag}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Spacer card to create padding at the end */}
        <div className="event-card-spacer"></div>
      </div>
    </main>
  );
};

export default Events;
