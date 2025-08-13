import React, { useState } from 'react';

interface BulletPointModalProps {
  bullets: string[];
}

export const BulletPointModal: React.FC<BulletPointModalProps> = ({ bullets }) => {
  const [bulletType, setBulletType] = useState('•'); // Default to a dot
  const [isCopied, setIsCopied] = useState(false);

  // This function formats the text with the selected bullet and copies it to the clipboard.
  const handleCopy = () => {
    const textToCopy = bullets.map(bullet => `${bulletType} ${bullet}`).join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the "copied" state after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem', fontWeight: 'bold' }}>Choose Bullet Type:</label>
        <select value={bulletType} onChange={(e) => setBulletType(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          <option value="•">Dot (•)</option>
          <option value="-">Dash (-)</option>
          <option value="*">Asterisk (*)</option>
        </select>
      </div>

      <div style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
        <p style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Preview:</p>
        {bullets.map((bullet, index) => (
          <p key={index} style={{ margin: '0.5rem 0', wordBreak: 'break-word' }}>
            {bulletType} {bullet}
          </p>
        ))}
      </div>

      <button
        onClick={handleCopy}
        className="button button-primary"
        style={{ marginTop: '1rem', width: '100%' }}
      >
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};