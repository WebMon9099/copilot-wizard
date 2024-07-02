export type Stage =
  | 'welcome'
  | 'who-are-you'
  | 'what-assessment'
  | 'who-assesses'
  | 'when-assessment'
  | 'nearly-done'
  | 'select-skills';

export type PilotType = 'aspiring' | 'new' | 'experienced';

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Assessment {
  id: string;
  name: string;
}

export interface Assessor {
  id: string;
  name: string;
  type: 'school' | 'airline' | 'Cadet Scheme';
}
