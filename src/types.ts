export type Country = {
  country: string;
  capital: string;
  region: string;
};

export type Question = {
  country: string;
  correctCapital: string;
  options: string[];
};

export type AnswerRecord = {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
};

export type AppState = 'START' | 'PLAYING' | 'RESULTS';
