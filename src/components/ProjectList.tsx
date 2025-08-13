import React from 'react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
//   onDelete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  return (
    <div>
      {projects.map((proj) => (
        <div key={proj.id} className="experience-entry" data-id={proj.id}>
          <h4 className="experience-title">{proj.title}</h4>
          <p className="experience-startdate">{proj.startDate}</p>
          <p className="experience-enddate">{proj.endDate}</p>
          <ul className="experience-bullets">
            {(proj.highlights || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <button onClick={() => onEdit(proj)}>Edit</button>
          <button onClick={() => onDelete(proj.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// export default function ProjectList({ projects, onEdit }: ProjectListProps) {
//     // export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
//   return (
//     <div className="project-list">
//       {projects.map(project => (
//         <div key={project.id} className="project-item">
//           <h3>{project.title}</h3>
//           <p>
//             {project.startDate || '—'} — {project.endDate || 'Present'}
//           </p>
//           <ul>
//             {project.highlights.map((bullet, idx) => (
//               <li key={idx}>{bullet}</li>
//             ))}
//           </ul>
//           <button onClick={() => onEdit(project)}>Edit</button>
//           {/* <button onClick={() => onDelete(project.id)}>Delete</button> */}
//         </div>
//       ))}
//     </div>
//   );
// }
