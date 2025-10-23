import PortfolioData from "../data/PortfolioData";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// Function to get a random background color class with opacity
const getRandomColorClass = () => {
  // Adding opacity directly in the class names (bg-{color}-50 for 40% opacity)
  const colors = ["bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-teal-50"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Function to get a random background color class with higher opacity for smaller elements
const getRandomColorClassHighOpacity = () => {
  // Using higher opacity classes (bg-{color}-200 for better visibility on small elements)
  const colors = [
    "bg-pink-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-teal-200",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Pre-assign random colors to all technologies across all projects to maintain consistency during rerenders
const technologyColors = PortfolioData.projects.reduce((acc, project) => {
  project.technologies.forEach((tech) => {
    if (!acc[tech]) {
      acc[tech] = getRandomColorClass();
    }
  });
  return acc;
}, {});

// Pre-assign random colors to all bullet points across all projects to maintain consistency during rerenders
const bulletPointColors = PortfolioData.projects.reduce((acc, project) => {
  // Create unique keys for each bullet point by combining project ID with bullet point index
  project.description.forEach((point, index) => {
    const key = `${project.id}-what-${index}`;
    acc[key] = getRandomColorClassHighOpacity();
  });
  project.why.forEach((point, index) => {
    const key = `${project.id}-why-${index}`;
    acc[key] = getRandomColorClassHighOpacity();
  });
  return acc;
}, {});

// Projects Section Component with snap scrolling
const ProjectsSection = forwardRef(({ activeSection, onProjectRefs }, ref) => {
  const projectRefs = useRef({});

  // Expose project refs to parent component
  useImperativeHandle(ref, () => ({
    scrollToProject: (projectId) => {
      const projectRef = projectRefs.current[projectId];
      if (projectRef) {
        // Use scrollIntoView with proper offset - the scroll-mt-24 class handles navbar spacing
        projectRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  }));
  // Define the four colors for the decorative rectangular planes
  const colors = ["bg-pink", "bg-yellow", "bg-green", "bg-blue"];

  // Pass project refs to parent component
  useEffect(() => {
    if (onProjectRefs) {
      onProjectRefs(projectRefs.current);
    }
  }, [onProjectRefs]);

  return (
    <>
      {/* Individual Projects as separate snap points */}
      {PortfolioData.projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => (projectRefs.current[project.id] = el)}
          className="snap-start snap-always pb-16 relative scroll-mt-24 backdrop-blur-lg bg-opacity-85 rounded-2xl p-8 shadow-xl w-[80vw] overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            minHeight: "350px",
          }}
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center -z-10">
            <div
              className={`${
                colors[index % colors.length]
              } opacity-15 absolute top-4 bottom-4 left-4 right-4 rounded-xl transform rotate-3`}
            ></div>
            <div
              className={`${
                colors[(index + 1) % colors.length]
              } opacity-15 absolute top-4 bottom-4 left-4 right-4 rounded-xl transform -rotate-2`}
            ></div>
            <div
              className={`${
                colors[(index + 2) % colors.length]
              } opacity-15 absolute top-4 bottom-4 left-4 right-4 rounded-xl transform rotate-1`}
            ></div>
            <div
              className={`${
                colors[(index + 3) % colors.length]
              } opacity-15 absolute top-4 bottom-4 left-4 right-4 rounded-xl transform -rotate-3`}
            ></div>
          </div>

          <div className="relative z-10">
            <div className="bg-white bg-opacity-90 h-[80vh] p-6 rounded-xl shadow-sm flex flex-col items-center">
              {/* Title as centered link */}
              <div className="text-center mb-6">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl font-bold text-blue-900 babycakes-font hover:text-navy hover:scale-110 transition-all duration-300 ease-in-out inline-block"
                  >
                    {project.title}
                  </a>
                ) : (
                  <h2 className="text-3xl font-bold text-blue-900 babycakes-font">
                    {project.title}
                  </h2>
                )}
              </div>

              {/* Centered image */}
              <div className="mb-6 flex justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className=" h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Centered technology tags */}
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 ${technologyColors[tech]} rounded-full text-blue-900 text-sm font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Two-column layout for What and Why */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="text-center">
                  <h3 className="text-xl text-blue-900 mb-4 babycakes-font">
                    What ?
                  </h3>
                  <ul className="space-y-2 text-blue-900 text-left">
                    {project.description.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span
                          className={`inline-block w-4 h-4 mr-2 mt-1 rounded-full ${
                            bulletPointColors[`${project.id}-what-${i}`]
                          }`}
                        ></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="text-xl text-blue-900 mb-4 babycakes-font">
                    Why ?
                  </h3>
                  <ul className="space-y-2 text-blue-900 text-left">
                    {project.why.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span
                          className={`inline-block w-4 h-4 mr-2 mt-1 rounded-full ${
                            bulletPointColors[`${project.id}-why-${i}`]
                          }`}
                        ></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

export default ProjectsSection;
