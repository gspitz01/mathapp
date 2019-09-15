import { QuizName } from './quiz-name';
import { FRACTION_ADDITION, FRACTION_DIVISION, FRACTION_MULTIPLICATION,
  SIMPLIFY_FRACTION, FRACTION_SUBTRACTION } from './fractions/fraction-operators';
import { ADDITION, DIVISION, MULTIPLICATION, SUBTRACTION, GCF, LCM, EXPONENTIATION } from './basics/basic-operators';


export const NUMBER_NAMES: string[] = [
  'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
  'Eighteen', 'Nineteen', 'Twenty'
];
export const PLURAL_NUMBER_NAMES: string[] = [
  'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'Sevens', 'Eights', 'Nines', 'Tens',
  'Elevens', 'Twelves', 'Thirteens', 'Fourteens', 'Fifteens', 'Sixteens', 'Seventeens',
  'Eighteens', 'Nineteens', 'Twenties'
];
export const ORDINAL_NUMBER_NAMES: string[] = [
  'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
  'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth',
  'Eighteenth', 'Ninteenth', 'Twentieth'
];
export const QUIZ_NAMES: QuizName[] = [
  'basic-addition',
  'basic-division',
  'basic-multiplication',
  'basic-subtraction',
  'fraction-addition',
  'fraction-division',
  'fraction-multiplication',
  'fraction-subtraction',
  'gcf',
  'simplify-fraction',
  'exponentiation',
  'lcm',
  'combination'
];

export const OPERATORS_DB_MAP = [
  ADDITION, DIVISION, MULTIPLICATION, SUBTRACTION,
  GCF, LCM, EXPONENTIATION, FRACTION_ADDITION, FRACTION_DIVISION, FRACTION_MULTIPLICATION,
  FRACTION_SUBTRACTION, SIMPLIFY_FRACTION
];
