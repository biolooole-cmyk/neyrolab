export type ReflexType = 'unconditional' | 'conditional';

export interface Scenario {
  id: string;
  text: string;
  type: ReflexType;
  explanation: string;
}

export interface PavlovState {
  repetitionCount: number;
  bellActive: boolean;
  foodActive: boolean;
  salivationActive: boolean;
  reflexStrength: number; // 0 to 100
  history: string[];
}

export interface InhibitionScenario {
  id: string;
  situation: string;
  prediction: string;
  type: 'external' | 'internal';
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  achievements: Achievement[];
  completedLevels: number[];
}
