import { DecodeUTF8Pipe } from './decode-utf8.pipe';

describe('DecodeUTF8Pipe', () => {
  it('create an instance', () => {
    const pipe = new DecodeUTF8Pipe();
    expect(pipe).toBeTruthy();
  });
});
