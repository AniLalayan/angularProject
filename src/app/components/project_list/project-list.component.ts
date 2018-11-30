import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

  constructor(private service: ProjectsService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  public projects: Project[];
  public dataSource;

  displayedColumns: string[] = ['id', 'deleteIcon'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

  this.initProjects();
  }

  addProject() {
    this.router.navigate([-1], {relativeTo: this.route});
  }

  deleteProject(id: number) {
    this.service.deleteProject(id).subscribe(response => {
      if (response.success) {
        this.initProjects();
      } else {
        alert('project dont deleted');
      }
    });
  }

  private initProjects() {
    this.service.getProjects().subscribe(x => {
      this.projects = x;
      const tableData = [];
      for (const i of x) {
        tableData.push({'id': i.id});
      }
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.sort = this.sort;
    });
  }

  getProjectTitle(id: number): string {
    return this.projects.find(value => value.id === id).title;
  }
}
