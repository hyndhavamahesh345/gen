import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, ExternalLink, ThumbsUp } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Project } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface ProjectsProps {
  onSelectProject: (p: Project) => void;
  onOpenSubmitIdea: () => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const CATEGORIES = ['All', 'AI', 'SaaS', 'Hardware', 'Web3', 'Mobile'];

export const ProjectsSection: React.FC<ProjectsProps> = ({
  onSelectProject,
  onOpenSubmitIdea,
  onShowToast,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getProjects(selectedCat).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [selectedCat]);

  const handleUpvote = async (e: React.MouseEvent, projId: string) => {
    e.stopPropagation();
    const newCount = await MockDataService.upvoteProject(projId);
    setProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, upvotes: newCount } : p))
    );
    onShowToast('Project upvoted!', 'success');
  };

  return (
    <section id="projects" className="projects-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="04 / Projects Showcase"
          title={
            <>
              Explore Student
              <br />
              <em>Products &amp; Projects.</em>
            </>
          }
          subtitle="Discover open-source software, AI agents, hardware prototypes, and SaaS applications built by Gentricks community members."
          action={
            <button
              type="button"
              className="button button-yellow"
              onClick={onOpenSubmitIdea}
            >
              Submit Your Project <ArrowUpRight size={17} />
            </button>
          }
        />

        <div className="type-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`type-filter-btn ${selectedCat === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading Projects Showcase...</div>
        ) : (
          <div className="projects-grid">
            {projects.map((proj) => (
              <div
                className="project-card"
                key={proj.id}
                onClick={() => onSelectProject(proj)}
              >
                <div className="project-card-header">
                  <span className="proj-cat-badge">{proj.category}</span>
                  <button
                    type="button"
                    className="upvote-btn"
                    onClick={(e) => handleUpvote(e, proj.id)}
                    title="Upvote Project"
                  >
                    <ThumbsUp size={13} />
                    <span>{proj.upvotes}</span>
                  </button>
                </div>

                <h3>{proj.title}</h3>
                <p className="proj-tagline">{proj.tagline}</p>
                <p className="proj-desc">{proj.description}</p>

                <div className="tech-stack-pills">
                  {proj.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div className="author-box">
                    <img
                      src={proj.author.avatar}
                      alt={proj.author.name}
                      className="author-avatar"
                    />
                    <div>
                      <strong>{proj.author.name}</strong>
                      <span>{proj.author.role}</span>
                    </div>
                  </div>

                  <div className="proj-links">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="GitHub Repository"
                      >
                        <Code2 size={16} />
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
