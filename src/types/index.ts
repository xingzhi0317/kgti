export type DimensionScore = {
  W: number;
  D: number;
  G: number;
  C: number;
  R: number;
  F: number;
  E: number;
  I: number;
};

export type PersonalityCode =
  | 'WGRE' | 'WGRI' | 'WGFE' | 'WGFI'
  | 'WCRE' | 'WCRI' | 'WCFE' | 'WCFI'
  | 'DGRE' | 'DGRI' | 'DGFE' | 'DGFI'
  | 'DCRE' | 'DCRI' | 'DCFE' | 'DCFI';

export type Question = {
  id: number;
  dimension: 'WD' | 'GC' | 'RF' | 'EI';
  text: string;
  optionA: { text: string; value: 'W' | 'G' | 'R' | 'E' };
  optionB: { text: string; value: 'D' | 'C' | 'F' | 'I' };
  scenario?: string;
};

export type Personality = {
  code: PersonalityCode;
  chineseName: string;
  englishName: string;
  tagline: string;
  description: string;
  traits: string[];
  gradient: string;
  accentColor: string;
  icon: string;
  compatibleWith: PersonalityCode[];
  campusVibe: string;
};

export type TestResult = {
  id?: string;
  session_id: string;
  personality_type: string;
  scores: DimensionScore;
  answers: string[];
  created_at?: string;
};

export type AppPage = 'landing' | 'test' | 'results' | 'community';
