export class Automation{
  public photo:string;
  public standBy:number=5;
  constructor(public title:string,
              public reference:string,
              public cycleTime:number,
              public ampere:number
              ){}
}
