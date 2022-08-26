import { IFullName } from '../interfaces/full-name-interface';

export class Utils {
  public static getFullName<T extends IFullName>(value: T): string {
    return `${value.firstName} ${value.lastName}`;
  }
}
