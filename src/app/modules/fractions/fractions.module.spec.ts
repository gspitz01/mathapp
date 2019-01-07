import { FractionsModule } from './fractions.module';

describe('FractionsModule', () => {
  let fractionsModule: FractionsModule;

  beforeEach(() => {
    fractionsModule = new FractionsModule();
  });

  it('should create an instance', () => {
    expect(fractionsModule).toBeTruthy();
  });
});
