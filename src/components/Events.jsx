import React, { useRef, useState } from "react";
import './Events.css';

const eventData = [
  {
    id: 1,
    title: "Event 1",
    date: "Jan 12, 2024",
    description: "Description for Event 1",
    tags: ["Tag1", "Tag2"],
  },
  {
    id: 2,
    title: "Event 2",
    date: "Jan 15, 2024",
    description: "Description for Event 2",
    tags: ["Tag3", "Tag4"],
  },
  {
    id: 3,
    title: "Event 3",
    date: "Jan 18, 2024",
    description: "Description for Event 3",
    tags: ["Tag5", "Tag6"],
  },
  {
    id: 4,
    title: "Event 4",
    date: "Jan 20, 2024",
    description: "Description for Event 4",
    tags: ["Tag7", "Tag8"],
  },
];

const VISIBLE_CARDS = 2;
const SCROLL_STEP = 2;

const EventPage = ({ handleBackToLiveEvents }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' | 'right' | null

  const handleLeft = () => {
    setSwipeDirection('right');
    setTimeout(() => setSwipeDirection(null), 500);
    setStartIdx((prev) => Math.max(prev - SCROLL_STEP, 0));
  };

  const handleRight = () => {
    setSwipeDirection('left');
    setTimeout(() => setSwipeDirection(null), 500);
    setStartIdx((prev) => Math.min(prev + SCROLL_STEP, eventData.length - VISIBLE_CARDS));
  };

  const visibleEvents = eventData.slice(startIdx, startIdx + VISIBLE_CARDS);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#000c18] to-[#001a36] relative overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-8 left-8 px-4 py-2 bg-teal-500 rounded-full text-gray-900 font-medium z-10"
        onClick={handleBackToLiveEvents}
      >
        Back
      </button>
      {/* Left Side: Title and Description */}
      <div className="flex flex-col justify-center items-start w-1/3 pl-16">
        <h1 className="text-5xl lg:text-7xl font-medium text-blue-400 tracking-wide mb-4">
          Live Events. <span className="inline-block align-middle">&#8594;</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
      {/* Right Side: Carousel */}
      <div className="relative w-2/3 flex items-center ml-16">
        {/* Navigation Arrows */}
        {startIdx === 0 && (
          // Show right arrow on the left when on the first set
          <button
            className="absolute -left-10 z-10 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-blue-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleRight}
            aria-label="Next"
            disabled={startIdx >= eventData.length - VISIBLE_CARDS}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        )}
        {startIdx === eventData.length - VISIBLE_CARDS && (
          // Show left arrow on the left when on the last set
          <button
            className="absolute -left-10 z-10 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-blue-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleLeft}
            aria-label="Previous"
            disabled={startIdx === 0}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        )}
        {/* Cards */}
        <div
          className={`flex gap-8 py-8 px-18 w-full justify-center items-center select-none ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}
          style={{ pointerEvents: "none" }}
        >
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 bg-gray-900 bg-opacity-60 rounded-3xl shadow-lg border border-blue-900 hover:border-blue-400 transition-all duration-300 relative flex flex-col items-center justify-between p-6"
              style={{ width: "390px", height: "450px", minWidth: "390px", maxWidth: "390px", pointerEvents: "auto" }}
            >
              <div className="w-full h-32 bg-gray-300 rounded-2xl mb-4 flex items-center justify-center"
                style={{ width: "340px", height: "290px" }}
              >
                {/* Placeholder for image or icon */}
                <span className="text-4xl text-gray-400">🖼️</span>
              </div>
              <div className="w-full flex flex-col items-center mb-2">
                <h2 className="text-xl font-semibold text-white mb-1">{event.title}</h2>
                <span className="text-sm text-blue-300 mb-2">{event.date}</span>
                <p className="text-gray-400 text-xs text-center mb-2">{event.description}</p>
              </div>
              <div className="flex gap-2 w-full justify-center mt-auto">
                <button className="px-6 py-2 bg-gray-300 text-black rounded-full text-xs font-medium shadow hover:bg-gray-400 transition">
                  Details
                </button>
                {event.tags.map((tag, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 text-blue-300 border-2 border-blue-300 rounded-full text-xs font-medium hover:bg-blue-300 hover:text-black transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LiveEvents = ({ handleStartEvents }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#000c18] to-[#001a36]">
      <div className="relative w-4/5 max-w-5xl">
        <div className="flex items-center justify-center">
          <h1 className="text-6xl lg:text-8xl font-medium text-blue-400 tracking-wide">
            Live Events.
          </h1>
          <div
            className="ml-4 cursor-pointer w-14 sm:w-16 md:w-16 lg:w-24 h-14 sm:h-16 md:h-16 lg:h-24 flex items-center justify-center font-semibold"
            onClick={handleStartEvents}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-blue-400"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="mt-1 w-full sm:w-1/2 md:w-2/3 lg:w-3/5 border-b-2 border-dotted border-gray-500 mx-auto"></div>
        <p className="mt-8 text-gray-400 text-sm sm:text-sm lg:text-sm w-full  sm:w-1/3 lg:w-1/3 mx-auto  text-center lg:absolute lg:right-28 lg:mr-[100px] sm:absolute sm:right-16 sm:top-[80%] md:absolute md:left-14 md:top-[100%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <>
      {!showEvents ? (
        <LiveEvents handleStartEvents={() => setShowEvents(true)} />
      ) : (
        <EventPage handleBackToLiveEvents={() => setShowEvents(false)} />
      )}
    </>
  );
};

export default App;
