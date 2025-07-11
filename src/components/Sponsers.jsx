import React, { useEffect, useState } from "react";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch("/sponsors.json")
      .then((res) => res.json())
      .then((data) => setSponsors(data))
      .catch((err) => console.error("Failed to load sponsor data:", err));
  }, []);

  return (
    <div className="max-w-[1368px] mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left gap-6 mb-10">
        <h1 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[#3A3A57] via-[#373C5C] to-[#2A4675] text-transparent bg-clip-text leading-tight tracking-tight">
          Our Sponsors.
        </h1>
        <p className="max-w-md text-sm text-gray-300 leading-relaxed">
          Meet the amazing organizations that power our mission with their
          incredible support and partnership.
        </p>
      </div>

      {/* Sponsor Grid */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {sponsors.map((s, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
          >
            <div className="flip-card-wrapper">
              <div className="flip-inner">
                {/* Front */}
                <div
                  className={`flip-front ${
                    s.color === "teal"
                      ? "bg-teal-400"
                      : s.color === "blue"
                      ? "bg-blue-400"
                      : s.color === "gray"
                      ? "bg-gray-300 text-black"
                      : "bg-teal-400"
                  }`}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                {/* Back */}
                <div
                  className={`flip-back ${
                    s.color === "teal"
                      ? "bg-blue-400"
                      : s.color === "blue"
                      ? "bg-teal-400"
                      : s.color === "gray"
                      ? "bg-teal-400 text-white"
                      : "bg-blue-400"
                  }`}
                >
                  <p className="text-sm text-white text-center">
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
