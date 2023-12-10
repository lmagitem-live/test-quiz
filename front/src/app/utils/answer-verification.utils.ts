import { Question } from '../models/question';

export abstract class AnswerVerificationUtils {
  public static isAnswerValid(
    question: Question,
    answer?: string | string[]
  ): boolean {
    let result = true;
    if (Array.isArray(answer)) {
      question.answers?.forEach((expectedAnswer) => {
        const rightAnswer = answer.find((givenAnswer) =>
          this.isRightAnswer(expectedAnswer, givenAnswer)
        );
        if (!rightAnswer) result = false;
      });
    } else if (answer) {
      result = this.isRightAnswer(question.answer ?? '', answer);
    }
    return result;
  }

  private static isRightAnswer(
    expectedAnswer: string,
    answer: string
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
