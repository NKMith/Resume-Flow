const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');


// Middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies
// app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Welcome to the Resume App API!');
});

// Your routes for handling resume data will go here
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





const fs = require('fs');
//const path = require('path');

// Helper function to read resume data from the JSON file
const readResumeData = () => {
  const data = fs.readFileSync(path.join(__dirname, 'resume.json'), 'utf-8');
  return JSON.parse(data);
};

// Helper function to write resume data to the JSON file
const writeResumeData = (data) => {
  fs.writeFileSync(path.join(__dirname, 'resume.json'), JSON.stringify(data, null, 2), 'utf-8');
};

// Route to get resume data
app.get('/resume', (req, res) => {
  const resumeData = readResumeData();
  res.json(resumeData);
});

// Route to update resume data
app.post('/resume', (req, res) => {
  const updatedData = req.body;
  writeResumeData(updatedData);
  res.json({ message: 'Resume updated successfully' });
});
