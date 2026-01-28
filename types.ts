
export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface UserStats {
  xp: number;
  level: number;
  completedModules: string[];
  rank: string;
}

export interface LatinModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Grammar' | 'Vocabulary' | 'Translation';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface AIExplanation {
  concept: string;
  explanation: string;
  examples: { latin: string; german: string; note: string }[];
  mnemonics: string[];
}
