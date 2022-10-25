import {Game} from './game';

const quotesMock = [
  {
    content: 'Myths which are believed in tend to become true.',
    author: 'George Orwell',
  },
  {
    content:
      'Numberless are the worlds wonders, but none more wonderful than man.',
    author: 'Sophocles',
  },
  {
    content:
      'To be tested is good. The challenged life may be the best therapist.',
    author: 'Gail Sheehy',
  },
  {
    content: 'The world makes way for the man who knows where he is going.',
    author: 'Ralph Waldo Emerson',
  },
];
describe('game class tests', () => {
  const shufflerMock = jest.fn(a => a);
  it('should return valid question object', () => {
    const game = new Game(quotesMock, shufflerMock);
    const question = game.getQuestion();
    expect(question).toHaveProperty('content');
    expect(question).toHaveProperty('answers');
    expect(question.answers).toHaveLength(4);
  });

  it('should return question object related to input', () => {
    const game = new Game(quotesMock, shufflerMock);
    const question = game.getQuestion();
    const quote = quotesMock.find(q => q.content === question.content);
    expect(quote).toBeDefined();
    const inputContainAnswers = question.answers.every(a =>
      quotesMock.find(q => q.author === a),
    );
    expect(inputContainAnswers).toBe(true);
  });

  it('should return correct answer', () => {
    const game = new Game(quotesMock, shufflerMock);
    const answer = game.getCorrectAnswer();
    expect(answer).toBe(quotesMock[0].author);
  });

  it('should validate given answer', () => {
    const game = new Game(quotesMock, shufflerMock);
    const falsyResult = game.checkAnswer('random_answer');
    const truthyResult = game.checkAnswer(quotesMock[0].author);
    expect(falsyResult).toBeFalsy();
    expect(truthyResult).toBeTruthy();
  });
});
