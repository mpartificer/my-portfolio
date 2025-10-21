import { useState, useEffect, useRef } from "react";

const NavBar = ({ projects }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hover logic for dropdown
  useEffect(() => {
    const handleMouseLeave = (event) => {
      const dropdownElement = dropdownRef.current;
      const buttonElement = buttonRef.current;

      if (
        dropdownOpen &&
        dropdownElement &&
        buttonElement &&
        !dropdownElement.contains(event.relatedTarget) &&
        !buttonElement.contains(event.relatedTarget)
      ) {
        setDropdownOpen(false);
      }
    };

    const dropdownElement = dropdownRef.current;
    const buttonElement = buttonRef.current;

    if (dropdownElement) {
      dropdownElement.addEventListener("mouseleave", handleMouseLeave);
    }

    if (buttonElement) {
      buttonElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (buttonElement) {
        buttonElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [dropdownOpen, dropdownRef, buttonRef]);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Navigate to project
  const navigateToProject = (projectId) => {
    scrollToSection(`project-${projectId}`);
    setDropdownOpen(false);
  };

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo */}
            <div
              onClick={() => scrollToSection("home")}
              className="text-white font-semibold text-xl tracking-tight flex items-center cursor-pointer"
            >
              <div className="h-8 w-8 mr-2 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-md flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span>
                DEV
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">
                  FOLIO
                </span>
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-8">
            {/* About Me Link */}
            <button
              onClick={() => scrollToSection("about-me")}
              className="text-gray-300 hover:text-white px-5 py-2 text-sm font-medium relative group overflow-hidden rounded-md"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                About Me
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 to-purple-600/0 group-hover:from-fuchsia-500/20 group-hover:to-purple-600/20 transition-all duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-fuchsia-400 to-purple-600 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300"></span>
              <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-fuchsia-400/10 to-purple-600/10 transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-400 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_4px_rgba(232,121,249,0.3)] group-hover:translate-x-[calc(100%+20px)] transition-all duration-700"></span>
            </button>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                onMouseEnter={() => setDropdownOpen(true)}
                className="text-gray-300 hover:text-white px-5 py-2 text-sm font-medium relative group overflow-hidden rounded-md flex items-center"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Projects
                </span>
                <svg
                  className={`relative z-10 ml-1 h-4 w-4 transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 to-purple-600/0 group-hover:from-fuchsia-500/20 group-hover:to-purple-600/20 transition-all duration-300"></span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-fuchsia-400 to-purple-600 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-fuchsia-400/10 to-purple-600/10 transition-all duration-500 group-hover:w-full"></span>
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-400 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_4px_rgba(232,121,249,0.3)] group-hover:translate-x-[calc(100%+20px)] transition-all duration-700"></span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-1 w-56 bg-black/90 backdrop-blur-xl border border-gray-800 rounded-md shadow-lg py-1 z-10 overflow-hidden"
                >
                  <div className="w-full h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-600"></div>

                  {projects.map((project) => (
                    <a
                      key={project.id}
                      onClick={() => navigateToProject(project.id)}
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white relative group overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10">{project.title}</span>
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 group-hover:w-full transition-all duration-300"></span>
                      <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-fuchsia-400 to-purple-600 group-hover:w-full transition-all duration-300 delay-75"></span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2 px-5 rounded-md text-sm group transform hover:scale-[1.02] transition-all duration-300"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-700"></span>
                <span className="absolute -inset-x-1/4 top-0 h-[1px] w-150% bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
                <span className="absolute -inset-y-1/4 right-0 h-150% w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent transform -translate-y-full group-hover:translate-y-full transition-all duration-1000 delay-150"></span>
                <span className="absolute -inset-x-1/4 bottom-0 h-[1px] w-150% bg-gradient-to-r from-transparent via-white/50 to-transparent transform translate-x-full group-hover:-translate-x-full transition-all duration-1000 delay-300"></span>
                <span className="absolute -inset-y-1/4 left-0 h-150% w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent transform translate-y-full group-hover:-translate-y-full transition-all duration-1000 delay-450"></span>
              </span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
