import React from 'react';

const domains = [
  {
    name: 'Creatives.',
    color: 'text-blue-500',
    desc: 'Creatives domain: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    name: 'Non Tech.',
    color: 'text-blue-200',
    desc: 'Non Tech domain: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    name: 'Devs.',
    color: 'text-purple-400',
    desc: 'Devs domain: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    name: 'Tech',
    color: 'text-blue-300',
    desc: 'Tech domain: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    name: 'UI/UX',
    color: 'text-cyan-400',
    desc: 'UI/UX domain: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
];

export default function Domains() {
  return (
    <div className="min-h-screen bg-[#10131a] text-white bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <h2 className="text-4xl font-medium text-left px-[270px] pt-16 pb-8 max-md:px-5 max-md:text-2xl">
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt
      </h2>

      <div className="w-[90vw] max-w-[1200px] mx-auto bg-white/5 backdrop-blur-lg rounded-[28px] p-2 space-y-5">
        {domains.map((domain, i) => (
          <div key={i} className="flex items-center justify-between bg-transparent p-4 rounded-[28px] min-h-[180px] relative group hover:border-[2.5px] hover:border-teal-400 transition duration-300">
          <div className="w-[38%] ml-12 text-gray-300 text-base leading-relaxed line-clamp-4 group-hover:text-white max-md:ml-4 max-md:w-full max-md:text-sm">
              {domain.desc}
            </div>

            <div className="flex-1 flex items-center justify-center relative min-w-[180px] min-h-[180px] max-md:hidden">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] w-[200px] h-[200px] bg-gray-200 text-black font-semibold text-center rounded-2xl shadow-xl p-4 flex flex-col justify-center items-center animate-popin pointer-events-none z-10">
              cursor project<br />thumbnail
              </div>
            </div>

            <div className={`w-[28%] text-right pr-16 text-4xl font-extrabold leading-tight tracking-tight max-md:text-left max-md:pr-4 max-md:pt-4 ${domain.color}`}>
              {domain.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
