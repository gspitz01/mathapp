import { FractionResultLimitations } from "./fraction-result-limitations";
import { BasicResultLimitations } from "../basics/basic-result-limitations";
import { FractionResult } from "./fraction-result";
import { BasicResult } from "../basics/basic-result";

describe("FractionResultLimitations", () => {
  const numLimitations = new BasicResultLimitations(true, false);
  const denLimitations = new BasicResultLimitations(true, false);
  const limitations = new FractionResultLimitations(numLimitations, denLimitations);

  it("should return true if result satisfies limitations", () => {
    const result = new FractionResult(new BasicResult(4), new BasicResult(5));
    expect(limitations.resultSatisfiesLimitations(result)).toBeTruthy();
  });

  it("should return false if result does not satisfy limitations", () => {
    const result = new FractionResult(new BasicResult(-4), new BasicResult(6));
    expect(limitations.resultSatisfiesLimitations(result)).toBeFalsy();
  });
});
