import { useEffect, useState } from "react";
import "./Portfolio.css";

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store with shopping cart and payment integration.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // valid
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio website to showcase projects and skills.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // updated valid URL
    link: "#",
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "Custom blogging platform with user authentication and content management.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", // updated valid URL
    link: "#",
  },
  {
    id: 4,
    title: "Mobile App UI",
    description: "UI design and prototype for a mobile productivity app.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", // valid
    link: "#",
  },
];


const Portfolio = () => {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    // Simple fade-in effect on load for each project card
    const timers = projects.map((_, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), i * 200)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="portfolio-container">
      <h1>My Portfolio</h1>
      <p>Check out some of my recent projects. Hover over cards for details!</p>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={project.id}
            className={`project-card ${visible.includes(i) ? "visible" : ""}`}
          >
            <div className="image-wrapper">
              <img src={project.imageUrl} alt={project.title} />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
