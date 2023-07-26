import { NullHandlerPipe } from './null-handler.pipe';

describe('NullHandlerPipe', () => {
  it('create an instance', () => {
    const pipe = new NullHandlerPipe();
    expect(pipe).toBeTruthy();
  });
});
