import PortfolioData from "../data/PortfolioData";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// Projects Section Component with snap scrolling
const ProjectsSection = forwardRef(
  ({ projectsRef, activeSection, projectsContainerRef }, ref) => {
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

    // Handle wheel event for custom snap scrolling
    const handleWheel = (e) => {
      if (!projectsContainerRef.current) return;

      e.preventDefault();

      const container = projectsContainerRef.current;
      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const scrollHeight = container.scrollHeight;
      const projectCount = PortfolioData.projects.length;
      const snapHeight = scrollHeight / projectCount;

      // Calculate current project index based on scroll position
      const currentIndex = Math.round(container.scrollTop / snapHeight);
      const nextIndex = Math.max(
        0,
        Math.min(currentIndex + scrollDirection, projectCount - 1)
      );

      // Scroll to next project with smooth animation
      container.scrollTo({
        top: nextIndex * snapHeight,
        behavior: "smooth",
      });
    };

    // Set up wheel event listener
    useEffect(() => {
      const container = projectsContainerRef.current;
      if (!container) return;

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }, [activeSection]);

    return (
      <section
        ref={projectsRef}
        className="backdrop-blur-lg bg-opacity-85 rounded-2xl p-8 shadow-xl w-[80vw] overflow-hidden scroll-mt-24"
      >
        <h1 className="text-4xl!important font-bold text-blue-900 mb-8 text-center babycakes-font">
          My Work
        </h1>

        {/* Projects container with snap scroll */}
        <div
          ref={projectsContainerRef}
          className="space-y-12 snap-y snap-mandatory scroll-smooth"
          style={{
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {PortfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[project.id] = el)}
              className="snap-start snap-always pb-16 relative scroll-mt-24"
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
                <div className="bg-white bg-opacity-90 h-[80vh] p-6 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6 babycakes-font">
                    {project.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl text-blue-900 mb-4 babycakes-font">
                        What it does
                      </h3>
                      <ul className="space-y-2 text-blue-900">
                        {project.description.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full bg-blue"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h3 className="text-xl text-blue-900 mb-4 babycakes-font">
                          Why it's cool
                        </h3>
                        <ul className="space-y-2 text-blue-900">
                          {project.why.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full bg-pink"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-yellow rounded-full text-blue-900 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block px-4 py-2 bg-blue-900 text-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                          Check it out
                        </a>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="max-w-full h-auto rounded-lg shadow-md max-h-64"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

export default ProjectsSection;
