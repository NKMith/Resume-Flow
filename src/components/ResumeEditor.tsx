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
    setResume((prev) => {
      const exists = prev.experience.some((e) => e.id === exp.id);
      const updatedExperience = exists
        ? prev.experience.map((e) => e.id === exp.id ? exp : e)
        : [...prev.experience, exp];
      return { ...prev, experience: updatedExperience };
    });
    setIsModalOpen(false);
    setEditingExp(null);
  };

  const handleFieldChange = (field: keyof Resume, value: string) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const saveResume = () => {
    // At this point, resume already has the latest state values
    console.log("Resume JSON:", resume);
    alert("Resume saved to console.");
  };

  return (
    <div className="container">
      <div>
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleFieldChange("name", e.currentTarget.textContent || "")}
        >
          {resume.name}
        </h1>
        <div>
          <label>Contact: </label>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleFieldChange("contact", e.currentTarget.textContent || "")}
          >
            {resume.contact}
          </span>
        </div>
        <div>
          <label>GitHub: </label>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleFieldChange("github", e.currentTarget.textContent || "")}
          >
            {resume.github}
          </span>
        </div>
        <div>
          <label>LinkedIn: </label>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleFieldChange("linkedin", e.currentTarget.textContent || "")}
          >
            {resume.linkedin}
          </span>
        </div>
      </div>

      <h2>Experience</h2>
      <ExperienceList
        experiences={resume.experience}
        onEdit={(exp) => { setEditingExp(exp); setIsModalOpen(true); }}
      />
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
