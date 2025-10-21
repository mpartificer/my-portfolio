import { useState, useEffect, useRef, memo } from "react";
import WelcomeBanner from "./components/WelcomeBanner";

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  // Portfolio content - replace with your own information
  const portfolioData = {
    about: {
      name: "Megan Forsey",
      title: "Software Developer",
      bio: "I'm a passionate developer who loves creating elegant solutions to complex problems. My approach to coding combines technical precision with creative thinking just like the playful patterns and colors that inspire my work.",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "CSS/SCSS",
        "TypeScript",
        "Python",
        "Git",
        "UI/UX Design",
      ],
    },
    projects: [
      {
        id: 1,
        title: "Project One",
        description:
          "A responsive web application for tracking personal finances with data visualization.",
        technologies: ["React", "Chart.js", "Firebase"],
        link: "#",
      },
      {
        id: 2,
        title: "Project Two",
        description:
          "Mobile-first e-commerce platform with real-time inventory management.",
        technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
        link: "#",
      },
      {
        id: 3,
        title: "Project Three",
        description:
          "API service that processes and analyzes large datasets for research institutions.",
        technologies: ["Python", "Flask", "PostgreSQL", "Docker"],
        link: "#",
      },
    ],
    contact: {
      email: "your.email@example.com",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
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

  // About Section Component
  const AboutSection = () => (
    <section className="rounded-2xl p-8 backdrop-blur-lg shadow-xl max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 babycakes-font">
          {portfolioData.about.name}
        </h1>
        <h2 className="text-xl text-blue-900 opacity-90">
          {portfolioData.about.title}
        </h2>
      </div>

      <p className="text-blue-900 text-lg mb-8 leading-relaxed">
        {portfolioData.about.bio}
      </p>

      <div>
        <h3 className="text-xl font-semibold text-blue-900 mb-4">
          Skills & Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {portfolioData.about.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-blue-900 bg-opacity-10 text-blue-900 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  // Projects Section Component
  const ProjectsSection = () => (
    <section className="backdrop-blur-lg bg-opacity-85 rounded-2xl p-8 shadow-xl max-w-3xl">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center babycakes-font">
        My Work
      </h2>

      <div className="space-y-8">
        {portfolioData.projects.map((project) => (
          <div
            key={project.id}
            className="backdrop-blur-lg bg-opacity-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {project.title}
            </h3>
            <p className="text-blue-900 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={`${project.id}-${tech}`}
                  className="px-3 py-1 bg-blue-900 bg-opacity-10 text-blue-900 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              className="inline-block px-4 py-2 bg-blue-900 text-white rounded-full font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );

  // Contact Section Component
  const ContactSection = () => (
    <section className="backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-2xl">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center babycakes-font">
        Let's Collab!
      </h2>

      <div className="space-y-6">
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="flex items-center p-4 backdrop-blur-lg  rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <span className="text-blue-900 font-medium">
            {portfolioData.contact.email}
          </span>
        </a>

        <a
          href={portfolioData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <span className="text-blue-900 font-medium">GitHub</span>
        </a>

        <a
          href={portfolioData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>
          <span className="text-blue-900 font-medium">LinkedIn</span>
        </a>

        <a
          href={portfolioData.contact.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </div>
          <span className="text-blue-900 font-medium">Twitter</span>
        </a>
      </div>
    </section>
  );

  // Spotify Player Component
  const SpotifyPlayer = () => (
    <div className="fixed left-4 bottom-4 z-20 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm bg-white bg-opacity-20 transition-opacity hover:opacity-100 opacity-90">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/6xkryXuiZU360Lngd4sx13?utm_source=generator&theme=0"
        width="300"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );

  return (
    <div className="min-h-screen flex font-sans text-blue-900 relative">
      {/* Custom CSS for colors and fonts */}
      <style>
        {`
          
          :root {
            --pink: #FFD1DC;
            --yellow: #FFFFA1;
            --green: #B0E57C;
            --blue: #B5EAD7;
            --navy: #1A2A52;
          }
          
          body {
            overflow-x: hidden;
          }
@keyframes fadeInContainer {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  80% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes bounceExclamation {
  0% { transform: scale(1); }
  20% { transform: scale(2.5); }  /* First big expansion */
  40% { transform: scale(1.5); }  /* First contraction */
  60% { transform: scale(2); }  /* Second smaller expansion */
  80% { transform: scale(0.8); }  /* Second contraction - go smaller than normal */
  100% { transform: scale(1); }   /* Back to normal */
}

@keyframes fadeInSpotify {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 0.9; transform: translateY(0); }
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

.welcome-text.animate, .welcome-text.completed {
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

.welcome-text.animate .letter-h { animation-delay: 0.1s; }
.welcome-text.animate .letter-i { animation-delay: 0.15s; }
.welcome-text.animate .letter-comma { animation-delay: 0.2s; }
.welcome-text.animate .letter-space1 { animation-delay: 0.25s; }
.welcome-text.animate .letter-I { animation-delay: 0.3s; }
.welcome-text.animate .letter-apostrophe { animation-delay: 0.35s; }
.welcome-text.animate .letter-m { animation-delay: 0.4s; }
.welcome-text.animate .letter-space2 { animation-delay: 0.45s; }
.welcome-text.animate .letter-M { animation-delay: 0.5s; }
.welcome-text.animate .letter-e { animation-delay: 0.55s; }
.welcome-text.animate .letter-g { animation-delay: 0.6s; }
.welcome-text.animate .letter-a { animation-delay: 0.65s; }
.welcome-text.animate .letter-n { animation-delay: 0.7s; }

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
        `}
      </style>

      {/* Pattern Background */}
      <PatternBackground />

      {/* Spotify Player */}
      <SpotifyPlayer />

      {/* Layout Container */}
      <div className="flex flex-col w-full max-w-6xl mx-auto mt-16 relative z-10 py-12">
        {/* Banner */}
        <div className="w-full">
          <WelcomeBanner />
        </div>

        {/* Content Container - This div centers the nav+content layout */}
        <div className="flex justify-center w-full">
          {/* This div controls the actual width of the nav+content area */}
          <div className="flex w-full max-w-4xl">
            {/* Vertical Navigation */}
            <div className="w-48 mr-8 flex-shrink-0">
              <div className="sticky top-12">
                <div className="flex flex-col space-y-10">
                  {[
                    { id: "about", label: "My Story" },
                    { id: "projects", label: "My Work" },
                    { id: "contact", label: "Let's Collab!" },
                  ].map((section) => (
                    <div
                      key={section.id}
                      onMouseEnter={() => setActiveSection(section.id)}
                      className={`
                      px-4 py-3 transition-all duration-300 text-right
                      ${
                        activeSection === section.id
                          ? "bg-blue-900  text-white shadow-md rounded-full -translate-x-2 scale-110"
                          : "text-blue-900 hover:bg-blue-900 hover:bg-opacity-10 rounded-full"
                      }
                    `}
                    >
                      <span className="babycakes-font text-lg font-medium">
                        {section.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
              <div className="transition-all duration-500">
                {activeSection === "about" && <AboutSection />}
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "contact" && <ContactSection />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
