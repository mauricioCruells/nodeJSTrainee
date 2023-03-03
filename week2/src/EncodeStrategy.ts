import { Strategy } from './Strategy';

export class EncodeStrategy implements Strategy {
  public execute(data: string): string {
    let count = 0;
    let encodedData = '';

    [...data].forEach((character, index) => {
      count++;
      const nextCharacterIsDiff = character !== data.charAt(index + 1);

      if (nextCharacterIsDiff) {
        encodedData = encodedData.concat(count.toString()).concat(character);
        count = 0;
      }

    });

    return encodedData;
  }
}