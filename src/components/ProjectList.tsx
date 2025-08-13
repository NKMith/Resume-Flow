import React from 'react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onShowBullets: (bullets: string[], title: string) => void;
}

export default function ProjectList({ projects, onEdit, onDelete, onShowBullets }: ProjectListProps) {
  return (
    <div>
      {projects.map((proj) => (
        <div key={proj.id} className="list-item">
          <h4>{proj.title}</h4>
          <p>{proj.startDate} — {proj.endDate}</p>
          <div className="item-actions">
            <button className="button button-secondary" onClick={() => onEdit(proj)}>Edit</button>
            <button className="button button-danger" onClick={() => onDelete(proj.id)}>Delete</button>
            <button className="button button-secondary" onClick={() => onShowBullets(proj.highlights, `${proj.title} Highlights`)}>Show Bullets</button>
          </div>
        </div>
      ))}
    </div>
  );
};