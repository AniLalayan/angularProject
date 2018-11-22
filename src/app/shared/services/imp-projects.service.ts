import {Injectable} from '@angular/core';
import {ProjectsService} from '../api/projects.service';
import {Observable, zip} from 'rxjs';
import {Project} from '../model/project.model';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';


@Injectable()

export class ImpProjectsService extends ProjectsService {

  public projects: Project[];

  constructor(private http: HttpClient) {
    super();
  }

  createProject(): Observable<Project> {
    return;
  }

  getProjects(): Observable<Project[]> {
    return zip(
      this.http.get<Project>('src/app/shared/mock/project-1.json'),
      this.http.get<Project>('src/app/shared/mock/project-2.json'),
      this.http.get<Project>('src/app/shared/mock/project-3.json')
    ).pipe(tap(data => {
      if (!this.projects) {
        this.projects = data;
      }
    }));
  }

  deleteProject(): Observable<Project> {
    return;
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>('src/app/shared/mock/project-' + id + '.json').pipe(
      map(data => this.convert(data))
    );
  }

  convert(json: any): Project {
    const project = new Project();
    project.code = json.code;
    project.title = json.title;
    project.description = json.description;
    project.implementationStatusId = json.implementationStatusId;
    project.plannedStartDate = new Date(json.plannedStartDate);
    project.plannedEndDate = new Date(json.plannedEndDate);
    project.sectors = json.sectors;
    project.location = json.location;
    return project;
  }

  getImplementationStatuses() {
    return this.http.get('src/app/shared/mock/implementation-status.json');
  }

  getSectors() {
    return this.http.get('src/app/shared/mock/sector.json');
  }

  getCountries() {
    return this.http.get('src/app/shared/mock/country.json');
  }

  getDistricts() {
    return this.http.get('src/app/shared/mock/district.json');
  }
}
