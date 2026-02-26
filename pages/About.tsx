import React from "react";
import AboutHero from "../components/AboutHero";
import AboutMission from "../components/AboutMission";
import AboutValues from "../components/AboutValues";
import AboutStory from "../components/AboutStory";
import AboutStats from "../components/AboutStats";
import AboutCTA from "../components/AboutCTA";

const About: React.FC = () => {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutStory />
      <AboutCTA />
    </>
  );
};

export default About;
