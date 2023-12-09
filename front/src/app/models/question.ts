export interface Question {
  id: number;
  label: string;
  answerType: 'choice' | 'text' | 'multiple-choice';
  choices?: string[];
  answer?: string;
  answers?: string[];
}
