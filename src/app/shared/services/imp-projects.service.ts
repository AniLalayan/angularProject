import {Injectable} from '@angular/core';
import {ProjectsService} from '../api/projects.service';
import {Observable, zip} from 'rxjs';
import {Project} from '../model/project.model';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Location} from '@angular/common';

@Injectable()

export class ImpProjectsService extends ProjectsService {

  private static id = 4;
  public projects: Project[];

  constructor(private http: HttpClient, private location: Location) {
    super();
  }

  addProject(project: Project): Observable<any> {
    this.projects.push(project);
    return of({success: true});
  }

  getProjects(): Observable<Project[]> {
    if (!this.projects) {
      return zip(
        this.http.get<Project>('src/app/shared/mock/project-1.json'),
        this.http.get<Project>('src/app/shared/mock/project-2.json'),
        this.http.get<Project>('src/app/shared/mock/project-3.json')
      ).pipe(
        map(
          res => {
            this.projects = res;
            return this.projects;
          }
        )
      );
    } else {
      return of(this.projects);
    }
  }

  deleteProject(id: number): Observable<any> {
    const index = this.projects.findIndex(el => el.id === id);
    if (index > -1) {
      this.projects.splice(index, 1);
      return of({success: true});
    }
    return of({
      success: false,
      message: 'aaa',
    });
  }

  getProjectById(id: number): Observable<Project> {
    let project: Project;
    if (this.projects) {
      project = this.projects.find(el => el.id === id);
    }
    if (project) {
      return of(project);
    }
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

  saveProject(project) {
    if (project && project.title && project.code) {
      if (project.id) {
        const index = this.projects.findIndex(el => el.id === project.id);
        this.projects[index] = project;
        return of({
          success: true
        });
      } else {
        project.id = ImpProjectsService.id++;
        this.projects.push(project);
        return of({
          success: true
        });
      }
    }
    return of({
      success: false
    });
  }

  saveAndCloseProject(project) {
    this.saveProject(project);
    this.location.back();
}
