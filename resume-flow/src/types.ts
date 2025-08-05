export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  description: string;
  highlights: string[];
  url?: string;
}

export interface Resume { // TODO - make this look like the JSONResume
  name: string;
  contact: string;
  github: string;
  linkedin: string;
  experience: Experience[];
  projects: Project[];
}
