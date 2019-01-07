import { BasicsModule } from './basics.module';

describe('BasicsModule', () => {
  let basicsModule: BasicsModule;

  beforeEach(() => {
    basicsModule = new BasicsModule();
  });

  it('should create an instance', () => {
    expect(basicsModule).toBeTruthy();
  });
});
