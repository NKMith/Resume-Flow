import React from "react";
import type { Work } from "../types";

interface Props {
  experiences: Work[];
  onEdit: (exp: Work) => void;
  onDelete: (id: string) => void;
  onShowBullets: (bullets: string[], title: string) => void;
}

export const WorkList: React.FC<Props> = ({ experiences, onEdit, onDelete, onShowBullets }) => {
  return (
    <div>
      {experiences.map((exp) => (
        <div key={exp.id} className="list-item">
          <h4>{exp.position} at {exp.name}</h4>
          <p>{exp.url}</p>
          <p>{exp.startDate} — {exp.endDate}</p>
          <div className="item-actions">
            <button className="button button-secondary" onClick={() => onEdit(exp)}>Edit</button>
            <button className="button button-danger" onClick={() => onDelete(exp.id)}>Delete</button>
            <button className="button button-secondary" onClick={() => onShowBullets(exp.highlights, `${exp.position} Highlights`)}>Show Highlights</button>
          </div>
        </div>
      ))}
    </div>
  );
};