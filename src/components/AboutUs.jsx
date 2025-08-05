import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

export default function AboutUs() {
  const scrollToTeamSection = () => {
    const teamSection = document.querySelector("#our-team-section");
    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <div className="text-white p-5 md:flex md:flex-col md:items-center lg:block space-y-5">
        <div className="text-3xl md:w- lg:w-[950px]">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, reprehenderit doloribus laborum eveniet, vel et minima deleniti nihil voluptatibus velit magni voluptatem neque similique dignissimos atque nisi! Aperiam, officia quod!</p>
        </div>
        <div className="flex flex-col lg:h-92 md:w-96 lg:w-[450px] p-9 rounded-3xl space-y-10 lg:float-right border border-white" >
          <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam quis animi eaque, soluta perferendis velit veritatis consequuntur, voluptate saepe sed alias est! Qui rem maiores nulla labore perferendis consectetur ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, quis nobis veritatis corrupti.</p>
          <div className="h-0.5 bg-white"></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className="flex items-center rounded-full w-40"
          >
            <p className="text-black text-md ml-4">Our Team</p>
            <button
              className="ml-2 p-5 transition rounded-full"
              
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-black text-2xl" />
            </button>
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
      <div style={{ color: '#31C4BF' }} className="sm:flex sm:flex-col md:grid lg:grid grid-cols-3 grid-rows-3 gap-10 space-y-9 md:space-y-0 lg:space-y-0 mb-10">
        <div className="flex flex-col items-center col-start-1 row-start-1">
          <div>
          <CountUp start={0} end={68} duration={2} className="text-5xl lg:text-9xl" />
          <span className="text-5xl lg:text-8xl" style={{color:'#FEFEFE'}}>+</span>
          </div>
          <p className="text-2xl lg:text-3xl" style={{color:'#FEFEFE'}}>Members</p>
        </div>
        <div className="flex flex-col items-center col-start-2 row-start-2">
          <div>
          <CountUp start={0} end={11} duration={2} className="text-5xl lg:text-9xl" />
          <span className="text-5xl lg:text-8xl" style={{color:'#FEFEFE'}}>+</span>
          </div>
          <p className="text-2xl lg:text-3xl" style={{color:'#FEFEFE'}}>Projects</p>
        </div>
        <div className="flex flex-col items-center col-start-3 row-start-3">
            <div>
              <CountUp
                start={0}
                end={21}
                duration={2}
                className="text-5xl lg:text-9xl"
              />
              <span
                className="text-5xl lg:text-8xl"
                style={{ color: "#FEFEFE" }}
              >
                +
              </span>
            </div>
            <p
              className="text-2xl lg:text-3xl mb-10"
              style={{ color: "#FEFEFE" }}
            >
              Sponsors
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
