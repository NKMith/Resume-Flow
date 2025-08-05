// =====================
// Interfaces
// =====================
interface Experience {
  id?: string; // unique DOM data-id
  title: string;
  company: string;
  startDate?: string; // ? means this variable is optional when using the interface
  endDate?: string;
  bullets: string[];
}

interface Resume {
  name: string;
  contact: string;
  github: string;
  linkedin: string;
  experience: Experience[];
}

// =====================
// Globals
// =====================
let experienceList = document.getElementById('experience-list') as HTMLElement;
let draggedElement: HTMLInputElement | null = null;
let editingExperience: Experience | null = null;

// =====================
// Bullet Point Handling
// =====================
function dragStart(e: DragEvent) {
  draggedElement = e.target as HTMLInputElement;
  e.dataTransfer!.effectAllowed = "move"; // ! is Non-null assertion operator
  e.dataTransfer!.setData("text/plain", "");
}

function dragOver(e: DragEvent) {
  e.preventDefault();
  e.dataTransfer!.dropEffect = "move";
}

function dragEnter(e: DragEvent) {
  e.preventDefault();
  (e.target as HTMLElement).classList.add('drag-over');
}

function dragLeave(e: DragEvent) {
  (e.target as HTMLElement).classList.remove('drag-over');
}

function drop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();

  (e.target as HTMLElement).classList.remove('drag-over');

  const container = document.getElementById('exp-bullets-container') as HTMLElement;
  if (draggedElement && e.target !== draggedElement) {
    const allInputs = Array.from(container.querySelectorAll('.bullet-point-input')) as HTMLInputElement[];
    const draggedIndex = allInputs.indexOf(draggedElement);
    const dropIndex = allInputs.indexOf(e.target as HTMLInputElement);

    if (draggedIndex > -1 && dropIndex > -1) {
      container.removeChild(draggedElement);
      if (dropIndex < draggedIndex) {
        container.insertBefore(draggedElement, e.target as HTMLElement);
      } else {
        container.insertBefore(draggedElement, (e.target as HTMLElement).nextSibling);
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
  const container = document.getElementById('exp-bullets-container') as HTMLElement;
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

// =====================
// Resume Handling
// =====================
function saveResume() {
  const resume: Resume = {
    name: (document.getElementById('name') as HTMLElement).textContent!.trim(),
    contact: (document.getElementById('contact') as HTMLElement).textContent!.trim(),
    github: (document.getElementById('github') as HTMLElement).textContent!.trim(),
    linkedin: (document.getElementById('linkedin') as HTMLElement).textContent!.trim(),
    experience: []
  };

  const entries = document.querySelectorAll('.experience-entry') as NodeListOf<HTMLElement>;
  entries.forEach(entry => {
    const titleCompany = (entry.querySelector('.experience-title') as HTMLElement).textContent!.split(' - ');
    const startDate = (entry.querySelector('.experience-startdate') as HTMLElement).textContent || '';
    const endDate = (entry.querySelector('.experience-enddate') as HTMLElement).textContent || '';
    const bullets: string[] = [];

    entry.querySelectorAll('li').forEach(li => bullets.push(li.textContent!.trim()));

    resume.experience.push({
      id: entry.getAttribute('data-id')!,
      title: titleCompany[0] || '',
      company: titleCompany[1] || '',
      startDate,
      endDate,
      bullets
    });
  });

  console.log("Saved Resume JSON:", resume);
  alert("Resume saved to console. Copy it or send to backend.");
}

// =====================
// Modal Handling
// =====================
function openModal(type: 'experience' | 'project', experience: Experience | null = null) {
  const modal = document.getElementById('add-modal') as HTMLElement;
  const experienceForm = document.getElementById('experience-form') as HTMLElement;
  const projectForm = document.getElementById('project-form') as HTMLElement;
  const modalTitle = document.getElementById('modal-title') as HTMLElement;

  if (type === 'experience') {
    experienceForm.style.display = 'block';
    projectForm.style.display = 'none';
    modalTitle.textContent = experience ? 'Edit Experience' : 'Add Experience';

    if (experience) { // if editing an existing experience
      editingExperience = { ...experience }; // keep original data

      // Populate form fields with existing data
      (document.getElementById('exp-title') as HTMLInputElement).value = experience.title;
      (document.getElementById('exp-company') as HTMLInputElement).value = experience.company;
      (document.getElementById('exp-start-date') as HTMLInputElement).value = experience.startDate || '';
      (document.getElementById('exp-end-date') as HTMLInputElement).value = experience.endDate || '';

      const bulletsContainer = document.getElementById('exp-bullets-container') as HTMLElement;
      bulletsContainer.innerHTML = '';
      experience.bullets.forEach(bullet => addExperienceBulletPoint(bullet));
    }
  } else { // if editing a project
    experienceForm.style.display = 'none';
    projectForm.style.display = 'block';
    modalTitle.textContent = 'Add Project';
  }

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('add-modal') as HTMLElement;
  modal.style.display = 'none';
  editingExperience = null;
}

// =====================
// Experience CRUD
// =====================
function submitExperience() {
  // Grab values from the form
  const title = (document.getElementById('exp-title') as HTMLInputElement).value;
  const company = (document.getElementById('exp-company') as HTMLInputElement).value;
  const startDate = (document.getElementById('exp-start-date') as HTMLInputElement).value;
  const endDate = (document.getElementById('exp-end-date') as HTMLInputElement).value;

  const bulletPoints: string[] = [];
  const bulletElements = document.querySelectorAll('#exp-bullets-container .bullet-point-input') as NodeListOf<HTMLInputElement>;
  bulletElements.forEach(input => bulletPoints.push(input.value));

  const experience: Experience = {
    title,
    company,
    startDate,
    endDate,
    bullets: bulletPoints
  };

  if (editingExperience && editingExperience.id) {
    experience.id = editingExperience.id;
    updateExperience(experience);
  } else {
    addExperience(experience);
  }

  closeModal();
}

function updateExperience(updatedExperience: Experience) {
  // Find the existing experience entry in the DOM using ID
  const existingEntry = document.querySelector(`[data-id="${updatedExperience.id}"]`) as HTMLElement | null;
  if (!existingEntry) { // TODO - check here
    console.log("Experience entry not found for ID:", updatedExperience.id);
    return;
  }

  // Fill in form with updated values
  (existingEntry.querySelector('.experience-title') as HTMLElement).textContent =
    `${updatedExperience.title} - ${updatedExperience.company}`; // TODO - find a way to unite AddExperience and updateExperience
  (existingEntry.querySelector('.experience-startdate') as HTMLElement).textContent = updatedExperience.startDate || '';
  (existingEntry.querySelector('.experience-enddate') as HTMLElement).textContent = updatedExperience.endDate || '';

  const bulletsContainer = existingEntry.querySelector('.experience-bullets') as HTMLElement;
  bulletsContainer.innerHTML = '';
  updatedExperience.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bulletsContainer.appendChild(li);
  });
}

function addExperience(exp: Experience) {
  const id = Date.now().toString();
  exp.id = id;

  const container = document.createElement('div');
  container.className = 'experience-entry';
  container.setAttribute('data-id', id);

  const title = document.createElement('h4');
  title.className = 'experience-title';
  title.textContent = `${exp.title} - ${exp.company}`;
  container.appendChild(title);

  const startDate = document.createElement('p');
  startDate.className = 'experience-startdate';
  startDate.textContent = exp.startDate || '';
  container.appendChild(startDate);

  const endDate = document.createElement('p');
  endDate.className = 'experience-enddate';
  endDate.textContent = exp.endDate || '';
  container.appendChild(endDate);

  const bullets = document.createElement('ul');
  bullets.className = 'experience-bullets';
  exp.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bullets.appendChild(li);
  });
  container.appendChild(bullets);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => openModal('experience', exp);
  container.appendChild(editButton);

  experienceList.appendChild(container);
}
