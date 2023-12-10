import { Question } from '../models/question';
import { Score } from '../models/score';

export abstract class AnswerVerificationUtils {
  public static isAnswerValid(
    question: Question,
    answer?: string | string[]
  ): boolean {
    let result = false;
    if (Array.isArray(answer)) {
      result = this.areRightAnswers(answer, question.answers);
    } else if (answer) {
      result = this.isRightAnswer(answer, question.answer ?? '');
    }
    return result;
  }

  public static isHigherScore(current?: Score, old?: Score): boolean {
    return (
      (current?.validAnswers ?? 1) / (current?.questions ?? 1) >
      (old?.validAnswers ?? 1) / (old?.questions ?? 1)
    );
  }

  private static areRightAnswers(
    answers: string[],
    expectedAnswers?: string[]
  ): boolean {
    let allValid = true;
    expectedAnswers?.forEach((expectedAnswer) => {
      const rightAnswer = answers.find((givenAnswer) =>
        this.isRightAnswer(expectedAnswer, givenAnswer)
      );
      if (!rightAnswer) allValid = false;
    });
    if (expectedAnswers?.length !== answers.length) {
      allValid = false;
    }
    return allValid;
  }

  private static isRightAnswer(
    answer: string,
    expectedAnswer: string
  ): boolean {
    return this.normalizeString(expectedAnswer) == this.normalizeString(answer);
  }

  private static normalizeString(input: string): string {
    let normalizedStr = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    normalizedStr = normalizedStr.toLowerCase();
    normalizedStr = normalizedStr.trim();
    normalizedStr = normalizedStr.replace(/\s+/g, ' ');
    return normalizedStr;
  }
}
