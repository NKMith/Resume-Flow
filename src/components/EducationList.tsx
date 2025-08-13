import React from "react";
import type { Education } from "../types";

interface Props {
  education: Education[];
  onEdit: (edu: Education) => void;
  onDelete: (id: string) => void;
  // Added the new prop for showing courses
  onShowBullets: (bullets: string[], title: string) => void;
}

export const EducationList: React.FC<Props> = ({ education, onEdit, onDelete, onShowBullets }) => {
  return (
    <div>
      {education.map((edu) => (
        <div key={edu.id} className="list-item">
          <h4>{edu.institution} - {edu.studyType}</h4>
          <p>{edu.area}</p>
          <p>{edu.startDate} — {edu.endDate}</p>
          <p>Score: {edu.score}</p>
          <div className="item-actions">
            <button className="button button-secondary" onClick={() => onEdit(edu)}>Edit</button>
            <button className="button button-danger" onClick={() => onDelete(edu.id)}>Delete</button>
            <button className="button button-secondary" onClick={() => onShowBullets(edu.courses, `${edu.institution} Courses`)}>Show Courses</button>
          </div>
        </div>
      ))}
    </div>
  );
};