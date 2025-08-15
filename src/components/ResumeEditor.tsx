// ResumeEditor.tsx

import React, { useState, useEffect } from "react";
import type { Resume, Work, Education, Project, Skill } from "../types";
import { WorkList } from "./WorkList";
import { WorkForm } from "./WorkForm";
import { Modal } from "./Modal";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";
import { EducationForm } from "./EducationForm";
import { EducationList } from "./EducationList";
import { BulletPointModal } from "./BulletPointModal";
import { SkillForm } from "./SkillForm";
import { SkillList } from "./SkillList";
import { AwardForm } from "./AwardForm";
import { AwardList } from "./AwardList";
import type { Award } from "../types";


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
    basics: {
      name: "John Doe",
      label: "Programmer",
      image: "",
      email: "john@gmail.com",
      phone: "(912) 555-4321",
      url: "https://johndoe.com",
      summary: "A summary of John Doe…",
      location: {
        address: "2712 Broadway St",
        postalCode: "CA 94115",
        city: "San Francisco",
        countryCode: "US",
        region: "California",
      },
      profiles: [{
        network: "Twitter",
        username: "john",
        url: "https://twitter.com/john",
      }],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [], // Initial empty array for skills
    languages: [],
    interests: [],
    references: [],
    projects: [],
  });

  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Work | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [isBulletPointModalOpen, setIsBulletPointModal] = useState(false);
  const [currentBullets, setCurrentBullets] = useState<string[]>([]);
  const [bulletModalTitle, setBulletModalTitle] = useState("");

  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);

  const handleSaveAward = (award: Award) => {
    setResume((prev) => {
      const exists = prev.awards?.some((a) => a.id === award.id);
      const updatedAwards = exists
        ? prev.awards.map((a) => (a.id === award.id ? award : a))
        : [...(prev.awards || []), award];
      return { ...prev, awards: updatedAwards };
    });
    setIsAwardModalOpen(false);
    setEditingAward(null);
  };

  const handleEditAward = (award: Award) => {
    setEditingAward(award);
    setIsAwardModalOpen(true);
  };

  const handleDeleteAward = (id: string) => {
    setResume((prev) => ({
      ...prev,
      awards: prev.awards?.filter((a) => a.id !== id) || [],
    }));
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Resume = JSON.parse(saved);
        setResume(parsed);
      } catch (e) {
        console.error("Failed to parse saved resume from localStorage; using default values", e);
      }
    }
  }, []);

  // --- Functions for Work Experience ---
  const handleSaveExperience = (exp: Work) => {
    setResume((prev) => {
      const exists = prev.work.some((e) => e.id === exp.id);
      const updatedWork = exists
        ? prev.work.map((e) => (e.id === exp.id ? exp : e))
        : [...prev.work, exp];
      return { ...prev, work: updatedWork };
    });
    setIsExperienceModalOpen(false);
    setEditingExp(null);
  };

  const handleEditExperience = (exp: Work) => {
    setEditingExp(exp);
    setIsExperienceModalOpen(true);
  };

  const handleDeleteExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      work: prev.work.filter((exp) => exp.id !== id),
    }));
  };

  // --- Functions for Projects ---
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

  const handleEditProject = (proj: Project) => {
    setEditingProject(proj);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // --- Functions for Education ---
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

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    setIsEducationModalOpen(true);
  };

  const handleDeleteEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education?.filter((edu) => edu.id !== id) || [],
    }));
  };

  // --- Functions for Skills ---
  const handleSaveSkill = (skill: Skill) => {
    setResume((prev) => {
      const exists = prev.skills.some((s) => s.id === skill.id);
      const updatedSkills = exists
        ? prev.skills.map((s) => (s.id === skill.id ? skill : s))
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
    setIsSkillModalOpen(false);
    setEditingSkill(null);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleDeleteSkill = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  // --- Global Functions ---
  const handleShowBullets = (bullets: string[], title: string) => {
    setCurrentBullets(bullets);
    setBulletModalTitle(title);
    setIsBulletPointModal(true);
  };

  const handleBasicsChange = (field: keyof typeof resume.basics, value: string) => {
    setResume((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        [field]: value,
      },
    }));
  };

  const handleLocationChange = (field: keyof typeof resume.basics.location, value: string) => {
    setResume((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        location: {
          ...prev.basics.location,
          [field]: value,
        },
      },
    }));
  };

  const handleProfileChange = (index: number, newUrl: string, network: string) => {
    setResume((prev) => {
      const updatedProfiles = [...prev.basics.profiles];
      updatedProfiles[index] = {
        ...updatedProfiles[index],
        url: newUrl,
        username: extractUsername(newUrl),
        network: network,
      };
      return {
        ...prev,
        basics: {
          ...prev.basics,
          profiles: updatedProfiles,
        },
      };
    });
  };

  const handleAddProfile = () => {
    setResume((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        profiles: [...prev.basics.profiles, { network: "", username: "", url: "" }],
      },
    }));
  };

  const handleDeleteProfile = (index: number) => {
    setResume((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        profiles: prev.basics.profiles.filter((_, i) => i !== index),
      },
    }));
  };

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

  const handleSaveToBrowser = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    alert("Resume saved to your browser's local storage!");
  };

  const handleDownload = () => {
    downloadJsonFile(resume, "resume.json");
  };

  return (
    <div className="container">
      <h2 className="section-title">Basics</h2>
      <label>Name</label>
      <h1
        className="editable-text"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleBasicsChange("name", e.currentTarget.textContent || "")}
      >
        {resume.basics.name}
      </h1>

      <div className="form-field-group">
        <label>Label</label>
        <input
          placeholder="e.g. Programmer"
          value={resume.basics.label}
          onChange={(e) => handleBasicsChange("label", e.target.value)}
        />
      </div>

      <div className="form-field-group">
        <label>Summary</label>
        <textarea
          placeholder="A summary of John Doe…"
          value={resume.basics.summary}
          onChange={(e) => handleBasicsChange("summary", e.target.value)}
        />
      </div>

      <hr />

      <h2 className="section-title">Contact Information</h2>
      <div className="form-field-group">
        <label>Email</label>
        <input
          placeholder="john@gmail.com"
          value={resume.basics.email}
          onChange={(e) => handleBasicsChange("email", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>Phone</label>
        <input
          placeholder="(912) 555-4321"
          value={resume.basics.phone}
          onChange={(e) => handleBasicsChange("phone", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>Website URL</label>
        <input
          placeholder="https://johndoe.com"
          value={resume.basics.url}
          onChange={(e) => handleBasicsChange("url", e.target.value)}
        />
      </div>

      <hr />

      <h2 className="section-title">Location</h2>
      <div className="form-field-group">
        <label>Address</label>
        <input
          placeholder="2712 Broadway St"
          value={resume.basics.location.address}
          onChange={(e) => handleLocationChange("address", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>City</label>
        <input
          placeholder="San Francisco"
          value={resume.basics.location.city}
          onChange={(e) => handleLocationChange("city", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>Region</label>
        <input
          placeholder="California"
          value={resume.basics.location.region}
          onChange={(e) => handleLocationChange("region", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>Country Code</label>
        <input
          placeholder="US"
          value={resume.basics.location.countryCode}
          onChange={(e) => handleLocationChange("countryCode", e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label>Postal Code</label>
        <input
          placeholder="CA 94115"
          value={resume.basics.location.postalCode}
          onChange={(e) => handleLocationChange("postalCode", e.target.value)}
        />
      </div>

      <hr />

      <h2 className="section-title">Profiles</h2>
      {resume.basics.profiles.map((profile, i) => (
        <div key={i} className="profile-input-group list-item compact">
          <div className="form-field-group">
            <label>Network</label>
            <input
              placeholder="Twitter"
              type="text"
              value={profile.network}
              onChange={(e) => handleProfileChange(i, profile.url, e.target.value)}
            />
          </div>
          <div className="form-field-group">
            <label>URL</label>
            <input
              placeholder="https://twitter.com/john"
              type="text"
              value={profile.url}
              onChange={(e) => handleProfileChange(i, e.target.value, profile.network)}
            />
          </div>
          <div className="item-actions">
            <button className="button button-danger" onClick={() => handleDeleteProfile(i)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="button button-secondary add-button" onClick={handleAddProfile}>
        + Add Profile
      </button>

      <hr />

      <h2 className="section-title">Education</h2>
      <EducationList
        education={resume.education || []}
        onEdit={handleEditEducation}
        onDelete={handleDeleteEducation}
        onShowBullets={handleShowBullets}
      />
      <button className="button button-primary add-button" onClick={() => { setIsEducationModalOpen(true); setEditingEducation(null); }}>
        + Add Education
      </button>

      <hr />

      <h2 className="section-title">Work Experience</h2>
      <WorkList
        experiences={resume.work}
        onEdit={handleEditExperience}
        onDelete={handleDeleteExperience}
        onShowBullets={handleShowBullets}
      />
      <button className="button button-primary add-button" onClick={() => { setIsExperienceModalOpen(true); setEditingExp(null); }}>
        + Add Work Experience
      </button>

      <hr />

      <h2 className="section-title">Projects</h2>
      <ProjectList
        projects={resume.projects}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
        onShowBullets={handleShowBullets}
      />
      <button className="button button-primary add-button" onClick={() => { setIsProjectModalOpen(true); setEditingProject(null); }}>
        + Add Project
      </button>
      
      <hr />
      <h2 className="section-title">Awards</h2>
      <AwardList
        awards={resume.awards || []}
        onEdit={handleEditAward}
        onDelete={handleDeleteAward}
      />
      <button
        className="button button-primary add-button"
        onClick={() => { setIsAwardModalOpen(true); setEditingAward(null); }}
      >
        + Add Award
      </button>
      
      
      <hr />

      <h2 className="section-title">Skills</h2>
      <SkillList
        skills={resume.skills}
        onEdit={handleEditSkill}
        onDelete={handleDeleteSkill}
        onShowBullets={handleShowBullets}
      />
      <button className="button button-primary add-button" onClick={() => { setIsSkillModalOpen(true); setEditingSkill(null); }}>
        + Add Skill
      </button>

      <hr />

      <div className="button-group">
        <button className="button button-secondary" onClick={handleSaveToBrowser}>
          💾 Save to Browser
        </button>
        <button className="button button-primary" onClick={handleDownload}>
          Download Resume JSON
        </button>
      </div>

      <Modal
        isOpen={isExperienceModalOpen}
        title={editingExp ? "Edit Work Experience" : "Add Work Experience"}
        onClose={() => { setIsExperienceModalOpen(false); setEditingExp(null); }}
      >
        <WorkForm
          initialData={editingExp || undefined}
          onSave={handleSaveExperience}
        />
      </Modal>

      <Modal
        isOpen={isProjectModalOpen}
        title={editingProject ? "Edit Project" : "Add Project"}
        onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
      >
        <ProjectForm
          initialData={editingProject || undefined}
          onSave={handleSaveProject}
        />
      </Modal>

      <Modal
        isOpen={isEducationModalOpen}
        title={editingEducation ? "Edit Education" : "Add Education"}
        onClose={() => { setIsEducationModalOpen(false); setEditingEducation(null); }}
      >
        <EducationForm
          initialData={editingEducation || undefined}
          onSave={handleSaveEducation}
        />
      </Modal>
      
      <Modal
        isOpen={isSkillModalOpen}
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        onClose={() => { setIsSkillModalOpen(false); setEditingSkill(null); }}
      >
        <SkillForm
          initialData={editingSkill || undefined}
          onSave={handleSaveSkill}
        />
      </Modal>

      <Modal
        isOpen={isBulletPointModalOpen}
        title={bulletModalTitle}
        onClose={() => setIsBulletPointModal(false)}
      >
        <BulletPointModal bullets={currentBullets} />
      </Modal>

      <Modal
        isOpen={isAwardModalOpen}
        title={editingAward ? "Edit Award" : "Add Award"}
        onClose={() => { setIsAwardModalOpen(false); setEditingAward(null); }}
      >
        <AwardForm
          initialData={editingAward || undefined}
          onSave={handleSaveAward}
        />
      </Modal>
    </div>
  );
};