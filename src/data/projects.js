const projects = [
  {
    id: 1,
    title: "AI Study Buddy",
    description: "An NLP-powered application that generates flashcards from uploaded PDF lecture notes.",
    longDescription:
      "This application leverages the OpenAI API to analyze educational content uploaded by users. It parses PDF documents, extracts key concepts, and automatically generates spaced-repetition flashcards. Built with a React frontend for drag-and-drop file uploads and a Flask backend for handling document processing.",
    tech: ['Python', 'OpenAI API', 'React', 'Flask'],
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Algorithmic Trading Bot",
    description: "A Python bot that executes trades based on technical indicators and sentiment analysis from news sources.",
    longDescription:
      "Designed to automate trading strategies, this bot connects to brokerage APIs to execute buy/sell orders. It utilizes Pandas for real-time data analysis of moving averages and RSI, while running in a Docker container for consistent deployment.",
    tech: ['Python', 'Pandas', 'Docker'],
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Community Board",
    description: "A localized forum for neighborhood events with real-time notifications and map integration.",
    longDescription:
      "A full-stack social platform focused on hyper-local community engagement. Features include real-time event feeds using Firebase Firestore, interactive maps via Mapbox, and role-based authentication for community moderators.",
    tech: ['Next.js', 'Firebase', 'Mapbox'],
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Voxel Engine",
    description: "A lightweight 3D rendering engine built from scratch using C++ and OpenGL.",
    longDescription:
      "An exploration into computer graphics, this engine supports chunk-based terrain generation, dynamic lighting, and efficient mesh culling. Written in modern C++ with custom shaders written in GLSL.",
    tech: ['C++', 'OpenGL', 'GLSL'],
    github: "https://github.com",
  },
];

export default projects;
