import { MULTIPLICATION, ADDITION, SUBTRACTION, DIVISION, GCF, LCM, EXPONENTIATION } from '../basics/basic-operators';
import { BaselineRoundLevel } from './baseline-round-level';
import { Operator } from '../operator';

describe('BaselineRoundLevel', () => {
  it('should create a question from the specific set of operators', () => {
    const operators: Operator[] = [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, GCF, LCM, EXPONENTIATION];
    const level = new BaselineRoundLevel('Whatever', 10, 10);
    for (let i = 0; i < 20; i++) {
      expect(operators.includes(level.createQuestion().operator)).toBeTruthy();
    }
  });
});
