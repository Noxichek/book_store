import { IAuthor } from '../../authors/interfaces/author.interface';

export class Utils {
  public static getAuthorFullName(author: IAuthor): string {
    return `${author.firstName} ${author.lastName}`;
  }
}
