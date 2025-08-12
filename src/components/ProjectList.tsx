import React from 'react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
//   onDelete: (id: string) => void;
}

export default function ProjectList({ projects, onEdit }: ProjectListProps) {
    // export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-item">
          <h3>{project.title}</h3>
          <p>
            {project.startDate || '—'} — {project.endDate || 'Present'}
          </p>
          <ul>
            {project.highlights.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
          <button onClick={() => onEdit(project)}>Edit</button>
          {/* <button onClick={() => onDelete(project.id)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
}
