import React, { useState, useEffect } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([])

  const projects = [
    {
      id: 1,
      title: 'AI Research Assistant',
      description: 'An AI-powered research assistant that enables users to ask questions from uploaded PDFs and article links. Built using a Retrieval-Augmented Generation (RAG) pipeline with vector embeddings and similarity search to fetch relevant context and generate accurate, context-aware answers in real time through an interactive interface.',
      image: 'https://res.cloudinary.com/diwy2asxu/image/upload/v1766078107/ChatGPT_Image_Dec_18_2025_10_43_55_PM_gtw0ln.jpg',
      technologies: ['Python', 'LangChain', 'FAISS', 'Streamlit', 'OpenAI API'],
      status: 'Completed',
      github: 'https://github.com/GreeshmanthBommireddy',
      demo: 'https://github.com/GreeshmanthBommireddy'
    },
    {
      id: 2,
      title: 'Greeshmanth Portfolio Website',
      description: 'A full-stack personal portfolio designed to showcase skills, projects, and professional journey in an interactive and visually appealing way. Built for potential employers, clients, and collaborators, featuring React 18.2.0 with Vite for fast modular UI, custom typography with Playfair Display and Inter fonts, real-time WhatsApp alerts for contact form submissions, and optimized performance with accessibility focus.',
      image: 'https://res.cloudinary.com/diwy2asxu/image/upload/v1766077697/Screenshot_2025-12-18_223653_l24pi2.png',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'React Icons', 'React Toastify'],
      status: 'Completed',
      github: 'https://github.com/GreeshmanthBommireddy',
      demo: 'https://github.com/GreeshmanthBommireddy'
    },
    {
      id: 3,
      title: 'Student Information Management API',
      description: 'A backend-focused REST API developed to manage student records efficiently. Supports full CRUD operations with robust validation, structured responses, and optimized database queries, ensuring scalability, reliability, and secure relational data management.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&auto=format&q=80',
      technologies: ['Python', 'Django REST Framework', 'PostgreSQL'],
      status: 'Completed',
      github: 'https://github.com/GreeshmanthBommireddy',
      demo: 'https://drive.google.com/drive/folders/12Mc5MBUHnyCZqAn34AzGBjCOuc6cypUd'
    },
  ]

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id')
            setVisibleProjects(prev => [...new Set([...prev, projectId])])
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-12 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-8xl mx-auto px-8 md:px-16 lg:px-24 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-medium-gray leading-relaxed text-center max-w-4xl mx-auto">
            A curated selection of my most impactful work, showcasing expertise across various technologies and industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card transition-all duration-700 ease-out flex flex-col h-full ${
                visibleProjects.includes(project.id.toString()) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transformOrigin: 'center bottom'
              }}
            >
              {/* Project Image */}
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="project-overlay">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-btn transform hover:scale-105"
                  >
                    <FaExternalLinkAlt size={14} />
                    View Live
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-btn transform hover:scale-105"
                  >
                    <FaGithub size={14} />
                    View Code
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-charcoal mb-3 leading-tight font-serif">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-medium-gray leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {project.status}
                  </span>
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="tech-tag transition-colors duration-200 hover:bg-charcoal hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons - Now pushed to bottom */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-medium-gray transition-all duration-200 font-bold text-sm flex items-center gap-2 transform hover:translate-x-1"
                  >
                    View Project
                    <FaExternalLinkAlt size={12} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-medium-gray hover:text-charcoal transition-all duration-200 transform hover:scale-110"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
