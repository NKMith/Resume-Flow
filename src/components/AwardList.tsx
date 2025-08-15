import React from "react";
import type { Award } from "../types";

interface Props {
  awards: Award[];
  onEdit: (award: Award) => void;
  onDelete: (id: string) => void;
}

export const AwardList: React.FC<Props> = ({ awards, onEdit, onDelete }) => {
  return (
    <div>
      {awards.map((award) => (
        <div key={award.id} className="list-item">
          <h4>{award.title}</h4>
          <p>{award.awarder} — {award.date}</p>
          <p>{award.summary}</p>
          <div className="item-actions">
            <button className="button button-secondary" onClick={() => onEdit(award)}>Edit</button>
            <button className="button button-danger" onClick={() => onDelete(award.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
