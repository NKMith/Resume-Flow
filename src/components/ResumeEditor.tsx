import React, { useState } from "react";
import type { Resume, Experience } from "../types";
import { ExperienceList } from "./ExperienceList";
import { ExperienceForm } from "./ExperienceForm";
import { Modal } from "./Modal";

export const ResumeEditor: React.FC = () => {
  const [resume, setResume] = useState<Resume>({
    name: "Your Name",
    contact: "email@example.com",
    github: "https://github.com/you",
    linkedin: "https://linkedin.com/in/you",
    experience: [],
    projects: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const handleSaveExperience = (exp: Experience) => {
    // useState: if you pass a function to the update function, REact will call it with most recent value of resume
    setResume((prev) => {
      const exists = prev.experience.some((e) => e.id === exp.id);
      const updatedExperience = exists
        ? prev.experience.map((e) => e.id === exp.id ? exp : e) // find the updated experience and update its value
        : [...prev.experience, exp]; // else just make a new experience
      return { ...prev, experience: updatedExperience };
    });
    setIsModalOpen(false);
    setEditingExp(null);
  };

  const saveResume = () => {
    console.log("Resume JSON:", resume);
    alert("Resume saved to console.");
  };
  console.log("Modal open?", isModalOpen);
  return (
    <div className="container">
      <div>
        <h1 contentEditable suppressContentEditableWarning>{resume.name}</h1>
        <div>
          <label>Contact: </label>
          <span contentEditable suppressContentEditableWarning>{resume.contact}</span>
        </div>
        <div>
          <label>GitHub: </label>
          <span contentEditable suppressContentEditableWarning>{resume.github}</span>
        </div>
        <div>
          <label>LinkedIn: </label>
          <span contentEditable suppressContentEditableWarning>{resume.linkedin}</span>
        </div>
      </div>

      <h2>Experience</h2>
      <ExperienceList experiences={resume.experience} onEdit={(exp) => { setEditingExp(exp); setIsModalOpen(true); }} />
      <button onClick={() => setIsModalOpen(true)}>+ Add Experience</button>

      <hr /> 
      <button onClick={saveResume}>💾 Save Resume</button>

      <Modal
        isOpen={isModalOpen}
        title={editingExp ? "Edit Experience" : "Add Experience"}
        onClose={() => { setIsModalOpen(false); setEditingExp(null); }}
      >
        <ExperienceForm initialData={editingExp || undefined} onSave={handleSaveExperience} />
      </Modal>
    </div>
  );
};
