let experienceList = document.getElementById('experience-list');
// When adding experiences to the list, ensure they are clickable to edit
function addExperience(exp) {
  const experienceList = document.getElementById('experience-list');
  const container = document.createElement('div');
  container.className = 'experience-entry';
  container.setAttribute('data-id', Date.now()); // Unique ID for editing later

  const title = document.createElement('h4');
  title.className = 'experience-title';
  title.textContent = `${exp.title} - ${exp.company}`;
  title.onclick = () => openModal('experience', exp);  // Enable clicking to edit
  container.appendChild(title);

  const date = document.createElement('p');
  date.className = 'experience-dates';
  date.textContent = `${exp.startDate} to ${exp.endDate}`;
  container.appendChild(date);

  const bullets = document.createElement('ul');
  bullets.className = 'experience-bullets';
  exp.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bullets.appendChild(li);
  });
  container.appendChild(bullets);

  // Make experience entry clickable to open modal
  container.addEventListener('click', () => {
    openModal('experience', exp);
  });


  experienceList.appendChild(container);
}
let draggedElement = null;

function dragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.preventDefault();
  e.stopPropagation();

  e.target.classList.remove('drag-over');

  const container = document.getElementById('exp-bullets-container');
  if (draggedElement && e.target !== draggedElement) {
    const allInputs = Array.from(container.querySelectorAll('.bullet-point-input'));
    const draggedIndex = allInputs.indexOf(draggedElement);
    const dropIndex = allInputs.indexOf(e.target);

    if (draggedIndex > -1 && dropIndex > -1) {
      container.removeChild(draggedElement);
      if (dropIndex < draggedIndex) {
        container.insertBefore(draggedElement, e.target);
      } else {
        container.insertBefore(draggedElement, e.target.nextSibling);
      }
    }
  }

  draggedElement = null;
}

function dragEnd() {
  const inputs = document.querySelectorAll('.bullet-point-input');
  inputs.forEach(input => input.classList.remove('drag-over'));
}

function addExperienceBulletPoint(initialValue = "") {
  const container = document.getElementById('exp-bullets-container');
  if (!container) {
    console.error("bullet-container not found");
    return;
  }

  const bullet = document.createElement('input');
  bullet.type = 'text';
  bullet.className = 'bullet-point-input';
  bullet.value = initialValue;
  bullet.setAttribute('draggable', 'true');

  bullet.addEventListener('dragstart', dragStart);
  bullet.addEventListener('dragover', dragOver);
  bullet.addEventListener('drop', drop);

  container.appendChild(bullet);
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
    console.log("Processing entry:", entry);
    const title = entry.children[0].textContent;
    const company = entry.children[1].textContent;
    const startDate = entry.children[2].textContent;  // TODO
    const endDate = entry.children[3].textContent;  // TODO
    const bullets = [];

    const bulletItems = entry.querySelectorAll('li');
    bulletItems.forEach(li => bullets.push(li.textContent.trim()));

    resume.experience.push({ title, company, startDate, endDate, bullets });
  });

  console.log("Saved Resume JSON:", resume);
  alert("Resume saved to console. Copy it or send to backend.");
}
// This will store the experience currently being edited
let editingExperience = null;

// Open the modal to either add or edit Experience/Project
function openModal(type, experience = null) {
  const modal = document.getElementById('add-modal');
  const experienceForm = document.getElementById('experience-form');
  const projectForm = document.getElementById('project-form');
  const modalTitle = document.getElementById('modal-title');

  if (type === 'experience') {
    experienceForm.style.display = 'block';
    projectForm.style.display = 'none';
    modalTitle.textContent = experience ? 'Edit Experience' : 'Add Experience';

    // Pre-fill fields if editing
    if (experience) {
      editingExperience = experience; // Store the experience being edited
      document.getElementById('exp-title').value = experience.title;
      document.getElementById('exp-company').value = experience.company;
      document.getElementById('exp-start-date').value = experience.startDate || '';
      document.getElementById('exp-end-date').value = experience.endDate || '';


      // Populate bullets
      const bulletsContainer = document.getElementById('exp-bullets-container');
      bulletsContainer.innerHTML = ''; // Clear existing bullet points
      experience.bullets.forEach(bullet => {
        const bulletInput = document.createElement('input');
        bulletInput.type = 'text';
        bulletInput.className = 'bullet-point-input';
        bulletInput.value = bullet;
        bulletInput.setAttribute('draggable', 'true');
        bulletInput.addEventListener('dragstart', dragStart);
        bulletInput.addEventListener('dragover', dragOver);
        bulletInput.addEventListener('dragenter', dragEnter);
        bulletInput.addEventListener('dragleave', dragLeave);
        bulletInput.addEventListener('drop', drop);
        bulletInput.addEventListener('dragend', dragEnd);

        bulletsContainer.appendChild(bulletInput);
      });
    }
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
  editingExperience = null; // Reset editing experience
}

// Submit Experience Form (Add or Edit)
function submitExperience() {
  const title = document.getElementById('exp-title').value;
  const company = document.getElementById('exp-company').value;
  const startDate = document.getElementById('exp-start-date').value;
  const endDate = document.getElementById('exp-end-date').value;

  
  const bulletPoints = [];
  const bulletElements = document.querySelectorAll('#exp-bullets-container .bullet-point-input');
  bulletElements.forEach(input => {
    bulletPoints.push(input.value);
  });

  const experience = {
    title,
    company,
    startDate,
    endDate,
    bullets: bulletPoints
  };


  // If editing, update the existing experience
  if (editingExperience) {
    updateExperience(experience);
  } else {
    addExperience(experience); // If adding, add a new one
  }

  closeModal();
}

// Update Experience in the List
function updateExperience(updatedExperience) {
  const experienceList = document.getElementById('experience-list');
  const existingEntry = document.querySelector(`[data-id="${updatedExperience.id}"]`);
  
  existingEntry.querySelector('.experience-title').textContent = `${updatedExperience.title} - ${updatedExperience.company}`;
  existingEntry.querySelector('.experience-dates').textContent = `${updatedExperience.startDate} to ${updatedExperience.endDate}`;

  
  const bulletsContainer = existingEntry.querySelector('.experience-bullets');
  bulletsContainer.innerHTML = ''; // Clear existing bullets
  updatedExperience.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bulletsContainer.appendChild(li);
  });
}

// Add New Experience to the List
function addExperience(exp) {
  const experienceList = document.getElementById('experience-list');
  const container = document.createElement('div');
  container.className = 'experience-entry';
  container.setAttribute('data-id', Date.now()); // Unique ID for editing later

  const title = document.createElement('h4');
  title.className = 'experience-title';
  title.textContent = `${exp.title} - ${exp.company}`;
  container.appendChild(title);

  const startDate = document.createElement('p');
  startDate.className = 'experience-startdate';
  startDate.textContent = exp.startDate;
  container.appendChild(startDate);

  const endDate = document.createElement('p');
  endDate.className = 'experience-enddate';
  endDate.textContent = exp.endDate;
  container.appendChild(endDate);

  const bullets = document.createElement('ul');
  bullets.className = 'experience-bullets';
  exp.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bullets.appendChild(li);
  });
  container.appendChild(bullets);

  // Add edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => openModal('experience', exp);
  container.appendChild(editButton);

  experienceList.appendChild(container);
}

// Open Modal for Editing
function openExperienceModal(experience) {
  openModal('experience', experience);
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