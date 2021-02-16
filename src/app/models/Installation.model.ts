import { Automation } from 'src/app/models/Automation.model';
import { Production } from 'src/app/models/Production.model';

export class Installation {
  public uid: number;
  constructor(
    public automation: Automation,
    public security: Automation[],
    public accesory: Automation[],
    public production: Production,
    public cycleDay: number,
    public cycleAmpere: number,

  ) { }
}
