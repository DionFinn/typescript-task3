import { IResult } from './IResult';
import { Medals } from './Medals.enum';
import { Countries } from './Countries.enum';

export class Country {
  // TODO: Country requires a name attribute and a results attribute.
  // name is a string, results is an array of Result
  name: string;
  results: Array<IResult> = [];
  // TODO: receives a name and initialises the results array to an empty array
  constructor(name: string) {
    this.name = name;
  }

  // return the total number of medals
  public totalMedals(): number {
    //TODO: complete
    console.log(this.results);
    return this.results.length;
  }
  // given a medal type, return the amount of that type of medal
  totalMedalType(medal: Medals): number {
    // TODO:

    let count = 0;
    for (var b of this.results) {
      if (b.medal === medal) {
        count++;
      }
    }
    return count;
  }
}
