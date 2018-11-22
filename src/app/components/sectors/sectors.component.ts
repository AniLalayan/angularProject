import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../shared/model/project.model';
import {Sector} from '../../shared/model/sector.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../shared/api/projects.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})

export class SectorsComponent implements OnInit {

  @Input() project: Project;
  isReady = false;

  constructor(private service: ProjectsService) {
  }

  public sectorsList: Sector[] = [];
  public dataSource: MatTableDataSource<Sector>;
  displayedColumns: string[] = ['name', 'percent'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.service.getSectors().subscribe(data => {
      this.sectorsList = data;
      this.isReady = true;
    });
    this.dataSource = new MatTableDataSource(this.project.sectors);
    this.dataSource.sort = this.sort;
  }


  getSectorName(id: number): string {
    return this.sectorsList.find(value => value.id === id).name;
  }

  addSector() {

  }
}
