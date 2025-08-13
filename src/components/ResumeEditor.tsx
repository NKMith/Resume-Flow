import React, { useState, useEffect } from "react";
import type { Resume, Experience } from "../types";
import { ExperienceList } from "./ExperienceList";
import { ExperienceForm } from "./ExperienceForm";
import { Modal } from "./Modal";
import  ProjectList  from "./ProjectList";
import  ProjectForm  from "./ProjectForm";
import type { Project } from "../types";
import { EducationForm } from "./EducationForm";
import { EducationList } from "./EducationList";
import type { Education } from "../types";
import { BulletPointModal } from "./BulletPointModal";



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
    projects: [],
    education: []
  });

  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const [isBulletPointModalOpen, setIsBulletPointModalOpen] = useState(false);
  const [currentBullets, setCurrentBullets] = useState<string[]>([]);
  const [bulletModalTitle, setBulletModalTitle] = useState("");

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
    setIsExperienceModalOpen(false);
    setEditingExp(null);
  };

  
  const handleSaveProject = (proj: Project) => {
    setResume((prev) => {
      const exists = prev.projects.some((p) => p.id === proj.id);
      const updatedProjects = exists
        ? prev.projects.map((p) => (p.id === proj.id ? proj : p))
        : [...prev.projects, proj];
      return { ...prev, projects: updatedProjects };
    });
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveEducation = (edu: Education) => {
    setResume((prev) => {
      const exists = prev.education?.some((e) => e.id === edu.id);
      const updatedEducation = exists
        ? prev.education.map((e) => (e.id === edu.id ? edu : e))
        : [...(prev.education || []), edu];
      return { ...prev, education: updatedEducation };
    });
    setIsEducationModalOpen(false);
    setEditingEducation(null);
  };

  // Function to show the bullet point modal
  const handleShowBullets = (bullets: string[], title: string) => {
    setCurrentBullets(bullets);
    setBulletModalTitle(title);
    setIsBulletPointModalOpen(true);
  };

  const handleFieldChange = (field: keyof Resume, value: string) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  // Function to delete an experience by its ID
  const handleDeleteExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Function to delete a project by its ID
  const handleDeleteProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
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
    // downloadJsonFile(resume, "resume.json");

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
      <h2>Education</h2>
      <EducationList
        education={resume.education || []}
        onEdit={(edu) => {
          setEditingEducation(edu);
          setIsEducationModalOpen(true);
        }}
      />
      <button onClick={() => setIsEducationModalOpen(true)}>+ Add Education</button>
      <h2>Experience</h2>
      <ExperienceList
        experiences={resume.experience}
        onEdit={(exp) => {
          setEditingExp(exp);
          setIsExperienceModalOpen(true);
        }}
        onDelete={handleDeleteExperience} 
        onShowBullets={handleShowBullets} // Pass the new handler
      />
      <button onClick={() => setIsExperienceModalOpen(true)}>+ Add Experience</button>

      <h2>Projects</h2>
      <ProjectList
        projects={resume.projects}
        onEdit={(proj) => {
          setEditingProject(proj);
          setIsProjectModalOpen(true);
        }}
        // Pass the delete function as a prop
        onDelete={handleDeleteProject}
        onShowBullets={handleShowBullets} // Pass the new handler
      />
      <button onClick={() => setIsProjectModalOpen(true)}>+ Add Project</button>
      <hr />
      <button onClick={saveResume}>💾 Save Resume</button>

      <Modal
        isOpen={isExperienceModalOpen}
        title={editingExp ? "Edit Experience" : "Add Experience"}
        onClose={() => {
          setIsExperienceModalOpen(false);
          setEditingExp(null);
        }}
      >
        <ExperienceForm initialData={editingExp || undefined} onSave={handleSaveExperience} />
      </Modal>

      <Modal
        isOpen={isProjectModalOpen}
        title={editingProject ? "Edit Project" : "Add Project"}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
      >
        <ProjectForm initialData={editingProject || undefined} onSave={handleSaveProject} />
      </Modal>

      
      <Modal
        isOpen={isEducationModalOpen}
        title={editingEducation ? "Edit Education" : "Add Education"}
        onClose={() => {
          setIsEducationModalOpen(false);
          setEditingEducation(null);
        }}
      >
        <EducationForm
          initialData={editingEducation || undefined}
          onSave={handleSaveEducation}
        />
      </Modal>

      <BulletPointModal
        isOpen={isBulletPointModalOpen}
        onClose={() => {
          setIsBulletPointModalOpen(false);
          setCurrentBullets([]);
          setBulletModalTitle("");
        }}
        title={bulletModalTitle}
        bullets={currentBullets}
      />
    </div>
  );
};
