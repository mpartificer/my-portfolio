import { useState, useEffect, useRef, memo } from "react";
import WelcomeBanner from "./components/WelcomeBanner";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import ProjectsDropdown from "./components/ProjectsDropdown";

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const projectsContainerRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const welcomeAnimationCompleteRef = useRef(false);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const welcomeRef = useRef(null);
  const projectsSectionRef = useRef(null);

  // Scroll to section when activeSection changes
  useEffect(() => {
    const sectionRefs = {
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    };

    const targetRef = sectionRefs[activeSection];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection]);

  // Scroll-based navigation detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: welcomeRef, id: "" },
        { ref: aboutRef, id: "about" },
        { ref: projectsRef, id: "projects" },
        { ref: contactRef, id: "contact" },
      ];

      // Get current scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section is currently in view
      let currentSection = "";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref?.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;

          // If we've scrolled past the middle of this section
          if (scrollPosition >= sectionTop) {
            currentSection = section.id;
            break;
          }
        }
      }

      // Only update if the section has changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  // Handle project hover navigation
  const handleProjectHover = (projectId) => {
    if (projectsSectionRef.current) {
      projectsSectionRef.current.scrollToProject(projectId);
    }
  };

  const handleProjectLeave = () => {
    // Optional: Add any cleanup logic here if needed
  };

  // Component for decorative background patterns inspired by the color-blocked striped shirt
  const PatternBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Four color-blocked panels with consistent stripe thickness within each panel */}

      {/* Pink panel - top left */}
      <div className="fixed top-0 left-0 w-1/2 h-1/2 flex flex-col justify-between">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`pink-stripe-${i}`}
            className="h-6 w-full bg-pink opacity-40"
          />
        ))}
      </div>

      {/* Yellow panel - top right */}
      <div className="fixed top-0 right-0 w-1/2 h-1/2">
        <div className="w-full h-full flex justify-between">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`yellow-stripe-${i}`}
              className="w-4 h-full bg-yellow opacity-40"
            />
          ))}
        </div>
      </div>

      {/* Green panel - bottom left */}
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2">
        <div className="w-full h-full flex justify-between">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`green-stripe-${i}`}
              className="w-3 h-full bg-green opacity-40"
            />
          ))}
        </div>
      </div>

      {/* Blue panel - bottom right */}
      <div className="fixed bottom-0 right-0 w-1/2 h-1/2 flex flex-col justify-between">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`blue-stripe-${i}`}
            className="h-10 w-full bg-blue opacity-40"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-900">
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap");

          :root {
            --pink: #ffd1dc;
            --yellow: #ffffa1;
            --green: #b0e57c;
            --blue: #b5ead7;
            --navy: #1a2a52;
          }

          body {
            overflow-x: hidden;
          }
          @keyframes fadeInContainer {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes popIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            60% {
              transform: scale(1.2);
            }
            80% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes bounceExclamation {
            0% {
              transform: scale(1);
            }
            20% {
              transform: scale(2.5);
            } /* First big expansion */
            40% {
              transform: scale(1.5);
            } /* First contraction */
            60% {
              transform: scale(2);
            } /* Second smaller expansion */
            80% {
              transform: scale(0.8);
            } /* Second contraction - go smaller than normal */
            100% {
              transform: scale(1);
            } /* Back to normal */
          }

          @keyframes fadeInSpotify {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 0.9;
              transform: translateY(0);
            }
          }

          .spotify-player {
            animation: fadeInSpotify 1s ease-out 1.5s forwards;
            opacity: 0;
          }

          .welcome-container {
            display: flex;
            justify-content: center;
            width: 100%;
            /* Start completely invisible */
            opacity: 0;
          }

          /* Apply fade-in to the container when animation starts */
          .welcome-text.animate + .welcome-container,
          .welcome-text.completed + .welcome-container,
          .welcome-container {
            animation: fadeInContainer 0.7s ease-in forwards;
          }

          .welcome-text {
            opacity: 0;
            transform-origin: center;
          }

          .welcome-text.animate,
          .welcome-text.completed {
            opacity: 1;
          }

          .welcome-text span {
            display: inline-block;
            visibility: hidden;
          }

          .welcome-text.animate span {
            visibility: visible;
            animation: popIn 2s forwards;
          }

          .welcome-text.completed span {
            visibility: visible;
            transform: scale(1);
            opacity: 1;
          }

          .welcome-text.animate .letter-h {
            animation-delay: 0.1s;
          }
          .welcome-text.animate .letter-i {
            animation-delay: 0.15s;
          }
          .welcome-text.animate .letter-comma {
            animation-delay: 0.2s;
          }
          .welcome-text.animate .letter-space1 {
            animation-delay: 0.25s;
          }
          .welcome-text.animate .letter-I {
            animation-delay: 0.3s;
          }
          .welcome-text.animate .letter-apostrophe {
            animation-delay: 0.35s;
          }
          .welcome-text.animate .letter-m {
            animation-delay: 0.4s;
          }
          .welcome-text.animate .letter-space2 {
            animation-delay: 0.45s;
          }
          .welcome-text.animate .letter-M {
            animation-delay: 0.5s;
          }
          .welcome-text.animate .letter-e {
            animation-delay: 0.55s;
          }
          .welcome-text.animate .letter-g {
            animation-delay: 0.6s;
          }
          .welcome-text.animate .letter-a {
            animation-delay: 0.65s;
          }
          .welcome-text.animate .letter-n {
            animation-delay: 0.7s;
          }

          .welcome-text.animate .exclamation-mark {
            visibility: visible;
            animation: popIn 0.5s forwards, bounceExclamation 2s 1.2s;
            animation-delay: 0.75s;
            transform-origin: bottom center;
          }

          .welcome-text.completed .exclamation-mark,
          .welcome-text.completed span {
            visibility: visible;
            transform: scale(1);
            opacity: 1;
          }

          .bg-navy {
            background-color: var(--navy);
          }

          .text-navy {
            color: var(--navy);
          }

          .bg-pink {
            background-color: var(--pink);
          }

          .bg-yellow {
            background-color: var(--yellow);
          }

          .bg-green {
            background-color: var(--green);
          }

          .bg-blue {
            background-color: var(--blue);
          }

          .opacity-15 {
            opacity: 0.15;
          }

          .opacity-25 {
            opacity: 0.25;
          }

          /* Enhanced snap scrolling animation */
          @keyframes snapScroll {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .snap-container {
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
            overflow-y: auto;
          }

          .snap-item {
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          /* Add a visual indicator for snap scroll interaction */
          .scroll-indicator {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: var(--blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.7;
            transition: all 0.3s ease;
          }

          .scroll-indicator:hover {
            opacity: 1;
            transform: scale(1.1);
          }

          /* Navbar styling */
          .navbar {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 50;
            padding: 1rem 2rem;
            backdrop-filter: blur(8px);
            display: flex;
            justify-content: flex-end;
            /* Start invisible */
            opacity: 0;
            visibility: hidden;
            /* Add transition for smooth fade-in */
            transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
          }

          .navbar.visible {
            opacity: 1;
            visibility: visible;
          }

          .nav-items {
            display: flex;
            gap: 2rem;
            align-items: center;
          }
        `}
      </style>

      {/* Pattern Background */}
      <PatternBackground />

      {/* Navbar - New horizontal navigation with visibility toggle */}
      <nav className={`navbar ${navbarVisible ? "visible" : ""}`}>
        <div className="nav-items">
          {/* About Section */}
          <div
            onMouseEnter={() => setActiveSection("about")}
            className={`
              px-4 py-2 transition-all duration-300 cursor-pointer rounded-full
              ${
                activeSection === "about"
                  ? "bg-blue-900 text-white shadow-md scale-105"
                  : "text-blue-900 hover:bg-blue-900 hover:bg-opacity-10"
              }
            `}
          >
            <span className="babycakes-font text-lg font-medium">My Story</span>
          </div>

          {/* Projects Dropdown */}
          <ProjectsDropdown
            onProjectHover={handleProjectHover}
            onProjectLeave={handleProjectLeave}
          />

          {/* Contact Section */}
          <div
            onMouseEnter={() => setActiveSection("contact")}
            className={`
              px-4 py-2 transition-all duration-300 cursor-pointer rounded-full
              ${
                activeSection === "contact"
                  ? "bg-blue-900 text-white shadow-md scale-105"
                  : "text-blue-900 hover:bg-blue-900 hover:bg-opacity-10"
              }
            `}
          >
            <span className="babycakes-font text-lg font-medium">
              Let's Collab!
            </span>
          </div>
        </div>
      </nav>

      {/* Layout Container */}
      <div className="flex flex-col w-full max-w-6xl mx-auto relative z-10">
        {/* Banner with animation completion callback */}
        <div
          ref={welcomeRef}
          className="w-full h-screen flex flex-col justify-center align-center"
        >
          <WelcomeBanner
            onAnimationComplete={() => {
              if (!welcomeAnimationCompleteRef.current) {
                welcomeAnimationCompleteRef.current = true;
                // Add a slight delay before showing navbar for a smoother transition
                setTimeout(() => {
                  setNavbarVisible(true);
                }, 500);
              }
            }}
          />
        </div>

        {/* Content Container - This div centers the content layout */}
        <div className="flex justify-center w-full px-4">
          {/* Main Content - now without the left menu */}
          <main className="">
            <div className="transition-all w-[80vw] duration-500 flex flex-col gap-12">
              <AboutSection aboutRef={aboutRef} />
              <ProjectsSection
                ref={projectsSectionRef}
                projectsRef={projectsRef}
                activeSection={activeSection}
                projectsContainerRef={projectsContainerRef}
              />
              <ContactSection contactRef={contactRef} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
