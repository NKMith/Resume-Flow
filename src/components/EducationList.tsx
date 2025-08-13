import React from "react";
import type { Education } from "../types";

interface Props {
  education: Education[];
  onEdit: (edu: Education) => void;
  // Add the onDelete prop here
  onDelete: (id: string) => void;
}

export const EducationList: React.FC<Props> = ({ education, onEdit, onDelete }) => {
  return (
    <div>
      {education.map((edu) => (
        <div key={edu.id} className="education-entry">
          <h4>{edu.institution} - {edu.studyType}</h4>
          <p>{edu.area}</p>
          <p>{edu.startDate} — {edu.endDate}</p>
          <p>Score: {edu.score}</p>
          {edu.courses.length > 0 && (
            <ul>
              {edu.courses.map((course, i) => <li key={i}>{course}</li>)}
            </ul>
          )}
          <button onClick={() => onEdit(edu)}>Edit</button>
          <button onClick={() => onDelete(edu.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};