export interface Chapter {
  id: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface User {
  email: string;
  name?: string;
  background?: {
    software: string;
    hardware: string;
  };
}

export type ViewState = 'landing' | 'login' | 'signup' | 'dashboard';
