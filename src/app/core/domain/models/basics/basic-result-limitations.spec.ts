import { BasicResultLimitations } from './basic-result-limitations';
import { BasicResult } from './basic-result';

describe('BasicResultLimitations', () => {

  function expectResultToBeFalsy(limitations: BasicResultLimitations, result: BasicResult) {
    expect(limitations.resultSatisfiesLimitations(result)).toBeFalsy();
  }

  it('should return false on resultSatisfiesLimitations() if limitations not satisfied', () => {
    let limitations = new BasicResultLimitations(false, false);
    // Can't be negative
    let result = new BasicResult(-4.5);
    expectResultToBeFalsy(limitations, result);

    limitations = new BasicResultLimitations(true, false);
    // Can't be fraction
    result = new BasicResult(4.5);
    expectResultToBeFalsy(limitations, result);

    // Also can't be negative
    result = new BasicResult(-4);
    expectResultToBeFalsy(limitations, result);

    limitations = new BasicResultLimitations(true, true);
    // Can't be fraction
    result = new BasicResult(-4.5);
    expectResultToBeFalsy(limitations, result);
  });

  it('should return true on resultSatisfiesLimitations() if limitations satisfied', () => {
    const limitationsPossibilites = [[false, false], [true, false], [false, true], [true, true]];
    const satisfactoryResults = [4.5, 4, -4.5, -4];

    for (let i = 0; i < limitationsPossibilites.length; i++) {
      const limitations = new BasicResultLimitations(limitationsPossibilites[i][0], limitationsPossibilites[i][1]);
      const result = new BasicResult(satisfactoryResults[i]);
      expect(limitations.resultSatisfiesLimitations(result)).toBeTruthy();
    }
  });
});
