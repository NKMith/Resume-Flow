import React from 'react';

interface BulletPointModalProps {
  bullets: string[];
}

export const BulletPointModal: React.FC<BulletPointModalProps> = ({ bullets }) => {
  return (
    <ul>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
};
// // BulletPointModal.tsx
// import React, { useState } from "react";
// import { Modal } from "./Modal";

// interface BulletPointModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   bullets: string[];
// }



// export const BulletPointModal: React.FC<BulletPointModalProps> = ({ isOpen, onClose, title, bullets }) => {
//   const [bulletStyle, setBulletStyle] = useState("•");
//   const [copySuccess, setCopySuccess] = useState("");

//   if (!isOpen) {
//     return null;
//   }

//   // This function handles the copy action
//   const handleCopy = async () => {
//     // Construct the string with the chosen bullet style
//     const textToCopy = bullets.map(bullet => `${bulletStyle} ${bullet}`).join("\n");
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopySuccess("Copied!");
//       // Reset the success message after a short delay
//       setTimeout(() => setCopySuccess(""), 2000);
//     } catch (err) {
//       setCopySuccess("Failed to copy!");
//       console.error('Failed to copy text: ', err);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} title={title} onClose={() => { onClose(); setCopySuccess(""); }}>
//       <div className="bullet-style-selector">
//         <label>Choose bullet style:</label>
//         <button onClick={() => setBulletStyle("•")} className={bulletStyle === "•" ? "active" : ""}>&bull;</button>
//         <button onClick={() => setBulletStyle("-")} className={bulletStyle === "-" ? "active" : ""}>-</button>
//       </div>
//       <ul className={`bullet-list-${bulletStyle === "-" ? "dash" : "dot"}`}>
//         {bullets.map((bullet, index) => (
//           <li key={index}>
//             <span className="bullet-char">{bulletStyle}</span> {bullet}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleCopy} className="copy-button">
//         Copy to Clipboard
//       </button>
//       {copySuccess && <span className="copy-success-message">{copySuccess}</span>}
//     </Modal>
//   );
// };