// types.ts

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  email: string;
  profiles: Profile[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Resume {
  basics: Basics;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}