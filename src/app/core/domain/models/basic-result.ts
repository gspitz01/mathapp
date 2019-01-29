import { Result } from "./result";

export class BasicResult implements Result {
  constructor(readonly value: number) {}
}
