import React, { useState, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = "my_resume_data";

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

  // Load saved resume from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Resume = JSON.parse(saved);
        setResume(parsed);
      } catch (e) {
        console.error("Failed to parse saved resume from localStorage", e);
      }
    }
  }, []);

  const handleSaveExperience = (exp: Experience) => {
    setResume((prev) => {
      const exists = prev.experience.some((e) => e.id === exp.id);
      const updatedExperience = exists
        ? prev.experience.map((e) => (e.id === exp.id ? exp : e))
        : [...prev.experience, exp];
      return { ...prev, experience: updatedExperience };
    });
    setIsModalOpen(false);
    setEditingExp(null);
  };

  const handleFieldChange = (field: keyof Resume, value: string) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  // Function to trigger JSON file download
  const downloadJsonFile = (data: object, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveResume = () => {
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    // Trigger file download
    downloadJsonFile(resume, "resume.json");

    alert("Resume saved locally and downloaded as resume.json");
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
        onEdit={(exp) => {
          setEditingExp(exp);
          setIsModalOpen(true);
        }}
      />
      <button onClick={() => setIsModalOpen(true)}>+ Add Experience</button>

      <hr />
      <button onClick={saveResume}>💾 Save Resume</button>

      <Modal
        isOpen={isModalOpen}
        title={editingExp ? "Edit Experience" : "Add Experience"}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExp(null);
        }}
      >
        <ExperienceForm initialData={editingExp || undefined} onSave={handleSaveExperience} />
      </Modal>
    </div>
  );
};
