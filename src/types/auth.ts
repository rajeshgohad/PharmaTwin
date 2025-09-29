export type ProcessArea = 'GDSD' | 'GDPD' | 'GAD';
export type Persona = 'Scientist' | 'Manager';

export interface User {
  id: string;
  name: string;
  email: string;
  processArea: ProcessArea;
  persona: Persona;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}