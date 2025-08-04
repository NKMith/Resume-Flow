let experienceList = document.getElementById('experience-list');

function addExperience(exp = null) {
  const container = document.createElement('div');
  container.className = 'experience-entry';
  container.draggable = true;

  const titleInput = document.createElement('input');
  titleInput.placeholder = 'Job Title';
  titleInput.value = exp?.title || '';

  const companyInput = document.createElement('input');
  companyInput.placeholder = 'Company';
  companyInput.value = exp?.company || '';

  const dateInput = document.createElement('input');
  dateInput.placeholder = 'Dates';
  dateInput.value = exp?.dates || '';

  const bulletList = document.createElement('ul');
  bulletList.className = 'bullets';

  (exp?.bullets || []).forEach(bullet => {
    const li = document.createElement('li');
    li.contentEditable = true;
    li.textContent = bullet;
    bulletList.appendChild(li);
  });

  const addBulletBtn = document.createElement('button');
  addBulletBtn.textContent = '+ Add Bullet';
  addBulletBtn.onclick = () => {
    const li = document.createElement('li');
    li.contentEditable = true;
    li.textContent = 'New bullet point';
    bulletList.appendChild(li);
  };

  container.appendChild(titleInput);
  container.appendChild(companyInput);
  container.appendChild(dateInput);
  container.appendChild(bulletList);
  container.appendChild(addBulletBtn);

  // drag & drop handlers
  container.addEventListener('dragstart', e => {
    dragSrcEl = container;
    e.dataTransfer.effectAllowed = 'move';
  });

  container.addEventListener('dragover', e => {
    e.preventDefault();
    container.classList.add('drag-over');
  });

  container.addEventListener('dragleave', () => {
    container.classList.remove('drag-over');
  });

  container.addEventListener('drop', e => {
    e.stopPropagation();
    container.classList.remove('drag-over');
    if (dragSrcEl !== container) {
      experienceList.insertBefore(dragSrcEl, container);
    }
  });

  experienceList.appendChild(container);
}


function saveResume() {
  const resume = {
    name: document.getElementById('name').textContent.trim(),
    contact: document.getElementById('contact').textContent.trim(),
    github: document.getElementById('github').textContent.trim(),
    linkedin: document.getElementById('linkedin').textContent.trim(),
    experience: []
  };

  const entries = document.querySelectorAll('.experience-entry');
  entries.forEach(entry => {
    const title = entry.children[0].value;
    const company = entry.children[1].value;
    const dates = entry.children[2].value;
    const bullets = [];

    const bulletItems = entry.querySelectorAll('li');
    bulletItems.forEach(li => bullets.push(li.textContent.trim()));

    resume.experience.push({ title, company, dates, bullets });
  });

  console.log("Saved Resume JSON:", resume);
  alert("Resume saved to console. Copy it or send to backend.");
}

// Open the modal to add Experience or Project
function openModal(type) {
  const modal = document.getElementById('add-modal');
  const experienceForm = document.getElementById('experience-form');
  const projectForm = document.getElementById('project-form');
  const modalTitle = document.getElementById('modal-title');

  if (type === 'experience') {
    experienceForm.style.display = 'block';
    projectForm.style.display = 'none';
    modalTitle.textContent = 'Add Experience';
  } else {
    experienceForm.style.display = 'none';
    projectForm.style.display = 'block';
    modalTitle.textContent = 'Add Project';
  }

  modal.style.display = 'block';
}

// Close the modal
function closeModal() {
  const modal = document.getElementById('add-modal');
  modal.style.display = 'none';
}

// Submit Experience Form
function submitExperience() {
  const title = document.getElementById('exp-title').value;
  const company = document.getElementById('exp-company').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const bullets = document.getElementById('exp-bullets').value.split('\n');

  const experience = {
    title,
    company,
    startDate,
    endDate,
    bullets,
  };

  addExperience(experience);
  closeModal();
}

// Submit Project Form
function submitProject() {
  const name = document.getElementById('proj-name').value;
  const startDate = document.getElementById('proj-startDate').value;
  const endDate = document.getElementById('proj-endDate').value;
  const description = document.getElementById('proj-description').value;
  const highlights = document.getElementById('proj-highlights').value.split(',');
  const url = document.getElementById('proj-url').value;

  const project = {
    name,
    startDate,
    endDate,
    description,
    highlights,
    url,
  };

  addProject(project);
  closeModal();
}

// Add Experience to the List
function addExperience(exp) {
  const experienceList = document.getElementById('experience-list');

  const container = document.createElement('div');
  container.className = 'experience-entry';

  const title = document.createElement('h4');
  title.textContent = `${exp.title} - ${exp.company}`;
  container.appendChild(title);

  const date = document.createElement('p');
  date.textContent = exp.dates;
  container.appendChild(date);

  const bullets = document.createElement('ul');
  exp.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bullets.appendChild(li);
  });
  container.appendChild(bullets);

  experienceList.appendChild(container);
}

