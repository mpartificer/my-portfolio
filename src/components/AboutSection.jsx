import PortfolioData from "../data/PortfolioData";
import SpotifyPlayer from "./SpotifyPlayer";

// Function to get a random background color class with opacity
const getRandomColorClass = () => {
  // Adding opacity directly in the class names (bg-{color}-50 for 40% opacity)
  const colors = ["bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-teal-50"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Pre-assign random colors to skills to maintain consistency during rerenders
const skillColors = PortfolioData.about.skills.reduce((acc, skill) => {
  acc[skill] = getRandomColorClass();
  return acc;
}, {});

// About Section Component
const AboutSection = () => (
  <section className="rounded-2xl p-16 backdrop-blur-lg overflow-scroll h-[85vh] shadow-xl w-[80vw] scroll-mt-24">
    <div className="flex flex-row gap-16 mb-8 items-start">
      <div className="shrink-0">
        <img
          src={PortfolioData.about.imageUrl}
          className="w-80 h-80 rounded-full object-cover shadow-lg"
          alt="Profile photo"
        />
      </div>
      <div className="flex-1 text-center mb-8 mt-2">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 babycakes-font">
          {PortfolioData.about.name}
        </h1>
        <h2 className="text-xl text-blue-900 mb-4 opacity-90">
          {PortfolioData.about.title}
        </h2>
        <p className="text-blue-900 text-lg leading-relaxed">
          {PortfolioData.about.bio}
        </p>
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        Skills & Technologies
      </h3>
      <div className="flex flex-wrap gap-2">
        {PortfolioData.about.skills.map((skill) => (
          <span
            key={skill}
            className={`px-4 py-2 ${skillColors[skill]} text-blue-900 rounded-full font-medium`}
          >
            {skill}
          </span>
        ))}
      </div>
      <SpotifyPlayer />
      <div className="text-blue-900 text-sm text-center mt-2">
        Open above in Spotify to get the full experience while you peruse!
      </div>
    </div>
  </section>
);

export default AboutSection;
