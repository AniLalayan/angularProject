import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../model/project.model';
import {ImplementationStatus} from '../model/implementation-status.model';


@Injectable()

export abstract class ProjectsService {

  abstract createProject(): Observable<Project> ;

  abstract getProjects(): Observable<Project[]> ;

  abstract deleteProject(): Observable<Project>;

  abstract getProjectById(id: number): Observable<Project>;

  abstract getImplementationStatuses();

  abstract getSectors();

  abstract getCountries();

  abstract getDistricts();
}
