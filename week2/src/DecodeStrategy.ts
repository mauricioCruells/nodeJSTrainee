import { Strategy } from './Strategy';

export class DecodeStrategy implements Strategy {

  public execute(data: string): string {
    const expandedData = [...data];
    const tempData: string[] = [];
    let previousIndex: number = 0;  

    expandedData.forEach((character, index)=>{
      const isACharacter = isNaN(parseInt(character));
  
      if (isACharacter) {
        const count = parseInt(expandedData.slice(previousIndex, index).join(''));
        
        tempData.push(character.repeat(count));

        previousIndex = index + 1;
      }

    });

    const decodedData = tempData.join('');    
    return decodedData; 
  }
}


