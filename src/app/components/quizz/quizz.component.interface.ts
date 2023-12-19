export interface Quizz {
  title: string;
  questions: Question[];
  results: Results;
}

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export type Option = {
  id: number;
  name: string;
  alias: string;
};

export type Results = {
  A: string;
  B: string;
};
