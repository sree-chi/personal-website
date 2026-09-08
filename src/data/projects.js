const projects = [
  {
    id: 1,
    title: "Sentinel Auth",
    description: "A policy enforcement gateway for AI agents — intercepts and validates every action against developer-defined rulesets before it reaches downstream infrastructure.",
    longDescription:
      "Built during the HackIllinois hackathon, Sentinel Auth acts as a critical security intermediary for autonomous AI agents. It issues and manages developer API keys, enforcing granular, context-aware action policies so that every request an agent makes is evaluated against strict rules before touching core infrastructure. The full-stack architecture pairs a backend policy engine with a frontend dashboard for real-time activity monitoring and policy configuration.",
    tech: ['Python', 'Flask', 'React', 'SQLite', 'REST API'],
    highlights: [
      "Policy Enforcement Gateway — intercepts AI agent requests and evaluates them against predefined rulesets",
      "Developer API Management — issues and tracks API keys for secure agent authentication",
      "Customizable Action Policies — granular, context-aware rules that minimize risk in autonomous workflows",
      "Full-Stack Architecture — backend policy engine with a frontend dashboard for monitoring and configuration",
    ],
    github: "https://github.com/wardall11/hackillinois",
  },
  {
    id: 2,
    title: "Space Bio Engine",
    description: "An AI-driven platform that aggregates and makes searchable over 900 space biology research papers, featuring a RAG-powered chatbot and interactive D3.js knowledge graphs.",
    longDescription:
      "Space Bio Engine revolutionizes exploration of space biology literature by ingesting and cleaning over 900 scientific papers through automated scraping pipelines. An intelligent chatbot built on a Retrieval-Augmented Generation pipeline answers complex domain-specific questions with accurate, context-aware responses. Interactive D3.js network and cluster visualizations surface hidden relationships and trends across the entire corpus.",
    tech: ['Next.js', 'React', 'Python', 'D3.js', 'RAG', 'Vector Search'],
    highlights: [
      "Massive Data Aggregation — ingested and cleaned 900+ scientific papers via automated scraping pipelines",
      "AI Chatbot Integration — RAG pipeline for accurate, context-aware answers to complex research queries",
      "Dynamic Visualizations — D3.js network and cluster charts mapping relationships across the literature",
      "Scalable Architecture — Next.js/React frontend with a robust Python backend for data processing",
    ],
    github: "https://github.com/vahinp/space-bio-engine",
  },
  {
    id: 3,
    title: "Charcot",
    description: "An AI-powered clinical web app for neurological and psychological assessment via real-time computer vision and emotion detection — built to healthcare privacy standards.",
    longDescription:
      "Charcot is a browser-based clinical platform that analyzes patient facial expressions and physical cues in real time to provide quantifiable diagnostic insights. Custom React hooks stream and process live video feeds directly in the browser, while a locally deployed machine learning pipeline classifies emotional and neurological states by analyzing facial action units. The application strictly adheres to documented clinical guidelines and data privacy standards, making it a secure, non-invasive tool for researchers and medical professionals.",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Python', 'Computer Vision', 'Machine Learning'],
    highlights: [
      "Real-Time Computer Vision — custom hooks capture and process live video feeds directly in the browser",
      "ML Emotion Detection — locally deployed models analyze facial action units to classify neurological states",
      "Secure & Compliant Architecture — strict healthcare privacy protocols and clinical assessment guidelines",
      "Modern Full-Stack — Vite/React/Tailwind frontend with cross-platform model management automation",
    ],
    link: "https://charcot.netlify.app",
  },
  {
    id: 4,
    title: "Research Discovery Engine",
    description: "A full-stack research tool combining an intelligent agent layer, PDF processing, and embedding-based semantic search to explore and query large document repositories.",
    longDescription:
      "This application pairs a React frontend with a Python/Flask backend to process, embed, and semantically query large collections of documents. An agent layer orchestrates complex research queries, coordinating between an embedding service and a keyword gateway to surface the most relevant information across the corpus. A dedicated PDF processing pipeline extracts and parses text from uploaded documents, making them instantly searchable via a scalable SQL-backed data store.",
    tech: ['React', 'Python', 'Flask', 'Embeddings', 'SQL', 'Agent Architecture'],
    highlights: [
      "Intelligent Agent Architecture — orchestration layer coordinates query processing across data services",
      "Robust Document Processing — pipeline extracts and parses text from PDF documents for search and analysis",
      "Advanced Search Capabilities — embedding service plus keyword gateway for context-aware semantic search",
      "Full-Stack Application — responsive React UI connected to a scalable Flask backend with SQL storage",
    ],
    github: "https://github.com/sree-chi/keywords-hackathon",
  },
];

export default projects;