// Add Project to the List
function addProject(proj) {
  const projectList = document.getElementById('project-list');

  const container = document.createElement('div');
  container.className = 'project-entry';

  const name = document.createElement('h4');
  name.textContent = proj.name;
  container.appendChild(name);

  const dates = document.createElement('p');
  dates.textContent = `${proj.startDate} - ${proj.endDate}`;
  container.appendChild(dates);

  const description = document.createElement('p');
  description.textContent = proj.description;
  container.appendChild(description);

  const highlights = document.createElement('ul');
  proj.highlights.forEach(highlight => {
    const li = document.createElement('li');
    li.textContent = highlight;
    highlights.appendChild(li);
  });
  container.appendChild(highlights);

  const url = document.createElement('a');
  url.href = proj.url;
  url.textContent = 'Visit Project';
  url.target = '_blank';
  container.appendChild(url);

  projectList.appendChild(container);
}

/// Add Bullet Point Input
function addBulletPoint() {
  const container = document.getElementById('exp-bullets-container');

  // Create new bullet point input
  const bulletInput = document.createElement('input');
  bulletInput.type = 'text';
  bulletInput.className = 'bullet-point-input';
  bulletInput.placeholder = 'Enter bullet point...';
  bulletInput.value = ''; // Empty by default

  bulletInput.setAttribute('draggable', 'true');

  // Add event listeners for drag-and-drop
  bulletInput.addEventListener('dragstart', dragStart);
  bulletInput.addEventListener('dragover', dragOver);
  bulletInput.addEventListener('dragenter', dragEnter);
  bulletInput.addEventListener('dragleave', dragLeave);
  bulletInput.addEventListener('drop', drop);
  bulletInput.addEventListener('dragend', dragEnd);

  container.appendChild(bulletInput);
}

// Handle drag start
function dragStart(e) {
  this.style.opacity = '0.4';
  draggedItem = this; // Store the dragged element
}

// Handle drag over (needed to allow dropping)
function dragOver(e) {
  e.preventDefault();
  this.style.border = '2px dashed #007bff';
}

// Handle drag enter (optional visual feedback)
function dragEnter(e) {
  e.preventDefault();
}

// Handle drag leave (reset styles)
function dragLeave() {
  this.style.border = '';
}

// Handle drop and reorder
function drop(e) {
  e.stopPropagation();
  this.style.border = ''; // Reset border
  if (draggedItem !== this) {
    const container = document.getElementById('exp-bullets-container');
    container.insertBefore(draggedItem, this);
  }
}

// Handle drag end
function dragEnd() {
  this.style.opacity = '1';
  const allBulletPoints = document.querySelectorAll('.bullet-point-input');
  allBulletPoints.forEach(input => {
    input.style.border = '';
  });
}

// Submit Experience with updated bullets
function submitExperience() {
  const title = document.getElementById('exp-title').value;
  const company = document.getElementById('exp-company').value;
  const dates = document.getElementById('exp-dates').value;
  
  const bulletPoints = [];
  const bulletElements = document.querySelectorAll('#exp-bullets-container .bullet-point-input');
  bulletElements.forEach(input => {
    bulletPoints.push(input.value);
  });

  const experience = {
    title,
    company,
    dates,
    bullets: bulletPoints
  };

  addExperience(experience);
  closeModal();
}

// Add Experience to the list in the main section
function addExperience(exp) {
  const experienceList = document.getElementById('experience-list');
  const container = document.createElement('div');
  container.className = 'experience-entry';

  const title = document.createElement('h4');
  title.textContent = `${exp.title} - ${exp.company}`;
  container.appendChild(title);

  const date = document.createElement('p');
  date.textContent = exp.dates;
  container.appendChild(date);

  const bullets = document.createElement('ul');
  exp.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bullets.appendChild(li);
  });
  container.appendChild(bullets);

  experienceList.appendChild(container);
}


// // ========== SECTION DRAGGING ==========
// let dragSrcEl = null;

// document.querySelectorAll('.resume-section').forEach(section => {
//   section.addEventListener('dragstart', e => {
//     dragSrcEl = section;
//     e.dataTransfer.effectAllowed = 'move';
//   });

//   section.addEventListener('dragover', e => {
//     e.preventDefault(); // Needed for drop to work
//     section.classList.add('drag-over');
//   });

//   section.addEventListener('dragleave', () => {
//     section.classList.remove('drag-over');
//   });

//   section.addEventListener('drop', e => {
//     e.stopPropagation();
//     section.classList.remove('drag-over');

//     if (dragSrcEl !== section) {
//       const container = document.querySelector('.container');
//       container.insertBefore(dragSrcEl, section);
//     }
//   });
// });

// function loadResume(data) {
//   document.getElementById('name').textContent = data.name;
//   document.getElementById('contact').textContent = data.contact;
//   document.getElementById('github').textContent = data.github;
//   document.getElementById('linkedin').textContent = data.linkedin;

//   // Clear and reload experiences
//   experienceList.innerHTML = '';
//   data.experience.forEach(exp => addExperience(exp));
// }