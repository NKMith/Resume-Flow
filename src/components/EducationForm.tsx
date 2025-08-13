import React, { useState, useEffect } from "react";
import type { Education } from "../types";

interface Props {
  initialData?: Education;
  onSave: (edu: Education) => void;
}

export const EducationForm: React.FC<Props> = ({ initialData, onSave }) => {
  const [institution, setInstitution] = useState("");
  const [url, setUrl] = useState("");
  const [area, setArea] = useState("");
  const [studyType, setStudyType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [score, setScore] = useState("");
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setInstitution(initialData.institution);
      setUrl(initialData.url);
      setArea(initialData.area);
      setStudyType(initialData.studyType);
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
      setScore(initialData.score);
      setCourses(initialData.courses || []);
    }
  }, [initialData]);

  const addCourse = () => setCourses([...courses, ""]);
  const updateCourse = (index: number, value: string) => {
    const updated = [...courses];
    updated[index] = value;
    setCourses(updated);
  };
  const deleteCourse = (index: number) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const handleSubmit = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      institution,
      url,
      area,
      studyType,
      startDate,
      endDate,
      score,
      courses
    });
  };

  return (
    <div>
      <label>Institution</label>
      <input value={institution} onChange={(e) => setInstitution(e.target.value)} />

      <label>URL</label>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />

      <label>Area</label>
      <input value={area} onChange={(e) => setArea(e.target.value)} />

      <label>Study Type</label>
      <input value={studyType} onChange={(e) => setStudyType(e.target.value)} />

      <div className="date-fields">
        <div className="date-field-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="date-field-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <label>Score</label>
      <input value={score} onChange={(e) => setScore(e.target.value)} />

      <label>Courses</label>
      <div className="bullets-container">
        {courses.map((course, i) => (
          <div key={i} className="bullet-wrapper">
            <input
              value={course}
              onChange={(e) => updateCourse(i, e.target.value)}
              className="bullet-point-input"
            />
            <button type="button" className="delete-bullet-btn" onClick={() => deleteCourse(i)}>🗑️</button>
          </div>
        ))}
        <button type="button" className="button button-secondary add-button" onClick={addCourse}>+ Add Course</button>
      </div>

      <div className="button-group">
        <button type="button" className="button button-primary" onClick={handleSubmit}>
          {initialData ? "Update Education" : "Add Education"}
        </button>
      </div>
    </div>
  );
};