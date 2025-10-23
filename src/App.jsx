import { useState, useEffect, useRef, memo } from "react";
import WelcomeBanner from "./components/WelcomeBanner";

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const projectsContainerRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const welcomeAnimationCompleteRef = useRef(false);

  // Portfolio content - replace with your own information
  const portfolioData = {
    about: {
      name: "Megan Forsey",
      title: "Full Stack Software Developer",
      bio: "I am a full stack software developer in its truest form: enthusiasm for the subjectivity of front end design and user accessibility to the point where I will sit down with your grandma and teach her how to send an e-mail, combined with the organizational drive required for backend work (no task is too small for a spreadsheet if you ask me!)",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "HTML/CSS",
        "TypeScript",
        "Python",
        "Git",
        "C#",
        "C++",
        "SQL",
        "AWS",
        "Azure",
      ],
    },
    projects: [
      {
        id: 1,
        title: "My Speech Balloon",
        description: [
          "Web app for Gestalt's Language Processors",
          "Helps children with verbal development",
          "Intuitive interface for speech exercises",
        ],
        why: [
          "Designed alongside Speech Language Pathologists",
          "Makes therapy more engaging for children",
          "Helping kids talk rocks!",
        ],
        technologies: ["React"],
        link: "https://main.d20ggo7f8vo06n.amplifyapp.com/",
        imageUrl: "../public/images/msb-image.jpg",
      },
      {
        id: 2,
        title: "Project Two",
        description: [
          "Mobile-first e-commerce platform",
          "Real-time inventory management",
          "Responsive design for all devices",
        ],
        why: [
          "Helps small businesses compete online",
          "Enterprise-level inventory control",
          "Superior customer experience",
        ],
        technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
        link: "#",
        imageUrl: "https://source.unsplash.com/random/800x400?ecommerce,mobile",
      },
      {
        id: 3,
        title: "Project Three",
        description: [
          "API service for research institutions",
          "Processes and analyzes large datasets",
          "Scalable architecture for big data",
        ],
        why: [
          "Democratizes access to big data processing",
          "Supports smaller research teams",
          "Reduces technical barriers to entry",
        ],
        technologies: ["Python", "Flask", "PostgreSQL", "Docker"],
        link: "#",
        imageUrl: "https://source.unsplash.com/random/800x400?data,analysis",
      },
    ],
    contact: {
      email: "mpf816@mun.ca",
      github: "https://github.com/mpartificer",
      linkedin: "https://linkedin.com/in/meganforsey",
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

  // Function to get a random background color class with opacity
  const getRandomColorClass = () => {
    // Adding opacity directly in the class names (bg-{color}-50 for 40% opacity)
    const colors = ["bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-teal-50"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Pre-assign random colors to skills to maintain consistency during rerenders
  const skillColors = portfolioData.about.skills.reduce((acc, skill) => {
    acc[skill] = getRandomColorClass();
    return acc;
  }, {});

  // About Section Component
  const AboutSection = () => (
    <section className="rounded-2xl p-8 backdrop-blur-lg max-h-[500px] overflow-scroll shadow-xl min-w-4xl">
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
              className={`px-4 py-2 ${skillColors[skill]} text-blue-900 rounded-full font-medium`}
            >
              {skill}
            </span>
          ))}
        </div>
        <SpotifyPlayer />
        <div className="text-blue-900 text-sm text-center mt-2">
          Open above in Spotify to get the full experience.
        </div>
      </div>
    </section>
  );

  // Projects Section Component with snap scrolling
  const ProjectsSection = () => {
    // Define the four colors for the decorative rectangular planes
    const colors = ["bg-pink", "bg-yellow", "bg-green", "bg-blue"];

    // Handle wheel event for custom snap scrolling
    const handleWheel = (e) => {
      if (!projectsContainerRef.current) return;

      e.preventDefault();

      const container = projectsContainerRef.current;
      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const scrollHeight = container.scrollHeight;
      const projectCount = portfolioData.projects.length;
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
      <section className="backdrop-blur-lg bg-opacity-85 rounded-2xl p-8 shadow-xl min-w-4xl max-h-[500px] overflow-hidden">
        <h1 className="text-4xl!important font-bold text-blue-900 mb-8 text-center babycakes-font">
          My Work
        </h1>

        {/* Projects container with snap scroll */}
        <div
          ref={projectsContainerRef}
          className="space-y-12 overflow-y-auto max-h-[400px] snap-y snap-mandatory scroll-smooth"
          style={{
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              className="snap-start snap-always pb-16 relative"
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
                <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-sm">
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
  };

  // Spotify Player Component
  const SpotifyPlayer = () => (
    <div className="mt-8 spotify-player">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/4S9q5Xo1ewJJJhIKIVmk5I?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );

  // Contact Section Component
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

    const [formStatus, setFormStatus] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulate form submission
      setFormStatus("submitting");

      // Mock API call with timeout
      setTimeout(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    };

    const [hoverRotation, setHoverRotation] = useState({
      x: 0,
      y: 0,
    });

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Reduce the rotation intensity by dividing by a larger factor
      const rotateY = ((x - centerX) / centerX) * 4;
      const rotateX = ((centerY - y) / centerY) * 4;

      setHoverRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setHoverRotation({ x: 0, y: 0 });
    };

    return (
      <section className="rounded-2xl backdrop-blur-lg p-8 shadow-xl min-w-4xl max-h-[500px] overflow-scroll">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 text-center babycakes-font">
          Let's Collab!
        </h1>
        <p className="text-blue-900 text-center mb-8">
          Have a project idea or just want to connect? Drop me a line!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div
            className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md transition-transform transform-gpu"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${hoverRotation.x}deg) rotateY(${hoverRotation.y}deg)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-blue-900 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-blue-900 border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-blue-900 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-blue-900 border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-blue-900 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-blue-900 border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent h-32"
                  placeholder="What's on your mind?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`w-full py-3 px-4 rounded-full font-medium transition-all ${
                  formStatus === "submitting"
                    ? "bg-blue-900 bg-opacity-70 text-white"
                    : "bg-blue-900 text-white hover:shadow-lg hover:scale-105"
                }`}
              >
                {formStatus === "submitting"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent!"
                  : "Send Message"}
              </button>
              {formStatus === "success" && (
                <p className="mt-4 text-center text-green-600 font-medium">
                  Thanks for your message! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info and Social Links */}
          <div className="text-blue-900">
            <h2 className="text-2xl font-bold mb-6 babycakes-font">
              Let's Connect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2 babycakes-font">Get in Touch</h3>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${portfolioData.contact.email}`}
                    className="hover:underline hover:text-blue"
                  >
                    {portfolioData.contact.email}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2 babycakes-font">Find Me Online</h3>
                <div className="flex flex-col space-y-2">
                  <a
                    href={portfolioData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group hover:text-blue transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={portfolioData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group hover:text-blue transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-4 babycakes-font">
                  What happens next?
                </h3>
                <ol className="space-y-3 ml-5 list-decimal">
                  <li className="pl-2">
                    We'll schedule a short call to discuss your needs
                  </li>
                  <li className="pl-2">
                    I'll prepare a proposal or a plan of action
                  </li>
                  <li className="pl-2">
                    We'll work together to create something amazing!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

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
            background-color: rgba(255, 255, 255, 0.7);
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
          {[
            { id: "about", label: "My Story" },
            { id: "projects", label: "My Work" },
            { id: "contact", label: "Let's Collab!" },
          ].map((section) => (
            <div
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                px-4 py-2 transition-all duration-300 cursor-pointer rounded-full
                ${
                  activeSection === section.id
                    ? "bg-blue-900 text-white shadow-md scale-105"
                    : "text-blue-900 hover:bg-blue-900 hover:bg-opacity-10"
                }
              `}
            >
              <span className="babycakes-font text-lg font-medium">
                {section.label}
              </span>
            </div>
          ))}
        </div>
      </nav>

      {/* Layout Container */}
      <div className="flex flex-col w-full max-w-6xl mx-auto relative z-10">
        {/* Banner with animation completion callback */}
        <div className="w-full h-screen flex flex-col justify-center align-center">
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
          <main className="w-full max-w-4xl">
            <div className="transition-all duration-500">
              {activeSection === "about" && (
                <div>
                  <AboutSection />
                </div>
              )}
              {activeSection === "projects" && <ProjectsSection />}
              {activeSection === "contact" && <ContactSection />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
