export enum InteractionType {
  QUIZ = 'QUIZ',
  DRAG_DROP = 'DRAG_DROP',
  CHART = 'CHART',
  SCENARIO = 'SCENARIO',
  INPUT = 'INPUT',
  FINAL = 'FINAL'
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface DragItem {
  id: string;
  text: string;
  targetId: string; // The ID of the zone it belongs to
}

export interface DropZone {
  id: string;
  title: string;
}

export interface ScenarioStep {
  question: string;
  options: QuizOption[];
}

export interface LevelData {
  id: number;
  title: string;
  objective: string;
  content: string[]; // Bullet points of theory
  interactionType: InteractionType;
  interactionData: any; // Flexible based on type
}

export interface UserProgress {
  currentLevel: number;
  unlockedLevels: number; // Max level reached
  scores: Record<number, number>; // Level ID -> Score
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
