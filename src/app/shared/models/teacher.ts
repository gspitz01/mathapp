import { Class } from "./class";

export class Teacher {
  constructor(readonly id: string, readonly name: string, readonly classIds: string[]) {}
}
