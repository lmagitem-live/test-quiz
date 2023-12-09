import { Question } from './question';

export interface QuestionSet {
  hash: number;
  questions: Question[];
}
