import React, { useState, useEffect } from "react";
import type { Award } from "../types";

interface Props {
  initialData?: Award;
  onSave: (award: Award) => void;
}

export const AwardForm: React.FC<Props> = ({ initialData, onSave }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [awarder, setAwarder] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date || "");
      setAwarder(initialData.awarder);
      setSummary(initialData.summary);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      title,
      date,
      awarder,
      summary
    });
  };

  return (
    <div>
      <div className="form-field-group">
        <label>Award Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Award Name" />
      </div>
      <div className="form-field-group">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-field-group">
        <label>Awarder</label>
        <input value={awarder} onChange={(e) => setAwarder(e.target.value)} placeholder="Company / Organization" />
      </div>
      <div className="form-field-group">
        <label>Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short description…" />
      </div>
      <div className="button-group">
        <button className="button button-primary" type="button" onClick={handleSubmit}>
          {initialData ? "Update Award" : "Add Award"}
        </button>
      </div>
    </div>
  );
};
