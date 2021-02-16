export class Automation{
  public photo:string;
  public uid: number;
  constructor(public title:string,
              public reference:string,
              public type:string,
              public cycleTime:number,
              public ampere:number,
              public standBy:number,
              public cylceAmpere:number
              ){}
}
