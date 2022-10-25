import {Question} from './question';
import {Quote} from './Quote';

type ArrayShufler<T> = (arr: Array<T>) => Array<T>;

export class Game {
  private correctAnswer: string;
  private question: Question;

  constructor(private quotes: Quote[], private shuffler: ArrayShufler<Quote>) {
    if (quotes.length != 4)
      throw Error('[Game] quotes length different than 4');
    const shuffledArray = this.shuffler(this.quotes);
    const {content, author} = shuffledArray[0];
    this.correctAnswer = author;
    this.question = {
      content: content,
      answers: shuffledArray.map(q => q.author),
    };
  }

  public getQuestion() {
    return this.question;
  }

  public getCorrectAnswer() {
    return this.correctAnswer;
  }

  public checkAnswer(answer: string) {
    return answer === this.correctAnswer;
  }
}
