import { Operator } from './operator';
import { BasicOperation } from './basic-operation';

export class BasicOperator extends Operator {
  constructor(display: string, readonly operation: BasicOperation) {
    super(display);
  }
}
