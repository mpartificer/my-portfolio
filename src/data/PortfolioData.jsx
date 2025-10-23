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
      technologies: ["React"],
      link: "https://main.d20ggo7f8vo06n.amplifyapp.com/",
      imageUrl: "../public/images/msb-image.jpg",
    },
    {
      id: 2,
      title: "siiiift",
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
      imageUrl: "https://source.unsplash.com/random/800x400?ecommerce,mobile",
    },
    {
      id: 3,
      title: "Chefster",
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
    {
      id: 4,
      title: "NYT Crossword Humble Brag Cronjob",
      description: [
        "Web app for Gestalt's Language Processors",
        "Helps non-verbal Autistic children with communication",
      ],
      why: [
        "Designed alongside Speech Language Pathologists for the Get Building Ventures wing",
        "Bit of a tearjerker, no? Tech for the greater good and all",
      ],
      technologies: ["React"],
      link: "https://main.d20ggo7f8vo06n.amplifyapp.com/",
      imageUrl: "../public/images/msb-image.jpg",
    },
    {
      id: 5,
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
      imageUrl: "https://source.unsplash.com/random/800x400?ecommerce,mobile",
    },
    {
      id: 6,
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
