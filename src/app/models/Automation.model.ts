export class Automation{
  public photo:string='https://www.came.com/fr/themes/custom/came_theme/assets/img/logo.svg';
  public standBy:number=5;
  constructor(public title:string,
              public reference:string,
              public cycleTime:number,
              public ampere:number
              ){}
}
