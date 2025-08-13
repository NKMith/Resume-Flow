// SkillForm.tsx

import React, { useState, useEffect } from "react";
import type { Skill } from "../types";

interface Props {
  initialData?: Skill;
  onSave: (skill: Skill) => void;
}

export const SkillForm: React.FC<Props> = ({ initialData, onSave }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLevel(initialData.level);
      setKeywords(initialData.keywords);
    }
  }, [initialData]);

  const addKeyword = () => setKeywords([...keywords, ""]);
  const updateKeyword = (index: number, value: string) => {
    const updated = [...keywords];
    updated[index] = value;
    setKeywords(updated);
  };
  const deleteKeyword = (index: number) => {
    const updated = [...keywords];
    updated.splice(index, 1);
    setKeywords(updated);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDrop = (index: number) => {
    if (dragIndex === null) return;
    const updated = [...keywords];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, removed);
    setKeywords(updated);
    setDragIndex(null);
  };

  const handleSubmit = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      name,
      level,
      keywords: keywords.filter(k => k.trim() !== ""),
    });
  };

  return (
    <div>
      <div className="form-field-group">
        <label>Skill Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Web Development"
        />
      </div>

      <div className="form-field-group">
        <label>Level</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="e.g. Master"
        />
      </div>

      <div className="form-field-group">
        <label>Keywords</label>
        <div className="bullets-container">
          {keywords.map((keyword, i) => (
            <div key={i} className="bullet-wrapper" onDrop={() => handleDrop(i)} onDragOver={handleDragOver}>
              <input
                draggable
                onDragStart={() => handleDragStart(i)}
                value={keyword}
                onChange={(e) => updateKeyword(i, e.target.value)}
                className="bullet-point-input"
                placeholder="e.g. JavaScript"
              />
              <button type="button" className="delete-bullet-btn" onClick={() => deleteKeyword(i)}>🗑️</button>
            </div>
          ))}
          <button type="button" className="button button-secondary add-button" onClick={addKeyword}>+ Add Keyword</button>
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="button button-primary" onClick={handleSubmit}>
          {initialData ? "Update Skill" : "Add Skill"}
        </button>
      </div>
    </div>
  );
};