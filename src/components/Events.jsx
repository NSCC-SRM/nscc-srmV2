import React, { useState } from "react";
import { motion } from "framer-motion";

const eventData = [
  [
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
  ],
  [
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
  ],
];

const EventPage = ({ currentPage, setCurrentPage, handleBackToLiveEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNextPage = () => {
    if (currentPage < eventData.length - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedEvent(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedEvent(null);
    }
  };

  const handleEventClick = (eventId) => {
    if (selectedEvent === eventId) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventId);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white flex flex-col items-center pt-36 pb-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-8 left-8 px-4 py-2 bg-teal-500 rounded-full text-gray-900 font-medium"
        onClick={handleBackToLiveEvents}
      >
        Back
      </motion.button>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-32 mt-8 px-4 sm:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {eventData[currentPage].map((event, index) => (
          <motion.div
            key={event.id}
            className={`relative flex flex-col items-center bg-gray-800 rounded-3xl shadow-lg border p-8 sm:p-11 lg:p-10 mx-1 transition-all ${
              selectedEvent === event.id ? "border-teal-500" : "border-gray-700"
            }`}
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "600px",
              aspectRatio: "1",
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleEventClick(event.id)}
          >
            <div className="w-full h-full bg-gray-300 rounded-2xl relative">
              {index === 1 && currentPage < eventData.length - 1 && (
                <motion.div
                  className="absolute top-4 right-4 flex items-center justify-center w-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-teal-500 rounded-full text-white font-medium cursor-pointer hover:bg-teal-400 transition"
                  whileHover={{ scale: 1.2 }}
                  onClick={handleNextPage}
                >
                  <span className="lg:text-2xl text-xl">&#8594;</span>
                </motion.div>
              )}
            </div>

            <div className="w-full h-[1px] bg-gray-700 my-10"></div>

            <motion.div
              className="flex flex-wrap justify-center gap-5 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-12 py-3 bg-gray-300 text-black rounded-full text-sm font-medium shadow hover:bg-gray-400 transition"
              >
                Details
              </motion.button>
              {event.tags.map((tag, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="px-12 py-3 text-gray-300 border-2 border-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 hover:text-black transition"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const LiveEvents = ({ handleStartEvents }) => {
  const [lineWidth, setLineWidth] = useState("100%");

  const handleLineTransition = () => {
    setLineWidth(lineWidth === "100%" ? "50%" : "100%");
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#000c18] via-[#001a36] to-[#000f2e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-4/5 max-w-5xl">
        <div className="flex items-center justify-center">
          <motion.h1
            className="text-6xl lg:text-8xl font-medium text-blue-400 tracking-wide"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Live Events.
          </motion.h1>

          <motion.div
            className="ml-4 cursor-pointer w-14 sm:w-16 md:w-16 lg:w-24 h-14 sm:h-16 md:h-16 lg:h-24 flex items-center justify-center font-semibold"
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              handleStartEvents();
              handleLineTransition();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              strokeWidth="4"
              stroke="currentColor"
              className="w-full h-full text-blue-400"
            >
              <path
                strokeLinecap="butt"
                strokeLinejoin="miter"
                d="M12 12l20 12m0 0l-20 12m20-12H4"
              />
            </svg>
          </motion.div>
        </div>

        
        <motion.div
          className="mt-1 mx-auto border-b-2 border-dotted border-gray-500"
          style={{
            width: lineWidth,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        <p className="mt-8 text-gray-400 text-sm sm:text-sm lg:text-sm w-full sm:w-1/3 lg:w-1/3 mx-auto text-center lg:absolute lg:right-28 lg:mr-[100px] sm:absolute sm:right-16 sm:top-[80%] md:absolute md:left-14 md:top-[100%] lg:text-left md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [showEvents, setShowEvents] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      {!showEvents ? (
        <LiveEvents handleStartEvents={() => setShowEvents(true)} />
      ) : (
        <EventPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleBackToLiveEvents={() => setShowEvents(false)}
        />
      )}
    </>
  );
};

export default App;
