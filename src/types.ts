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

interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Resume { // TODO - make this look like the JSONResume
  name: string;
  email: string;
  profiles: Profile[]; // <-- no github/linkedin at top level
  experience: Experience[];
  projects: Project[];
}
