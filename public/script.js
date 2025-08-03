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