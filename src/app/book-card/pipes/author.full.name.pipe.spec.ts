import { AuthorFullNamePipe } from './author.full.name.pipe';

describe('Author.Full.NamePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorFullNamePipe();
    expect(pipe).toBeTruthy();
  });
});
