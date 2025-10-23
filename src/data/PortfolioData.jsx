import headshot from "../../public/images/headshot.jpeg";

// Portfolio content - replace with your own information
const PortfolioData = {
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
    imageUrl: headshot,
  },
  projects: [
    {
      id: 1,
      title: "My Speech Balloon",
      description: [
        "Web app for Gestalt's Language Processors",
        "Helps non-verbal Autistic children with communication",
      ],
      why: [
        "Designed alongside Speech Language Pathologists for the Get Building Ventures wing",
        "Bit of a tearjerker, no? Tech for the greater good and all",
      ],
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "AWS Amplify",
        "AWS Cognito",
      ],
      link: "https://main.d20ggo7f8vo06n.amplifyapp.com/",
      imageUrl: "../public/images/msb-image.jpg",
    },
    {
      id: 2,
      title: "siiiift",
      description: [
        "AI-powered feedback for hobby bakers",
        "Saves recipes from the web and cookbooks",
        "Social media functionality for sharing bakes",
      ],
      why: [
        "I was really over my pie crust being bad",
        "Gave me an opportunity to learn React, Node.js, and SQL",
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Supabase Database",
        "Supabase Auth",
        "Supabase Storage",
        "Google Gemini API",
        "Cheerio",
        "Sharp",
        "Express.js",
        "Node.js",
      ],
      link: "https://mpartificer.github.io/siiiift/#/",
      imageUrl: "../public/images/siiiift-img.jpg",
    },
    {
      id: 3,
      title: "NYT Crossword Humble Brag Cronjob",
      description: [
        "Cronjob that runs once a day to update my Github profile README with the most up-to-date scores from my New York Times Games profile",
      ],
      why: [
        "Wanted a way to make my profile stand out and decided to build it instead!",
      ],
      technologies: ["Python", "Git Actions", "New York Times API"],
      link: "https://github.com/mpartificer",
      imageUrl: "../public/images/nyt-img.jpg",
    },
    {
      id: 4,
      title: "Karaoke with Megan Website",
      description: [
        "AI-powered journaling app for hobby bakers",
        "Gives feedback on baking progress and recipes",
        "Saves recipes from the web and cookbooks",
        "Social media functionality for sharing bakes",
      ],
      why: [
        "I was really over my pie crust being bad",
        "Gave me an opportunity to learn React, Node.js, and SQL",
      ],
      technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
      link: "#",
      imageUrl: "../public/images/kwm-img.jpg",
    },
    {
      id: 5,
      title: "No Hands Baking!",
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

export default PortfolioData;
