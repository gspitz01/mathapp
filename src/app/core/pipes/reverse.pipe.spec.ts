import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if value null', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform(null)).toBeFalsy();
  });
});
