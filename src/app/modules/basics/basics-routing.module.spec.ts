import { BasicsRoutingModule } from './basics-routing.module';

describe('BasicsRoutingModule', () => {
  let basicsRoutingModule: BasicsRoutingModule;

  beforeEach(() => {
    basicsRoutingModule = new BasicsRoutingModule();
  });

  it('should create an instance', () => {
    expect(basicsRoutingModule).toBeTruthy();
  });
});
