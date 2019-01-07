import { FractionsRoutingModule } from './fractions-routing.module';

describe('FractionsRoutingModule', () => {
  let fractionsRoutingModule: FractionsRoutingModule;

  beforeEach(() => {
    fractionsRoutingModule = new FractionsRoutingModule();
  });

  it('should create an instance', () => {
    expect(fractionsRoutingModule).toBeTruthy();
  });
});
