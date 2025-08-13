import React from "react";
import type { Experience } from "../types";

interface Props {
  experiences: Experience[];
  onEdit: (exp: Experience) => void;
  // Add onDelete prop
  onDelete: (id: string) => void;
}

export const ExperienceList: React.FC<Props> = ({ experiences, onEdit, onDelete }) => {
  return (
    <div>
      {experiences.map((exp) => (
        <div key={exp.id} className="experience-entry" data-id={exp.id}>
          <h4 className="experience-title">{exp.title} - {exp.company}</h4>
          <p className="experience-startdate">{exp.startDate}</p>
          <p className="experience-enddate">{exp.endDate}</p>
          <ul className="experience-bullets">
            {(exp.highlights || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <button onClick={() => onEdit(exp)}>Edit</button>
          <button onClick={() => onDelete(exp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
