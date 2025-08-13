import React, { useState, useEffect } from "react";
import type { Project } from '../types';

interface ProjectFormProps {
  onSave: (project: Project) => void;
  initialData?: Project;
}

export default function ProjectForm({ onSave, initialData }: ProjectFormProps) {
  const [title, setTitle] = useState("");
  //const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      // setCompany(initialData.company);
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
      setBullets(initialData.highlights);
    }
  }, [initialData]);

  const addBullet = () => setBullets([...bullets, ""]);
  const updateBullet = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    setBullets(updated);
  };
  
  const deleteBullet = (index: number) => {
    const updated = [...bullets];
    updated.splice(index, 1);
    setBullets(updated);
  };
  
  
    const handleDragStart = (index: number) => {
      setDragIndex(index);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // Needed so drop will fire
    };
  
    const handleDrop = (index: number) => {
      if (dragIndex === null) return;
      const updated = [...bullets];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(index, 0, removed);
      setBullets(updated);
      setDragIndex(null);
    };
  
    const handleSubmit = () => {
      onSave({
        id: initialData?.id || Date.now().toString(),
        title,
        // company,
        startDate,
        endDate,
        highlights: bullets
      });
    };
  
    return (
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
  
        {/* <label>Company</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} /> */}
  
        <div className="date-fields">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
  
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
  
        <label>Bullet Points</label>
        <div className="bullets-container">
          {bullets.map((bullet, i) => (
          <div key={i} className="bullet-wrapper">
            <input
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(i)}
              value={bullet}
              onChange={(e) => updateBullet(i, e.target.value)}
              className="bullet-point-input"
            />
            <button
              type="button"
              // className="delete-bullet-btn"
              className="delete-bullet-btn"
              onClick={() => deleteBullet(i)}
            >
              🗑️
            </button>
          </div>
        ))}
  
        </div>
        <button type="button" onClick={addBullet}>+ Add Bullet Point</button>
  
        <button type="button" onClick={handleSubmit}>
          {initialData ? "Update Project" : "Add Project"}
        </button>
      </div>
    );
}
