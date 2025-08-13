// SkillList.tsx

import React from "react";
import type { Skill } from "../types";

interface Props {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
  onShowBullets: (keywords: string[], title: string) => void;
}

export const SkillList: React.FC<Props> = ({ skills, onEdit, onDelete, onShowBullets }) => {
  return (
    <div>
      {skills.map((skill) => (
        <div key={skill.id} className="list-item">
          <h4>{skill.name} - {skill.level}</h4>
          <p>{skill.keywords.join(', ')}</p>
          <div className="item-actions">
            <button className="button button-secondary" onClick={() => onEdit(skill)}>Edit</button>
            <button className="button button-danger" onClick={() => onDelete(skill.id)}>Delete</button>
            <button className="button button-secondary" onClick={() => onShowBullets(skill.keywords, `${skill.name} Keywords`)}>Show Keywords</button>
          </div>
        </div>
      ))}
    </div>
  );
};