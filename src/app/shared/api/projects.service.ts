import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../model/project.model';
import {ImplementationStatus} from '../model/implementation-status.model';


@Injectable()

export abstract class ProjectsService {

  abstract addProject(project: Project): Observable<any> ;

  abstract getProjects(): Observable<Project[]> ;

  abstract deleteProject(id: number): Observable<any>;

  abstract getProjectById(id: number): Observable<Project>;

  abstract getImplementationStatuses();

  abstract getSectors();

  abstract getCountries();

  abstract getDistricts();

  abstract saveProject(project: Project);

  abstract saveAndCloseProject(project: Project);
}
