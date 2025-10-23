import { useState, useRef } from "react";
import PortfolioData from "../data/PortfolioData";

const ProjectsDropdown = ({ onProjectHover, onProjectLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProjectHover = (projectId) => {
    if (onProjectHover) {
      onProjectHover(projectId);
    }
  };

  const handleProjectLeave = () => {
    if (onProjectLeave) {
      onProjectLeave();
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 transition-all duration-300 cursor-pointer rounded-full text-blue-900 hover:bg-blue-900 hover:bg-opacity-10 flex items-center gap-2">
        <span className="babycakes-font text-lg font-medium">My Work</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 backdrop-blur-lg bg-opacity-95">
          {PortfolioData.projects.map((project) => (
            <div
              key={project.id}
              className="px-4 py-3 hover:bg-blue-900 hover:bg-opacity-10 cursor-pointer transition-colors duration-200"
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={handleProjectLeave}
            >
              <div className="text-blue-900 font-medium babycakes-font text-lg hover:text-blue-900">
                {project.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsDropdown;
