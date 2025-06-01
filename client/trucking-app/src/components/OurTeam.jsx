import React, { useState } from "react";
import BgOurTeam from "/images/ourTeam.png";
import Team3 from "/images/avata-2.jpg";
import Team2 from "/images/avata-1.jpg";
import Team1 from "/images/avata-1.jpg";

import Facebook from "/images/facebook.png";
import Instagram from "/images/instagram.png";
import Tiktalk from "/images/Tiktalk.png";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useTheme, useMediaQuery } from "@mui/material";

const OurTeam = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const teamMembers = [
    {
      id: 1,
      name: "Esther John",
      position: "Team Member IFBC.",
      icons: [{ facebook: Facebook, Link:"" }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team1,
    },
   
    {
      id: 3,
      name: "Thomas Austine",
      position: "Team Member, IFBC",
      icons: [{ facebook: Facebook, Link:"" }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team3,
    },
     {
      id: 2,
      name: "Josephine M.",
      position: "Team Member, IFBC.",
      icons: [{ facebook: Facebook, Link:" " }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team2,
    },
    {
      id: 4,
      name: "Mary Samuel ",
      position: "Team Member, IFBC.",
      icons: [{ facebook: Facebook, Link:"" }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team1,
    },
    {
      id: 5,
      name: "Gloria Thomas",
      position: "Team Member, IFBC.",
      icons: [{ facebook: Facebook, Link:"" }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team2,
    },
    {
      id: 6,
      name: "James Saviour",
      position: "Team Member, IFBC",
      icons: [{ facebook: Facebook, Link:"" }, { instagram: Instagram }, { tiktalk: Tiktalk }],
      img: Team3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Determine how many team members to show based on screen size
  const getVisibleMembers = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const visibleCount = getVisibleMembers();
  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + visibleCount);
  if (visibleMembers.length < visibleCount) {
    const remaining = visibleCount - visibleMembers.length;
    visibleMembers.push(...teamMembers.slice(0, remaining));
  }

  return (
    <div className="relative py-16">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${BgOurTeam})` }}
      ></div>
      <div className="absolute inset-0 bg-sky-950 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
          Our Team
        </h1>

        <p className="text-base sm:text-lg text-white text-center max-w-3xl mx-auto mb-8 sm:mb-12">
         Our team is the driving force behind our commitment
          to delivering exceptional trucking and logistics solutions. With years
          of experience and a passion for excellence, we work together to ensure
          seamless, efficient, and reliable transportation services.
        </p>

        <div className="relative mb-16">
          <div className={`grid grid-cols-1 ${isTablet ? 'grid-cols-2' : ''} ${!isMobile && !isTablet ? 'grid-cols-3' : ''} gap-6 sm:gap-8`}>
            {visibleMembers.map((member) => (
              <div key={member.id} className="w-full h-full bg-white text-center relative">
                <div className="relative w-full h-full mx-auto overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-[450] sm:h-80 md:h-[450px] object-contain md:object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0  w-full sm:w-full">
                  <div className="flex flex-col justify-start items-start backdrop-blur-md bg-black/50 border border-white/20 shadow-xl w-full">
                    <div className="flex flex-row justify-between w-full p-3 sm:p-4 md:p-5">
                      <h3 className="text-lg  font-bold text-white">
                        {member.name}
                      </h3>
                      <div>
                        <ul className="flex flex-row gap-x-2">
                          {member.icons.map((icon, i) => (
                            icon.facebook || icon.instagram || icon.tiktalk? (
                              <li key={i} className="h-6 w-6 bg-red-600 rounded-full flex justify-center items-center hover:bg-red-700 cursor-pointer">
                                <a target="_blank" href={icon.Link}>
                                <img 
                                  src={icon.facebook || icon.instagram || icon.tiktalk} 
                                  alt={icon.facebook ? "facebook" : icon.instagram ? "instagram" : "tiktalk"} 
                                  className="h-3 w-3 object-contain"
                                />
                                </a>
                              </li>
                            ) : null
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="text-white px-3 sm:px-4 md:px-5 pb-3 sm:pb-4">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            isMobile || isTablet ? <div className="flex flex-row w-full h-16 sm:h-20 justify-center gap-x-4 sm:gap-x-6 items-center mt-8">
            <button 
              onClick={goToPrevious}
              className="bg-red-600 flex items-center p-3 sm:p-4 rounded-full text-white hover:cursor-pointer hover:bg-red-700"
            >
              <KeyboardBackspaceOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
            </button>
            
            <button 
              onClick={goToNext}
              className="bg-red-600 flex items-center p-3 sm:p-4 rounded-full text-white hover:cursor-pointer hover:bg-red-700"
            >
              <EastOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
            </button>
          </div> :""
          }

          <div className="flex flex-row w-full h-16 sm:h-20 justify-center gap-x-4 sm:gap-x-6 items-center mt-8">
            <button 
              onClick={goToPrevious}
              className="bg-red-600 flex items-center p-3 sm:p-4 rounded-full text-white hover:cursor-pointer hover:bg-red-700"
            >
              <KeyboardBackspaceOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
            </button>
            
            <button 
              onClick={goToNext}
              className="bg-red-600 flex items-center p-3 sm:p-4 rounded-full text-white hover:cursor-pointer hover:bg-red-700"
            >
              <EastOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;