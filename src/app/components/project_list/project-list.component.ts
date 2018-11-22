import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ImplicitReceiver} from '@angular/compiler';
import {ImpProjectsService} from '../../shared/services/imp-projects.service';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectsService, private router: Router) {
  }

  public projects: Project[];
  // public tableData = [
  //   {'project': 'Project 1'},
  //   {'project': 'Project 2'},
  // ];

  displayedColumns: string[] = ['id', 'title'];
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.projectService.getProjects().subscribe(x => {
      this.projects = x;
      const tableData = [];
      for (const i of x) {
        tableData.push({'id': i.id, 'title': i.title});
      }
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.sort = this.sort;
    });
  }

  // navigateTo(id: number) {
  //   // this.router.navigate([`project/${id}`]);
  //   this.router.navigate([`project`]);
  // }
}