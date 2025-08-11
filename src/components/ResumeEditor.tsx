import React, { useState } from "react";
import type { Resume, Experience } from "../types";
import { ExperienceList } from "./ExperienceList";
import { ExperienceForm } from "./ExperienceForm";
import { Modal } from "./Modal";

function extractUsername(url: string) {
  try {
    const parsed = new URL(url.trim());
    const paths = parsed.pathname.split("/").filter(Boolean);
    return paths.length > 0 ? paths[paths.length - 1] : "";
  } catch {
    return "";
  }
}

export const ResumeEditor: React.FC = () => {
  const [resume, setResume] = useState<Resume>({
    name: "Your Name",
    email: "email@example.com",
    profiles: [
      { network: "GitHub", username: "you", url: "https://github.com/you" },
      { network: "LinkedIn", username: "you", url: "https://linkedin.com/in/you" }
    ],
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
            onBlur={(e) => handleFieldChange("email", e.currentTarget.textContent || "")}
          >
            {resume.email}
          </span>
        </div>
        {resume.profiles.map((profile, i) => (
          <div key={i}>
            <label>{profile.network} URL:</label>
            <input
              type="text"
              value={profile.url}
              onChange={(e) => {
                const newProfiles = [...resume.profiles];
                newProfiles[i].url = e.target.value;
                newProfiles[i].username = extractUsername(e.target.value);
                setResume({ ...resume, profiles: newProfiles });
              }}
            />
          </div>
        ))}
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
