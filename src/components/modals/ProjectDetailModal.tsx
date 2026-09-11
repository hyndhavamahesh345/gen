import React from 'react';
import { ExternalLink, Code2, ThumbsUp } from 'lucide-react';
import { Project } from '../../types';
import { Modal } from '../common/Modal';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onUpvote: (projId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onUpvote,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={!!project}
      onClose={onClose}
      title={project.title}
      subtitle={project.tagline}
      maxWidth="700px"
    >
      <div className="proj-modal-content">
        <div className="proj-modal-meta">
          <span className="proj-category">{project.category}</span>
          <button
            type="button"
            className="upvote-btn"
            onClick={() => onUpvote(project.id)}
          >
            <ThumbsUp size={14} /> {project.upvotes} Upvotes
          </button>
        </div>

        <p className="proj-modal-desc">{project.description}</p>

        <div className="proj-modal-section">
          <h4>Tech Stack &amp; Frameworks</h4>
          <div className="tech-stack-pills">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="proj-modal-author">
          <img src={project.author.avatar} alt={project.author.name} />
          <div>
            <strong>Built by {project.author.name}</strong>
            <span>{project.author.role}</span>
          </div>
        </div>

        <div className="proj-modal-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-ghost"
            >
              <Code2 size={16} /> View Source Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-yellow"
            >
              Live Demo <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
