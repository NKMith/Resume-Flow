import React, { useState, useEffect } from "react";
import type { Work } from "../types";

interface Props {
  initialData?: Work;
  onSave: (exp: Work) => void;
}

export const WorkForm: React.FC<Props> = ({ initialData, onSave }) => {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.position);
      setCompany(initialData.name);
      setUrl(initialData.url);
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
      setSummary(initialData.summary);
      setHighlights(initialData.highlights || []);
    }
  }, [initialData]);

  const addBullet = () => setHighlights([...highlights, ""]);
  const updateBullet = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const deleteBullet = (index: number) => {
    const updated = [...highlights];
    updated.splice(index, 1);
    setHighlights(updated);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null) return;
    const updated = [...highlights];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, removed);
    setHighlights(updated);
    setDragIndex(null);
  };

  const handleSubmit = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      name: company,
      position,
      url,
      startDate,
      endDate,
      summary,
      highlights: highlights.length > 0 ? highlights : [],
    });
  };

  return (
    <div>
      <div className="form-field-group">
        <label>Company</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      </div>
      <div className="form-field-group">
        <label>Position</label>
        <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="President" />
      </div>
      <div className="form-field-group">
        <label>URL</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://company.com" />
      </div>

      <div className="date-fields form-field-group">
        <div className="date-field-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="date-field-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      
      <div className="form-field-group">
        <label>Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Description…" />
      </div>

      <div className="form-field-group">
        <label>Highlights</label>
        <div className="bullets-container">
          {highlights.map((bullet, i) => (
            <div key={i} className="bullet-wrapper">
              <input
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(i)}
                value={bullet}
                onChange={(e) => updateBullet(i, e.target.value)}
                className="bullet-point-input"
                placeholder="e.g. Started the company"
              />
              <button
                type="button"
                className="delete-bullet-btn"
                onClick={() => deleteBullet(i)}
              >
                🗑️
              </button>
            </div>
          ))}
          <button type="button" className="button button-secondary add-button" onClick={addBullet}>+ Add Highlight</button>
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="button button-primary" onClick={handleSubmit}>
          {initialData ? "Update Work" : "Add Work"}
        </button>
      </div>
    </div>
  );
};