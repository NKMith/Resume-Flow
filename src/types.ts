// types.ts

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  id: string; // Added for editor functionality
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Volunteer {
  id: string; // Added for editor functionality
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  id: string; // Added for editor functionality
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Award {
  id: string; // Added for editor functionality
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface Certificate {
  id: string; // Added for editor functionality
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface Publication {
  id: string; // Added for editor functionality
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

export interface Skill {
  id: string; // Added for editor functionality
  name: string;
  level: string;
  keywords: string[];
}

export interface Language {
  id: string; // Added for editor functionality
  language: string;
  fluency: string;
}

export interface Interest {
  id: string; // Added for editor functionality
  name: string;
  keywords: string[];
}

export interface Reference {
  id: string; // Added for editor functionality
  name: string;
  reference: string;
}

export interface Project {
  id: string; // Added for editor functionality
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
}

export interface Award {
  id: string;
  title: string;
  date: string;
  awarder: string;
  summary: string;
}


export interface Resume {
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}