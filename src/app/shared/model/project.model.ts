import {Sector} from './sector.model';
import {Location} from './location.model';
import {ImplementationStatus} from './implementation-status.model';

export class Project {
  public id: number;
  public code: string;
  public title: string;
  public description: string;
  public implementationStatusId: number;
  public plannedStartDate: Date;
  public plannedEndDate: Date;
  public sectors: Sector[];
  public location: Location[];
}
